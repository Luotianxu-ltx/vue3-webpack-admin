import Layout from '@/components/layout/index.vue'

export default [
    {
        path: '/map',
        component: Layout,
        name: 'map',
        meta: { title: '地图' },
        redirect: '/map/baseMap',
        children: [
            {
                path: 'baseMap',
                component: () => import('@/views/map/Map.vue')
            },
            {
                path: 'map01',
                component: () => import('@/views/map/Map01.vue')
            },
            {
                path: 'map02',
                component: () => import('@/views/map/Map02.vue')
            },
            {
                path: 'map03',
                component: () => import('@/views/map/Map03.vue')
            },
            {
                path: 'map04',
                component: () => import('@/views/map/Map04.vue')
            },
            {
                path: 'map05',
                component: () => import('@/views/map/Map05.vue')
            },
            {
                path: 'map06',
                component: () => import('@/views/map/Map06.vue')
            },
            {
                path: 'mapPlayBack',
                component: () => import('@/views/map/mapPlayBack/MapPlayBack.vue')
            }
        ]
    }
]
