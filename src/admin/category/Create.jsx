import { useState } from "react";

import validator from "utils/validator";
import createCategorySchema from "utils/createCategorySchema";

import FloatingInput from "common/FloatingInput";
import Button from "common/Button";

import { useNavigate } from "react-router-dom";
import { createCategory } from "api/request.api";

function Create() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({});

  const validate = validator(createCategorySchema);

  const handleChange = (e) => {
    const { name, value } = e.target;
    validate(name, value, { errors, setErrors });
    setData({ ...data, [name]: value });
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
        const res = await createCategory(data);
        console.log("Category created successfully: ", res.data);
        navigate("/admin/category");
      } catch (err) {
        console.error("Failed to create category: ", err);
        setErrors(err.response.data.error);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div className="mx-5 mt-3">
      <form onSubmit={handleSubmit}>
        <h3 className="text-center mb-3">Create category</h3>

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

    
        <Button label="Create category" type="submit" color="primary" />
      </form>
    </div>
  );
}

export default Create;
