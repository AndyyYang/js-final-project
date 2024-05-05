const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/api/Food', require('./api-routes-Food'))
app.use('/api/Events', require('./api-routes-Events'))
app.use(express.static('public'))

app.get('/', (_, response) => {
	response.sendFile('index.html', { root })
})

app.listen(port, () => console.log(`Server is running http://localhost:${port}`))