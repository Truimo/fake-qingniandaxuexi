new Vue({
    el: '#app',
    data: {
        newList: [],
        showScreenshot: false,
        cover: '',
        inp: '',
    },
    mounted: function () {
        const that = this
        axios.get('/api/list').then(function (response) {
            if (response.status === 200 && response.data.code === 0) {
                for (let it of response.data.data.list) {
                    that.newList.push(it)
                }
            }
        })
    },
    methods: {
        showIt: function (link) {
            const that = this
            axios.get(`/api/item?url=${link}`).then(function (response) {
                if (response.status === 200 && response.data.code === 0) {
                    document.title = response.data.data.title
                    that.cover = response.data.data.cover
                    that.showScreenshot = true
                } else {
                    alert('error:' + response.data.message)
                }
            })
        },
        hideScreenshot: function () {
            this.showScreenshot = false
        },
        showIn: function () {
            if (this.inp === '') return
            this.showIt(this.inp)
        }
    }
})
