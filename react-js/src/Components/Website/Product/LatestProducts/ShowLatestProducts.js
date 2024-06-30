import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { Latest } from "../../../../Api/Api";
import SkeletonShow from "../../Skeleton/SkeletonShow";
import SaleProducts from "../SaleProducts/SaleProducts";

export default function ShowLatestProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        Axios.get(`${Latest}`)
        .then((res)=> setProducts(res.data))
        .finally(()=>setLoading(false));
    }, []);
    const productsShow = products.map((product)=>(
         <SaleProducts title={product.title} description={product.description} img={product.images[0].image}
          sale={product.discount} col="6" price={product.price} discount={product.discount} rating={product.rating} />
        ));
    return (
        <div className="col-md-6 col-12">
            <div className="ms-md-3">
            <h1>Latest Products</h1>
        <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-5 row-gap-2 mb-5">
         {loading ? (
            <>
            <SkeletonShow length="4" height="300px" classess="col-lg-3 col-md-6 col-12"/> 
            </>
         ) : (
            productsShow
          )}
          </div>
          </div>
        </div>
        
    );
}