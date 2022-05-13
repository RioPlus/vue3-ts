<template>
  <MenuLogo class="layout-logo" v-if="!isCollapse" @taps="handleTaps(arguments,$event)" ></MenuLogo>
 <el-menu
    :default-active="ActiveMenu"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#304156"
    router
    @open="handleOpen"
    @close="handleClose"
  >
   <MenuItem :menuList="menuList"></MenuItem>
  </el-menu>
</template>

<script lang="ts" setup>
import MenuItem from './MenuItem.vue'
import MenuLogo from './MenuLogo.vue'
import {useRoute} from 'vue-router'
import { reactive, ref,computed } from 'vue'
import { useStore } from '@/store/index'

const store = useStore()
const route = useRoute()

const ActiveMenu = computed(()=> {
  return route.path
  })
// ------------------ 子传父测试 -----------------------
  const handleTaps = (param1,param2) => {
  console.log("测试得出，子组件默认传递过来的参数，对应的是$event变量")
  console.log("测试子组件传递上来的值为", param1 );
  console.log("测试子组件传递上来的值为,对应$event", param2 );

};
// ------------------ 子传父测试 end-----------------------


const isCollapse = computed(()=>store.state.collapse )


let menuList = reactive([
  {
    path: "/dashboard",
    component: "Layout",
    meta: {
      title: "首页",
      icon: "HomeFilled",
      roles: ["sys:manage"]
    },
    children: []
  },
  {
    path: "/system",
    component: "Layout",
    alwaysShow: true,
    name: "system",
    meta: {
      title: "系统管理",
      icon: "Menu",
      roles: ["sys:manage"],
      parentId: 0
    },
    children: [
      {
        path: "/department",
        component: "/system/department/department",
        alwaysShow: false,
        name: "department",
        meta: {
          title: "机构管理",
          icon: "OfficeBuilding",
          roles: ["sys:dept"],
          parentId: 17
        }
      },
      {
        path: "/userList",
        component: "/system/User/UserList",
        alwaysShow: false,
        name: "userList",
        meta: {
          title: "用户管理",
          icon: "User",
          roles: ["sys:user"],
          parentId: 17
        }
      },
      {
        path: "/roleList",
        component: "/system/Role/RoleList",
        alwaysShow: false,
        name: "roleList",
        meta: {
          title: "角色管理",
          icon: "UserFilled",
          roles: ["sys:role"],
          parentId: 17
        }
      },
      {
        path: "/menuList",
        component: "/system/Menu/MenuList",
        alwaysShow: false,
        name: "menuList",
        meta: {
          title: "权限管理",
          icon: "Lock",
          roles: ["sys:menu"],
          parentId: 17
        }
      }
    ]
  },
  {
    path: "/goods",
    component: "Layout",
    alwaysShow: true,
    name: "goods",
    meta: {
      title: "商品管理",
      icon: "Goods",
      roles: ["sys:goods"],
      parentId: 0
    },
    children: [
      {
        path: "/goodCategory",
        component: "/goods/goodsCategory/goodsCategoryList",
        alwaysShow: false,
        name: "goodCategory",
        meta: {
          title: "商品分类",
          icon: "ShoppingCart",
          roles: ["sys:goodsCategory"],
          parentId: 34
        }
      }
    ]

  }
])

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style scoped lang='scss'>
@keyframes logoAnimation {
  0% {
    transform:  scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}

.layout-logo {
  animation: logoAnimation 1s ease-in-out;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu{
  border-right: none;
}
// ::v-deep 这种方式已经不建议使用, 替换成:deep()
// ::v-deep .el-sub-menu .el-sub-menu__title {
//   color: #f4f4f5 !important;
// }
:deep(.el-sub-menu .el-sub-menu__title) {
  color: #f4f4f5 !important;
}
:deep(.el-menu .el-menu-item){
  color: #bfcbd9;
}
:deep(.el-menu-item.is-active){
  color: #409eff !important;
}
:deep(.is-opened .el-menu-item){
  background-color: #1f2d3d !important;
}
:deep(.el-menu-item:hover){
  background-color: #001528 !important;
}
</style>