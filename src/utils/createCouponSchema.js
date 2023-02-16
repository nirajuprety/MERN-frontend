function createAuthorSchema(name, value) {
  switch (name) {
    case "name":
      if (value === "") return "Name is required";
      else return false;
    case "code":
      if (value === "") return "code is required";
      else return false;
    case "expire_date":
      if (value === "") return "expire date is required";
      else return false;
    case "discount_percent":
      if (value === "") return "Discount percent is required";
      else return false;
    case "start_date":
      if (value == "") return "start date is required";
      else return false;
    case "max_amount":
      if (value == "") return "max amount is required";
      else return false;
    default:
      break;
  }
}

export default createAuthorSchema;
