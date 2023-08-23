// slider img


import { useEffect, useState } from "react";
import "./Services.css";
import ServicesSlider from "./ServicesSlider";
import SpeicalProducts from "./SpeicalProducts";
import Loading from "../Loading/Loading";
import Services_1 from "./Services_1";
const Services = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);
    return (
        <>
            {
                isLoading ? <Loading /> : <div>

                    <ServicesSlider />
                    <Services_1 />
                    <SpeicalProducts />
                </div>
            }
        </>
    );
};

export default Services;
