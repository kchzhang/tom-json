<script setup>
import { ref } from 'vue'
import TopTool from './top-tool'
import BottomTool from './bottom-tool'
import LiveEditor from './live-editor'

// 1.isGraph 2.Tree
const viewType = ref(1)
// 是否展开左侧输入框
const isExpand = ref(true)

function selectView(val) {
  viewType.value = val
}

function toogle(val) {
  isExpand.value = val
}
</script>

<template>
  <div class="flex flex-col h-screen">
    <!-- 工具栏 -->
    <TopTool @selectView="selectView" :viewType="viewType" />
    <!-- 视图 -->
    <LiveEditor :viewType="viewType" :isExpand="isExpand" />
    <!-- 底部工具栏 -->
    <BottomTool @toogle="toogle" />
  </div>
</template>


