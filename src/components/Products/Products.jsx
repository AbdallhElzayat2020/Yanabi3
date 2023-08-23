import { useEffect, useState } from "react";
import "../Products/Product.css";
import Card from "./Card";
import SpeicalProducts from "../Services/SpeicalProducts";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loading from "../Loading/Loading";
import { baseUrl } from "../../../utils/baseUrl";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const Products = () => {
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const searchText = new URLSearchParams(location.search).get("search");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  // GET PRODUCTS
  const Get_Products = async () => {
    const getAllProducts = await axios(
      `${baseUrl}/api/v1/products?limit=8&page=1${searchText ? "&keyword=" + searchText : ""
      }`
    );
    setProducts(getAllProducts.data.data);
  };

  // GET PRODUCTS
  // Get Categories
  const GetCategories = async () => {
    const getAllCategories = await axios(`${baseUrl}/api/v1/categories`);
    setCategories(getAllCategories.data.data);
  };
  // Get Categories
  // Get products in categories
  const GetProductsInCategory = async (categoryId, categoryName) => {
    if (categoryName === "All") {
      const GetProductsInCategory = await axios(
        `${baseUrl}/api/v1/products?limit=8&page=1`
      );
      setProducts(GetProductsInCategory.data.data);
    } else {
      const GetProductsInCategory = await axios(
        `${baseUrl}/api/v1/products?limit=8&page=1&category=${categoryId}`
      );
      setProducts(GetProductsInCategory.data.data);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    Get_Products();
    GetCategories();
  }, []);
  return (
    <>
      {
        isLoading ? <Loading /> : <div>

          <div className="products">
            <div className="container text-center">


              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => GetProductsInCategory(category._id, category.name)}
                  className="btn one btn-primary"
                >
                  {category.name}
                </button>


              ))}


              <div className="row">
                {products.map((product) => (
                  <div key={product._id} className="col-lg-4 col-md-6 mt-4">
                    <Card product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <Services */}
          <SpeicalProducts />
        </div>

      }
    </>
  );
};

export default Products;
