import React, {useState} from "react";

import Modal from "../../../../components/Modal";
import Alert from "../../../../components/Alert";
import Button from "../../../../components/Button";
import uListApi from "../../../../services/uListApi";

const PLANS = {
  basic: "12hrs",
  medium: "6hrs",
  advanced: "2hrs",
  enthusiast: "30min",
  extreme: "5min",
};

function ChangeProductPlan({closeCallback, product: propProduct}) {
  const [product, setProduct] = useState(propProduct);
  const handlePlanChange = async (plan) => {
    if (product.check_strategy === plan) {
      return;
    }

    const response = await uListApi.changeProductPlan(product.id, plan);
    if (response.status === 201) {
      setProduct({id: response.body.data.id, ...response.body.data.attributes});
    }
  }

  const handleClose = () => {
    closeCallback(product);
  };

  return (
    <Modal
      options={[
        {
          text: "Close",
          callback: handleClose,
          type: "link",
        }
      ]}
      closeCallback={handleClose}
      display>
      <p className="text-2xl">
        Change the plan:
      </p>

      <Alert extraClasses="mt-4" type="danger" alertCustomText="Warning!">
        The point it's adjust the time to the priority that the product needs
      </Alert>

      <div className="flex mt-4">
        {Object.keys(PLANS).map((plan, index) => (
          <div className="px-1">
            <Button
              className="flex-1"
              type={product.check_strategy === plan ? "link" : "secondary"}
              callback={handlePlanChange.bind(this, plan)} >
              {PLANS[plan]}
            </Button>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default ChangeProductPlan;
