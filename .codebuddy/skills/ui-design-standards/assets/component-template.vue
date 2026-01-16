<template>
  <div class="component-name">
    <!-- Component content goes here -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Define props
const props = defineProps({
  // prop: {
  //   type: Type,
  //   required: true/false,
  //   default: defaultValue
  // }
})

// Define emits
const emit = defineEmits(['eventName'])

// Reactive state
// const state = ref(initialValue)

// Computed properties
// const computedValue = computed(() => {
//   return props.value * 2
// })

// Methods
// function method() {
//   emit('eventName', payload)
// }
</script>

<style scoped>
.component-name {
  /* Use CSS variables for colors */
  color: var(--color-text);
  background: var(--color-background);
  border: 1px solid var(--color-border);

  /* Use consistent spacing */
  padding: 8px 12px;
  margin: 4px 0;

  /* Use defined typography */
  font-size: var(--font-size-base);
  line-height: 1.6;

  /* Add hover state */
  transition: all 0.2s ease-in-out;
}

.component-name:hover {
  border-color: var(--color-border-hover);
  cursor: pointer;
}

/* Dark mode support via CSS variables - no additional code needed */
</style>
