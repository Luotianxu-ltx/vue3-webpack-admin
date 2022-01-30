import Mock from 'mockjs'
import { getQuery } from '@/mock/utils'

const { newsList } = Mock.mock({
    'newsList|100': [
        {
            'id': '@increment()',
            'name': '@cname',
            'sex|0-1': 1,
            'age': '@integer(15,80)',
            'type|0-2': 1,
            'phone': '@phone',
            'email': '@email',
            'city': '@county(true)',
            'status|0-1': 1,
            'img': '@img("100*100","#FF83FA","#FCFCFC","png","坤坤")',
            'add_time': '@date(yyyy-MM-dd)',
            'edit_time': '@date(yyyy-MM-dd)'
        }
    ]
})

// 查询用户
Mock.mock(/\/testApi\/api\/userList/, 'get', (options: { url: string }) => {
    const pageIndex = Number(getQuery(options.url, 'pageIndex'))
    const pageSize = Number(getQuery(options.url, 'pageSize'))
    const start = (pageIndex - 1) * pageSize
    const end = pageIndex * pageSize
    const totalPage = Math.ceil(newsList.length / pageSize)
    const list = pageIndex > totalPage ? [] : newsList.slice(start, end)
    return {
        status: 200,
        message: '获取列表成功！',
        data: {
            list: list,
            total: newsList.length
        }
    }
})

// 新增用户
Mock.mock('/testApi/api/addUser', 'post', (options: { body: string }) => {
    const body = JSON.parse(options.body)
    newsList.push(
        Mock.mock({
            'id': '@increment()',
            'name': body.name,
            'sex|0-1': 1,
            'age': '@integer(15,80)',
            'phone': '@phone',
            'email': '@email',
            'city': '@county(true)',
            'status|0-1': 1,
            'img': '@img("100*100","#FF83FA","#FCFCFC","png","坤坤")',
            'add_time': '@date(yyyy-MM-dd)',
            'edit_time': '@date(yyyy-MM-dd)'
        })
    )
    return {
        status: 200,
        message: '添加成功！'
    }
})

// 删除用户
Mock.mock('/testApi/api/deleteUser', 'post', (options: { body: string }) => {
    const body = JSON.parse(options.body)
    const index = newsList.findIndex((item: { id: number }) => item.id === body.id)
    newsList.splice(index, 1)
    return {
        status: 200,
        message: '删除成功！'
    }
})

// 用户登录
Mock.mock('/testApi/api/login', 'post', (options: { body: string }) => {
    const body = JSON.parse(options.body)
    if (body.username === 'admin') {
        return {
            status: 200,
            message: '登录成功！',
            data: {
                id: 0
            }
        }
    }
    return {
        status: 500,
        message: '用户名错误！'
    }
})

// 用户注册
Mock.mock('/testApi/api/register', 'post', () => {
    return {
        status: 200,
        message: '注册成功！'
    }
})

const userInfo = Mock.mock({
    'id': '@increment()',
    'name': 'admin',
    'sex|0-1': 1,
    'age': '@integer(15,80)',
    'type|0-2': 1,
    'phone': '@phone',
    'email': '@email',
    'city': '@county(true)',
    'status|0-1': 1,
    'img': 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    'add_time': '@date(yyyy-MM-dd)',
    'edit_time': '@date(yyyy-MM-dd)'
})
// 获取用户信息
Mock.mock('/testApi/api/getUserInfo', 'post', () => {
    return {
        status: 200,
        message: '获取用户信息成功！',
        data: {
            userInfo
        }
    }
})

const permissionsList = [
    {
        id: 1,
        name: '地图',
        icon: 'ditu',
        url: '/map',
        children: [
            {
                id: 2,
                name: '地图工具箱',
                icon: 'gongju',
                url: '/map/baseMap'
            },
            {
                id: 3,
                name: '地图探查',
                icon: 'chakan1',
                url: '/map/map01'
            },
            {
                id: 99,
                name: '地图卷帘',
                icon: 'chakan1',
                url: '/map/map03'
            },
            {
                id: 4,
                name: '地图定位',
                icon: 'dingxiang',
                url: '/map/map02'
            },
            {
                id: 5,
                name: '绘制图形',
                icon: 'dingxiang',
                url: '/map/map05'
            },
            {
                id: 6,
                name: '基本图形',
                icon: 'tuxingtuxiangchuli',
                url: '/map/map04'
            },
            {
                id: 8,
                name: '聚合标注',
                icon: 'combine',
                url: '/map/map06'
            },
            {
                id: 15,
                name: '轨迹回放',
                icon: 'locus',
                url: '/map/mapPlayBack'
            }
        ]
    },
    {
        id: 10,
        name: '系统管理',
        icon: 'setting',
        url: '/system',
        children: [
            {
                id: 11,
                name: '用户管理',
                icon: 'yonghu',
                url: '/system/user'
            },
            {
                id: 16,
                name: '菜单管理',
                icon: 'caidan1',
                url: '/system/menu'
            }
        ]
    },
    {
        id: 12,
        name: 'demo',
        icon: 'dangedemoban',
        url: '/demo',
        children: [
            {
                id: 13,
                name: '抽奖',
                icon: 'choujiang',
                url: '/demo/lottery'
            },
            {
                id: 14,
                name: '日历',
                icon: 'rili',
                url: '/demo/calendar'
            },
            {
                id: 18,
                name: '目录特效',
                icon: 'rili',
                url: '/demo/content'
            },
            {
                id: 19,
                name: '卡片1',
                icon: 'rili',
                url: '/demo/card1'
            },
            {
                id: 20,
                name: '卡片2',
                icon: 'rili',
                url: '/demo/card2'
            },
            {
                id: 21,
                name: '卡片3',
                icon: 'rili',
                url: '/demo/card3'
            },
            {
                id: 22,
                name: '按钮1',
                icon: 'rili',
                url: '/demo/button1'
            },
            {
                id: 23,
                name: '按钮2',
                icon: 'rili',
                url: '/demo/button2'
            },
            {
                id: 24,
                name: 'Loading1',
                icon: 'rili',
                url: '/demo/loading1'
            }
        ]
    }
]
// 获取用户菜单
Mock.mock('/testApi/api/pageList', 'post', () => {
    return {
        status: 200,
        message: '获取菜单成功！',
        data: {
            list: permissionsList,
            total: permissionsList.length
        }
    }
})
// 获取用户权限
Mock.mock('/testApi/api/permissions', 'post', () => {
    return {
        status: 200,
        message: '获取用户权限成功！',
        data: {
            list: permissionsList,
            total: permissionsList.length
        }
    }
})
