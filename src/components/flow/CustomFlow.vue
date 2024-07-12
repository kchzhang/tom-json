<script setup>
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'

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

// const nodes = ref([
//   {
//     id: '1',
//     type: 'input',
//     label: 'Node 1',
//     position: { x: 250, y: 200 },
//     sourcePosition: Position.Right,
//     targetPosition: Position.Left
//   },
//   {
//     id: '2',
//     label: 'Node 2',
//     position: { x: 600, y: 100 },
//     sourcePosition: Position.Right,
//     targetPosition: Position.Left
//   },
//   {
//     id: '3',
//     label: 'Node 3',
//     position: { x: 600, y: 200 },
//     sourcePosition: Position.Right,
//     targetPosition: Position.Left
//   },
//   {
//     id: '4',
//     label: 'Node 4',
//     position: { x: 600, y: 300 },
//     sourcePosition: Position.Right,
//     targetPosition: Position.Left
//   }
// ])

// const edges = ref([
//   { id: 'e1-2', source: '1', target: '2', animated: true },
//   { id: 'e1-3', source: '1', target: '3' },
//   { id: 'e1-4', source: '4', target: '1', animated: true }
// ])
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges">
    <Background />
  </VueFlow>
</template>
<style>
/* import the required styles */
@import '@vue-flow/core/dist/style.css';

/* import the default theme (optional) */
@import '@vue-flow/core/dist/theme-default.css';
</style>