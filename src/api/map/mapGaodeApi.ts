import { createAPI } from '@/api/request'

// 地理编码
export const getMapByNameApi = (data: any) => createAPI('/map/v3/geocode/geo', 'get', data)
// 逆地理编码
export const getMapByLatApi = (data: any) => createAPI('/map/v3/geocode/regeo', 'get', data)
// 关键字搜索
export const getMapPOIApi = (data: any) => createAPI('/map/v3/place/text', 'get', data)
// 步行路径规划
export const getPathWalkApi = (data: any) => createAPI('/map/v3/direction/walking', 'get', data)
// 驾车路径规划
export const getPathDrivingApi = (data: any) => createAPI('/map/v3/direction/driving', 'get', data)
