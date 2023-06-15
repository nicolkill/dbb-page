import React from 'react';
import moment from "moment";
import {PropTypes} from "prop-types";

import Dropdown from "../../../components/Dropdown";
import Button from "../../../components/Button";

const PLANS_COLORS = {
  basic: "bg-secondary-100 text-white opacity-30",
  medium: "bg-secondary-100 text-white opacity-60",
  advanced: "bg-secondary-100 text-white opacity-90",
  enthusiast: "bg-yellow-400 text-white",
  extreme: "bg-red-600 text-white",
}

function formatValue(value, prefix = "") {
  if (!value || value === "" || value === "not_available") {
    return (
      <span className="italic text-gray-300">
        ----
      </span>
    );
  }
  if (typeof value === "boolean") {
    return value ? "V":"X";
  }
  return prefix + value;
}

function Details({product, handleToggleStatus, handleShowModalWithProduct}) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3 gap-1 overflow-hidden">
        <p className="text-xl font-bold mb-3">
          {product.name}
        </p>

        <img className=""
             src={product.image}
             alt={product.text}/>

        <p className="text-lg pb-4">Changes History</p>

        <table className="table-auto w-full text-left">
          <thead className="border-b p-4">
          <tr>
            <th>Available</th>
            <th>Colors</th>
            <th>Options</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody>
          {product.price_history.map((e, index) =>
            <tr key={index}>
              <td>{formatValue(e.available)}</td>
              <td>{formatValue(e.colors)}</td>
              <td>{formatValue(e.options)}</td>
              <td>{formatValue(e.price, "$")}</td>
              <td>{formatValue(e.inserted_at)}</td>
            </tr>
          )}
          </tbody>
        </table>
        {product.price_history.length === 0 &&
        <div className="text-center pt-2">
          <span className="text-gray-400">
            Data not available...
          </span>
        </div>}
      </div>
      <div className="col-span-1">
        <div className="flex text-xs mb-1">
          <div className="flex-grow"/>
          Availability: <span className={(product.available ? "bg-primary-100" : "bg-secondary-100 opacity-30") + " px-4 text-white rounded-md font-bold"}>
                    {product.available ? "Available" : "Sold out"}
                  </span>
        </div>
        <div className="flex text-xs mb-1">
          <div className="flex-grow"/>
          Platform: <span className="px-4 bg-secondary-100 text-white rounded-md font-bold opacity-30">
                    {product.platform}
                  </span>
        </div>
        <div className="flex text-xs mb-1">
          <div className="flex-grow"/>
          Strategy: <span className={"px-4 rounded-md font-bold " + PLANS_COLORS[product.check_strategy]}>
                    {product.check_strategy}
                  </span>
        </div>
        {product.last_availability_time &&
        <div className="flex mb-4">
          <div className="flex-grow"/>
          <p className="text-xs">
            Last available: <span className="text-gray-400">
                      {moment(product.last_availability_time).fromNow()}
                    </span>
          </p>
        </div>
        }
        <div className="flex mb-4">
        </div>
        <div className="flex mb-4">
          <div className="flex-grow"/>
          <a className="ml-2 py-1 underline text-primary-100" target="_blank" rel="noreferrer noopener" href={product.link}>Open</a>
          <Dropdown options={[
            {
              text: (product.status === "inactive" ? "Activate " : "Deactivate"),
              func: handleToggleStatus.bind(this, product),
            },
            {
              text: "Change plan",
              func: handleShowModalWithProduct.bind(this, product, "change_plan"),
            }
          ]}>
            <Button type="secondary" size="small" >
              Options
            </Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

Details.propTypes = {
  handleToggleStatus: PropTypes.func.isRequired,
  handleShowModalWithProduct: PropTypes.func.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    platform: PropTypes.string.isRequired,
    check_strategy: PropTypes.string.isRequired,
    last_availability_time: PropTypes.string.isRequired,
  }),
};

Details.defaultProps = {
  calculateStatus: () => true,
};

export default Details;
