<script setup>
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { useVueFlow } from '@vue-flow/core'
import { ref } from 'vue'
const { nodesDraggable } = useVueFlow()
const RefVueFlow = ref(null)

// 禁用 node 拖拽
nodesDraggable.value = false

function fitToView() {
  // RefVueFlow.value.fitToView()
}

defineProps({
  nodes: {
    type: Array,
    required: true
  },
  edges: {
    type: Array,
    required: true
  }
})

defineExpose({
  fitToView
})
</script>

<template>
  <VueFlow
    ref="RefVueFlow"
    :nodes="nodes"
    :edges="edges"
    :default-viewport="{ zoom: 1.5 }"
    :min-zoom="0.2"
    :max-zoom="4"
  >
    <Background />
  </VueFlow>
</template>
<style>
/* import the required styles */
@import '@vue-flow/core/dist/style.css';

/* import the default theme (optional) */
@import '@vue-flow/core/dist/theme-default.css';
</style>