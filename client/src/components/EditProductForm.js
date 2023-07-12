import React, { useState, useContext, useCallback, useEffect } from "react";
import { API, BEARER } from "../constant";
import axios from "axios";
import { getToken } from "../helpers";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/ShopPage.css";

const EditProductForm = (props) => {
  const navigate = useNavigate();
  const { theShop, onClose, showEditModal, setShowEditModal, product } = props;
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // react hook form
  const {
    register,
    reset,
    formState,
    formState: { isSubmitSuccessful, errors },
    handleSubmit,
  } = useForm();
  // const onSubmit = (data) => console.log(data);

  // Form submit handler to create product
  const onSubmit = async (data) => {
    // console.log("form submitted");

    setLoading(true);
    // console.log(product);

    axios
      .put(
        `${API}/products/${product.id}`,
        { data: data },
        {
          headers: {
            Authorization: `${BEARER} ${getToken()}`,
          },
        }
      )
      .then((res) => {
        // onSubmit()
        // console.log(res);
        if (res.status === 200) {
          setSuccessMessage(
            `"${res.data.data.attributes.product_name}" was successfully updated!`
          );
        }

        // setFormSubmitted(true);
      })
      .catch((err) => {
        console.log(err.response);
        setSuccessMessage("");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      {showEditModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-auto mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none product-form">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-2xl font-semibold text-black">
                    Edit Product
                  </h3>
                </div>
                {/*body*/}
                <div className="relative px-8 pb-auto flex-auto">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {successMessage ? (
                      <div
                        class="text-center bg-green-100 border border-green-400 text-green-700 px-2 py-1 rounded w-full relative"
                        role="alert"
                      >
                        <strong class="font-bold">Yay! </strong>
                        <span class="block sm:inline">{successMessage}</span>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="mb-5">
                      <label
                        htmlFor="product_name"
                        className="text-black font-semibold"
                      >
                        Product Name
                      </label>
                      <input
                        {...register("product_name", {
                          required: true,
                          value: product.attributes.product_name,
                        })}
                        className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        aria-invalid={errors.product_name ? "true" : "false"}
                      />
                      {errors.product_name?.type === "required" && (
                        <p role="alert" className="text-red-500">
                          Product name is required.
                        </p>
                      )}
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="product_name"
                        className="text-black font-semibold"
                      >
                        Product Price
                      </label>
                      <input
                        {...register("product_price", {
                          required: true,
                          min: 0.01,
                          value: product.attributes.product_price,
                        })}
                        step={0.01}
                        placeholder="0.01"
                        type="number"
                        className="block bg-white w-full rounded-md border-0 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        aria-invalid={
                          errors.product_price < 0.01 ? "true" : "false"
                        }
                      />
                      {errors.product_price?.type === "min" && (
                        <p role="alert" className="text-red-500">
                          Product price must be great than $0.
                        </p>
                      )}
                      {errors.product_price?.type === "required" && (
                        <p role="alert" className="text-red-500">
                          Product price is required.
                        </p>
                      )}
                    </div>

                    <input
                      {...register("product_shop", {
                        required: true,
                        value: theShop,
                      })}
                      type="hidden"
                    />
                    <div className="mb-5">
                      <input
                        type="submit"
                        className="bg-yellow-300 border-yellow-300 px-8 hover:shadow text-black active:bg-black hover:bg-white font-bold uppercase text-sm rounded  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 btn btn-sm"
                        onClick={() => {}}
                      />
                      <button
                        type="button"
                        onClick={onClose}
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default EditProductForm;
