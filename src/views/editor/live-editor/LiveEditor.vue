<template>
  <PageSplit
    :distribute="0.2"
    :lineThickness="2"
    :isVertical="true"
    :firstMinValue="200"
    :secondMinValue="200"
    :hasLineTip="false"
    class="page-split"
  >
    <template v-slot:first>
      <!-- todo 替换成 code 编辑器 -->
      <el-scrollbar>
        <ElInput
          v-model="content"
          class="c-input"
          @input="changeContent"
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 40 }"
        />
      </el-scrollbar>
    </template>
    <template v-slot:second>
      <CustomFlow v-if="isGraph" ref="RefCustomFlow" :nodes="nodesList" :edges="edgesList" />
      <CustomTree v-else :data="treeData" />
    </template>
  </PageSplit>
</template>

<script setup>
import { ref, h, computed } from 'vue'
import { CustomFlow, CustomItem } from '@/components/flow'
import { CustomTree } from '@/components/tree'
import PageSplit from 'vue3-page-split'
import { parser, elkLayout } from '@/utils'
import 'vue3-page-split/dist/style.css'

const props = defineProps({
  viewType: {
    type: Number,
    required: true,
    default: 1
  }
})

const RefCustomFlow = ref(null)
// 是否图形
const isGraph = computed(() => {
  return props.viewType === 1
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
  JSON.stringify({
    squadName: 'Super he111111111111',
    homeTown: 'Metro City',
    formed: null,
    secretBase: 'Super tower',
    active: false,
    members: [
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

function changeContent() {
  init()
}
init()
</script>

<style scoped>
.c-input {
  width: 100%;
  height: 99%;
  border: 1px solid #eeeeee;
}
.page-split {
  overflow: hidden;
}
</style>