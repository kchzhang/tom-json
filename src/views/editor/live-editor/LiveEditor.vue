<template>
  <PageSplit
    :distribute="distribute"
    :lineThickness="2"
    :isVertical="true"
    :firstMinValue="firstMinValue"
    :secondMinValue="200"
    :hasLineTip="false"
    class="page-split"
  >
    <template v-slot:first v-if="isExpand">
      <MonacoEditor
        ref="RefMonacoEditor"
        v-model="content"
        language="json"
        :height="editorHeight"
        @change="changeContent"
      />
    </template>
    <template v-slot:second>
      <CustomFlow v-if="isGraph" ref="RefCustomFlow" :nodes="nodesList" :edges="edgesList" />
      <CustomTree v-else :data="treeData" @nodeClick="nodeClick" />
    </template>
  </PageSplit>
</template>

<script setup>
import { ref, h, computed } from 'vue'
import { CustomFlow, CustomItem } from '@/components/flow'
import { CustomTree } from '@/components/tree'
import PageSplit from 'vue3-page-split'
import { parser, elkLayout } from '@/utils'
import MonacoEditor from '@/components/editors/MonacoEditor.vue'
import 'vue3-page-split/dist/style.css'

const emit = defineEmits(['nodeClick'])

defineExpose({
  handleBeautify
})

const props = defineProps({
  viewType: {
    type: Number,
    required: true,
    default: 1
  },
  isExpand: {
    type: Boolean,
    required: true,
    default: true
  }
})

const RefCustomFlow = ref(null)
const RefMonacoEditor = ref(null)
// 是否图形
const isGraph = computed(() => {
  return props.viewType === 1
})

const distribute = computed(() => {
  return props.isExpand ? 0.2 : 0
})

const firstMinValue = computed(() => {
  return props.isExpand ? 200 : 0
})

const editorHeight = computed(() => {
  return props.isExpand ? 'calc(100vh - 65px)' : '0'
})

const treeData = computed(() => {
  let json = {}
  try {
    json = JSON.parse(content.value)
  } catch (error) {
    console.log(error)
  }
  return json
})

const nodesList = ref([])
const edgesList = ref([])
const content = ref(
  JSON.stringify(
    {
      name: 'TOM JSON',
      age: 1,
      friend: 'Jerry',
      like: ['apple', 'banana', 'orange'],
      isMarried: false
    },
    null,
    2
  )
)

async function init() {
  const { nodes, edges } = parser(content.value)
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
      width: item.width > 150 ? item.width : 150,
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

function changeContent() {
  init()
}

function nodeClick(node) {
  emit('nodeClick', node)
}

function handleBeautify() {
  content.value = JSON.stringify(JSON.parse(content.value), null, 4)
  // 调用 Monaco Editor 的格式化功能
  if (RefMonacoEditor.value) {
    RefMonacoEditor.value.format()
  }
}

init()
</script>

<style>
.page-split {
  overflow: hidden;
}
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar:horizontal {
  height: 6px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #0003;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
}

::-webkit-scrollbar-thumb:hover {
  cursor: pointer;
  background-color: #0000004d;
}
</style>