# vue-use

## 安装

```
pnpm install

pnpm up @daysnap/utils --latest -r
```


```ts
export interface UsePromiseAllOptions<T extends Record<string, any>> {
  initialValue?: T
}

export function usePromiseAll<
  T extends Record<string, (...args: any[]) => Promise<any>>,
  K extends keyof T,
>(tasks: T, initialValue?: { [P in K]: any }) {
  const data = reactive<{ [P in K]: Awaited<ReturnType<T[P]>> }>(initialValue ?? ({} as any))

  onBeforeMount(async () => {
    const res = await Promise.all(
      Object.entries(tasks).map<Promise<[string, any]>>(async ([key, task]) => [key, await task()]),
    )

    res.reduce((res, [key, value]) => {
      res[key] = value
      return res
    }, data as any)
  })

  return data
}
```