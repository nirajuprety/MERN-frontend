import { useState } from "react";

import validator from "utils/validator";
import createBannerSchema from "utils/createBannerSchema";

import FloatingInput from "common/FloatingInput";
import Button from "common/Button";

import { useNavigate } from "react-router-dom";
import { createBanner } from "api/request.api";

function Create() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  const [errors, setErrors] = useState({});

  const validate = validator(createBannerSchema);

  const handleChange = (e) => {
    const { name, value } = e.target;
    validate(name, value, { errors, setErrors });
    setData({ ...data, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setData({ ...data, [name]: e.target.files[0] });
  };
  const isValid = () => {
    for (const [key, value] of Object.entries(data))
      validate(key, value, { errors, setErrors });

    if (Object.keys(errors).length === 0) return true;
    else return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image);

    if (isValid()) {
      try {
        const res = await createBanner(formData);
        console.log("Banner created successfully : ", res.data);
        navigate("/admin/banner");
        console.log(data);
      } catch (err) {
        console.error("Failed to create banner ; " + err);
        setErrors(err.response.data.error);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div className="mx-5 mt-3">
      <form onSubmit={handleSubmit}>
        <h3 className="text-center mb-3">Add Banner</h3>

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
          label="Image "
          type="file"
          placeholder="Choose Image..."
          name="image"
          id="image"
          error={errors?.image}
          handler={handleFileChange}
        />

        <Button label="Add Banner" type="submit" color="primary" />
      </form>
    </div>
  );
}

export default Create;
