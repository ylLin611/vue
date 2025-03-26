<template>
  <div class="w-screen h-screen flex-center">
    <div class="w-100px h-100px bg-red" ref="domRef" @click="handleClick"></div>
  </div>
</template>
<script setup>
import gsap from 'gsap'
const domRef = ref()
const handleClick = () => {
  gsap.to(domRef.value, {
    x: -200,
    duration: 2,
  })
}
</script>
