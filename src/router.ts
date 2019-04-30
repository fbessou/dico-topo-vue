import Vue from 'vue'
import VueRouter, {Location, Route, RouteConfig} from 'vue-router'
import PlacenamePage from "@/components/pages/PlacenamePage.vue"
import HomePage from "@/components/pages/HomePage.vue"
import NotFoundPage from "@/components/pages/NotFoundPage.vue"
import DocumentationPage from "@/components/pages/DocumentationPage.vue"

Vue.use(VueRouter)

export const createRoutes: () => RouteConfig[] = () => [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/placenames/:placenameId',
    component: PlacenamePage
  },
  {
    path: '/documentation',
    component: DocumentationPage
  },
  {
    path: '*',
    component: NotFoundPage
  }
]

export const createRouter = () => new VueRouter({mode: 'history', routes: createRoutes()})
