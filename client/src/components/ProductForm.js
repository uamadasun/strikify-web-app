import React, { useState, useContext } from "react";
import { API, BEARER } from "../constant";
import axios from "axios";
import { getToken } from "../helpers";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

// TODO: Figure out why form submits fine the first time but 400 error second time
//figure out why shop data is not being saved with addition of product
const ProductForm = (props) => {
  const [showModal, setShowModal] = useState(false);
  // const { user } = useAuthContext();
  const navigate = useNavigate();
  const theShop = props;
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    product_name: '',
    product_price:0.01,
    product_image :null,
    shop: theShop
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log(e.target.value);
    setProduct((prevState) => ({ ...prevState, [e.target.name]: value }));
  };

  // Form submit handler to create product
  const handleSubmit = async (e) => {
    console.log("form submitted");

    e.preventDefault();
    setLoading(true);
    console.log(product)


    
    axios
      .post(
        `${API}/products`,
        { data: product },
        {
          headers: {
            Authorization: `${BEARER} ${getToken()}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setFormSubmitted(true)
        
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        setLoading(false);
        setProduct({
          product_name: '',
          product_price: 0.01,
          product_image :'',
          shop: theShop
        })
      });
  };
    // Function to force re-render
    const forceUpdate = () => {
      setFormSubmitted(false);
    };
  
    // Check if form is submitted and force re-render
    if (formSubmitted) {
      forceUpdate();
    }
  return (
    <div>
      <div className="mx-auto flex justify-center mt-4">
        <button
          className="bg-yellow-300 btn btn-sm  text-black active:bg-yellow-600 font-bold uppercase text-sm  rounded shadow hover:bg-white outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Products
        </button>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-auto mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-2xl font-semibold text-black">
                    New Product
                  </h3>
                </div>
                {/*body*/}
                <div className="relative px-8 pb-auto flex-auto">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="product_name" className="text-black">
                         Name
                      </label>
                      <input
                        type="text"
                        name="product_name"
                        id="product_name"
                        className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                        onChange={handleInputChange}
                        value={product.product_name}
                      />
                    </div>
                    <div className="mt-5">
                      <label htmlFor="product_price" className="text-black mb-5">
                         Price
                      </label>
                      <div className="flex">
                        <p className="my-auto text-black mr-1">$</p>
                        <input
                          type="number"
                          name="product_price"
                          id="product_price"
                          className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          required
                          onChange={handleInputChange}
                          step={0.01}
                          placeholder="0.01"
                          value={product.product_price}
                        />
                      </div>
                    </div>
                    <div className="mt-5">
                      <label htmlFor="product_image" className="text-black">
                         Image
                      </label>
                      <input
                        type="file"
                        name="product_image"
                        id="product_image"
                        className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleInputChange}
                        value={''}
                      />
                    </div>
                    <input required type="hidden" name="shop" id="shop" value={theShop}/>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 ">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-yellow-300 border-yellow-300 px-8 hover:shadow text-black active:bg-black hover:bg-white font-bold uppercase text-sm rounded  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 btn btn-sm"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default ProductForm;