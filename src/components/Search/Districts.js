import * as React from "react";
import { Select } from "semantic-ui-react";

const Districts = ({ districtIdInitialValue, districts, updateDistrictId }) => {
  const [district, setDistrict] = React.useState(null);
  const onChangeHandler = (e, data) => {
    updateDistrictId(data.value);
  };

  return (
    districts && (
      <Select
        placeholder="Select District"
        style={{ border: "none" }}
        options={districts}
        onChange={onChangeHandler}
        defaultValue={Number(districtIdInitialValue)}
      />
    )
  );
};

export default Districts;
