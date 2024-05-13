document.getElementById('addFood').addEventListener('submit', async (event) => {
    event.preventDefault()

    const newFood = document.getElementById('fName').value
    const newFoodDescription = document.getElementById('fDescription').value
    const newFoodPrice = document.getElementById('fPrice').value

    const newDish = {
        name: newFood,
        description: newFoodDescription,
        price: newFoodPrice
    }

    const response = await fetch ('/api/Food', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newDish)
    })

    if (response.ok) {
        getMenu(); // Only call getMenu if the POST was successful
    } else {
        console.error('Failed to add new dish', await response.text())
    }
})
