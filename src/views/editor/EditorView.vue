<script setup>
import { ref } from 'vue'
import TopTool from './top-tool'
import BottomTool from './bottom-tool'
import LiveEditor from './live-editor'

// 1.isGraph 2.Tree
const viewType = ref(1)

function selectView(val) {
  viewType.value = val
}
</script>

<template>
  <div class="flex flex-col h-screen">
    <!-- 工具栏 -->
    <TopTool @selectView="selectView" :viewType="viewType" />
    <!-- 视图 -->
    <LiveEditor :viewType="viewType" />
    <!-- 底部工具栏 -->
    <BottomTool />
  </div>
</template>


