import { Link } from "react-router-dom";
import Button from "common/Button";
import Card from "common/Card";
function Index() {
  return (
    <div>
      <main className="container">
        <div className="input-group my-3">
          <input
            type="text"
            className="form-control"
            placeholder="Book Name..."
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <button
            className="btn btn-outline-primary"
            type="button"
            id="button-addon2"
          >
            Search
          </button>
        </div>
        <div className="container">
            <div className="row">
            <Link to="/client/cart/Index" className="btn btn-outline-primary">View cart</Link>
            </div>

        </div>
        <Card
          title={"new title"}
          price={"1200"}
          category={"classic"}
          author={"Laxmi Prasad Devkota"}
          stock={20}
        />
        <Card
          title={"new title"}
          price={"1200"}
          category={"classic"}
          author={"Laxmi Prasad Devkota"}
          stock={20}
        />
        <Card
          title={"new title"}
          price={"1200"}
          category={"classic"}
          author={"Laxmi Prasad Devkota"}
          stock={20}
        />
        <Card
          title={"new title"}
          price={"1200"}
          category={"classic"}
          author={"Laxmi Prasad Devkota"}
          stock={20}
        />
        <Card
          title={"new title"}
          price={"1200"}
          category={"classic"}
          author={"Laxmi Prasad Devkota"}
          stock={20}
        />

        <nav aria-label="Page navigation example" className="mt-4">
          <ul className="pagination justify-content-end">
            <li className="page-item">
              <Link className="page-link" to="">
                Previous
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to="">
                1
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to="">
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  );
}

export default Index;
