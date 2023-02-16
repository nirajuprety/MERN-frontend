function createCategorySchema(name, value) 
{
    switch(name)
    {
        case "name":
            if(value === "")
                return "Name is required";
            else
                return false
       
        default:
            break;
    }
}

export default createCategorySchema;