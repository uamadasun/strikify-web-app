import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { API, BEARER } from "../constant";
import { getToken } from "../helpers";
import { Link, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import defaultProduct from "../assets/defaultProduct.png";

const ShopPage = () => {
  const [loading, setLoading] = useState(false);
  const [shop, setShop] = useState({});
  const [shopId, setShopId] = useState(0);
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  // const [showForm, setShowForm] = useState(false); // State to control the visibility of the form
  const [showModal, setShowModal] = useState(false);
  // todo: show edit modal
  const [showEditModel, setShowEditModal] = useState(false);
  // console.log("products:", products);

  // Number formatter
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Function to fetch shops and products
  const fetchShopAndProducts = async () => {
    setLoading(true);

    try {
      const shopResponse = await axios.get(`${API}/shops/${id}?populate=*`, {
        headers: {
          Authorization: `${BEARER} ${getToken()}`,
        },
      });
      const shopData = shopResponse.data.data.attributes;
      console.log("Shop data: ", shopResponse.data.data.attributes);
      const shopId = shopResponse.data.data.id;
      console.log("Shop ID: ", shopResponse.data.data.id);
      const shopProducts = shopResponse.data.data.attributes.products.data;
      console.log(
        "Fetched Products: ",
        shopResponse.data.data.attributes.products.data
      );

      await setShop(shopData);
      setShopId(shopId);
      await setProducts(shopProducts);
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

  const deleteProduct = async (productId) => {
    try {
      const deleteResponse = await axios.delete(
        `${API}/products/${productId}`,
        {
          headers: {
            Authorization: `${BEARER} ${getToken()}`,
          },
        }
      );
      fetchShopAndProducts();
      console.log("successful deletion");
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1 className="mt-40 text-2xl text-center">{shop.shop_name}</h1>
      {products.length === 0 ? (
        <div className="flex flex-col justify-center">
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
              className="bg-yellow-300 w-fit mt-3 self-center btn btn-sm text-black active:bg-yellow-600 font-bold uppercase text-sm rounded shadow hover:bg-white outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(true)}
            >
              Add Products
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="flex justify-center">
            {showModal ? (
              <ProductForm
                theShop={shopId}
                onClose={handleFormClose}
                onSubmit={handleFormSubmit}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            ) : (
              ""
            )}
          </div>

          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h2 className="text-base font-semibold  text-gray-100">
                  Products
                </h2>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex gap-2">
                <button
                  type="button"
                  className="block rounded-md bg-yellow-300 px-3 py-2 text-center text-sm font-semibold text-black shadow-sm hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => setShowModal(true)}
                >
                  Add Product
                </button>
                <button
                  type="button"
                  className="block rounded-md bg-green-400 px-3 py-2 text-center text-sm font-semibold text-black shadow-sm hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  New Order
                </button>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className=" pl-4 pr-3 text-left text-sm font-semibold text-gray-100 sm:pl-0"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3  text-left text-sm font-semibold text-gray-100"
                        >
                          Price
                        </th>

                        <th scope="col" className="relative  pl-3 pr-4 sm:pr-0">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 ">
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm sm:pl-0">
                            <div className="flex items-center">
                              <div className="h-11 w-11 flex-shrink-0 ">
                                <img
                                  className="h-11 w-11 rounded-full"
                                  src={
                                    product.attributes.product_image
                                      ? product.attributes.product_image
                                      : defaultProduct
                                  }
                                  alt={`${product.attributes.product_name}`}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-100">
                                  {product.attributes.product_name}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-100">
                            {formatter.format(product.attributes.product_price)}
                          </td>
                          <td className="relative whitespace-nowrap py-1 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <Link
                              to={`/product/${product.id}`}
                              className="text-yellow-500 font-semibold mr-3 hover:text-yellow-300"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => {
                                deleteProduct(product.id);
                              }}
                              className="text-red-500 font-semibold mr-3  hover:text-red-400"
                            >
                              Delete
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
        </>
      )}
    </div>
  );
};

export default ShopPage;
