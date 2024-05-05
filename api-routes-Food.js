const router = require('express').Router()
const { MongoClient, ObjectId } = require('mongodb')

const url = process.env.MONGODB_URI || require('./secrets/mongodb.json').url
const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName)
}

router.get('/', async (_, response) => {
    // this maps to GET /api/Food
    // This route returns a list of all items on the menu
    const collection = await getCollection('AHA-Food-Truck', 'Food')
    const menu = await collection.find().toArray()
	response.json(menu)
})

router.post('/', async (request, response) => {
    // this maps to POST /api/Food
    // This route allows the food truck owner to add a new item to the menu
    const { body } = request
    const { name, description, price } = body
    const menu = { name, description, price }

    const collection = await getCollection('AHA-Food-Truck', 'Food')
    const result = await collection.insertOne(menu)
    response.json(result)
})

router.put('/:id', async (request, response) => {
    // this maps to PUT /api/Food/:id
    // This route allows the food truck owner to update an item on the menu
    const { body, params } = request
    const { id } = params
    const { name, description, price } = body
    const menu = { name, description, price }

    const collection = await getCollection('AHA-Food-Truck', 'Food')
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: menu })
    response.json(result)
})

router.delete('/:id', async (request, response) => {
    // this maps to DELETE /api/Food/:id
    // This route allows the food truck owner to delete an item from the menu
    const { id } = request.params

    const collection = await getCollection('AHA-Food-Truck', 'Food')
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    response.json(result)
})

module.exports = router