
declare module 'vue/types/vue' {

  import { VueRouter } from 'vue-router/types/router'

  interface Vue {
    $router: VueRouter
  }
}

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue

}
