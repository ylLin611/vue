import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/Home.vue'

const modules: Record<string, { default: RouteRecordRaw[] }> = import.meta.glob(
  '../../modules/**/*.routes.ts',
  {
    eager: true,
  },
)
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
]

const dynamicRoutes = Object.values(modules)
  .map((item) => item.default)
  .reduce((prev, curr) => prev.concat(curr), [])

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes.concat(dynamicRoutes),
})

export default router
