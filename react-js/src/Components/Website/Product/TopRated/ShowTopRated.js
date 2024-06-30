import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import TopRated from "./TopRated"
import { TopRatedApi } from "../../../../Api/Api";
import SkeletonShow from "../../Skeleton/SkeletonShow";




export default function ShowTopRated() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        Axios.get(`${TopRatedApi}`)
        .then((res)=>setProducts(res.data))
        .finally(()=>setLoading(false));
    }, []);
    const productsShow = products.map((product)=>(
        <TopRated
         title={product.title}
         description={product.description}
         img={product.images[0].image}
         sale={product.discount}
         price={product.price}
         discount={product.discount}
         rating={product.rating}
         />
    ));
    return(
        <div className="col-md-6 col-12" style={{ border: "2px solid #0D6EFD"}}>
            <h1 className="text-center m-0 p-3 bg-primary text-white">Top Rated</h1>
            <div className="p-5">{ loading ? (
            <>
            <SkeletonShow length="1" height="800px" classess="col-12"/> 
            </>
         ) : productsShow} </div>
            </div>
    );
         
}