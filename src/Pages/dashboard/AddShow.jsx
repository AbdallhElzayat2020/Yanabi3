import React, { useEffect, useState } from "react";
import AdminSideBar from "../../components/dashboard/AdminSideBar";
import Loading from "../../components/Loading/Loading";
import { baseUrl } from "../../../utils/baseUrl";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import axios from "axios";

const AddShow = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [brandData, setBrandData] = useState({});

  const [cookies] = useCookies(["token"]);
  const editBrand = async () => {
    let fromdata = new FormData();
    fromdata.append("image", brandData.img);
    try {
      await axios.post(`${baseUrl}/api/v1/ads`, fromdata, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
      toast.success("تمت أضافه الاعلان بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      toast.error("لم يتم أضافه الاعلان بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/v1/ads/${id}`, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
      toast.success("تمت حذف الاعلان بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      toast.error("لم يتم حذف الاعلان بنجاح", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const [stars, setStars] = useState([]);
  const GetStars = async () => {
    const getAllStars = await axios(`${baseUrl}/api/v1/ads`);
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
            <div className="row py-3 d-flex gap-5  justify-content-between">
              <div className="col-lg-4 col-md-12 col-sm-12">
                <AdminSideBar />
              </div>

              <div className="col-lg-6 col-md-12 col-sm-12">
                <div>
                  <div className="row justify-content-start ">
                    <div className="admin-content-text pb-4 fw-bold">
                      <h4>أضافه الاعلان</h4>
                    </div>
                    <div className="col-lg-7 col-md-12 col-sm-12">
                      <div className="mb-3 col-md-12 col-sm-12">
                        <label className="form-label fw-bold">
                          اختر الصورة
                        </label>
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
                        أضافه الاعلان
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

export default AddShow;
