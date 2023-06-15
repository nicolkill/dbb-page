import React, { useState, useEffect } from 'react';

import uListApi from "../../../services/uListApi";
import firebase from "../../../services/firebase";
import Element from "../../../components/ui/dashboard/Element";
import AddProduct from "./modals/AddProduct";
import ChangeProductPlan from "./modals/ChangeProductPlan";
import Details from "./Details";

function Products() {
  const [loading, setLoading] = useState(true);
  const [tempProduct, setTempProduct] = useState(null);
  const [products, setProducts] = useState(null);
  const [modal, setModal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getProducts = async () => {
    const response = await uListApi.allProducts();
    const products = response.status === 200 ? response.body.data.map(product => ({id: product.id, ...product.attributes})) : [];
    setProducts(products);
    setLoading(false);
  };

  useEffect(() => {
    if (!products) {
      getProducts();
    }
  });

  const handleToggleStatus = async (product) => {
    const response = await uListApi.toggleProductStatus(product.id);

    firebase.addEvent("prodduct_status_toggle");

    if (response.status === 201) {
      const newProducts = products.map(
        p => p.id === product.id ?
          {id: product.id, ...response.body.data.attributes} : p
      );

      setProducts(newProducts);
    }
  };

  const handleShowModal = (state) => {
    firebase.addEvent("product_modal", {state});

    setTempProduct(null);
    setModal(state);
  };

  const handleShowModalWithProduct = (product, state) => {
    firebase.addEvent("plan_change", {state, product_id: product.id});

    setTempProduct(product);
    setModal(state);
  };

  const handleShowDetails = (product) => {
    firebase.addEvent("product_details", {product});

    setSelectedProduct(product)
  };

  const modalClose = (product) => {
    if (product) {
      let newProducts;
      const found = products.find((p) => p.id === product.id);
      if (found) {
        newProducts = products.map(
          p => p.id === product.id ? product : p
        );
      } else {
        newProducts = [product].concat(products);
      }
      setProducts(newProducts);
    }
    handleShowModal(null);
  };

  firebase.registerScreen("products");

  return (
    <div>
      {/* add product modal */}
      {modal === "add_product" &&
        <AddProduct closeCallback={modalClose}/>
      }

      {/*change product plan modal */}
      {modal === "change_plan" &&
        <ChangeProductPlan product={tempProduct} closeCallback={modalClose}/>
      }

      {/* ui */}
      <div className="grid grid-cols-3 gap-3">
        {/*options*/}
        <div className="grid grid-cols-1 gap-1">
          <div className="max-h-list overflow-y-auto">
            <button
              onClick={handleShowModal.bind(this, "add_product")}
              className="rounded-md py-4 border-dashed border-4 border-gray-400 opacity-30 hover:opacity-100 transition text-center w-full mb-1">
              <span className="w-full material-icons text-4xl">
                add
              </span>
              <span>
                Add a new Product
              </span>
            </button>

            {loading && [1, 1, 1, 1, 1, 1, 1, 1].map((i, index) => (
              <div key={index} className="animate-pulse">
                <div className="rounded-md p-4 border-4 border-gray-400 overflow-hidden opacity-50 text-gray-300 mb-1">
                  <div className="flex mb-4">
                    <p className="flex-grow truncate hover:text-left hover:text-clip pr-2 bg-gray-300 rounded-full">
                      easter egg
                    </p>
                  </div>
                  <div className="flex">
                    <div className="flex-1 bg-gray-300 rounded-full mr-2"/>
                    <div className="flex-1">
                      <span className="bg-gray-300 rounded-full flex mb-1">.</span>
                      <span className="bg-gray-300 rounded-full flex mb-1">.</span>
                      <span className="bg-gray-300 rounded-full flex mb-1">.</span>
                      <span className="bg-gray-300 rounded-full flex">.</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
            }

            {products && products.map((product, index) =>
              <Element
                key={index}
                element={{
                  tags: [
                    product.available ? "Available" : "Sold out",
                    product.platform,
                    product.check_strategy
                  ],
                  text: product.name,
                  image: product.image
                }}
                calculateStatus={() => product.status !== "inactive"}
                selectedCallback={handleShowDetails.bind(this, product)}
              />
            )}
          </div>
        </div>
        {/*content*/}
        <div className="col-span-2">
          <div className="rounded-md p-2 border border-gray-300">
            {!selectedProduct &&
            <div className="p-4">
              <span className="text-gray-400 text-lg">
                Select an a product to check details...
              </span>
            </div>}
            {selectedProduct &&
            <Details
              product={selectedProduct}
              handleToggleStatus={handleToggleStatus}
              handleShowModalWithProduct={handleShowModalWithProduct}
            />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
