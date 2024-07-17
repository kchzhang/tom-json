<template>
  <div class="top-tool">
    <div class="flex flex-wrap gap-4 items-center">
      <h1>TOM JSON</h1>
      <el-select
        v-model="viewType"
        placeholder="Graph"
        size="small"
        style="width: 80px"
        @change="handleChange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  viewType: {
    type: Number,
    required: true,
    default: 1
  }
})

const viewType = ref(props.viewType)

const emit = defineEmits(['selectView'])

function handleChange() {
  emit('selectView', viewType.value)
}

const options = [
  {
    value: 1,
    label: 'Graph'
  },
  {
    value: 2,
    label: 'Tree'
  }
]
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
  color: rgb(5, 39, 90);
  z-index: 36;
  border-bottom: 1px solid rgb(204, 204, 204);
}
</style>
