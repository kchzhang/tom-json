<script setup>
defineProps({
  itemKey: {
    type: String,
    required: true,
    default: ''
  },
  itemValue: {
    type: [null, String, Number, Boolean],
    required: true,
    default: ''
  }
})

const isString = (value) => {
  return typeof value === 'string'
}

const _itemValue = (value) => {
  return isString(value) ? `"${value}"` : String(value)
}
</script>

<template>
  <span class="custom custom-key">{{ itemKey }}</span>
  : {{ _itemValue(itemValue) }}
</template>

<style>
.custom {
  font-family: Consolas, 'Courier New', monospace;
  display: inline;
  flex: 1 1 0%;
  color: rgb(118, 28, 234);
  overflow: hidden;
  /* text-overflow: ellipsis; */
  white-space: nowrap;
}
.custom-key {
  color: #a31515;
}
</style>