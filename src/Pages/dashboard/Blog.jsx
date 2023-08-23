import { useEffect, useState } from "react";
import AdminSideBar from "../../components/dashboard/AdminSideBar";
import Loading from "../../components/Loading/Loading";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../../utils/baseUrl";

const Blog = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [brandData, setBrandData] = useState({});
  const [cookies] = useCookies(["token"]);
  const [blog, setBlog] = useState([]);

  const editBrand = async () => {
    let fromdata = new FormData();
    fromdata.append("image", brandData.img);
    fromdata.append("text", brandData.text);
    fromdata.append("link", brandData.link);

    try {
      await axios.post(`${baseUrl}/api/v1/blog`, fromdata, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
      toast.success("تمت أضافه المدونة بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      toast.error("لم يتم أضافه المدونة بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const getShowBlog = async () => {
    let res = await axios.get(
      `${baseUrl}/api/v1/blog/64d6b5d5ad635d34a6b88b60`,
      {
        headers: { Authorization: `Bearer ${cookies.token}` },
      }
    );

    setShow(res.data.data.show);
  };
  const showOrhide = async () => {
    let res = await axios.put(
      `${baseUrl}/api/v1/blog/64d6b5d5ad635d34a6b88b60`,
      { show: !show },
      {
        headers: { Authorization: `Bearer ${cookies.token}` },
      }
    );
    setShow(res.data.data.show);
  };
  const getBlogs = async () => {
    let res = await axios.get(`${baseUrl}/api/v1/blog`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    let arr = [];
    res.data.data.map((item) => {
      if (item._id !== "64d6b5d5ad635d34a6b88b60") {
        arr.push(item);
      }
    });
    setBlog(arr);
  };
  const deleteCategory = async (id) => {
    let res = await axios.delete(`${baseUrl}/api/v1/blog/${id}`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    toast.success("تم حذف المقاله بنجاح");
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    getShowBlog();
    getBlogs();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="blog">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <AdminSideBar />
              </div>
              <div className="col-lg-8 col-md-12 col-sm-12 bg-dark rounded-4 p-5 blog-2">
                <h4 className="text-white text-center p-3 ">المدونة</h4>
                <div className="row">
                  <div className="col-lg-12 blogr">
                    <button
                      onClick={() => showOrhide()}
                      class="btn btn-primary mb-2"
                    >
                      {show ? "أخفاء" : "أظهار"}
                    </button>
                    <div className="card">
                      <div className="card-body">
                        <div className="mb-4">
                          <label className="form-label fw-bold">
                            اختر الصورة
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            placeholder="الصورة"
                            onChange={(e) =>
                              setBrandData({
                                ...brandData,
                                img: e.target.files[0],
                              })
                            }
                          />
                        </div>
                        <input
                          type="text"
                          className="form-control mb-3"
                          placeholder="رابط المنتج"
                          onChange={(e) =>
                            setBrandData({ ...brandData, link: e.target.value })
                          }
                        />
                        <textarea
                          className="d-block mb-3 text-area p-5"
                          placeholder="نص المقالة"
                          onChange={(e) =>
                            setBrandData({ ...brandData, text: e.target.value })
                          }
                        ></textarea>
                        <button
                          className="btn btn-primary"
                          onClick={() => editBrand()}
                        >
                          اضف المقالة
                        </button>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr className="">
                            <th
                              className=" fw-bold bg-dark text-white"
                              scope="col"
                            >
                              أسم المقاله
                            </th>
                            <th
                              className=" fw-bold bg-dark text-white"
                              scope="col"
                            >
                              حذف
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {blog.map((brand) => (
                            <tr>
                              <td className="fw-bold">
                                {brand.text.slice(0, 30)}...
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => deleteCategory(brand._id)}
                                >
                                  حذف
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
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
