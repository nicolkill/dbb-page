import React, {useState} from "react";

import uListApi from "../../../../services/uListApi";

import Alert from "../../../../components/Alert";
import Modal from "../../../../components/Modal";
import Contact from "../../../../components/Contact";
import TextTerminal from "../../../../components/TextTerminal";
import LinkCheckInput from "../../../../components/LinkCheckInput";

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

function AddSearch({closeCallback}) {
  const [error, setError] = useState(null);
  const [searchInfo, setSearchInfo] = useState(null);

  const handleSearchCheck = async (data) => {
    if (data) {
      setSearchInfo(data);
      return;
    }
    setError(<p><b>Error: </b>your search isn't supported</p>);
  }

  const handleSearchAdd = async () => {
    const response = await uListApi.addSearch(searchInfo.code);
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
          type: (searchInfo ? "secondary" : "disabled"),
          callback: handleSearchAdd,
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
          Copy the link of your search in the page, you can configure the search with filters
        </p>
        <img
          className="pt-2"
          src="/images/product_url_copy.png"
          alt="copy link"/>
        <p className="pt-2">
          Compatible sites: <TextTerminal extraClasses="font-bold" options={uListApi.availableSearchPages()}/>
        </p>
      </Alert>

      <p className="text-2xl py-4">
        Put your link here:
      </p>
      <LinkCheckInput callback={handleSearchCheck} type="search"/>
      {searchInfo &&
      <div>
        <div className="flex py-2">
          <p className="text-xl flex-flow pt-2 pr-2 truncate">
            Search text: <span className="font-bold">{searchInfo.search_info.name}</span>
          </p>
        </div>
        <div className="max-h-modalcontent overflow-auto grid grid-cols-2 gap-2 px-1">
          {searchInfo.search_info.options.map((e, index) =>
            <Contact
              key={index}
              title={e.name}
              image={e.image}
              subtitles={[
                (<div>
                  <span className="text-slate-500 text-sm font-medium dark:text-slate-400">
                    {formatValue(e.price, "$")}
                  </span>
                  {e.has_discount &&
                  <span className={"px-4 rounded font-bold bg-back-200 text-xs text-white opacity-30 ml-1"}>
                    Discount!
                  </span>}
                </div>),
              ]}
              />
          )}
        </div>
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

export default AddSearch;
