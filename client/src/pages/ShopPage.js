import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { API, BEARER } from "../constant";
import { getToken } from "../helpers";
import { useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";

const ShopPage = () => {
  const [loading, setLoading] = useState(false);
  const [shop, setShop] = useState({});
  const [shopId, setShopId] = useState(0);
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  const fetchShopAndProducts = async () => {
    setLoading(true);

    try {
      const shopResponse = await axios.get(`${API}/shops/${id}?populate=*`, {
        headers: {
          Authorization: `${BEARER} ${getToken()}`,
        },
      });
      const shopData = shopResponse.data.data.attributes;
      const shopId = shopResponse.data.data.id;
      setShop(shopData);
      setShopId(shopId)
      console.log("Shop data: ",shopData)
      console.log("Shop ID: ",shopId)
      const shopProducts = shopResponse.data.data.attributes.products.data;
      setProducts(shopProducts);
      console.log("products: " ,shopResponse.data.data.attributes.products.data)
    } catch (error) {
      console.error("Error fetching shop and products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShopAndProducts();
  }, [ ]);

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
          <ProductForm theShop={shopId} fetchShopAndProducts={fetchShopAndProducts}/>
        </>
      ) : (
        <p className="text-center mt-5">You have products</p>
      )}
    </div>
  );
};

export default ShopPage;

