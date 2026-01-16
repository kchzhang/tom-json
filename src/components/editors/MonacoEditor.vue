<script setup>
import { ref, onMounted, watch, computed, defineProps, defineEmits, onBeforeUnmount } from 'vue'
import * as monaco from 'monaco-editor'
import loader from '@monaco-editor/loader'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'json'
  },
  height: {
    type: String,
    default: '100%'
  }
})

// Monaco Editor 可能不支持 properties 和 yaml 语言，将其映射到 plaintext
const mappedLanguage = computed(() => {
  if (props.language === 'properties' || props.language === 'yaml') {
    return 'plaintext'
  }
  return props.language
})

const emit = defineEmits(['update:modelValue', 'change'])

const container = ref(null)
let editor = null
let monacoInstance = null

onMounted(async () => {
  try {
    monacoInstance = await loader.init()
    editor = monacoInstance.editor.create(container.value, {
      value: props.modelValue,
      language: mappedLanguage.value,
      theme: 'vs',
      minimap: { enabled: false },
      automaticLayout: true,
      fontSize: 14,
      lineNumbers: 'on',
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      formatOnPaste: true,
      formatOnType: true
    })

    editor.onDidChangeModelContent(() => {
      const value = editor.getValue()
      emit('update:modelValue', value)
      emit('change', value)
    })
  } catch (error) {
    console.error('Monaco Editor 加载失败:', error)
  }
})

watch(() => props.modelValue, (newValue) => {
  if (editor && newValue !== editor.getValue()) {
    editor.setValue(newValue)
  }
})

onBeforeUnmount(() => {
  if (editor) {
    editor.dispose()
  }
})

function format() {
  if (editor) {
    editor.getAction('editor.action.formatDocument').run()
  }
}

defineExpose({
  format
})
</script>

<template>
  <div ref="container" :style="{ height }"></div>
</template>