import { createAPI } from '@/api/request'

// 万年历
export const getDateInfoApi = (data: { pageIndex: number; pageSize: number }) => createAPI('/jhApi/calendar/day', 'get', data)
// 历史上的今天
export const getHistoryApi = (data: { pageIndex: number; pageSize: number }) => createAPI('/jhApi/todayOnhistory/queryEvent.php', 'get', data)
