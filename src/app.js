console.log("succusfully pushed the code web server")

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
//console.log(__filename)
console.log()



const app = express()

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Reshma ch'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Reshma'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'help',
        name: 'Reshma'
    })
})


// app.get('/help',(req,res)=>{
//     res.send(
//         {
//             name:'reshma',
//             age:30
//         }
//     )
// })
// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'please provide address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address 
            })

        })
    })


    // res.send(
    //     {    
    //         address:req.query.address,
    //         forecast:'its raining',
    //         location:'philadelphia'
    //     }
    // )
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })

    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found'
    })
    //res.send('Help article not found')

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'reshma',
        message: 'Page not found.'
    })
    //res.send('My 404 page')

})
app.listen(3000, () => {
    console.log('server is up on port 3000')
})//starts server,has has listen on specific port