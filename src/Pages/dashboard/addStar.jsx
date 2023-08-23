import React, { useEffect, useState } from "react";
import AdminSideBar from "../../components/dashboard/AdminSideBar";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { baseUrl } from "../../../utils/baseUrl";

const AdminAddStarPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cookies] = useCookies(["token"]);
  const [brandData, setBrandData] = useState({});
  const editBrand = async () => {
    let fromdata = new FormData();
    fromdata.append("image", brandData.img);
    fromdata.append("stars", "⭐⭐⭐⭐⭐");
    try {
      await axios.post(`${baseUrl}/api/v1/stars`, fromdata, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
      toast.success("تمت أضافه الرأي بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      toast.error("لم يتم أضافه الرأي بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/v1/stars/${id}`, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
      toast.success("تمت حذف الرأي بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      toast.error("لم يتم حذف الرأي بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const [stars, setStars] = useState([]);
  const GetStars = async () => {
    const getAllStars = await axios(`${baseUrl}/api/v1/stars`);
    setStars(getAllStars.data.data);
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    GetStars();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section>
          <div className="container">
            <div className="row py-3">
              <div className="col-lg-4 col-md-12 col-sm-12">
                <AdminSideBar />
              </div>

              <div className="col-lg-7 col-md-12 col-sm-12">
                <div>
                  <div className="row justify-content-start ">
                    <div className="admin-content-text pb-4 fw-bold">
                      أضافه الرأي
                    </div>
                    <div className="col-lg-7 col-md-12 col-sm-12">
                      <div className="mb-3">
                        <label className="form-label fw-bold">الصورة</label>
                        <input
                          type="file"
                          className="form-control"
                          placeholder="الصورة"
                          onChange={(e) =>
                            setBrandData({ img: e.target.files[0] })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-7 col-md-12 col-sm-12 d-flex justify-content-end ">
                      <button
                        className="btn btn-primary mb-3 fw-bold"
                        onClick={() => editBrand()}
                      >
                        أضافه الرأي
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="bg-dark text-white fw-bold " scope="col">
                          الصوره
                        </th>
                        <th className="bg-dark text-white fw-bold " scope="col">
                          حذف
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {stars.map((brand) => (
                        <tr>
                          <td className=" fw-bold ">
                            <img
                              src={brand.image}
                              className="d-block width mx-auto"
                              style={{ maxWidth: "200px" }}
                              alt="..."
                            />
                          </td>
                          <td>
                            <button
                              className=" btn btn-danger"
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
        </section>
      )}
    </>
  );
};

export default AdminAddStarPage;
