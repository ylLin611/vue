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
              <img :src="element.img" alt="" class="h-40px" />
            </div>
          </div>
        </div>
      </div>
      <div class="grid-container right">
        <div class="grid">
          <div v-for="element in elements" :key="`right-${element}`" class="grid-cell">
            <transition :name="`element-${element}`" appear>
              <div v-if="movedElements.includes(element)" class="element right-element">
                <img :src="element.img" alt="" class="h-40px" />
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </DashboardWrap>
</template>

<script setup>
import img1 from '@/assets/image/1.gif'
import img2 from '@/assets/image/2.gif'
import img3 from '@/assets/image/3.gif'
import img4 from '@/assets/image/4.gif'
import img5 from '@/assets/image/5.gif'
import img6 from '@/assets/image/6.gif'
import img7 from '@/assets/image/7.gif'
import img8 from '@/assets/image/8.gif'
import img9 from '@/assets/image/9.gif'
import img10 from '@/assets/image/10.gif'
import img11 from '@/assets/image/11.gif'
import img12 from '@/assets/image/12.gif'
import img13 from '@/assets/image/13.gif'
import img14 from '@/assets/image/14.gif'
import DashboardWrap from '../components/DashboardWrap.vue'

const imgList = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
]

const studentList = ref([
  '王隽为',
  '代义睿',
  '邹铭哲',
  '孟维旭',
  '高畅璟',
  '王缘轲',
  '王楚凡',
  '李源鑫',
  '郭修逸',
  '赵宸锐',
  '张震远',
  '王睿霖',
  '吴少伯',
  '左茗予',
  '孙煜杭',
  '王鸣谦',
  '韩秉燊',
  '付泽',
  '王以霖',
  '吴梓锐',
  '王梓旭',
  '康珞白',
  '祝禾川',
  '王浩林',
  '王桾博',
  '王梓尧',
  '李治皡',
  '赵昱淳',
  '卞艺颖',
  '张露伊',
  '许瀛月',
  '王舒苒',
  '李奕彤',
  '冯昱桐',
  '李迦淇',
  '沈梦涵',
  '黄姝涵',
  '吴梓汐',
  '张妙涵',
  '孙晨淇',
  '赵姝涵',
  '韩星晨',
  '林咏琪',
  '孙奕桐',
  '刘奕涵',
  '王睿涵',
  '鄢嘉辰',
  '山岚一',
  '戴欣睿',
  '何沐锡',
  '张明一',
  '王梓寓',
  '姚懿格',
  '叶禹彤',
  '杨伊涵',
])

const elements = computed(() => {
  return studentList.value.map((student) => {
    return {
      name: student,
      img: imgList[Math.floor(Math.random() * 14)],
    }
  })
})
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
          transition: transform 2.6s cubic-bezier(0.45, 0, 0.55, 1);
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
