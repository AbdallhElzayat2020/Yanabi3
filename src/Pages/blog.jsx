import Loading from "../components/Loading/Loading";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { Link } from "react-router-dom";
const Blog = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState([]);
  const [cookies] = useCookies(["token"]);
  const getShowBlog = async () => {
    let res = await axios.get(`${baseUrl}/api/v1/blog`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    let arr = [];
    res.data.data.map((item) => {
      if (item._id !== "64d6b5d5ad635d34a6b88b60") {
        arr.push(item);
      }
    });
    setShow(arr);
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    getShowBlog();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="blog">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 bg-dark rounded-4 p-5 blog-2">
                <h4 className="text-white text-center p-3 ">المدونة</h4>
                <div className="row">
                  {show.map((item) => (
                    <div className="col-lg-4 col-md-6 mb-2">
                      <div className="card">
                        <img
                          src={item.image}
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body">
                          <p className="card-text">{item.text}</p>
                          {item.link && (
                            <Link to={item?.link} className="btn btn-primary">
                              أذهب للمنتج
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Blog;
