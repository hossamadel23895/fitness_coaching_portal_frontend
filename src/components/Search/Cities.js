import { event } from "jquery";
import React, { useState, useEffect } from "react";
import { Select } from "semantic-ui-react";

const Cities = ({ cityIdInitialValue, updateCityId, updateDistricts }) => {
  const [cities, setCities] = useState(null);

  const onChangeHandler = (e, data) => {
    getDistrictsAPI(data.value).then((districts) => {
      updateCityId(data.value);
      updateDistricts(districts);
    });
  };

  useEffect(() => {
    getCitiesAPI();
    getDistrictsAPI(cityIdInitialValue).then((districts) => {
      updateCityId(cityIdInitialValue);
      updateDistricts(districts);
    });
  }, []);

  function getCitiesAPI() {
    fetch(`http://127.0.0.1:8000/api/cities/5`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        let cities = [{ key: "cit", value: "null", text: "City" }];
        let _cities = res.map((city) => {
          return {
            key: city["id"],
            value: city["id"],
            text: city["name_en"],
          };
        });
        _cities.forEach((i) => cities.push(i));
        setCities(cities);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getDistrictsAPI(cityID) {
    return fetch(`http://127.0.0.1:8000/api/districts/${cityID}`)
      .then((response) => response.json())
      .then((res) => {
        var districts = [{ key: "dis", value: "null", text: "District" }];
        let _districts = res.map((district) => {
          return {
            key: district["id"],
            value: district["id"],
            text: district["name_en"],
          };
        });
        _districts.forEach((i) => districts.push(i));
        return districts;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    cities && (
      <Select
        placeholder="Select City"
        style={{ border: "none" }}
        options={cities}
        defaultValue={Number(cityIdInitialValue)}
        onChange={onChangeHandler}
      />
    )
  );
};

export default Cities;
