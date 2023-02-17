import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBooks, deleteBook, updateBook } from "api/request.api";

const baseUrl = "http://localhost:5000";

function Index() {
  const [books, setBooks] = useState([]);

  const fetchData = async () => {
    try {
      const res = await getBooks();
      console.log(res);
      console.log(res.data);
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (id) => async () => {
    try {
      await deleteBook(id);
      setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBooks().then((response) => setBooks(response.data));
  }, []);

  const handleUpdate = (id) => async (updatedData) => {
    try {
      const response = await updateBook(id, updatedData);
      const updatedBook = response.data;
      setBooks(books.map((book) => {
        if (book._id === updatedBook._id) {
          return updatedBook;
        } else {
          return book;
        }
      }));
    } catch (err) {
      console.log(err);
    }
  };
  // useEffect(() => { fetchData() }, []);

  return (
    <div>
      <table className="table caption-top">
        <caption>
          <div className="d-flex justify-content-between mx-3">
            <h3>Book List</h3>
            <Link to="/admin/book/create" className="btn btn-outline-primary">
              Create
            </Link>
          </div>
        </caption>
        <thead>
          <tr>
            <th scope="col">S.N</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Author</th>
            <th scope="col">Stock</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id}>
              <th scope="row">{index + 1}</th>
              <td>{book.name}</td>
              <td>{book.price}</td>
              <td>{book.category}</td>
              <td>{book.author}</td>
              <td>{book.stock}</td>
              <td>
                <img
                  src={`${baseUrl}${book.image}`}
                  alt={book.name}
                  width="100"
                  height="100"
                />{" "}
              </td>

            
              <td>
                <div className="d-flex flex-column">
                  <div className="p-2">
                    <button className="btn btn-danger" onClick={handleDelete(book._id)}>Delete</button>
                  </div>
                  <div className="p-2">
                    <button className="btn btn-primary" onClick={handleUpdate(book._id)}>Edit</button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Index;
