<script setup>
import { ref, h } from 'vue'
import { CustomFlow, CustomItem } from '@/components/flow'
import TopTool from './top-tool'
import BottomTool from './bottom-tool'
import { parser, elkLayout } from '@/utils'
import PageSplit from 'vue3-page-split'

import 'vue3-page-split/dist/style.css'

const nodesList = ref([])
const edgesList = ref([])

const RefCustomFlow = ref(null)

const content = ref(
  JSON.stringify({
    squadName: 'Super he111111111111',
    homeTown: 'Metro City',
    formed: null,
    secretBase: 'Super tower',
    active: false,
    members1112222222211: [
      {
        name: 'Molecule Man',
        age: 29,
        secretIdentity: 'Dan Jukes',
        powers: ['Radiation resistance', 'Turning tiny', 'Radiation blast']
      },
      {
        name: 'Madame Uppercut',
        age: 39,
        secretIdentity: 'Jane Wilson',
        powers: ['Million tonne punch', 'Damage resistance', 'Superhuman reflexes']
      },
      {
        name: 'Eternal Flame',
        age: 1000000,
        secretIdentity: 'Unknown',
        powers: [
          'Immortality',
          'Heat Immunity',
          'Inferno',
          'Teleportation',
          'Interdimensional travel'
        ]
      }
    ]
  })
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
      width: item.width,
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

init()

function chnageContent() {
  init()
}

function onresizeLineStartMove() {}
function onResizeLineMove() {}
function onresizeLineEndMove() {}
</script>

<template>
  <div class="flex flex-col h-screen">
    <!-- 工具栏 -->
    <TopTool />
    <!-- 视图 -->
    <PageSplit
      :distribute="0.2"
      :lineThickness="4"
      :isVertical="true"
      :firstMinValue="200"
      :secondMinValue="200"
      :hasLineTip="false"
      @resizeLineStartMove="onresizeLineStartMove"
      @resizeLineMove="onResizeLineMove"
      @resizeLineEndMove="onresizeLineEndMove"
    >
      <template v-slot:first>
        <textarea
          class="c-input"
          v-model="content"
          placeholder="请输入"
          @input="chnageContent"
        ></textarea>
      </template>
      <template v-slot:second>
        <CustomFlow ref="RefCustomFlow" class="basis-3/4" :nodes="nodesList" :edges="edgesList" />
      </template>
    </PageSplit>
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
  height: 99%;
  border: 1px solid #eeeeee;
}

.splitpanes__pane {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Helvetica, Arial, sans-serif;
  color: rgba(255, 255, 255, 0.6);
  font-size: 5em;
}
</style>
