const express = require('express')
const app = express()

// Middlewares
app.use(express.json())
app.use(express.static(__dirname + '/public'))

const PORT = process.env.PORT || 5000

let productsData = [
    {
        id: 1,
        name: 'Techno C10',
        price: 5000,
    },
    {
        id: 2,
        name: 'Samsung A51',
        price: 25000,
    },
    {
        id: 3,
        name: 'Infinix Hot 10',
        price: 61500,
    },
];

const name = 'Shola Keshinro'

// Index page
// app.get('/', (req, res)=>{
//     res.send('<h1>Home Page</h1>')
// });

// Get all products
app.get('/api/product', (req, res)=>{
    try {
        // Connect to database and fetch records
        res.json({ products:  productsData, status: 'success', message: 'Fetch successful' });
    } catch (err) {
        res.json({ status: 'error', message: 'Failed fetching products' });
    }
});

// Get a product
app.get('/api/product/:id', (req, res)=>{
    const id = Number.parseInt(req.params.id)
    
    try {
        const foundProducts = productsData.filter((product) => product.id === id)
        if(foundProducts.length > 0){
            res.json({ product: foundProducts[0], status: 'success', message: 'Item found' })
        } else{
            res.json({ status: 'failed', message: 'Item not found'})
        }

    } catch (err) {
        res.json({ status: 'error', message: err.message })
        
    }

});

// Create a new product
app.post('/api/product', (req,res)=>{

    // console.log(req.body)

    const name = req.body.name
    const price = req.body.price
    // const id = productsData.length + 1       //Invalidated, will affect delete
    const id = productsData[productsData.length-1].id + 1

    const newProduct = {
        id: id,
        name: name,
        price: price,
    }

    try {
        // Connect to database and insert newProduct
        productsData.push(newProduct)

        res.json({ id:id, status: 'success', message: 'Product added'})

    } catch (err) {
        res.json({ status: 'error', message: err.message})
    }
    
});

// Update a product
app.patch('/api/product/:id', (req,res)=>{
    const id = Number.parseInt(req.params.id)

    try {
        productsData.forEach((product, index)=>{
            if(product.id === id){
                if(req.body.name){
                    productsData[index].name = req.body.name
                }
    
                if(req.body.price){
                    productsData[index].price = req.body.price
                }
            }
        })

        res.json({ status: 'success', message: `Product ${id} successfully updated`})

    } catch (err) {
        res.json({ status: 'error', message: err.message})
    }

})

// Delete a product
app.delete('/api/product/:id', (req,res)=>{
    const id = Number.parseInt(req.params.id)

    try {
        // Connect to database and delete item with id:id
        productsData = productsData.filter((product) => product.id !== id)

        res.json({ status: 'success', message: 'Product deleted'})

    } catch (err) {
        res.json({ status: 'error', message: err.message})
    }
})

// Start the server by listening on a specified PORT
app.listen(PORT, ()=>{
    console.log(`Server live on port ${PORT}`)
});





