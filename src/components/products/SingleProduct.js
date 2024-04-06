
import { Image } from "antd";
import { Product, ProductAddToCart, ProductImage } from "../../styles/Products";
import ProductMeta from "./ProductMeta";
import Image1 from './Product Makers/Image1.png'
import Image2 from './Product Makers/Image2.png'
import Image3 from './Product Makers/Image3.png'
import Image4 from './Product Makers/Image4.png'
import Image5 from './Product Makers/Image5.png'
import Image6 from './Product Makers/Image6.png'
import { Typography } from "@mui/material";

export default function SingleProduct({product,matches}){

    const Images= {
        1:Image1,
        2:Image2,
        3:Image3,
        4:Image4,
        5:Image5,
        6:Image6,
    }
    return (
        <div>
        <Product>
            <div>
            <div>
        <Image
          alt=""
          src={Images[product.image]}
          style={{ marginRight: '0px' }}
        />
        </div>
        <div>
          <Typography variant={matches ? "h6":"h5"} lineHeight={2}>
                {product.name}
            </Typography>
            <Typography variant={matches ? "caption":"body1"}>
                ${product.price}
            </Typography>
            </div>
            {/* <ProductImage src={product.image}/> */}
            {/* <ProductMeta product={product} matches ={matches}/> */}
        </div>
        </Product>
        <div style={{paddingTop:'10px'}}>
            <ProductAddToCart variant="contained">
            Add to cart
        </ProductAddToCart>
        </div>
        </div>
        
    )
}