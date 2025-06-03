import {
    App
} from '@tinyhttp/app'
import {
    Liquid
} from 'liquidjs'
import sirv from 'sirv'
import {
    join
} from 'path'

const app = new App()
const engine = new Liquid({
    root: join(process.cwd(), 'views'),
    extname: '.liquid'
})

app.use('/css', sirv('css'))
app.use('/images', sirv('static/images'))

app.listen(3000, () => {
    console.log('Server draait op http://localhost:3000')
})

app.get('/', async (req, res) => {
    const html = await engine.renderFile('index', {
        title: 'Welkom',
        message: 'Hallo vanuit tinyhttp + Liquid!'
    })
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
})

app.get('/street', async (req, res) => {
    const html = await engine.renderFile('street')
    res.setHeader('Content-Type', 'text/html')
    res.send(html)
})