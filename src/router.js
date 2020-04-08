import Vue from 'vue'
import Router from 'vue-router';
Vue.use(Router)

const router= new Router({
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/zhsq/houseNumber',
          component: () => import('@/views/zhsq/houseNumber.vue')
      },
      {
          path: '/zhsq/populationNumber',
          component: () => import('@/views/zhsq/populationNumber.vue')
      },
      {
        path: '/zhsq/populationRentNumber',
        component: () => import('@/views/zhsq/populationRentNumber.vue')
    },
      {
          path: '/zhsq/sex',
          component: () => import('@/views/zhsq/sex.vue')
      },
      {
          path: '/zhsq/age',
          component: () => import('@/views/zhsq/age.vue')
      },
      {
          path: '/zhsq/houseManagement',
          component: () => import('@/views/zhsq/houseManagement.vue')
      },
      {
          path: '/zhsq/openDoor',
          component: () => import('@/views/zhsq/openDoor.vue')
      },
      {
          path: '/zhsq/rfId',
          component: () => import('@/views/zhsq/rfId.vue')
      },
      {
          path: '/zhsq/vehicle',
          component: () => import('@/views/zhsq/vehicle.vue')
      },
      {
          path: '/zhsq/map',
          component: () => import('@/views/zhsq/map.vue')
      },
      {
        path: '/onethree',
        name: 'onethree',
        component: () => import('@/views/helong/onethree.vue')
      },
      {
        path: '/alarmEvent',
        name: 'alarmEvent',
        component: () => import('@/views/helong/alarmEvent.vue')
      },
      {
        path: '/carPerception',
        name: 'carPerception',
        component: () => import('@/views/helong/carPerception.vue')
      },
      {
        path: '/entryExit',
        name: 'entryExit',
        component: () => import('@/views/helong/entryExit.vue')
      },
      {
        path: '/faceSnap',
        name: 'faceSnap',
        component: () => import('@/views/helong/faceSnap.vue')
      },
      {
        path: '/nonMotorPerception',
        name: 'nonMotorPerception',
        component: () => import('@/views/helong/nonMotorPerception.vue')
      },
      {
        path: '/openDoorRecord',
        name: 'openDoorRecord',
        component: () => import('@/views/helong/openDoorRecord.vue')
      },
      {
        path: '/propertyManager',
        name: 'propertyManager',
        component: () => import('@/views/helong/propertyManager.vue')
      },
      {
        path: '/carCount',
        name: 'carCount',
        component: () => import('@/views/zhsq/carCount.vue')
    },
    {
        path: '/personCount',
        name: 'personCount',
        component: () => import('@/views/zhsq/personCount.vue')
    },
    {
        path: '/intoAutoCount',
        name: 'intoAutoCount',
        component: () => import('@/views/zhsq/intoAutoCount.vue')
    },
    {
        path: '/personPlaceCount',
        name: 'personPlaceCount',
        component: () => import('@/views/zhsq/personPlaceCount.vue')
    },
    {
        path: '/tenantDistribution',
        name: 'tenantDistribution',
        component: () => import('@/views/zhsq/tenantDistribution.vue')
    },
    {
        path: '/todayTraffic',
        name: 'todayTraffic',
        component: () => import('@/views/zhsq/todayTraffic.vue')
    },
  ]
})

export default router