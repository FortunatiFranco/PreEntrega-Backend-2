import { Router } from "express";
import { productManager } from "../managers/productManager.js";

const router = Router();

router.get('/', async(req, res) => {
    try {    
    const products = await productManager.getAll()
    res.json(products)
}catch(error) {
        res.status(500).send(error.message)
    }})

router.get('/:id', async(req, res) => {
    try {
        const {id} = req.params
        const products = await productManager.getById(id)
        res.json(products)
}catch(error) {
    res.status(500).send(error.message)
}})

router.post('/', async(req, res) => {
    try {
        const newProduct = await productManager.create(req.body);
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(500).send(error.message)
    }})

router.put('/:id', async(req,res)=>{
    try{
    const {id} = req.params;
    const product = await productManager.update(req.body, id);
    res.json(product);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.delete('/:id', async(req,res) =>{
    try {
        const {id}= req.params;
        const prodDelete = await productManager.delete(id)
        res.json(prodDelete);
    } catch (error) {
        res.status(500).send(error.message)
    }})


export default router;