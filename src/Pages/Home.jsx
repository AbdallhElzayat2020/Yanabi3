import Clients from "../components/Clients/Clients";
import ProductsList from "../components/Products/Products";
import { Slider } from "../components/Slider/Slider";
import Loading from "../components/Loading/Loading";
import { useEffect, useState } from "react";
const Home = () => {

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {
        isLoading ? <Loading /> :
          <div>
            <Slider />
            <Clients />
            <ProductsList />
          </div>
      }

    </>
  );
};

export default Home;
