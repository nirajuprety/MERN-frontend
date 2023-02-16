
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getCoupon, deleteCoupon } from 'api/request.api';

function Index() {
    const [coupons, setCoupons] = useState([]);

    const fetchData = async () => {
        try {
            const res = await getCoupon();
            setCoupons(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = (id) => async () => {
        try {
            await deleteCoupon(id);
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
                        <h3>Coupon List </h3>
                        <Link to="/admin/coupon/create" className="btn btn-outline-primary">Create</Link>
                    </div>
                </caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Code</th>
                        <th scope="col">Expire date</th>
                        <th scope="col">Discount Percent</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">Max Amount</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        coupons.map((coupon, index) => (
                            <tr key={index}>
                                <th scope="row">{ index+1 }</th>
                                <td>{ coupon.name }</td>
                                <td>{ coupon.code}</td>
                                <td>{ coupon.expire_date }</td>
                                <td>{ coupon.discount_percent }</td>
                                <td>{ coupon.start_date }</td>
                                <td>{ coupon.max_amount }</td>
                                <td><button className="btn btn-danger" onClick={handleDelete(coupon._id)}>Delete</button></td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
    )
}

export default Index