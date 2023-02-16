import { useState } from "react";

import validator from "utils/validator";
import createAuthorSchema from "utils/createAuthorSchema";

import FloatingInput from "common/FloatingInput";
import Button from "common/Button";

import { useNavigate } from "react-router-dom";
import { createAuthor } from "api/request.api";

function Create() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    address: {
      city: "",
      country: "",
      state: "",
    },
  });
  const [errors, setErrors] = useState({});

  const validate = validator(createAuthorSchema);

  const handleChange = (e) => {
    const { name, value } = e.target;
    validate(name, value, { errors, setErrors });
    setData({ ...data, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const newAddress = { ...data.address, [name]: value };
    setData({ ...data, address: newAddress });
  };

  const isValid = () => {
    for (const [key, value] of Object.entries(data))
      validate(key, value, { errors, setErrors });

    if (Object.keys(errors).length === 0) return true;
    else return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValid()) {
      try {
        console.log({data})
        const res = await createAuthor(data);
        console.log("Author created successfully: ", res.data);
        navigate("/admin/author");
      } catch (err) {
        console.error("Failed to create author: ", err);
        setErrors(err.response.data.error);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div className="mx-5 mt-3">
      <form onSubmit={handleSubmit}>
        <h3 className="text-center mb-3">Create Author</h3>

        <FloatingInput
          label="Name"
          type="text"
          placeholder="Enter name"
          name="name"
          id="name"
          value={data.name}
          error={errors?.name}
          handler={handleChange}
        />

        <FloatingInput
          label="City"
          type="text"
          placeholder="Enter city"
          name="city"
          id="city"
          value={data.address.city}
          error={errors?.city}
          handler={handleAddressChange}
        />

        <FloatingInput
          label="Country"
          type="text"
          placeholder="Enter country"
          name="country"
          id="country"
          value={data.address.country}
          error={errors?.country}
          handler={handleAddressChange}
        />

        <FloatingInput
          label="State"
          type="text"
          placeholder="Enter state"
          name="state"
          id="state"
          value={data.address.state}
          error={errors?.state}
          handler={handleAddressChange}
        />

        <Button label="Create Author" type="submit" color="primary" />
      </form>
    </div>
  );
}

export default Create;
