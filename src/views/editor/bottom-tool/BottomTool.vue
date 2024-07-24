<template>
  <div class="bottom-tool">
    <div class="flex flex-wrap gap-4 items-center cursor-pointer">
      <IconExpand @click="toogle" />
      <IconBeautify title="美化" @click="handleBeautify" />
      <NodePath :path="path" v-if="path" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { IconExpand, IconBeautify } from '@/components/icons'
import NodePath from './NodePath.vue'

defineProps({
  path: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['toogle'])

const isExpand = ref(true)

function toogle() {
  isExpand.value = !isExpand.value
  emit('toogle', isExpand.value)
}

function handleBeautify() {
  emit('handleBeautify')
}
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
