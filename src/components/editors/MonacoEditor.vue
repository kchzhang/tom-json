<script setup>
import { ref, onMounted } from 'vue'
import * as monaco from 'monaco-editor'

const container = ref(null)
onMounted(() => {
  monaco.editor.create(container.value, {
    value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
    language: 'sql'
  })

  self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
      if (label === 'json') {
        return './json.worker.bundle.js'
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return './css.worker.bundle.js'
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return './html.worker.bundle.js'
      }
      if (label === 'typescript' || label === 'javascript') {
        return './ts.worker.bundle.js'
      }
      return './editor.worker.bundle.js'
    }
  }
})
</script>

<template>
  <div ref="container" style="height: 500px"></div>
</template>