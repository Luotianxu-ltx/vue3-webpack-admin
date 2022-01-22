import Layout from '@/components/layout/index.vue'

export default [
    {
        path: '/system',
        component: Layout,
        name: 'system',
        meta: { title: '系统管理' },
        redirect: '/system/user',
        children: [
            {
                path: 'user',
                name: '用户管理',
                component: () => import('@/views/system/user/User.vue')
            },
            {
                path: 'menu',
                name: '菜单管理',
                component: () => import('@/views/system/menu/Menu.vue')
            }
        ]
    }
]
