import React, { useState, useEffect } from "react";
import { Select } from "semantic-ui-react";

const specialties = [
  { key: "gg", value: "gg", text: "Dept1" },
  { key: "hh", value: "hh", text: "Dept2" },
];

const Specialties = ({ sendSpecialtyIdToParent, specialtyIdInitialValue }) => {
  const onChangeHandler = (e, data) => {
    sendSpecialtyIdToParent(data.value);
  };
  const [specialties, setData] = useState([]);
  useEffect(() => {
    getSpecialtiesAPI();
  }, []);

  function getSpecialtiesAPI() {
    fetch(`http://127.0.0.1:8000/api/specialists`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        var specialties = [{ key: "dept", value: "null", text: "Specialty" }];

        let _specialties = res.map((specialty) => {
          return {
            key: specialty["id"],
            value: specialty["id"],
            text: specialty["name_en"],
          };
        });
        _specialties.forEach((ele) => specialties.push(ele));
        setData(specialties);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Select
      placeholder="Select Specialty"
      style={{ border: "none" }}
      options={specialties}
      onChange={onChangeHandler}
      defaultValue={Number(specialtyIdInitialValue)}
    />
  );
};

export default Specialties;
