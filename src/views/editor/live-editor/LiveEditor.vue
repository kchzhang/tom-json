<template>
  <CustomFlow v-if="isGraph" ref="RefCustomFlow" :nodes="nodesList" :edges="edgesList" />
  <div v-else class="live-editor">树编辑器内容{{ isGraph }}</div>
</template>

<script setup>
import { ref, h, watch } from 'vue'
import { CustomFlow, CustomItem } from '@/components/flow'
import { parser, elkLayout } from '@/utils'

const props = defineProps({
  jsonContent: {
    type: String,
    required: true,
    default: ''
  },
  isGraph: { type: Boolean, required: true, default: true }
})

const nodesList = ref([])
const edgesList = ref([])

const RefCustomFlow = ref(null)

watch(
  () => props.jsonContent,
  () => {
    init()
  },
  { deep: true, immediate: true }
)

async function init() {
  const { nodes, edges } = parser(props.jsonContent)
  const res = await elkLayout(nodes, edges, {
    // 方向
    'elk.direction': 'RIGHT'
  })

  const nodesArr = res.children.map((item) => {
    return {
      id: item.id,
      label: h(CustomItem, { id: item.id, data: item }),
      sourcePosition: 'right',
      targetPosition: 'left',
      position: {
        x: item.x,
        y: item.y
      },
      width: item.width > 200 ? item.width : 200,
      style: {
        'white-space': 'pre',
        backgroundColor: '#f6f8fa'
      },
      hidden: false
    }
  })

  nodesList.value = nodesArr
  edgesList.value = edges
  RefCustomFlow.value && RefCustomFlow.value.fitToView()
}
</script>
