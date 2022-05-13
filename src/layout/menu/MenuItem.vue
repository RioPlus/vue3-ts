<template>
  <template v-for="menu in menuList" :key="menu.path">
    <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path">
      <template #title>
        <!-- <i :class="menu.meta.icon"></i> -->
       <!-- <el-icon><location /></el-icon> -->
       <!-- 动态组件的使用方式 -->
       <!-- <component :is="menu.meta.icon" class="icons"></component> -->
       <!-- 动态组件的使用方式 2 -->
       <Icon :icon="menu.meta.icon" class="icons"></Icon>
        <span>{{menu.meta.title}}</span>
      </template>
      <menu-item :menuList="menu.children"></menu-item>
    </el-sub-menu>

     <el-menu-item v-else style="color:#f4f4f5" :index="menu.path">
        <!-- <i :class="menu.meta.icon"></i> -->
        <!-- <el-icon><location /></el-icon> -->
          <!-- 动态组件的使用方式 -->
          <component :is="menu.meta.icon"  class="icons"></component>
        <template #title>{{menu.meta.title}}</template>
      </el-menu-item>

    
</template>

</template>

<script setup lang='ts'>

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

defineProps(["menuList"])
</script>
<style scoped lang='scss'>
.icons{
  width: 24px;
  height: 18px;
  // margin-right: 5px
}
</style>