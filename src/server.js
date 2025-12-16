import express from 'express'
import productRouter from "./routes/productRouter.js"
import cartRouter from "./routes/cartRouter.js"


const server = express()
const port = 8080

server.use(express.json())

server.use('/api/products', productRouter);
server.use('/api/carts', cartRouter);


server.listen(port, () => {
    console.log(`escuchando en puerto ${port}`)
})
