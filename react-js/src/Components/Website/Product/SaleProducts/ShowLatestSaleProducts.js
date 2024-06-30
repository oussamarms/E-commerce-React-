import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { LatestSale } from "../../../../Api/Api";
import Product from "./SaleProducts";
import { Container } from "react-bootstrap";
import SkeletonShow from "../../Skeleton/SkeletonShow";

export default function ShowLatestSaleProducts(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        Axios.get(`${LatestSale}`)
        .then((res)=> setProducts(res.data))
        .finally(()=>setLoading(false));
    }, []);
    const productsShow = products.map((product)=>(
         <Product title={product.title} description={product.description} img={product.images[0].image}
          sale={product.discount} col="3" price={product.price} discount={product.discount} rating={product.rating} />
        ));
    return (
        <Container>
            <h1 className="mt-5">Latest Sale Products</h1>
        <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-5 row-gap-2 mb-5">
         {loading ? (
            <>
            <SkeletonShow length="4" height="300px" classess="col-md-6 col-12"/> 
            </>
         ) : (
            productsShow
          )}
          </div>
        </Container>
    );
}