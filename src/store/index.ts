// store.ts
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { ITabe } from "./type/index";
// 为 store state 声明类型
export interface State {
  comCount: number;
  collapse: boolean;
  tabs: Array<ITabe>;
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    comCount: 0,
    collapse: false,
    tabs: [],
  },
  mutations: {
    setComCount(state: State, count: number) {
      console.log("store count ", count);
      state.comCount = count;
    },
    setCollapse(state: State, collapse: boolean) {
      state.collapse = collapse;
    },
    addTab(state: State, tab: ITabe) {
      if (state.tabs.some((item) => item.path === tab.path)) return;
      state.tabs.push(tab);
    },
    setTabs(state: State, tab: ITabe[]) {
     state.tabs = tab
    },
  },
  getters: {
    getComCount(state: State) {
      return state.comCount;
    },
  },
});

export function useStore() {
  return baseUseStore(key);
}
