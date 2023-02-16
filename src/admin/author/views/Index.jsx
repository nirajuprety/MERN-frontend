
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getAuthor, deleteAuthor } from 'api/request.api';

function Index() {
    const [authors, setAuthors] = useState([]);

    const fetchData = async () => {
        try {
            const res = await getAuthor();
            setAuthors(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = (id) => async () => {
        try {
            await deleteAuthor(id);
            fetchData();
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => { fetchData() }, []);

    return (
        <div>
            <table className="table caption-top">

                <caption>
                    <div className="d-flex justify-content-between mx-3">
                        <h3>Author List List</h3>
                        <Link to="/admin/author/create" className="btn btn-outline-primary">Create</Link>
                    </div>
                </caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">City</th>
                        <th scope="col">Country</th>
                        <th scope="col">State</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        authors.map((author, index) => (
                            <tr key={index}>
                                <th scope="row">{ index+1 }</th>
                                <td>{ author.name }</td>
                                <td>{ author.address.city }</td>
                                <td>{ author.address.country }</td>
                                <td>{ author.address.state }</td>
                                <td><button className="btn btn-danger" onClick={handleDelete(author._id)}>Delete</button></td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
    )
}

export default Index