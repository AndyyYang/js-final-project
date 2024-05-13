const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/api/Food', require('./routes/api-routes-Food'))
app.use('/api/Events', require('./routes/api-routes-Events'))
app.use(express.static('public'))
app.use(require('./routes/static'))


app.listen(port, () => console.log(`Server is running http://localhost:${port}`))