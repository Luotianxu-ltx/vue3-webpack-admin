import { createAPI } from '@/api/request'

// 获取用户列表
export const getUserListApi = (data: any) => createAPI('/api/userList', 'get', data)
// 新增用户
export const addUserApi = (data: any) => createAPI('/api/addUser', 'post', data)
// 删除用户
export const deleteUserApi = (data: any) => createAPI('/api/deleteUser', 'post', data)
// 用户登录
export const loginApi = (data: any) => createAPI('/api/login', 'post', data)
// 用户注册
export const registerApi = (data: any) => createAPI('/api/register', 'post', data)
// 获取用户信息
export const getUserInfoApi = (data: any) => createAPI('/api/getUserInfo', 'post', data)
// 获取用户菜单
export const getUserPermissionsApi = (data: any) => createAPI('/api/permissions', 'post', data)
