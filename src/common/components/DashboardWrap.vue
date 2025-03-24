<template>
  <div ref="containerRef" class="relative h-screen bg-#fec7d7">
    <div
      v-show="showScreen"
      class="top-50% left-50% w-1920px h-1080px absolute bg-cover"
      :style="{
        transform: `translate(-50%, -50%) scale(${zoom})`,
      }"
    >
      <div class="h-full">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

const props = defineProps<{
  title?: string
}>()
const containerRef = ref()
// 缩放比例
const zoom = ref(1)
const showScreen = ref(false)
const calcZoom = () => {
  const width = window.innerWidth
  const height = window.innerHeight
  zoom.value = Math.min(width / 1920, height / 1080)
  showScreen.value = true
}
const onResize = useDebounceFn(() => {
  calcZoom()
}, 300)

onMounted(() => {
  onResize()
  window.addEventListener('resize', onResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>

<style></style>
