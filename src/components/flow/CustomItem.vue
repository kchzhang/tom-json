<script setup>
import { ref, computed } from 'vue'
import CustomKey from './CustomKey.vue'
import IconShow from './IconShow.vue'
import IconHidden from './IconHidden.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
})

const hidden = ref(false)

function isString(val) {
  return typeof val === 'string'
}
function isNumber(val) {
  return typeof val === 'number'
}
function isTBoolean(val) {
  return typeof val === 'boolean' && val === true
}
function isFBoolean(val) {
  return typeof val === 'boolean' && val === false
}
function isNull(val) {
  return val === null
}
function isArray(val) {
  return val === 'array'
}
function isObject(val) {
  return val === 'object'
}

const dataTypeClass = computed(() => {
  return (value) => {
    return {
      'is-item': true,
      'is-null': isNull(value),
      'is-string': isString(value),
      'is-number': isNumber(value),
      'is-boolean-t': isTBoolean(value),
      'is-boolean-f': isFBoolean(value)
    }
  }
})

const dataTypeArrClass = computed(() => {
  const node = props.data
  return {
    'is-base': true,
    'is-arr': isArray(node.data.type),
    'is-object': isObject(node.data.type)
  }
})

function cleanText(text) {
  if (!text) return text
  // 去掉 [] 和 {} 标识符
  return text.replace(/\[\]$/, '').replace(/\{\}$/, '')
}

const isShowOpenIcon = computed(() => {
  return (item) => {
    return isArray(item.data.type) && !hidden.value
  }
})

const isShowCloseIcon = computed(() => {
  return (item) => {
    return isArray(item.data.type) && hidden.value
  }
})

function toggle() {
  handleUpdate()
}

function handleUpdate() {
  hidden.value = !hidden.value
}
</script>


<template>
  <template v-if="isString(data.text)">
    <div :class="dataTypeArrClass" :title="cleanText(data.text)">{{ data.text }}</div>
    <IconShow v-if="isShowOpenIcon(data)" class="icon-show" @click="toggle(true)" />
    <IconHidden v-if="isShowCloseIcon(data)" class="icon-show" @click="toggle(false)" />
  </template>
  <template v-else>
    <span :class="dataTypeClass(item[1])" v-for="(item, index) in data.text" :key="index" :title="`${item[0]}: ${item[1]}`">
      <CustomKey :itemKey="item[0]" :itemValue="item[1]" />
    </span>
  </template>
</template>

<style>
.is-item {
  padding: 0px 10px;
  color: rgb(83, 83, 83);
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}
.is-null {
  color: #afafaf;
}
.is-string {
  color: #0451a5;
}
.is-number {
  color: #098658;
}
.is-boolean-t {
  color: #098658;
}
.is-boolean-f {
  color: #ff0000;
}
.is-base {
  display: block;
  flex: 1 1 0%;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.is-arr {
  color: #ff6b00;
  padding-right: 24px;
  font-size: 14px;
  font-weight: 600;
  border: 2px solid #ff6b0033;
  border-radius: 6px;
  background-color: #ff6b0011;
  padding: 8px 12px;
  margin: 4px 0;
}
.is-object {
  color: #761cea;
  font-weight: 600;
  border: 2px solid #761cea33;
  border-radius: 6px;
  background-color: #761cea11;
  padding: 8px 12px;
  margin: 4px 0;
}
.icon-show {
  position: absolute;
  right: 10px;
  top: 12px;
  color: #2e3338;
}
</style>