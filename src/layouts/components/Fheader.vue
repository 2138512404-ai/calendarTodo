<template>
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-1" :size="30">
        <Management />
      </el-icon>
      <span class="flex-1 mr-2">
        日历与待办事件
      </span>
      <el-icon class="icon-btn" @click="DoRefresh"><Refresh /></el-icon>
    </span>    
  </div>
</template>

<script setup>
const DoRefresh=()=>location.reload()
</script>

<style>
  
.f-header {
  @apply flex items-center bg-indigo-500 text-blue fixed top-0 
  left-0 right-0 text-2xl;
  z-index: 9999; 
  background: transparent !important;
  height: 64px;
}
.logo{
  @apply flex justify-center items-center
}
.icon-btn{
  @apply flex justify-center items-center
  height:64px;
  cursor: pointer;
}
</style>