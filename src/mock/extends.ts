import Mock from 'mockjs'
// 拓展mockjs
Mock.Random.extend({
    phone: function () {
        const phonePrefixs = ['132', '135', '189']
        return this.pick(phonePrefixs) + Mock.mock(/\d{8}/)
    }
})
