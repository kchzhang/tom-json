<template>
  <div class="node-path">
    路径: <span>{{ path }}</span>
  </div>
</template>

<script setup>
defineProps({
  path: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.node-path {
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  margin: 0;
  font-size: 12px;
  font-weight: 400;
  color: #4f5660;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
