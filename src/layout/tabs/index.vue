<template>
  <el-tabs
    v-model="activeTab"
    type="card"
    closable
    class="demo-tabs"
    @tab-click="clickTab"
    @tab-remove="removeTab"
  >
    <el-tab-pane
      v-for="item in tabList"
      :key="item.path"
      :label="item.title"
      :name="item.path"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang='ts'>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import {useStore} from '@/store/index'
import {useRoute, useRouter} from 'vue-router'
import { ITabe} from '@/store/type'

const store = useStore()
const route = useRoute()
const router = useRouter()

const activeTab = ref('')
const tabList = computed(()=>store.state.tabs)
console.log('tabList ', tabList)

const setActiveTab =()=>{
  activeTab.value = route.path
}

const clickTab = (tab)=>{
 console.log('tab ', tab)
 const {name} = tab.props
 router.push({
   path: name
 })
}

const beforeRefresh = ()=>{
  window.addEventListener('beforeunload',()=>{
    sessionStorage.setItem('tabView', JSON.stringify(tabList.value))
  })

  let tabSession = sessionStorage.getItem('tabView')
  console.log('tabSession ', tabSession)
  if(tabSession) {
    let oldTabs = JSON.parse(tabSession)
    if(oldTabs?.length) {
      store.commit('setTabs',oldTabs)
    }
  }
}

onMounted(()=>{
  beforeRefresh()
  setActiveTab()
  addTab()
})

const addTab = ()=>{
    const {path, meta} = route
    const tab: ITabe = {
        path,
        title: <string> meta.title
    }
    store.commit('addTab',tab)
}

const removeTab = (targetName: string) => {
  if(targetName==='/dashboard') return
  const tabs =  JSON.parse(JSON.stringify(tabList.value))
  let activeName = activeTab.value
  if (activeName === targetName) {
    tabs.forEach((tab: ITabe, index) => {
      if (tab.path === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.path
        }
      }
    })
  }
  activeTab.value = activeName
  store.commit('setTabs',tabs.filter((tab:ITabe) => tab.path !== targetName))
 
  router.push({
    path: activeName
  })
}

// 路由改变，修复聚焦，以及是否添加路由
watch(()=>route.path, ()=>{
  console.log("jinru切换路由")
    setActiveTab()
    addTab()
})

// const 
</script>
<style scoped lang='scss'>
.el-tabs {
  padding-top: 10px
}

:deep(.el-tabs__item)  {
  height: 32px;
  line-height: 32px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>