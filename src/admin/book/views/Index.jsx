import { Link } from 'react-router-dom'; 

function Index() {
    return (
        <div>
            <table className="table caption-top">

                <caption>
                    <div className="d-flex justify-content-between mx-3">
                        <h3>Book List</h3>
                        <Link to="/admin/book/create" className="btn btn-outline-primary">Create</Link>
                    </div>
                </caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Author</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Image</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>
                            Title
                        </td>
                        <td>
                            Price
                        </td>
                        <td>
                            Category
                        </td>
                        <td>
                            Author
                        </td>
                        <td>
                            Stock
                        </td>
                        <td>
                            Image
                        </td>
                        <td>
                            Action
                        </td>
                        <td>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Index