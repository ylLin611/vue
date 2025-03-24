<template>
  <DashboardWrap>
    <div class="flex gap-4 px-1 py-5 h-full box-border">
      <div class="grid-container left">
        <div class="grid">
          <div v-for="element in elements" :key="`left-${element}`" class="grid-cell">
            <div
              v-if="!movedElements.includes(element)"
              class="element left-element"
              @click="moveElement(element)"
            >
              {{ element }}
            </div>
          </div>
        </div>
      </div>
      <div class="grid-container right">
        <div class="grid">
          <div v-for="element in elements" :key="`right-${element}`" class="grid-cell">
            <transition :name="`element-${element}`" appear>
              <div v-if="movedElements.includes(element)" class="element right-element">
                {{ element }}
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </DashboardWrap>
</template>

<script setup>
import DashboardWrap from '@/common/components/DashboardWrap.vue'

const elements = Array.from({ length: 54 }, (_, i) => i + 1)
const movedElements = ref([])
const moveElement = (element) => {
  if (!movedElements.value.includes(element)) {
    movedElements.value.push(element)

    // Create dynamic CSS for this specific element's transition
    const styleEl = document.createElement('style')
    const leftEl = document.querySelector(`.left .grid-cell:nth-child(${element}) .element`)
    const rightEl = document.querySelector(`.right .grid-cell:nth-child(${element})`)

    if (leftEl && rightEl) {
      const leftRect = leftEl.getBoundingClientRect()
      const rightRect = rightEl.getBoundingClientRect()

      const dx = leftRect.left - rightRect.left
      const dy = leftRect.top - rightRect.top

      styleEl.textContent = `
        .element-${element}-enter-active {
          transition: transform 0.6s cubic-bezier(0.45, 0, 0.55, 1);
        }
        .element-${element}-enter-from {
          transform: translate(${dx}px, ${dy}px);
        }
      `
      document.head.appendChild(styleEl)
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  gap: 1rem;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}

.grid-container {
  flex: 1;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  height: 100%;
}

h2 {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.grid {
  display: grid;
  height: 100%;
  grid-template-columns: repeat(9, 1fr);
  gap: 0.5rem;
}

.grid-cell {
  position: relative;
  /* aspect-ratio: 1/1; */
}

.element {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  color: white;
  font-weight: 500;
}

.left-element {
  cursor: pointer;
  transition: background-color 0.2s;
}

/* Default transition for all elements */
.element-enter-active {
  transition: all 0.5s cubic-bezier(0.45, 0, 0.55, 1); /* Ease in-out for acceleration and deceleration */
}

.element-enter-from {
  opacity: 0;
}
</style>
