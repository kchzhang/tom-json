<script setup>
import { ref } from 'vue'
import TopTool from './top-tool'
import BottomTool from './bottom-tool'
import LiveEditor from './live-editor'
import PageSplit from 'vue3-page-split'

import 'vue3-page-split/dist/style.css'

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

const isGraph = ref(true)

function changeContent() {}
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
    >
      <template v-slot:first>
        <!-- todo 替换成 code 编辑器 -->
        <textarea
          class="c-input"
          v-model="content"
          placeholder="请输入"
          @input="changeContent"
        ></textarea>
      </template>
      <template v-slot:second>
        <LiveEditor :isGraph="isGraph" :jsonContent="content" />
      </template>
    </PageSplit>
    <!-- 底部工具栏 -->
    <BottomTool />
  </div>
</template>

<style scoped>
.c-input {
  width: 100%;
  height: 99%;
  border: 1px solid #eeeeee;
}
</style>
