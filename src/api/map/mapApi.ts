import { createAPI } from '@/api/request'

// 获取用户菜单
export const getPlayBackListApi = (data: any) => createAPI('/api/getPlayBackList', 'post', data)
