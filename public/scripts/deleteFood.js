const getMenu = async () => {
    const response = await fetch('/api/Food')
    const menuItems = await response.json()

    const foodList = document.querySelector('#menuItems ul') // Get the existing <ul>
	foodList.innerHTML = '' // Clear the list each time to avoid duplicates

    menuItems.forEach((item) => {
		const food = document.createElement('li')
        
        // Create paragraph for name
        const name = document.createElement('p')
        name.textContent = item.name
        food.appendChild(name)
        
        // Create paragraph for description
        const description = document.createElement('p')
        description.textContent = item.description
        food.appendChild(description)
        
        // Create paragraph for price
        const price = document.createElement('p')
        price.textContent = item.price
        food.appendChild(price)

		const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete'
        deleteButton.onclick = () => deleteFood(item._id, food)
        food.appendChild(deleteButton)

        foodList.appendChild(food)
    })
}

getMenu()

const deleteFood = async (id, food) => {
    const response = await fetch(`/api/Food/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        // If the server confirms the item is deleted, remove the element from the DOM
        food.remove()
    } else {
        console.error('Failed to delete the item', await response.text());
    }
}


