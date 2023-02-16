import { useState } from "react";

import validator from "utils/validator";
import createCouponSchema from "utils/createCouponSchema";

import FloatingInput from "common/FloatingInput";
import Button from "common/Button";

import { useNavigate } from "react-router-dom";
import { createCoupon } from "api/request.api";

function Create() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    code: "",
    expire_date: "",
    discount_percent: "",
    start_date: "",
    max_amount: "",
  });
  const [errors, setErrors] = useState({});

  const validate = validator(createCouponSchema);

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

    // if (isValid()) {
      try {
        console.log({data})
        const res = await createCoupon(data);
        console.log("Category created successfully: ", res.data);
        navigate("/admin/coupon");
      } catch (err) {
        console.error("Failed to create coupon: ", err);
        setErrors(err.response.data.error);
      }
    // } else {
    //   console.log("Form validation failed");
    // }
  };

  return (
    <div className="mx-5 mt-3">
      <form onSubmit={handleSubmit}>
        <h3 className="text-center mb-3">Create Coupon</h3>

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
          label="code"
          type="text"
          placeholder="Enter text"
          name="code"
          id="code"
          value={data.code}
          error={errors?.code}
          handler={handleChange}
        />
        <FloatingInput
          label="start date"
          type="date"
          placeholder="Enter start date"
          name="start_date"
          id="start_date"
          value={data.start_date}
          error={errors?.start_date}
          handler={handleChange}
        />
        <FloatingInput
          label="Expire date"
          type="date"
          placeholder="Enter Expire date"
          name="expire_date"
          id="expire_date"
          value={data.expire_date}
          error={errors?.expire_date}
          handler={handleChange}
        />
        <FloatingInput
          label="Max amount"
          type="number"
          placeholder="Enter Max amount"
          name="max_amount"
          id="max_amount"
          value={data.max_amount}
          error={errors?.max_amount}
          handler={handleChange}
        />
         <FloatingInput
          label="Discount Percent"
          type="number"
          placeholder="Enter Discount Percent"
          name="discount_percent"
          id="discount_percent"
          value={data.discount_percent}
          error={errors?.discount_percent}
          handler={handleChange}
        />

        <Button label="Create coupon" type="submit" color="primary" />
      </form>
    </div>
  );
}

export default Create;
