<template>
  <el-icon class="collapse-icon" @click="changeCollapse">
      <component :is="status?'Expand':'Fold'"></component>
  </el-icon>
</template>

<script setup lang='ts'>
import {Expand, Fold} from '@element-plus/icons-vue'
import { ref, reactive, computed } from 'vue'
import { useStore } from '@/store/index'

const store = useStore()
const status = computed(()=>store.state.collapse )
const changeCollapse=()=>{
    store.commit('setCollapse', !status.value)
}
</script>
<style scoped lang='scss'>
.collapse-icon {
    font-size: 24px;
    color: #303133;
    cursor: point;
    margin-right: 15px;
}
</style>