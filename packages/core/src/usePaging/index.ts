import { isArray, isBoolean, isFunction, isObject, isString } from '@daysnap/utils'
import { computed, onBeforeMount, reactive, ref, type Ref } from 'vue'

export interface UsePagingStatus {
  pagingIndex: number
  pagingSize: number
  pagingTotal: number
  pagingError: string
}

export type UsePagingTaskResult<T = any> =
  | {
      pagingList: T[]
      pagingTotal: number
    }
  | [T[], number]

export interface UsePagingTaskOptions {
  loading?: boolean // 是否需要 loading
  toast?: boolean // 是否需要 弱提示
}

export interface UsePagingTask<T = any> {
  (state: [number, number], options: UsePagingTaskOptions): Promise<UsePagingTaskResult<T>>
}

export interface UsePagingOptions {
  initialStatus?: Partial<UsePagingStatus>
  immediate?: boolean
  scrollSelector?: string
}

export type UsePagingTriggerOptions = ((...args: any[]) => any) | boolean | UsePagingTaskOptions

export function usePaging<T = any>(task: UsePagingTask<T>, options: UsePagingOptions = {}) {
  const { initialStatus, immediate, scrollSelector = '.hor-scroll' } = options
  const pagingStatus = reactive<UsePagingStatus>(
    Object.assign(
      {
        pagingIndex: 0,
        pagingSize: 10,
        pagingTotal: -1,
        pagingError: '',
      },
      initialStatus,
    ),
  )

  // 滚动到顶部
  const scrollTop = () => {
    if (scrollSelector) {
      // 重置
      const els = document.querySelectorAll(scrollSelector)
      const el = els[els.length - 1]
      if (el) {
        el.scrollTop = 0
      }
    }
  }

  // 列表数据
  // https://github.com/vuejs/core/issues/2136
  const pagingData = ref([]) as Ref<T[]>

  // 重置
  const pagingReset = () => {
    pagingStatus.pagingIndex = 0
    pagingStatus.pagingTotal = -1
    pagingStatus.pagingError = ''
    pagingData.value = []
  }

  // 请求数据
  const pagingTrigger = (pagingIndex: number, options?: UsePagingTriggerOptions) => {
    const opt: UsePagingTaskOptions = { loading: false, toast: false }
    if (isBoolean(options)) {
      opt.loading = options
      opt.toast = options
    } else if (isObject(options)) {
      Object.assign(opt, options)
    }

    // first page return top
    if (pagingIndex === 1) {
      // 需要异步 scrollTop 保证 tab 模式下不出问题
      setTimeout(scrollTop)
    }

    // fetch data
    const promise: any = task([pagingIndex, pagingStatus.pagingSize], opt).then((res) => {
      let pagingList: T[] = []
      let pagingTotal = -1
      if (isArray(res)) {
        ;[pagingList, pagingTotal] = res
      } else {
        ;({ pagingList, pagingTotal } = res)
      }
      // 有的接口当没有数据的时候，数据字段都没有了，所以这里兼容一下
      if (!pagingList) {
        pagingList = []
      }

      pagingStatus.pagingError = ''
      pagingStatus.pagingIndex = pagingIndex
      pagingStatus.pagingTotal = pagingTotal
      pagingData.value = pagingIndex === 1 ? pagingList : [...pagingData.value, ...pagingList]

      // 为了兼容 接口 不返回 总数的情况下，如果 pagingList 给的是空数组，则认为没有更多数据了
      if (!pagingList.length) {
        pagingStatus.pagingTotal = pagingData.value.length
      }
    })

    // error
    ;(promise.toast
      ? promise.toast((_: unknown, msg: string) => {
          pagingStatus.pagingError = msg
          return opt.toast
        })
      : promise.catch((err: any) => {
          pagingStatus.pagingError = isString(err) ? err : JSON.stringify(err)
        })
    ).finally(() => {
      if (isFunction(options)) {
        options(pagingStatus.pagingError)
      }

      // first page error
      if (pagingStatus.pagingError && pagingIndex === 1) {
        pagingStatus.pagingIndex = pagingIndex
        pagingStatus.pagingTotal = -1
        pagingData.value = []
      }
    })
  }

  // 刷新
  const pagingRefresh = (options?: UsePagingTriggerOptions) => {
    pagingTrigger(1, options)
  }

  // 加载
  const pagingLoad = (options?: UsePagingTriggerOptions) => {
    if (pagingFinished.value) {
      if (isFunction(options)) {
        options()
      }
      return console.log('没有更多了')
    }
    pagingTrigger(pagingStatus.pagingIndex + 1, options)
  }

  // 是否加载完毕
  const pagingFinished = computed(() => {
    return pagingStatus.pagingTotal > 0 && pagingData.value.length >= pagingStatus.pagingTotal
  })

  // 初始加载
  onBeforeMount(() => {
    if (immediate) {
      pagingRefresh()
    }
  })

  return {
    pagingFinished,
    pagingData,
    pagingStatus,
    pagingTrigger,
    pagingRefresh,
    pagingLoad,
    pagingReset,
  }
}
