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
    <vue-json-pretty class="custom-tree" :data="data" :showIcon="true" :showLineNumber="true" />
  </el-scrollbar>
</template>

<style>
.custom-tree .vjs-value-string {
  color: #0451a5;
}
.custom-tree .vjs-value-null {
  color: #afafaf;
}
.custom-tree .vjs-value-number {
  color: #098658;
}
.custom-tree .vjs-value-boolean {
  color: #098658;
}
.custom-tree .vjs-key {
  color: #a31515;
}
</style>