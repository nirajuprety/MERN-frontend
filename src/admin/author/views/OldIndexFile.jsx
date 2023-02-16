// import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom'; 

// const Authors = () => {
//   const [authors, setAuthors] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/v1/author");
//         const data = await response.json();
//         setAuthors(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h2>Authors</h2>
//       <Link to="/admin/author/create" className="btn btn-outline-primary">Create</Link>

//       <ul>
//         {Array.isArray(authors) ? (
//           authors.map((author) => (
//             <li key={author._id}>
//               {author.name} - {author.city}, {author.state}, {author.country}
//             </li>
//           ))
//         ) : (
//           <p>Loading authors...</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Authors;