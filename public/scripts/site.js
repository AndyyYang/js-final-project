const getMenu = async () => {
    const response = await fetch('/api/Food')
    const menuItems = await response.json()

    const foodList = document.querySelector('#menuItems ul') // Get the existing <ul>

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

        foodList.appendChild(food)
    })
}

getMenu()
