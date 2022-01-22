import Layout from '@/components/layout/index.vue'

export default [
    {
        path: '/demo',
        component: Layout,
        name: 'demo',
        meta: { title: 'demo' },
        redirect: '/demo/lottery',
        children: [
            {
                path: 'lottery',
                name: '抽奖',
                component: () => import('@/views/demo/lottery/Lottery.vue')
            },
            {
                path: 'calendar',
                name: '日历',
                component: () => import('@/views/demo/calendar/Calendar.vue')
            },
            {
                path: 'content',
                name: '目录',
                component: () => import('@/views/demo/content/Content.vue')
            }
        ]
    }
]
