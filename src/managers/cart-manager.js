import { v4 as uuidv4 } from "uuid";
import {productManager} from "./productManager.js";

class CartManager{
    constructor(path){
        this.path = path;
    }

    getAll = ()=>{}

    create = ()=>{
        try{
            const cart = {
                id: uuidv4(),
                products:[],
            };
        }catch(error){}
    };

    getById = (id) => {};

    addProdToCart = (idCart, idProd)=>{}
}

export const CartManager = new CartManager("./data/carts.json")