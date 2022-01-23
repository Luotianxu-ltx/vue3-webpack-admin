// 摊平树形结构
export const flattenedTree = (data: any) => {
    let result: Array<string> = []
    result = addList(result, data)
    result = [...new Set(result)]
    return result
}

function addList(list: any[], arr:any) {
    arr.forEach((item: any) => {
        if (item.children) {
            addList(list, item.children)
        } else {
            list.push(item.url)
        }
    })
    return list
}
