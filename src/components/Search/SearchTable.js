import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { Select } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

function SearchTable(props) {
  const [allItems, setAllItems] = useState(props.coaches);
  const [items, setItems] = useState(props.coaches);

  //Filtering functions >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
  const [selectedGender, setSelectedGender] = useState("gender");
  const createGenderOptions = () => {
    let _genderOptions = [];

    const genderOptionObjectCreator = (key, text, value) => {
      return { key: key, text: text, value: value };
    };

    _genderOptions.push(
      genderOptionObjectCreator("gender", "Gender", "gender")
    );
    _genderOptions.push(genderOptionObjectCreator("male", "Male", "male"));
    _genderOptions.push(
      genderOptionObjectCreator("female", "Female", "female")
    );

    return _genderOptions;
  };

  const genderOptions = createGenderOptions();

  const filterByGender = (coaches, requiredGender) => {
    // if default option is chosen ignore this filter
    if (requiredGender != "gender") {
      let filteredCoaches = coaches.filter((coach) => {
        return coach.gender == requiredGender;
      });
      return filteredCoaches;
    } else {
      return coaches;
    }
  };

  const handleGenderChange = (e, data) => {
    let selectedGender = data.value;
    setItems(filterByGender(allItems, selectedGender));
    setSelectedGender(selectedGender);
    setSelectedSort("sort");
  };

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Filtering functions//

  //Sorting functions >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
  const [selectedSort, setSelectedSort] = useState("sort");

  const createSortingOptions = () => {
    let _sortingOptions = [];

    const filterOptionObjectCreator = (key, text, value) => {
      return { key: key, text: text, value: value };
    };

    _sortingOptions.push(filterOptionObjectCreator("sort", "Sort By", "sort"));
    _sortingOptions.push(
      filterOptionObjectCreator("priceAsc", "Price (Low to high)", "priceAsc")
    );
    _sortingOptions.push(
      filterOptionObjectCreator("priceDesc", "Price (High to low)", "priceDesc")
    );
    _sortingOptions.push(
      filterOptionObjectCreator("rateDesc", "Rate (High to low)", "rateDesc")
    );

    return _sortingOptions;
  };
  const sortingOptions = createSortingOptions();

  const sortCoaches = (coaches, sortAttribute, pattern) => {
    // if default option is chosen ignore this filter
    if (sortAttribute != "sort") {
      let sortedCoaches = [...coaches];
      sortedCoaches.sort((a, b) =>
        pattern.includes("Desc")
          ? b[sortAttribute] - a[sortAttribute]
          : a[sortAttribute] - b[sortAttribute]
      );
      return sortedCoaches;
    } else {
      return coaches;
    }
  };

  const handleSortChange = (e, data) => {
    let selectedSort = data.value;
    let coachAttribute = "";

    switch (selectedSort) {
      case "priceAsc":
      case "priceDesc":
        coachAttribute = "fees";
        break;
      case "rateAsc":
      case "rateDesc":
        coachAttribute = "total_rate";
        break;
      case "sort":
        coachAttribute = "sort";
        break;
    }
    if (coachAttribute != "sort") {
      setItems(sortCoaches(items, coachAttribute, selectedSort));
    }else{
      setItems(sortCoaches(items, "id", selectedSort));
    }
    setSelectedSort(selectedSort);
  };
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Sorting functions//

  function Items({ currentPageCoaches }) {
    return (
      <div style={{ minHeight: "500px" }}>
        {currentPageCoaches[0] != "empty" ? (
          currentPageCoaches.map((coach, index) => {
            return (
              <React.Fragment>
                <div className="search-result mb-4">
                  <div className="row m-0">
                    <div className="col-sm-3 py-4 px-4">
                      <img
                        className="img-thumbnail"
                        src={"http://127.0.0.1:8000/storage/" + coach.image}
                      />
                    </div>
                    <div className="col-md-7 col-sm-9 py-4 px-0 data">
                      <h2>{coach.name_en}</h2>
                      <h6>
                        <i className="fa fa-book-bookmark"></i>
                        Specialty : {coach.specialist.name_en}
                      </h6>
                      <h6>
                        <i className="fa fa-earth-americas"></i>
                        {coach.country.name_en} - {coach.city.name_en} -
                        {coach.district.name_en} - {coach.address_en}
                      </h6>
                      <h6>
                        <i class="fa fa-user"></i>{" "}
                       Age : {coach.age}
                      </h6>
                      <h6>
                        <i className="fa fa-money-bill-wave"></i>
                        Session : {coach.fees} LE
                      </h6>
                    </div>

                    <div className="col-md-2 py-4 px-4">
                      <div className="rating-and-booking">
                        <div>
                          <div className="rating mb-3 text-center">
                            <i className="fas fa-star fa-4x">
                              <span>{coach.total_rate}</span>
                            </i>
                          </div>
                          <div className="booking">
                            <div className="text-center">
                              <a
                                href={
                                  "http://" +
                                  window.location.host +
                                  "/coaches/" +
                                  coach.id
                                }
                                className="btn"
                              >
                                Book Now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <div className="alert alert-danger text-center h5">
            No coaches found on that search criteria, try different search
          </div>
        )}
      </div>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    const [currentPageCoaches, setCurrentPageCoaches] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentPageCoaches(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
      setLoaded(true);
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };

    return (
      loaded && (
        <React.Fragment>
          <div className="search-control container">
            <div className="row">
              <div className="col-md-3 my-3">
                <div className="search-filter">
                  <div className="search-filter-header px-3 py-2">
                    <div className="row">
                      <div className="col-10 my-1">
                        <i className="fa fa-filter"></i> Filters
                      </div>
                      <div className="col-2 text-right">
                        <button
                          className="btn d-lg-none p-0"
                          data-toggle="collapse"
                          data-target="#search-filter-body"
                          aria-expanded="false"
                          aria-controls="search-filter-body"
                        >
                          <i className="fa fa-plus pull-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    id="search-filter-body"
                    className="collapse search-filter-body px-3 py-2"
                  >
                    <p className="my-2 cat">
                      <i className="fa fa-venus-mars"></i> Gender
                    </p>
                    <Select
                      className="w-100 text-center"
                      placeholder="Gender"
                      style={{ border: "solid 1px" }}
                      options={genderOptions}
                      value={selectedGender}
                      onChange={handleGenderChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <label>Sort by:</label>
                <Select
                  className="m-4"
                  title="sort"
                  placeholder="Sort by :"
                  style={{ border: "solid 1px", width: "180px" }}
                  options={sortingOptions}
                  value={selectedSort}
                  onChange={handleSortChange}
                />
                <>
                  <Items currentPageCoaches={currentPageCoaches} />
                  <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    activeLinkClassName="bg-dark text-white border border-dark"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                  />
                </>
              </div>
            </div>
          </div>
        </React.Fragment>
      )
    );
  }

  return (
    <div>
      <PaginatedItems itemsPerPage={5} />
    </div>
  );
}

export default SearchTable;
