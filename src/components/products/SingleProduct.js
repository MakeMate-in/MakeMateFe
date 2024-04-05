
import { Product, ProductAddToCart, ProductImage } from "../../styles/Products";
import ProductMeta from "./ProductMeta";

export default function SingleProduct({product,matches}){

    return (
        <>
        <Product>
            <ProductImage src={product.image}/>
            <ProductMeta product={product} matches ={matches}/>
            
        </Product>
        <ProductAddToCart variant="contained">
            Add to cart
        </ProductAddToCart>
        </>
        
    )
}