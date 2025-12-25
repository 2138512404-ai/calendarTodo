<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">日历</el-breadcrumb-item>
        <el-breadcrumb-item 
      v-if="route?.path === '/event'" 
      :to="{ path: '/event' }"
    >
      待办事件
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

