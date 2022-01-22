// 根据url获取参数
export const getQuery = (url: string, name: string) => {
    const index = url.indexOf('?')
    if (index !== -1) {
        const queryStrArr = url.substr(index + 1).split('&')
        for (let i = 0; i < queryStrArr.length; i++) {
            const itemArr = queryStrArr[i].split('=')
            if (itemArr[0] === name) {
                return itemArr[1]
            }
        }
    }
    return null
}
