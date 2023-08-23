import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { baseUrl } from "../../../utils/baseUrl";
import { useNavigate, useParams } from "react-router-dom";
const CreateOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userAddress, seuUerAddress] = useState([]);
  const [cookies] = useCookies(["token"]);
  const getMe = async () => {
    const userAddressRes = await axios.get(`${baseUrl}/api/v1/addresses`, {
      headers: { Authorization: `Bearer ${cookies.token}` },
    });
    seuUerAddress(userAddressRes.data.data);
  };
  useEffect(() => {
    getMe();
  }, []);
  const addAddress = async (address) => {
    let res = await axios.post(
      `${baseUrl}/api/v1/orders/${id}`,
      { shippingAddress: address },
      {
        headers: { Authorization: `Bearer ${cookies.token}` },
      }
    );
    navigate(`/cart/pay/${res.data.data._id}`);
  };
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">العنوان مكتوب</th>
          <th scope="col">رقم الهاتف</th>
          <th scope="col">المدينه</th>
          <th scope="col">أختر هذا العنوان</th>
        </tr>
      </thead>
      <tbody>
        {userAddress.map((address) => (
          <tr key={address._id}>
            <td>{address?.details || "لا يوجد"}</td>
            <td>{address?.phone || "لا يوجد"}</td>
            <td>{address?.city || "لا يوجد"}</td>
            <td>
              <button
                className="btn btn-primary"
                onClick={() => addAddress(address)}
              >
                أختر
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CreateOrder;
