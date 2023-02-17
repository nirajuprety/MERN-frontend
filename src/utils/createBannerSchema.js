function createBannerSchema(name, value) {
  switch (name) {
    case "name":
      if (value === "") return "Name is required";
      else return false;
    case "image":
      if (value === "") return "image is required";
      else return false;

    default:
      break;
  }
}

export default createBannerSchema;
