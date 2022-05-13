<template>
 <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in tabs"  v-bind="setToAttr(item)" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang='ts'>
import { ref, reactive, Ref, watch, computed } from 'vue'
import { RouteLocationMatched, useRoute} from 'vue-router'
const tabs:Ref<RouteLocationMatched[]> = ref([])
const route = useRoute()

const getBreadCrumb = ()=>{
    // 有meta和meta.title信息的过滤出来
    let matchs = route.matched.filter(item=> item.meta && item.meta.title)
    console.log('matchs ', matchs)
    const first = matchs[0]
    // 第一个不是首页，构造一个
    if(first.path!=='/dashboard') {
        matchs = [{path: '/dashboard', meta: {title: '首页'}} as any].concat(matchs)
    }
    tabs.value = matchs

}
getBreadCrumb()

// 动态设置面包屑链接，不能展示出页面的，不设置to属性, 此处是自己优化的
const setToAttr = (item: any) =>{
    if(item.children?.length) return {}
    return {
        test: '1241',
        to: {
            path: item.path
        } 
    }

}

// 路由变化，重新加载
watch(()=>route.path, ()=>{
getBreadCrumb()

})
</script>

<style scoped lang='scss'>
</style>