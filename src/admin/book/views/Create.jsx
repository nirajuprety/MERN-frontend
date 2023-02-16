import { useEffect, useState } from "react";
import { getCategory } from "api/request.api";

import validator from "utils/validator";
import createBookSchema from "utils/createBookSchema";

import FloatingInput from "common/FloatingInput";
import Button from "common/Button";

import { useNavigate } from "react-router-dom";
import { createBook } from "api/request.api";

function Create() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getCategory();
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState({
    name: "",
    price: "",
    category: "Classic",
    author: "",
    stock: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const validate = validator(createBookSchema);

  // for input
  const handleChange = (e) => {
    const { name, value } = e.target;
    validate(name, value, { errors, setErrors });
    setData({ ...data, [name]: value });
  };
  // for image
  const handleFileChange = (e) => {
    const { name } = e.target;
    setData({ ...data, [name]: e.target.files[0] });
  };

  const isValid = () => {
    for (const [key, value] of Object.entries(data))
      validate(key, value, { errors, setErrors });

    console.log({ errors });
    if (Object.keys(errors).length === 0) return true;
    else return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("stock", data.stock);
    formData.append("image", data.image);

    if (isValid()) {
      try {
        console.log({ data });
        const res = await createBook(formData);
        console.log("Book created successfully: ", res.data);
        navigate("/admin/book");
      } catch (err) {
        console.error("Failed to create book: ", err);
        setErrors(err.response.data.error);
      }
    } else {
      console.log("Form validation failed");
    }
  };

  return (
    <div className="mx-5 mt-3">
      <form onSubmit={handleSubmit}>
        <h3 className="text-center mb-3">Add Book</h3>

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
          label="Price"
          type="text"
          placeholder="Enter price..."
          name="price"
          id="price"
          value={data.price}
          error={errors?.price}
          handler={handleChange}
        />
        <FloatingInput
          label="Category"
          type="text"
          placeholder="Enter category..."
          name="category"
          id="category"
          value={data.category}
          error={errors?.category}
          handler={handleChange}
        />

        {/* <div className="form-group mb-3">
          <select
            className="form-control"
            onChange={(e) => setData({ ...data, category: e.target.value })}
          >
            {books.map((book) => (
              <option key={book.name} value={book.name}>
                {book.name}
              </option>
            ))}
          </select>
        </div> */}
        {/* select category */}

        {/* <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            className="form-control"
            name="category"
            id="category"
            value={data.category}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a category...
            </option>
            {categoriesFromDatabase.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors?.category && (
            <div className="invalid-feedback">{errors.category}</div>
          )}
        </div> */}

        <FloatingInput
          label="Author"
          type="text"
          placeholder="Enter author..."
          name="author"
          id="author"
          value={data.author}
          error={errors?.author}
          handler={handleChange}
        />
        <FloatingInput
          label="stock"
          type="number"
          placeholder="Enter stock..."
          name="stock"
          id="stock"
          value={data.stock}
          error={errors?.stock}
          handler={handleChange}
        />
        <FloatingInput
          label="Image"
          type="file"
          placeholder="Enter image..."
          name="image"
          id="image"
          error={errors?.image}
          handler={handleFileChange}
        />
        <Button label="Add Book" type="submit" color="primary" />
      </form>
    </div>
  );
}

export default Create;
