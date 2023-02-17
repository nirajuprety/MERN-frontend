import validator from "utils/validator";
import createBannerSchema from "utils/createBannerSchema";
import FloatingInput from "common/FloatingInput";
import Button from "common/Button";
import { useState } from "react";

import { postBanner } from "api/request.api";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    expire_date: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  const validate = validator(createBannerSchema);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setData({ ...data, [e.target.name]: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      validate(name, value, { errors, setErrors });
      setData({ ...data, [name]: value });
    }
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
        const res = await postBanner(data); //call axios from register
        console.log(res);
        navigate("/admin/banner");
      } catch (err) {
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
          label="Title"
          type="text"
          name="title"
          id="title"
          value={data.title}
          error={errors?.title}
          handler={handleChange}
        />
        <FloatingInput
          label="Expire Date"
          type="date"
          name="expire_date"
          id="expire_date"
          value={data.expire_date}
          error={errors?.expire_date}
          handler={handleChange}
        />

        <FloatingInput
          label="Image"
          type="file"
          name="image"
          id="image"
          error={errors?.image}
          handler={handleChange}
        />

        <Button type="submit" label="Create" color="primary" />
      </form>
    </div>
  );
}

export default Create;
