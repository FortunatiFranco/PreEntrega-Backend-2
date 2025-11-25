import { error } from "console";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class ProductManager {
    constructor(path){
        this.path = path;
    }

    getAll = async ()=>{
        try{
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, "utf-8");
                return JSON.parse(products)
            }
            return [];
        }catch(error){
            throw new error(error);
        }
    };

    getById = async(id)=>{
        try{
            const products = await this.getAll();
            const productExist = products.find((product)=> product.id === id);
            if(!productExist) throw new error ("product not found");
            return productExist
        }catch(error){
            throw new error(error);
        }
    };

    create = async (obj)=>{
        try{
            const product = {
                id: uuidv4(),
                ...obj,
            };
            const products = await this.getAll();
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return product;
        }catch(error){
            throw new error(error);
        }
    };

    update = async (obj, id) =>{
        try{
            const products = await this.getAll()
            let productExist = await this.getById(id);
            productExist = {...productExist, ...obj};
            const newArray = products.filter((product)=> product.id !== id);
            newArray.push(productExist);
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            return productExist;
        }catch(error){
            throw new error(error);
        }
    };

    delete = async (id) => {
        try{
            const product = await this.getById(id);
            const products = await this.getAll();
            const newArray = products.filter((prod)=> prod.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            return `producto con id: ${product.id} eliminado`;
        }catch(error){
            throw new error(error);
        }
    };
}

export const productManager = new ProductManager("./data/products.json")