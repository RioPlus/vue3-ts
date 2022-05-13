<template>
  <div class="logo" @click="handleEmit">
    <img src="@/assets/element-plus-icon.svg" alt="logo"/>
    <span class="title">Vue3-ts</span>
  </div>
</template>

<script setup lang="ts">
// 项目视频中只有defineProps父传子， 以下只测试子传父，不影响程序，只供学习
interface Emits {
  (event: "taps", name: string): void;
}

const emits = defineEmits<Emits>();
const handleEmit = () => {
  emits("taps", "zs","zh");
};

</script>
<style lang="scss" scoped>
.logo{
  background-color: #2b2f3a;
  height: 50px;
  border:none;
  line-height: 50px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  color: #fff;
  img{
    width: 100px;
    // height: 230px;
    margin-right: 12px;
  }
  span{
    font-weight: 600;
    // line-height: 52px;
    font-size: 16px;
    font-family: Avenir,Helvetica Neue,Arial,Helvetica, sans-serif;
    vertical-align: middle;
  }
}
</style>