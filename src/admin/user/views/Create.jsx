import { useState } from "react";

import validator from "utils/validator";
import createUserSchema from "utils/createUserSchema";

import FloatingInput from "common/FloatingInput";
import Button from "common/Button";

function Create() {
    const [data, setData] = useState({
        name: "",
        email: "",
    });
    const [errors, setErrors] = useState({
    });

    const validate = validator(createUserSchema);

    const handleChange = (e) => {
        const { name, value } = e.target;
        validate(name, value, {errors, setErrors})
        setData({ ...data, [name]: value });
    }

    const isValid = () => {
        for(const [key, value] of Object.entries(data))
            validate(key, value, {errors, setErrors})

        if(Object.keys(errors).length === 0)
            return true
        else
            return false
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isValid())
        {
            console.log("Form submitted successfully");
            console.log(data);
        }else{
            console.log("Form validation failed");
        }
    }

    return (
        <div className="mx-5 mt-3">
            <form onSubmit={handleSubmit}>
                <h3 className="text-center mb-3">Add User</h3>

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
                    label="Email"
                    type="text"
                    placeholder="Enter email..."
                    name="email"
                    id="email"
                    value={data.email}
                    error={errors?.email}
                    handler={handleChange}
                />

                <Button label="Add User" type="submit" color="primary" />
            </form>
        </div>
    )
}

export default Create;