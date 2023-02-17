import http from 'api/http.api';

export const getUsers = () => {
    return http.get('/user');
}

export const deleteUser = (id) => {
    return http.delete(`/user/${id}`);
}

export const register = (data) => {
    return http.post(`/register`, data);
}

export const login = (credential) => {
    return http.post(`/login`, credential);
}
// author
export const createAuthor = (authorData) => {
    return http.post(`/author/create`, authorData);
}

export const getAuthor = () => {
    return http.get('/author');
}

export const deleteAuthor = (id) => {
    return http.delete(`/author/${id}`);
}
// category
export const createCategory = (categoryData) => {
    return http.post(`/category/create`, categoryData);
}
export const getCategory = () => {
    return http.get('/category');
}

export const deleteCategory = (id) => {
    return http.delete(`/category/${id}`);
}

// book
export const getBooks = () => {
    return http.get('book');
}
export const postBook = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('category', data.category);
    formData.append('author', data.author);
    formData.append('stock', data.stock);
    formData.append('image', data.image);
    return http.post('/book', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
export const deleteBook = (id) => {
    return http.delete(`/book/${id}`);
}
//banner
export const getBanners = () => {
    return http.get('banner');
}
export const postBanner = (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('image', data.image);
    formData.append('expire_date', data.expire_date);
    return http.post('/banner', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
export const deleteBanner = (id) => {
    return http.delete(`/banner/${id}`);
}


// coupon 
export const createCoupon = (CouponData) => {
    return http.post(`/coupon/create`, CouponData);
}
export const getCoupon = () => {
    return http.get('/coupon');
}

export const deleteCoupon = (id) => {
    return http.delete(`/coupon/${id}`);
}

// cart
export const addToCart = (cartData) =>{
    return http.post('/cart/create', cartData);
}

export const getCart = ()=>{
    return http.get('/cart');
}

export const removeFromCart = (id) =>{
    return http.delete(`/cart/${id}`);
}

