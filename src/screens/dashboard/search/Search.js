import React, {useEffect, useState} from 'react';
import AddSearch from "./modals/AddSearch";
import ChangeSearchPlan from "./modals/ChangeSearchPlan";
import Element from "../../../components/ui/dashboard/Element";
import Details from "./Details";
import uListApi from "../../../services/uListApi";
import firebase from "../../../services/firebase";

function Search() {
  const [loading, setLoading] = useState(true);
  const [tempSearch, setTempSearch] = useState(null);
  const [searches, setSearches] = useState(null);
  const [modal, setModal] = useState(null);
  const [selectedSearch, setSelectedSearch] = useState(null);

  const getSearches = async () => {
    const response = await uListApi.allSearches();
    const searches = response.status === 200 ? response.body.data.map(search => ({id: search.id, ...search.attributes})) : [];
    setSearches(searches);
    setLoading(false);
  };

  useEffect(() => {
    if (!searches) {
      getSearches();
    }
  });

  const handleToggleStatus = async (search) => {
    const response = await uListApi.toggleSearchStatus(search.id);

    firebase.addEvent("product_status_toggle");

    if (response.status === 201) {
      const newSearches = searches.map(
        p => p.id === search.id ?
          {id: search.id, ...response.body.data.attributes} : p
      );

      setSearches(newSearches);
    }
  };

  const handleShowModal = (state) => {
    firebase.addEvent("product_modal", {state});

    setTempSearch(null);
    setModal(state);
  };

  const handleShowModalWithProduct = (search, state) => {
    firebase.addEvent("plan_change", {state, product_id: search.id});

    setTempSearch(search);
    setModal(state);
  };

  const handleShowDetails = (search) => {
    firebase.addEvent("product_details", {search});

    setSelectedSearch(search)
  };

  const modalClose = (search) => {

    if (search) {
      let newSearches;
      const found = searches.find((p) => p.id === search.id);
      if (found) {
        newSearches = searches.map(
          p => p.id === search.id ? search : p
        );
      } else {
        newSearches = [search].concat(searches);
      }
      setSearches(newSearches);
    }
    handleShowModal(null);
  };

  firebase.registerScreen("searches");

  return (
    <div>
      {/* add searche modal */}
      {modal === "add_product" &&
      <AddSearch closeCallback={modalClose}/>
      }

      {/*change search plan modal */}
      {modal === "change_plan" &&
      <ChangeSearchPlan search={tempSearch} closeCallback={modalClose}/>
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
                Add a new Search
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

            {searches && searches.map((search, index) =>
              <Element
                key={index}
                element={{
                  tags: [
                    search.platform,
                    search.check_strategy
                  ],
                  text: search.name,
                  image: search.image
                }}
                calculateStatus={() => search.status !== "inactive"}
                selectedCallback={handleShowDetails.bind(this, search)}
              />
            )}
          </div>
        </div>
        {/*content*/}
        <div className="col-span-2">
          <div className="rounded-md p-2 border border-gray-300">
            {!selectedSearch &&
            <div className="p-4">
              <span className="text-gray-400 text-lg">
                Select an a search to check details...
              </span>
            </div>}
            {selectedSearch &&
            <Details
              search={selectedSearch}
              handleToggleStatus={handleToggleStatus}
              handleShowModalWithSearch={handleShowModalWithProduct}
            />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
