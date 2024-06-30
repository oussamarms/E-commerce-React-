import "./Home.css"
import Landing from "../../../Components/Website/Landing/Landing";
import { Container } from "react-bootstrap";
import ShowTopRated from "../../../Components/Website/Product/TopRated/ShowTopRated";
import ShowLatestProducts from "../../../Components/Website/Product/LatestProducts/ShowLatestProducts";
import ShowLatestSaleProducts from "../../../Components/Website/Product/SaleProducts/ShowLatestSaleProducts";

export default function HomePage() {
    return(
      <div>
        <Landing />
        <ShowLatestSaleProducts />
        <Container>
          <div className="d-flex align-items-start flex-wrap mt-5">
            <ShowTopRated />
            <ShowLatestProducts />
            </div>
            </Container>
            </div>
                    
    );
}

 
