import Layout from '@/components/layout/index.vue'

export default [
    {
        path: '/system',
        component: Layout,
        name: '系统管理',
        meta: { title: '系统管理' },
        redirect: '/system/user',
        children: [
            {
                path: 'user',
                name: '用户管理',
                meta: { title: '用户管理',keepAlive: true },
                component: () => import('@/views/system/user/User.vue')
            },
            {
                path: 'menu',
                name: '菜单管理',
                meta: { title: '菜单管理',keepAlive: true },
                component: () => import('@/views/system/menu/Menu.vue')
            }
        ]
    }
]
