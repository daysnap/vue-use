## useComposition

IME问题，即中文输入时出现在输入框上方的待候选但还未选择的状态，也会触发数据更新（其实这个在韩文日文等非字母文字中都会出现这个问题），可以使用 input 事件、compositionstart和compositionend来判断阻止这一行为。

- 示例1

```
	<p>值:{{text}}</p>
	<input
      @input="handleInput"
      @compositionstart="handleCompositionstart"
      @compositionend="handleCompositionend"
			/>

	const text = ref('')
	const { handleCompositionend, handleCompositionstart } = useComposition()
	const handleInput = (e: Event) => {
    if ((e.target as any).composing) {
      return
    }
		const target = e.target as HTMLInputElement
    text.value = target.value
  }
	const { handleCompositionend, handleCompositionstart } = useComposition()

```

<div>
	<p>值:{{text}}</p>
 	<input
      @input="handleInput"
      @compositionstart="handleCompositionstart"
      @compositionend="handleCompositionend"
			/>
</div>

<script setup>
	import { useComposition } from './index.ts'
	import { ref } from "vue"

	const text = ref('')
	const { handleCompositionend, handleCompositionstart } = useComposition()
	const handleInput = (e) => {
    if (e.target.composing) {
      return
    }
		const target = e.target
    text.value = target.value
  }	
	
</script>
