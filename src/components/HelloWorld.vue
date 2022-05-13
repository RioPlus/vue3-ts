
<template>
  <h1>{{ msg }}</h1>
  <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
     {{'showCount '+ showCount}}
  <button type="button" @click="addBtn">count is: {{ count }}</button>
</template>

<script setup lang="ts">
import { ref,computed } from 'vue'
import { useStore} from '@/store'

const store = useStore()

console.log('store ', store)


defineProps<{ msg: string }>()

const count = ref(0)
const showCount = computed(()=>store.getters["getComCount"])

const addBtn = ()=>{
  store.commit('setComCount', ++count.value)
}
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
