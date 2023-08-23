import React, { useEffect, useState } from "react";
import "./Navgate.css";
import axios from "axios";
import { baseUrl } from "../../../utils/baseUrl";
import { Link } from "react-router-dom";
const NavgateProducts = () => {
  const [notification, setNotification] = useState([]);
  const getNotifications = async () => {
    const res = await axios.get(`${baseUrl}/api/v1/notification`);
    setNotification(res.data.data);
  };
  useEffect(() => {
    getNotifications();
  }, []);
  return (
    <>
      <section className="products_list bg-dark">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
            {notification.map((item) => (
              <div key={item._id} className="col-lg-3 col-md-6 col-sm-12 mt-2">
                <h5 className="text-white text-center">{item.name}</h5>
                <div className="card bg-dark"></div>
                <p className="text-white text-center mt-2">{item.desc}</p>
                <Link
                  to={item.link}
                  className="text-white text-center btn btn-primary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  أذهب للمنتج
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default NavgateProducts;
