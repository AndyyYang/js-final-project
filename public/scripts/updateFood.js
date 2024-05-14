document.addEventListener('DOMContentLoaded', () => {
    populateDishSelector()
    setupFormListener()
})

const populateDishSelector = async () => {
    const response = await fetch('/api/Food')
    const dishes = await response.json()
    const selector = document.getElementById('foodSelector')
    selector.innerHTML = '' // Clear existing options

    dishes.forEach(dish => {
        const option = document.createElement('option')
        option.value = dish._id
        option.textContent = dish.name
        selector.appendChild(option)
    })

    if (dishes.length > 0) {
        populateFormFields(dishes[0]._id)  // Populate fields for the first item
    }

}

const populateFormFields = async (dishId) => {
    const response = await fetch(`/api/Food/${dishId}`)
    const dish = await response.json()
    document.getElementById('editName').value = dish.name
    document.getElementById('editDescription').value = dish.description
    document.getElementById('editPrice').value = dish.price
}

const setupFormListener = () => {
    const form = document.getElementById('updateFood')
    form.addEventListener('submit', async () => {
        
        const dishId = document.getElementById('foodSelector').value
        const updatedDish = {
            name: document.getElementById('editName').value,
            description: document.getElementById('editDescription').value,
            price: document.getElementById('editPrice').value
        }

        const response = await fetch(`/api/Food/${dishId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedDish)
        })

        if (response.ok) {
            const response = await fetch('/api/Food')
            const dishes = await response.json()
            const selector = document.getElementById('foodSelector')
            selector.innerHTML = '' // Clear existing options
        
            dishes.forEach(dish => {
                const option = document.createElement('option')
                option.value = dish._id
                option.textContent = dish.name
                selector.appendChild(option)
            })
        
            if (dishes.length > 0) {
                populateFormFields(dishes[0]._id)  // Populate fields for the first item
            }
            getMenu()
        } else {
            console.error('Failed to update the dish:', await response.text())
        }
    })
}
