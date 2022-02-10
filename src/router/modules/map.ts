import Layout from '@/components/layout/index.vue'

export default [
    {
        path: '/map',
        component: Layout,
        name: '地图',
        meta: { title: '地图' },
        redirect: '/map/baseMap',
        children: [
            {
                path: 'baseMap',
                name: '基本地图',
                component: () => import('@/views/map/Map.vue')
            },
            {
                path: 'map01',
                name: '地图探查',
                component: () => import('@/views/map/Map01.vue')
            },
            {
                path: 'map02',
                name: '地图定位',
                component: () => import('@/views/map/Map02.vue')
            },
            {
                path: 'map03',
                name: '地图卷帘',
                component: () => import('@/views/map/Map03.vue')
            },
            {
                path: 'map04',
                name: '基本图形',
                component: () => import('@/views/map/Map04.vue')
            },
            {
                path: 'map05',
                name: '绘制图形',
                component: () => import('@/views/map/Map05.vue')
            },
            {
                path: 'map06',
                name: '聚合标注',
                component: () => import('@/views/map/Map06.vue')
            },
            {
                path: 'mapPlayBack',
                name: '轨迹回放',
                component: () => import('@/views/map/mapPlayBack/MapPlayBack.vue')
            }
        ]
    }
]
