<script setup>
import { watch } from 'vue'

const props = defineProps(['isOpen'])
const emit = defineEmits(['close'])
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
});

</script>

<template>
    <Transition name="modal-outer">
      <div
        v-show="isOpen"
        class="absolute w-full bg-black bg-opacity-30 top-0 left-0 flex justify-center px-8 h-screen"
      >
        <Transition name="modal-inner">
          <div v-if="isOpen" class="p-4 bg-white self-start mt-32 max-w-screen modal-inner">
            <slot></slot>
            <button
              @click="emit('close')"
              class="bg-weather-primary text-white px-4 py-2 rounded-md mt-8"
            >
              Close
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
</template>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
.body-overflow-hidden {
  overflow: hidden;
}
</style>
