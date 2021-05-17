
const txtProductName = document.getElementById('prodName')
const txtProductPrice = document.getElementById('prodPrice')

// Add Product Page
document.getElementById('btnAdd').addEventListener('click', async (e) => {
    e.preventDefault()
    // alert('hello')

    const name = txtProductName.value
    const price = Number.parseInt(txtProductPrice.value)

    // console.log(name, price)
    if(name && price){
        const data = {
            name: name,
            price: price
        }
        
        // console.log(data)
        const response = await fetch('/api/product',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            }
        
        )

        const result = await response.json()
        // console.log(result)

        if(result.status === 'success'){
            txtProductName.value = ''
            txtProductPrice.value = 0

            alert(result.message)
        }
            
        
    } else{
        alert('name and price are required.')
    }
    
});
