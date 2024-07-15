<template>
  <div class="top-tool">顶部工具栏</div>
</template>

<script setup>
import { ref } from 'vue'
</script>


<style scoped>
.top-tool {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 4px;
  justify-content: space-between;
  height: 40px;
  padding: 4px 8px;
  background: rgb(236, 236, 236);
  color: rgb(185, 187, 190);
  z-index: 36;
  border-bottom: 1px solid rgb(204, 204, 204);
}
</style>
