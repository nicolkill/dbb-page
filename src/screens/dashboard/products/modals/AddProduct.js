import React, {useState} from "react";

import uListApi from "../../../../services/uListApi";

import Alert from "../../../../components/Alert";
import Modal from "../../../../components/Modal";
import TextTerminal from "../../../../components/TextTerminal";
import LinkCheckInput from "../../../../components/LinkCheckInput";

function AddProduct({closeCallback}) {
  const [error, setError] = useState(null);
  const [productInfo, setProductInfo] = useState(null);

  const handleProductCheck = async (data) => {
    if (data) {
      setProductInfo(data);
      return;
    }
    setError(<p><b>Error: </b>your product isn't supported</p>);
  }

  const handleProductAdd = async () => {
    const response = await uListApi.addProduct(productInfo.code);
    if (response.status === 201) {
      closeCallback(response.body.data.attributes);
    }
  }

  const handleClose = () => {
    closeCallback(null);
  };

  return (
    <Modal
      options={[
        {
          text: "Add it!",
          type: (productInfo ? "secondary" : "disabled"),
          callback: handleProductAdd,
        },
        {
          text: "Close",
          callback: handleClose,
          type: "link",
        }
      ]}
      closeCallback={handleClose}
      display>

      <Alert type="secondary" alertCustomText="Information" extraClasses="mt-2">
        <p>
          Copy the link of your product in the page
        </p>
        <img
          className="pt-2"
          src="/images/product_url_copy.png"
          alt="copy link"/>
        <p className="pt-2">
          Compatible sites: <TextTerminal extraClasses="font-bold" options={uListApi.availableProductPages()}/>
        </p>
      </Alert>

      <p className="text-2xl py-4">
        Put your link here:
      </p>
      <LinkCheckInput callback={handleProductCheck} type="product"/>
      {productInfo &&
      <div>
        <div className="flex py-2">
          <p className="text-xl font-bold flex-flow pt-2 pr-2 truncate">
            {productInfo.product_info.name}
          </p>
        </div>
        <img className="w-full md:w-1/3 mb-4"
             src={productInfo.product_info.image}
             alt={productInfo.product_info.name}/>
      </div>
      }
      {error &&
      <Alert closeCallback={setError.bind(this, "")} type="error">
        {error}
      </Alert>
      }
    </Modal>
  );
}

export default AddProduct;
