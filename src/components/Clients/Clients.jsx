import { useEffect, useState } from "react";
import axios from "axios";
import "./Clients.css";
import { baseUrl } from "../../../utils/baseUrl";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
const Clients = () => {
  const [stars, setStars] = useState([]);
  const GetStars = async () => {
    const getAllStars = await axios(`${baseUrl}/api/v1/stars`);
    setStars(getAllStars.data.data);
  };

  useEffect(() => {
    GetStars();
  }, []);
  return (
    <>
      <div className="clients">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12  d-flex align-items-center justify-content-center">
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
              >

                {stars.map((star, i) => (
                  <SwiperSlide>

                    <div
                      key={i}
                      className={`d-flex align-items-center justify-content-center mx-auto ${i == 0 ? "active" : ""}`}
                    >
                      <img
                        className="review"
                        // style={{ width: "450px", height: "auto" }}
                        src={star.image}
                        // className=""
                        alt="review image"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clients;
