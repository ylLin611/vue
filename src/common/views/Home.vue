<template>
  <div class="p-16px">
    <div class="py-16px">当前学生列表</div>

    <div class="grid grid-cols-6 gap-16px text-center">
      <div
        v-for="(item, index) in studentList"
        ref="studentListRef"
        class="p-8px bg-amber b b-dashed cursor-pointer font-bold"
        @click="handleClick(index)"
      >
        {{ item }}
      </div>
    </div>
  </div>
  <div class="p-16px">
    <el-upload
      drag
      ref="upload"
      :limit="1"
      action="#"
      :auto-upload="false"
      @exceed="handleExceed"
      @change="handleFileChange"
      @remove="handleRemove"
      accept=".xlsx,.xls"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖动文件到这或者<em>点击上传</em>文件</div>
      <template #tip>
        <!-- 斜字  -->
        <i>读取excel第一列，且第一行默认为标题行，不读取。</i>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { genFileId, type UploadFile, type UploadInstance, type UploadRawFile } from 'element-plus'
import * as XLSX from 'xlsx'
import gsap from 'gsap'

const studentList = ref<string[]>([
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

const upload = ref<UploadInstance>()
const handleExceed = (files: any[]) => {
  upload.value!.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
const handleFileChange = (file: UploadFile) => {
  const reader = new FileReader()
  if (!file.raw) return
  reader.readAsArrayBuffer(file.raw)
  reader.onload = (e: any) => {
    const data = e.target.result
    const workbook = XLSX.read(data, { type: 'binary' })
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const firstColumn = XLSX.utils.sheet_to_json(sheet, { header: 1 })
    studentList.value = firstColumn.flat().slice(1) as string[]
  }
}
const handleRemove = () => {
  studentList.value = []
}

const studentListRef = ref()
const handleClick = (index: number) => {
  gsap.to(studentListRef.value[index], {
    y: 20,
    opacity: 0,
  })
}
</script>
