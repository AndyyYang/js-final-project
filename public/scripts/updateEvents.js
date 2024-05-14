document.addEventListener('DOMContentLoaded', () => {
    populateEventSelector()
    setupEventFormListener()
})

const populateEventSelector = async () => {
    const response = await fetch('/api/Events')
    const events = await response.json()
    const selector = document.getElementById('eventSelector')
    selector.innerHTML = '' // Clear existing options

    events.forEach(event => {
        const option = document.createElement('option')
        option.value = event._id
        option.textContent = event.name
        selector.appendChild(option)
    })

    if (events.length > 0) {
        populateFormFields(events[0]._id)  // Populate fields for the first item
    }
}

const populateEventFormFields = async (eventId) => {
    const response = await fetch(`/api/Events/${eventId}`)
    const event = await response.json()
    document.getElementById('editEventName').value = event.name
    document.getElementById('editLocation').value = event.location
    document.getElementById('editDates').value = event.dates
    document.getElementById('editHours').value = event.hours
}

const setupEventFormListener = () => {
    const form = document.getElementById('updateEvents')
    form.addEventListener('submit', async () => {

        const eventId = document.getElementById('eventSelector').value
        const updatedEvent = {
            name: document.getElementById('editEventName').value,
            location: document.getElementById('editLocation').value,
            dates: document.getElementById('editDates').value,
            hours: document.getElementById('editHours').value
        }

        const response = await fetch(`/api/Events/${eventId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedEvent)
        })

        if (response.ok) {
                populateEventSelector()
            }
        else {
            console.error('Failed to update the event:', await response.text())
        }
    })
}
