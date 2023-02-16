function createAuthorSchema(name, value) 
{
    switch(name)
    {
        case "name":
            if(value === "")
                return "Name is required";
            else
                return false;
        case "city":
            if(value === "")
                return "City is required";
            else
                return false;
        case "state":
            if(value === "")
                return "State is required";
            else
                return false;
        case "country":
            if(value === "")
                return "Country is required";
            else
                return false;
        default:
            break;
    }
}

export default createAuthorSchema;
