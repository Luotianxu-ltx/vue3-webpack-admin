const TOKEN_TIME = 'tokenTime'
const TOKEN_TIME_VALUE = 2 * 60 * 60 * 1000

// 登录时设置时间
export const setTokenTime = () => {
    return localStorage.setItem(TOKEN_TIME, Date.now().toString())
}

// 获取
export const getTokenTime = () => {
    return localStorage.getItem(TOKEN_TIME)
}

// 是否过期
export const diffTokenTime = () => {
    const currentTime = Number(Date.now())
    const tokenTime = Number(getTokenTime())
    return currentTime - tokenTime > TOKEN_TIME_VALUE
}