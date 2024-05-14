const getEvents = async () => {
    const response = await fetch('/api/Events')
    const eventItems = await response.json()

    const eventList = document.querySelector('#eventItems ul')
    eventList.innerHTML = '' // Clear existing items to prevent duplicates

    eventItems.forEach((item) => {
        const eventElement = document.createElement('li')

        // Create paragraph for event name and make it clickable
        const name = document.createElement('p')
        name.textContent = item.name
        name.style.cursor = 'pointer' // Make it appear clickable
        eventElement.appendChild(name)

        // Add an event listener to load full details when clicked
        name.addEventListener('click', () => {
            fetchEventDetails(item._id, eventElement)
        })

        eventList.appendChild(eventElement)
    })
}

getEvents()

const fetchEventDetails = async (eventId, eventElement) => {

        const response = await fetch(`/api/Events/${eventId}`)
        const details = await response.json()

        const prevDetails = eventElement.querySelector('.details');
        if (prevDetails) {
            prevDetails.remove();
        }

        // Create details container
        const detailsDiv = document.createElement('div')
        detailsDiv.className = 'details'

        // Add detailed information
        const location = document.createElement('p')
        location.textContent = `Location: ${details.location}`
        detailsDiv.appendChild(location);

        const date = document.createElement('p')
        date.textContent = `Dates: ${details.dates}`
        detailsDiv.appendChild(date)

        const hours = document.createElement('p')
        hours.textContent = `Hours: ${details.hours}`
        detailsDiv.appendChild(hours)

        eventElement.appendChild(detailsDiv)
}

