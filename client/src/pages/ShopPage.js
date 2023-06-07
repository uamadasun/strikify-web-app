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
  // const [showForm, setShowForm] = useState(false); // State to control the visibility of the form
  const [showModal, setShowModal] = useState(false);

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
      const shopProducts = shopResponse.data.data.attributes.products.data;
      setShop(shopData);
      setShopId(shopId);
      setProducts(shopProducts);
    } catch (error) {
      console.error("Error fetching shop and products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShopAndProducts();
  }, []);

  const handleFormClose = () => {
    handleFormSubmit();
    setShowModal(false);
  };

  const handleFormSubmit = async () => {
    // Trigger a re-render by fetching updated data
    await fetchShopAndProducts();
  };

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
          {showModal ? (
            <ProductForm
              theShop={shopId}
              onClose={handleFormClose}
              onSubmit={handleFormSubmit}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          ) : (
            <button
              className="bg-yellow-300 btn btn-sm text-black active:bg-yellow-600 font-bold uppercase text-sm rounded shadow hover:bg-white outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(true)}
            >
              Add Products
            </button>
          )}
        </>
      ) : (
        <p className="text-center mt-5">You have products</p>
      )}
    </div>
  );
};

export default ShopPage;
