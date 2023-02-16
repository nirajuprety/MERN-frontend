import { Link } from 'react-router-dom'; 

function Index() {
    return (
        <div>
            <table className="table caption-top">

                <caption>
                    <div className="d-flex justify-content-between mx-3">
                        <h3>Banner List</h3>
                        <Link to="/admin/banner/create" className="btn btn-outline-primary">Create</Link>
                    </div>
                </caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Image</th>
                        <th scope="col">Expire Date</th>
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
                            image
                        </td>
                        <td>
                            exp_date
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