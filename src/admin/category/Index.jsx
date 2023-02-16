import { Link } from 'react-router-dom'; 
import {useState, useEffect} from 'react';

import { getCategory,deleteCategory } from 'api/request.api';
function Index() {
    const [categories, setCategories] = useState([]);

    const fetchData = async () => {
        try {
            const res = await getCategory();
            setCategories(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = (id) => async () => {
        try {
            await deleteCategory(id);
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
                        <h3>Category List</h3>
                        <Link to="/admin/category/create" className="btn btn-outline-primary">Create</Link>
                    </div>
                </caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                        categories.map((category, index) => (
                            <tr key={index}>
                                <th scope="row">{ index+1 }</th>
                                <td>{ category.name }</td>
                                <td><button className="btn btn-danger" onClick={handleDelete(category._id)}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Index