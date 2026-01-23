import { CartModel } from "../models/cart-model.js";
import { ProductModel } from "../models/product-model.js";

class CartManager {
    constructor(model){
        this.model = model;
    }

    getAll = async()=>{
        try {
            return await this.model.find()
        } catch (error) {
            throw new Error(error.message)
        }
    }

    getById = async(cid)=>{
        try {
            const cart = await this.model.findById(cid).populate('products.product')
            if(!cart) return null;
            return cart;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    createCart = async() =>{
        try {
            return await this.model.create({products: []})
        } catch (error) {
            throw new Error(error.message)
        }
    }

    addProduct = async(cid,pid)=>{
        try {
            const product = await ProductModel.findById(pid);
            if(!product) throw new Error('producto no encontrado');
            const cart = await this.model.findById(cid);
            if(!cart) throw new Error('carrito no encontrado');
            const existingProd = cart.products.find(p => p.product.toString() === pid.toString());
            if(existingProd){
                existingProd.quantity++;
            }else{
                cart.products.push({
                    product: pid,
                    quantity: 1
                });
            }
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(error.message)
        }
    }
    clearCart = async(cid) =>{
        try {
            return await this.model.findByIdAndUpdate(
                cid,
                {products: []},
                {new: true}
            );
        } catch (error) {
            throw new Error(error.message);
        }
    }

    deleteCart = async(cid) =>{
        try {
            return await this.model.findByIdAndDelete(cid)
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export const cartManager = new CartManager(CartModel);