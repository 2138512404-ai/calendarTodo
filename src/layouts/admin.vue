<template>
  <div class="common-layout">
    <el-container>
        <el-header>
          <fheader/>
        </el-header>
        <el-container>
            <el-main>
              <ftag-nav/><router-view />
            </el-main>
        </el-container>
      </el-container>
    </div>
  </template>

<script setup>
import Fheader from './components/Fheader.vue';
import FtagNav from './components/FtagNav.vue';
</script>
