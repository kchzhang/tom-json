<script setup>
import { ref, h } from 'vue'
import { CustomFlow, CustomItem } from '@/components/flow'
import TopTool from './top-tool'
import BottomTool from './bottom-tool'

import { parser, elkLayout } from '@/utils'

const nodesList = ref([])
const edgesList = ref([])

const RefCustomFlow = ref(null)

const content = ref(JSON.stringify())

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
      width: item.width,
      style: {
        'white-space': 'pre',
        backgroundColor: '#eeeeee'
      },
      hidden: false
    }
  })

  nodesList.value = nodesArr
  edgesList.value = edges
  RefCustomFlow.value.fitToView()
}

init()

function chnageContent() {
  init()
}
</script>

<template>
  <div class="flex flex-col h-screen">
    <!-- 工具栏 -->
    <TopTool />
    <!-- 视图 -->
    <div class="flex flex-row h-screen">
      <div class="basis-1/4">
        <textarea
          class="c-input"
          v-model="content"
          placeholder="请输入"
          @input="chnageContent"
        ></textarea>
      </div>
      <CustomFlow ref="RefCustomFlow" class="basis-3/4" :nodes="nodesList" :edges="edgesList" />
    </div>
    <!-- 底部工具栏 -->
    <BottomTool />
  </div>
</template>

<style scoped>
.txt-content {
  width: 400px;
}
.c-input {
  width: 100%;
  height: 100%;
  border: 1px solid #eeeeee;
}
</style>
