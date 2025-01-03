import express from 'express'
import profileRoutes from './server/router/profileRouter.js'
import authRoutes from './server/router/authRouter.js'
import chatRoutes from './server/router/chatRouter.js'
import mainRoutes from './server/router/mainRouter.js'
import listsRoutes from './server/router/listsRouter.js'
import orderRoutes from './server/router/orderRouter.js'
import { config } from './server/config/config.js'
import connectDB from './server/query/connectDBQuery.js'
import cors from 'cors'
import http from 'http'
import { initSocket } from './server/socket/socket.js'
import path from "path";
import { fileURLToPath } from "url";
import PartnerRouter from './server/router/PartnershipRouter.js'

const app = express()

// http 서버 생성
const server = http.createServer(app)

initSocket(server)

const app = express()

// ES Module 환경에서 __dirname 대체 코드
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 정적 파일 경로 설정
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
    cors({
        origin: '*',
        credentials: true
    })
)

app.use(express.json())

app.use('/main', mainRoutes)
app.use('/lists', listsRoutes)
app.use('/order', orderRoutes)
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)
app.use('/chat', chatRoutes)

app.use("/partnership", PartnerRouter)

connectDB()
    .then(() => {
        server.listen(config.host.port, () => {
            console.log('서버 실행중')
        })
    })
    .catch(console.log)
