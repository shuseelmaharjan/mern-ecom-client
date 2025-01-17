import React, { useState } from "react";
import ProductDetails from "./ProductDetails";

const AddProducts = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    console.log(title);
  };

  return (
    <div>
      <ProductDetails setTitle={setTitle} />
      <button onClick={handleSubmit}>Click</button>
    </div>
  );
};

export default AddProducts;
