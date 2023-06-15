import React from 'react';
import moment from "moment";
import {PropTypes} from "prop-types";

import Dropdown from "../../../components/Dropdown";
import Button from "../../../components/Button";
import Contact from "../../../components/Contact";

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

function Details({search, handleToggleStatus, handleShowModalWithSearch}) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3 gap-1 overflow-hidden">
        <p className="text-xl mb-3">
          Search text: <span className="font-bold">{search.name}</span>
        </p>

        <img className=""
             src={search.image}
             alt={search.text}/>

        <p className="text-lg pb-4">Options</p>

        <div className="px-1 grid grid-cols-2 gap-2">
          {search.options.map((e, index) =>
            <Contact
              key={index}
              image={e.image}
              title={e.name}
              subtitles={[
                (<span className="text-slate-500 text-sm font-medium dark:text-slate-400">
                    {formatValue(e.price, "$")}
                  </span>),
                (<div>
                  {e.has_discount &&
                  <span className={"px-4 rounded font-bold bg-back-200 text-xs text-white opacity-30 ml-1"}>
                    Discount!
                  </span>}
                </div>),
                (<a className="py-1 underline text-primary-100" target="_blank" rel="noreferrer noopener" href={e.link}>Open</a>)
              ]}
            />
          )}
        </div>

        {search.options.length === 0 &&
        <div className="text-center pt-2">
          <span className="text-gray-400">
            Data not available...
          </span>
        </div>}
      </div>
      <div className="col-span-1">
        <div className="flex text-xs mb-1">
          <div className="flex-grow"/>
          Availability: <span className={(search.available ? "bg-primary-100" : "bg-secondary-100 opacity-30") + " px-4 text-white rounded-md font-bold"}>
                    {search.available ? "Available" : "Sold out"}
                  </span>
        </div>
        <div className="flex text-xs mb-1">
          <div className="flex-grow"/>
          Platform: <span className="px-4 bg-secondary-100 text-white rounded-md font-bold opacity-30">
                    {search.platform}
                  </span>
        </div>
        <div className="flex text-xs mb-1">
          <div className="flex-grow"/>
          Strategy: <span className={"px-4 rounded-md font-bold " + PLANS_COLORS[search.check_strategy]}>
                    {search.check_strategy}
                  </span>
        </div>
        {search.last_availability_time &&
        <div className="flex mb-4">
          <div className="flex-grow"/>
          <p className="text-xs">
            Last available: <span className="text-gray-400">
                      {moment(search.last_availability_time).fromNow()}
                    </span>
          </p>
        </div>
        }
        <div className="flex mb-4">
        </div>
        <div className="flex mb-4">
          <div className="flex-grow"/>
          <a className="ml-2 py-1 underline text-primary-100" target="_blank" rel="noreferrer noopener" href={search.link}>Open</a>
          <Dropdown options={[
            {
              text: (search.status === "inactive" ? "Activate " : "Deactivate"),
              func: handleToggleStatus.bind(this, search),
            },
            {
              text: "Change plan",
              func: handleShowModalWithSearch.bind(this, search, "change_plan"),
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
  handleShowModalWithSearch: PropTypes.func.isRequired,
  search: PropTypes.shape({
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
