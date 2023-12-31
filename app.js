
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3001
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keywords = req.query.keyword
  const keyword = keywords.toLowerCase()

  const filterRestaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
  })
  res.render('index', { restaurants: filterRestaurants, keywords })
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})

