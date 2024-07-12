<script setup>
import { ref } from 'vue'
import CustomFlow from '@/components/flow'

import { parser, elkLayout } from '@/utils'

const nodesList = ref([])
const edgesList = ref([])

const content = ref(JSON.stringify({}))

async function init() {
  const { nodes, edges } = parser(content.value)
  const res = await elkLayout(nodes, edges, {
    // 方向
    'elk.direction': 'RIGHT'
  })

  const nodesArr = res.children.map((item) => {
    return {
      id: item.id,
      label: item.label,
      sourcePosition: 'right',
      targetPosition: 'left',
      position: {
        x: item.x,
        y: item.y
      }
    }
  })
  nodesList.value = nodesArr
  edgesList.value = edges
}

init()

function chnageContent() {
  init()
}
</script>

<template>
  <div class="container-view">
    <div class="txt-content">
      <textarea
        class="c-input"
        v-model="content"
        placeholder="请输入"
        @input="chnageContent"
      ></textarea>
    </div>
    <CustomFlow :nodes="nodesList" :edges="edgesList" />
  </div>
</template>

<style scoped>
.container-view {
  height: 100vh;
  display: flex;
  justify-content: flex-start;
}
.txt-content {
  width: 400px;
}
.c-input {
  width: 100%;
  height: 99%;
  border: 0;
}
</style>
