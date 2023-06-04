import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import { API, BEARER } from "../constant";
import { getToken } from "../helpers";
import { useParams } from "react-router-dom";

const ShopPage = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const [shop, setShop] = useState({});
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  const fetchShopAndProducts = async () => {
    setLoading(true);

    try {
      const shopResponse = await axios.get(`${API}/shops/${id}`, {
        headers: {
          Authorization: `${BEARER} ${getToken()}`,
        },
      });
      const shopData = shopResponse.data.data.attributes;
      setShop(shopData);

      const productsResponse = await axios.get(
        `${API}/products?filters[shop_id][$eq]=${id}`,
        {
          headers: {
            Authorization: `${BEARER} ${getToken()}`,
          },
        }
      );
      // console.log("Products Data: ", productsResponse.data)
      setProducts(productsResponse.data.data);
    } catch (error) {
      console.error("Error fetching shop and products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchShopAndProducts();
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="mt-40 text-2xl text-center">{shop.shop_name}</h1>
      {products.length === 0 ? (
        <>
          <p className="text-center mt-5">
            You don't have any products in this shop.
          </p>
          <button
            className=" mx-auto my-3 block btn btn-sm rounded-md bg-yellow-300 px-auto py-auto text-sm font-semibold leading-7 text-black shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
          >
            Add Products
          </button>
        </>
      ) : (
        <p className="text-center mt-5">You have products</p>
      )}
    </div>
  );
};

export default ShopPage;
