import * as React from "react";
import Cities from "./Cities";
import Specialties from "./Specialties";
import Districts from "./Districts";
import { useNavigate, useSearchParams } from "react-router-dom";

function SearchBar({ updateCoaches }) {
  let navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [cityId, setCityId] = React.useState(searchParams.get("city_id"));
  const updateCityId = (cityId) => setCityId(cityId);

  const [districtId, setDistrictId] = React.useState(
    searchParams.get("district_id")
  );
  const updateDistrictId = (districtId) => setDistrictId(districtId);

  const [specialtyId, setSpecialtyId] = React.useState(
    searchParams.get("specialist_id")
  );
  const [nameEn, setNameEn] = React.useState(searchParams.get("name_en") || "");

  const [districts, setDistricts] = React.useState([]);
  const updateDistricts = (districts) => setDistricts(districts);

  React.useEffect(() => {
    let searchQuery = searchFieldsToQueryUrl();
    searchRequest(searchQuery);
  }, []);

  const sendSpecialtyIdToParent = (index) => {
    setSpecialtyId(index);
  };

  const handleNameChange = (e) => setNameEn(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    let searchQuery = searchFieldsToQueryUrl();
    searchRequest(searchQuery);
    window.location.href = `/search?${searchQuery}`;
  };

  // Main search function that turns the search fields into a url search query
  const searchFieldsToQueryUrl = () => {
    const createSearchParamsObj = () => {
      let searchParamsObj = {};
      searchParamsObj.specialist_id = specialtyId;
      searchParamsObj.city_id = cityId;
      searchParamsObj.district_id = districtId;
      searchParamsObj.name_en = nameEn;

      for (const key in searchParamsObj) {
        if (!searchParamsObj[key] || searchParamsObj[key] == "null") {
          delete searchParamsObj[key];
        }
      }
      return searchParamsObj;
    };

    const paramsObjToUrl = (obj) => {
      let searchQueryUrl = "";
      for (const key in obj) {
        searchQueryUrl += `&${key}=${obj[key]}`;
      }
      // Removing the first "&" to fix the query
      searchQueryUrl = searchQueryUrl.slice(1, searchQueryUrl.length);
      return searchQueryUrl;
    };

    let searchParamsObj = createSearchParamsObj();
    let searchQueryUrl = paramsObjToUrl(searchParamsObj);
    return searchQueryUrl;
  };

  const searchRequest = (searchQuery) => {
    const axios = require("axios");
    const config = {
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        'Access-Control-Allow-Origin': '*',
      },
      
      url: `http://127.0.0.1:8001/api/search?${searchQuery}`,
    };
    axios(config)
      .then((res) => {
        if (res.data.length) {
          updateCoaches(res.data);
        } else {
          updateCoaches(["empty"]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <section className="container home-search home-page-search mb-5">
        <form action="#" method="get" className="search-box">
          <div className="row">
            <div className="select-form col-lg col-md-4 col-sm-12">
              <label className="text-dark">
                <i className="fa fa-earth-americas mx-4"></i>
                City
              </label>
              <div className="nice-select" tabIndex="0">
                <span className="current"></span>
                <Cities
                  cityIdInitialValue={cityId}
                  updateCityId={updateCityId}
                  updateDistricts={updateDistricts}
                />
              </div>
            </div>
            <div className="select-form col-lg col-md-4 col-sm-12">
              <label className="text-dark">
                <i className="fa fa-earth-americas mx-4"></i>
                District
              </label>

              <div className="nice-select" tabIndex="0">
                <span className="current"></span>
                <Districts
                  districtIdInitialValue={districtId}
                  districts={districts}
                  updateDistrictId={updateDistrictId}
                />
              </div>
            </div>
            <div className="select-form col-lg col-md-4 col-sm-12">
              <label htmlFor="specialty " className="text-dark">
                <i className="fa fa-list mx-4 text-dark"></i>
                Specialty
              </label>

              <div className="nice-select" tabIndex="0">
                <span className="current"></span>
                <Specialties
                  sendSpecialtyIdToParent={sendSpecialtyIdToParent}
                  specialtyIdInitialValue={specialtyId}
                />
              </div>
            </div>
            <div className="input-form col-lg col-md-8 col-sm-10 text-dark">
              <label className="text-dark">
                <i className="fa fa-user mx-4"></i>
                Coach Name
              </label>
              <input
                id="coach"
                type="text"
                name="coach"
                value={nameEn}
                onChange={handleNameChange}
              />
            </div>
            <button
              className="search-form col-lg-1 col-md-4 col-sm-2 bg-dark"
              type="submit"
              onClick={handleSubmit}
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
        </form>
      </section>
    </React.Fragment>
  );
}

export default SearchBar;
