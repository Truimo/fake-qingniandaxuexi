const request = require('request')
const express = require('express')

const app = express()
const apiRouter = express.Router()

apiRouter.get('/list', function (req, res) {
    request.post('http://dxx.hngqt.org.cn/project/list', {
        form: {
            pageSize: 10,
            page: 1
        },
        headers: {
            'Cookie': ''
        }
    }, function (err, httpResponse, body) {
        if (httpResponse.statusCode === 200) {
            res.send(body)
        } else {
            res.send({
                code: 0,
                data: {
                    list: []
                }
            })
        }
    })
})
apiRouter.get('/item', function (req, res) {
    if (req.query.url && typeof req.query.url === 'string') {
        let url = ''
        try {
            url = decodeURIComponent(req.query.url)
        } catch (e) {
            console.log('decodeURIComponent error：', req.query.url)
        }
        const flag = /\/daxuexi\/(\S+)\/m.html/g.exec(url)
        const reg = /^https:\/\/h5.cyol.com\/special\/daxuexi\/\S+\/m.html/g
        if (flag && true === reg.test(url)) {
            request.get(url, {}, function (err, httpResponse, body) {
                let title = ''
                if (httpResponse.statusCode === 200) {
                    const titleReg = /<title>(\S+)<\/title>/g.exec(body)
                    title = titleReg[1] || ''
                }
                res.send({
                    code: 0,
                    data: {
                        title: title,
                        cover: `https://h5.cyol.com/special/daxuexi/${flag[1]}/images/end.jpg`
                    }
                })
            })
        } else {
            res.send({
                code: -1,
                message: '非法提交',
                data: {}
            })
        }
    } else {
        res.send({
            code: -1,
            message: '缺少参数',
            data: {}
        })
    }
})
app.use('/api', apiRouter)

app.use(express.static('public'))

app.listen(3000, function () {
    console.log('express is run')
})
