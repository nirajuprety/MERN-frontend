import validator from "utils/validator";
import createBookSchema from "utils/createBookSchema";
import FloatingInput from "common/FloatingInput";
import Button from "common/Button";
import { useState } from "react";

import { postBook } from "api/request.api";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    price: "",
    category: "",
    author: "",
    stock: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  const validate = validator(createBookSchema);

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
        const res = await postBook(data); //call axios from register
        console.log(res);
        navigate("/admin/book");
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
          label="Name"
          type="text"
          name="name"
          id="name"
          value={data.name}
          error={errors?.name}
          handler={handleChange}
        />{" "}
        <FloatingInput
          label="Price"
          type="number"
          name="price"
          id="price"
          value={data.price}
          error={errors?.price}
          handler={handleChange}
        />
        <FloatingInput
          label="Category"
          type="text"
          name="category"
          id="category"
          value={data.category}
          error={errors?.category}
          handler={handleChange}
        />
        <FloatingInput
          label="Author"
          type="text"
          name="author"
          id="author"
          value={data.author}
          error={errors?.author}
          handler={handleChange}
        />
        <FloatingInput
          label="Stock"
          type="number"
          name="stock"
          id="stock"
          value={data.stock}
          error={errors?.stock}
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
