<script setup>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

defineProps({
  data: {
    type: Object,
    required: true,
    default: () => {}
  }
})
</script>

<template>
  <el-scrollbar>
    <vue-json-pretty class="custom-tree" :data="data" :showIcon="true" />
  </el-scrollbar>
</template>

<style scoped>
</style>