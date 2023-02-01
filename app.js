const
    usersTable = require('./src/windows'),
    path = require('path'),
    express = require('express')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'pug')

app.use(express.urlencoded({ extended: true }))

app.route('/').get((req, res) => {
    res.render('index', {
        'title': 'Веб-приложение'
    })
})

app.route('/users').post((req, res) => {
    let name = req.body.name

    usersTable((userName) => {
        res.render('users', {
            'title': `Пользователь ${name}`,
            'value': userName.indexOf(name),
            'name': name
        })
    })
})

const server = app.listen(process.argv[2], () => {
    console.log(`Приложение запущено на http://localhost:${server.address().port}`)
})