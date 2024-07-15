<template>
  <div class="bottom-tool">底部工具栏</div>
</template>

<script setup>
import { ref } from 'vue'
</script>


<style scoped>
.bottom-tool {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(106, 116, 128, 0.24);
  background: rgb(236, 236, 236);
  max-height: 27px;
  height: 27px;
  z-index: 35;
  padding-right: 6px;
}
</style>
