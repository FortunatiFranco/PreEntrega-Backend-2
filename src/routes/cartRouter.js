import { Router } from "express";
import { cartManager } from "../managers/cartManager.js";

const router = Router()

router.get('/:cid', async(req,res)=>{
    try {
        const {cid} = req.params
        const cartsId = await cartManager.cartById(cid);
        res.json(cartsId)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/', async(req,res)=>{
    try {
        const carts = await cartManager.create()
        res.json(carts)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


router.post('/:cid/product/:pid', async(req,res)=>{
    try {
        const {cid} = req.params;
        const {pid} = req.params;
        await cartManager.addProdToCart(cid,pid)
        res.json('producto agregado al carrito')
    } catch (error) {
        res.status(500).send(error.message)
    }
})

export default router;