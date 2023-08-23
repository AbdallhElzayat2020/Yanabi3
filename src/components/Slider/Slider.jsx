import "./Slider.css";
import Slider_1 from "../../images/banner-1.jpg";
import Slider_2 from "../../images/banners-2.jpg";
import Slider_3 from "../../images/banner-3.jpg";
import { baseUrl } from "../../../utils/baseUrl";
import { useEffect, useState } from "react";
import axios from "axios";
export const Slider = () => {
  const [Ads, setAds] = useState([]);
  const GetStars = async () => {
    const getAllStars = await axios(`${baseUrl}/api/v1/ads`);
    setAds(getAllStars.data.data);
  };
  useEffect(() => {
    GetStars();
  }, []);
  return (
    <>
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={Slider_1} className="d-block one " alt="..." />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>
          <div className="carousel-item">
            <img src={Slider_2} className="d-block two " alt="..." />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>
          <div className="carousel-item">
            <img src={Slider_3} className="d-block three " alt="..." />
            <div className="carousel-caption d-none d-md-block"></div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon bg-primary"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon bg-primary"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div id="carouselExample" className="carousel slide ">
        <div className="container bg-black">
          <div className="carousel-inner">
            {Ads.map((ads, i) => (
              <div
                key={i}
                className={`carousel-item ${i == 0 ? "active" : ""}`}
              >
                <img

                  src={ads.image}
                  className="d-block width mx-auto"
                  alt="..."
                />
              </div>
            ))}
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon bg-primary"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon bg-primary"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};
