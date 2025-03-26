<template>
  <DashboardWrap>
    <div class="h-full flex p-20px flex-col gap-10px font-[shijin] bg-#fec7d7">
      <h1 class="text-center">十六班！打卡！</h1>
      <div class="flex min-h-1 flex-1 gap-20px">
        <div class="bg-#eec44c h-full rounded-50px flex-1 overflow-hidden">
          <div
            class="w-full h-full grid grid-cols-9 grid-rows-[50px_repeat(6,1fr)] gap-10px p-20px box-border"
          >
            <div class="grid-col-span-9 text-center lh-50px text-32px text-#f40">加油！加油</div>
            <div
              v-for="(item, index) in elements"
              class="flex-center flex-wrap cursor-pointer select-none"
              ref="itemRef"
              @click="handleClick(item, index)"
            >
              <div class="text-24px">{{ item.name }}</div>
              <div class="text-center">
                <img :src="item.img" alt="" class="w-60%" />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-#eec44c h-full rounded-50px flex-1 overflow-hidden">
          <div
            class="w-full h-full grid grid-cols-9 grid-rows-[50px_repeat(6,1fr)] gap-5px p-20px box-border"
            ref="containerRef"
          >
            <div class="grid-col-span-9 text-center lh-50px text-32px text-#f40">已完成</div>
            <div
              v-for="(item, index) in movedElements"
              ref="moveRef"
              class="flex-center flex-wrap cursor-pointer"
              @click="movedClick(index)"
            >
              <template v-if="item">
                <div class="text-24px">{{ item.name }}</div>
                <div class="text-center">
                  <img :src="item.img" alt="" class="w-60%" />
                </div>
              </template>
            </div>
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
import gsap from 'gsap'

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
  // '王舒苒',
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
const movedElements = ref(
  Array.from({
    length: studentList.value.length,
  }),
)

const containerRef = ref()
const itemRef = ref()
const moveRef = ref()

const handleClick = (item, index, e) => {
  const width = itemRef.value[0].clientWidth
  const containerWidth = containerRef.value.clientWidth
  gsap.to(itemRef.value[index], {
    x: containerWidth - width * (((index + 1) % 9) - 1),
    duration: 1,
    ease: 'power2.in',
    onComplete: () => {
      gsap.fromTo(
        moveRef.value[index],
        {
          x: -(width * ((index % 9) + 1)),
        },
        {
          x: 0,
          duration: 1,
          ease: 'power2.out',
        },
      )
      movedElements.value[index] = item
    },
  })
}
const movedClick = (index) => {
  const width = itemRef.value[0].clientWidth
  gsap.to(moveRef.value[index], {
    x: -(width * ((index % 9) + 1)),
    duration: 1,
    ease: 'power2.in',
    onComplete: () => {
      gsap.to(itemRef.value[index], {
        x: 0,
        duration: 1,
        ease: 'power2.out',
      })
      movedElements.value[index] = null
    },
  })
}
</script>
<style scoped>
@font-face {
  font-family: 'shijin';
  src: url('@/assets/font/nishiki-teki.ttf');
}
</style>
