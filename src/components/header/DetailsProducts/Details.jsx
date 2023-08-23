import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Deatils.css";
import AlertComponent from "../../Alert/Alert";
import axios from "axios";
import { baseUrl } from "../../../../utils/baseUrl";
import Loading from "../../Loading/Loading";
import CopyLinkButton from "../../SaveLinks/SaveLinks";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

const Details = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState({});
  let { id } = useParams();
  const Get_Product = async () => {
    const getAllProducts = await axios(`${baseUrl}/api/v1/products/${id}`);
    setDetails(getAllProducts.data.data);
  };
  const [cookies] = useCookies(["token"]);

  const addProductToCart = async () => {
    if (details.active) {
      try {
        await axios.post(
          `${baseUrl}/api/v1/cart`,
          { productId: id },
          { headers: { Authorization: `Bearer ${cookies.token}` } }
        );
        toast.success("تمت أضافه المنتج بنجاح الي السله", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (err) {
        toast.success("لم يتم أضافه المنتج بنجاح الي السله", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      toast.error("المنتج غير متوفر");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    Get_Product();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="details">
          <div className="container">
            <AlertComponent />
            <div className="row gap-1">
              <div className="col-lg-6 img d-flex align-items-center justify-content-center  p-2  image">
                <img className=" mx-auto img" src={details.productImg} alt="" />
              </div>
              <div className="col-lg-6  d-flex align-items-center justify-content-center row text-center">
                <h3>{details.title}</h3>
                <p>{details.description}</p>
                <button
                  className="btn btn-primary mt-1"
                  onClick={() => addProductToCart()}
                >
                  السعر {details.price}
                  <strong> ريال يمني </strong>
                </button>
                <button
                  className="btn btn-primary  mt-1"
                  onClick={() => addProductToCart()}
                >
                  السعر {details.priceSAR}
                  <strong> ريال سعودي </strong>
                </button>
                <button
                  className="btn btn-primary  mt-1"
                  onClick={() => addProductToCart()}
                >
                  السعر {details.priceUSD}
                  <strong> دولار </strong>
                </button>
                <CopyLinkButton />
              </div>
              <div className="col-lg-12 mt-2  d-flex align-items-center justify-content-center row text-center">
                <p>
                  في حالة الشراء من صنعاء قيمة الشحن 1000 ريال يمني وفي حالة
                  الشراء لبقية المحافظات تبدا التكلفة بسعر 2000 ريال يمني الي حد
                  5000ريال يمني
                </p>
              </div>
              <div className="row">
                {details.image.map((item, i) => (
                  <div className="col-lg-3" key={i}>
                    <img src={item} alt="" />
                  </div>
                ))}
              </div>
            </div>
            <Link to="/" className="btn btn-primary">
              أراء العملاء
            </Link>
            <div className="mt-3 table-details d-flex align-items-center justify-content-center  text-center">
              <table className="table  table-striped">
                <thead className="t-head">
                  <tr className="tr-table">
                    <th scope="col">الخط العطري</th>
                    <th scope="col">ثبات العطر</th>
                    <th scope="col">
                      <span>حجم المنتج</span>
                    </th>
                    <th scope="col">نوع العطر</th>
                    <th scope="col">الشركه المصنعه</th>
                    <th scope="col">القسم</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>
                      {details?.aromatic_line_classification || " لم يحدد"}
                    </th>
                    <td>{details?.fragrance_stability || "  لم يحدد"} ساعه</td>
                    <td>{details?.product_size || "  لم يحدد"}ملي</td>
                    <td>{details?.type || "  لم يحدد"}</td>
                    <td>{details?.brand?.name || "لم يحدد  "}</td>
                    <td>{details?.category?.name || " لم يحدد "}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Details;
