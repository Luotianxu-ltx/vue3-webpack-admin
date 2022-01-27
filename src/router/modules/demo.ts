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
            },
            {
                path: 'card1',
                name: '资料卡片',
                component: () => import('@/views/demo/card/Card1.vue')
            },
            {
                path: 'card2',
                name: '卡片',
                component: () => import('@/views/demo/card/Card2.vue')
            },
            {
                path: 'button1',
                name: '按钮',
                component: () => import('@/views/demo/button/Button1.vue')
            }
        ]
    }
]
