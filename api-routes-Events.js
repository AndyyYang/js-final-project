const router = require('express').Router()
const { MongoClient, ObjectId } = require('mongodb')
const { env } = require('process')

const url = process.env.MONGODB_URI || require('./secrets/mongodb.json').url
const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName)
}

router.get('/', async (_, response) => {
    // this maps to GET /api/Events
    // This route returns a list of all items on the menu with just ID and Name
    const collection = await getCollection('AHA-Food-Truck', 'Events')
    const event = await collection.find().toArray()

    //Need to map event array to print out only id (_id in MongoDB) and name
    const result = event.map(({ _id, name}) => ({_id, name}));

	response.json(result)
})

router.get('/:id', async (request, response) => {
    // this maps to GET /api/Events/:id
    // This route returns a Event with id
    const { id } = request.params
    const collection = await getCollection('AHA-Food-Truck', 'Events')
    const event = await collection.findOne({ _id: new ObjectId(id) })
    response.json(event)
})

router.post('/', async (request, response) => {
    // this maps to POST /api/Events
    // This route allows the food truck owner to add a new Event
    const { body } = request
    const { name, location, dates, hours } = body
    const event = { name, location, dates, hours }

    const collection = await getCollection('AHA-Food-Truck', 'Events')
    const result = await collection.insertOne(event)
    response.json(result)
})

router.put('/:id', async (request, response) => {
    // this maps to PUT /api/Events/:id
    // This route allows the food truck owner to update an item on the menu
    const { body, params } = request
    const { id } = params
    const { name, location, dates, hours } = body
    const event = { name, location, dates, hours }

    const collection = await getCollection('AHA-Food-Truck', 'Events')
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: event })
    response.json(result)
})

router.delete('/:id', async (request, response) => {
    // this maps to DELETE /api/Events/:id
    // This route allows the food truck owner to delete an event
    const { id } = request.params

    const collection = await getCollection('AHA-Food-Truck', 'Events')
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    response.json(result)
})

module.exports = router