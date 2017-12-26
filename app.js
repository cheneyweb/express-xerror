// 系统配置参数
const config = require('config')
const port = config.server.port
// 应用服务相关
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const xerror = require(__dirname + '/xerror_modules/express-xerror/index.js')
// 日志相关
const log = require('tracer').colorConsole({ level: config.log.level })

// 初始化应用服务
const app = express()
app.use(bodyParser.json())
app.use(router)
app.use(xerror(config.error, (ctx, err) => { log.info('额外可选错误处理') }))   // 需要在最后一位路由处理

// 模拟错误
router.get('/test', function (req, res) {
    const a = 'error'
    a = 'error2'
    res.send('hello')
})

// 启动应用服务
app.listen(port)
log.info(`XError服务启动【执行环境:${process.env.NODE_ENV},端口:${port}】`)
log.info(`GET日志路径 【GET】【localhost:${port}/test】`)