document.getElementById('addEvent').addEventListener('submit', async () => {

    const newEventName = document.getElementById('eName').value
    const newEventLocation = document.getElementById('eLocation').value
    const newEventDate = document.getElementById('eDates').value
    const newEventHours = document.getElementById('eHours').value

    console.log('Dates:', newEventDate)

    const newEvent = {
        name: newEventName,
        location: newEventLocation,
        dates: newEventDate,
        hours: newEventHours
    }

    const response = await fetch ('/api/Events', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newEvent)
    })

    if (response.ok) {
        getEvents() // Only call getMenu if the POST was successful
    } else {
        console.error('Failed to add new dish', await response.text())
    }
})