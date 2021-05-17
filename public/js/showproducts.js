const resultsDiv = document.getElementById('results')

// Index page
document.getElementById('btnViewProducts').addEventListener('click', async (e)=>{
    e.preventDefault()

    const response = await fetch('/api/product')
    let result = await response.json()


    if(result.status === 'success'){
        const products = result.products
        let htmlString = `
            <table border="1"> 
                <thead>
                    <tr>
                        <th> Prod_id </th> <th> Product Name </th> <th> Price(naira) </th>
                    </tr>
                </thead>
                <tbody>
        `
        products.map((product) => {
            htmlString += `
                    <tr>
                        <td> ${product.id} </td>
                        <td> ${product.name} </td>
                        <td> N${Number.parseFloat(product.price).toFixed(2)} </td>
                    </tr>
            `
        })

        htmlString += `
                </tbody>
            </table>
        `
        resultsDiv.innerHTML = htmlString
    }
        
   
    
})

