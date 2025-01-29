// import React, { useState, useEffect } from "react";
// import apiHandler from "../../api/apiHandler";

// const HasDimension = ({ productId, accessToken }) => {
//   const [productDetails, setProductDetails] = useState({
//     width: "",
//     height: "",
//     hasDimension: false,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchDimensions = async () => {
//     try {
//       const data = await apiHandler(
//         null,
//         `/api/v1/get-dimensions/${productId}`,
//         "GET",
//         accessToken
//       );
//       setProductDetails({
//         width: data.dimension.width,
//         height: data.dimension.height,
//         hasDimension: data.hasDimension,
//       });
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDimensions();
//   }, [productId, accessToken]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProductDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleToggleDimensions = async () => {
//     const newDimensionsState = !productDetails.hasDimension;
//     setProductDetails((prevDetails) => ({
//       ...prevDetails,
//       hasDimension: newDimensionsState,
//     }));

//     try {
//       await apiHandler(
//         { hasDimension: newDimensionsState },
//         `/api/v1/update-has-dimension/${productId}`,
//         "PUT",
//         accessToken
//       );
//     } catch (err) {
//       setError(err);
//     }
//   };

//   const handleAddDimension = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       await apiHandler(
//         { width: productDetails.width, height: productDetails.height },
//         `/api/v1/add-dimension/${productId}`,
//         "PUT",
//         accessToken
//       );
//       await fetchDimensions();
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error fetching dimensions: {error.message}</div>;
//   }

//   return (
//     <>
//       <div className="flex flex-col space-y-2 mt-4">
//         <label htmlFor="dimensions" className="text-gray-800">
//           Dimensions
//         </label>
//         <button
//           type="button"
//           className={`${
//             productDetails.hasDimension ? "bg-gray-800" : "bg-gray-300"
//           } relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out`}
//           onClick={handleToggleDimensions}
//         >
//           <span
//             className={`${
//               productDetails.hasDimension ? "translate-x-6" : "translate-x-1"
//             } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
//           />
//         </button>
//       </div>
//       {productDetails.hasDimension && (
//         <>
//           <div className="flex flex-row space-x-4 mt-4 items-center">
//             <div className="flex flex-col space-y-2">
//               <label htmlFor="width" className="text-gray-800">
//                 Width
//               </label>
//               <input
//                 type="text"
//                 id="width"
//                 name="width"
//                 value={productDetails.width}
//                 onChange={handleInputChange}
//                 placeholder="Enter product width"
//                 className="w-full border border-gray-300 p-2 shadow-sm outline-none"
//               />
//             </div>
//             <div className="flex flex-col space-y-2">
//               <label htmlFor="height" className="text-gray-800">
//                 Height
//               </label>
//               <input
//                 type="text"
//                 id="height"
//                 name="height"
//                 value={productDetails.height}
//                 onChange={handleInputChange}
//                 placeholder="Enter product height"
//                 className="w-full border border-gray-300 p-2 shadow-sm outline-none"
//               />
//             </div>
//             <div className="flex flex-col justify-end mt-4">
//               <button
//                 type="button"
//                 onClick={handleAddDimension}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//               >
//                 Add Dimension
//               </button>
//             </div>
//           </div>

//           <div className="mt-6">
//             <h3 className="text-lg font-semibold text-gray-800">
//               Current Dimensions
//             </h3>
//             <table className="min-w-full bg-white mt-4">
//               <thead>
//                 <tr>
//                   <th className="py-2 px-4 border-b border-gray-200">Width</th>
//                   <th className="py-2 px-4 border-b border-gray-200">Height</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="py-2 px-4 border-b border-gray-200">
//                     {productDetails.width}
//                   </td>
//                   <td className="py-2 px-4 border-b border-gray-200">
//                     {productDetails.height}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default HasDimension;