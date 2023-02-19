import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBooks, addToCart, updateBook } from "api/request.api";

const baseUrl = "http://localhost:5000";

function Index() {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);


  const handleAddToCart = (id, quantity) => {
    const bookToAdd = books.find((book) => book._id === id);
    if (!bookToAdd) return;
    if (quantity > bookToAdd.stock) {
      alert("Quantity cannot be greater than stock!");
      return;
    }
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.book._id === id);
    if (index === -1) {
      newCart.push({ book: bookToAdd, quantity });
    } else {
      newCart[index].quantity += quantity;
    }
    setCart(newCart);
    alert("Book added to cart!");
  };

  const handleQuantityChange = (event, index) => {
    const newBooks = [...books];
    newBooks[index].quantity = parseInt(event.target.value);
    setBooks(newBooks);
  };

  useEffect(() => {
    getBooks().then((response) => setBooks(response.data));
  }, []);

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
            <Link to="/cart/" className="btn btn-outline-primary">
              View cart
            </Link>
          </div>
        </div>
        {/* card part */}
        <div className="row">
          <div className="d-flex justify-content-between ">
            <h3>Book List</h3>
            <Link to="/admin/banner/create" className="btn btn-outline-primary">
              Create
            </Link>
          </div>
          <div className="row">
            {books.map((book, index) => (
              <div className="col-md-3">
                <div className="card m-3" style={{ width: "18rem" }}>
                  <img
                    className="card-img-top"
                    src={`${baseUrl}${book.image}`}
                    alt={book.name}
                    width="50"
                    height="200"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{book.name}</h5>
                    <p className="card-text">
                      <h6>Price: Rs.{book.price} </h6>
                      <h6>Author: {book.author} </h6>
                      <h6>stock: {book.stock} </h6>
                      <h6>Category: {book.category} </h6>
                    </p>

                    <div className="d-flex flex-row">
                      <div className="p-2">
                        Quantity:
                        <input
                          type="number"
                          min="1"
                          max={book.stock}
                          value={book.quantity}
                          onChange={(e) => handleQuantityChange(e, index)}
                        />
                      </div>
                      <div className="p-2">
                        <button
                          type="button"
                          className="btn btn-primary"
                          // onClick={handleCart(book._id)}
                          onClick={() =>
                            handleAddToCart(book._id, book.quantity)
                          }
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
