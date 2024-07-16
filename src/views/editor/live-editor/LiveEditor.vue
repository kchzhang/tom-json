<template>
  <CustomFlow v-if="isGraph" ref="RefCustomFlow" :nodes="nodesList" :edges="edgesList" />
  <div v-else class="live-editor">树编辑器内容{{ isGraph }}</div>
</template>

<script setup>
import { ref, h, watch, computed } from 'vue'
import { CustomFlow, CustomItem } from '@/components/flow'
import { parser, elkLayout } from '@/utils'

const props = defineProps({
  jsonContent: {
    type: String,
    required: true,
    default: ''
  },
  isType: {
    type: Number,
    required: true,
    default: 1
  }
})

const nodesList = ref([])
const edgesList = ref([])

const RefCustomFlow = ref(null)

// 是否图形
const isGraph = computed(() => {
  return props.isType === 1
})

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
