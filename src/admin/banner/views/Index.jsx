import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBanners, deleteBanner } from "api/request.api";
const baseUrl = "http://localhost:5000";

function Index() {
  const [banners, setBanners] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getBanners();
      console.log(res);
      console.log(res.data);
      setBanners(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (id) => async () => {
    try {
      await deleteBanner(id);
      setBanners(banners.filter((banner) => banner._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBanners().then((response) => setBanners(response.data));
  }, []);
  // useEffect(() => { fetchData() }, []);

  return (
    <div className="row">
      <div className="d-flex justify-content-between ">
            <h3>Banner List</h3>
            <Link to="/admin/banner/create" className="btn btn-outline-primary">
              Create
            </Link>
          </div>
          
      {banners.map((banner, index) => (
        <div className="col-md-3">
          <div class="card m-3" style={{ width: "18rem" }}>
            <img
              class="card-img-top"
              src={`${baseUrl}${banner.image}`}
              alt={banner.title}
              width="50"
              height="200"
            />
            <div class="card-body">
              <h5 class="card-title">{banner.title}</h5>
              <p class="card-text">
                <h6>Expire Date : {banner.expire_date} </h6>
              </p>

              <button
                className="btn btn-danger"
                onClick={handleDelete(banner._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Index;
