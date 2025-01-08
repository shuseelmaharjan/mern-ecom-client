import React from "react";
import { FaShoppingCart } from "react-icons/fa"; 
import { Link, useNavigate } from "react-router-dom";

const FlashSale = () => {
  const flashSaleItems = [
    {
      id: 1,
      name: "SHEIN LUNE Color Block Drop Shoulder Sweater",
      price: "799",
      discount: 20,
      image1:
        "https://img.ltwebstatic.com/images3_pi/2023/10/28/c7/1698479712d473e97fd5117575eb6bec9f7447b025_thumbnail_336x.webp",
      image2:
        "https://img.ltwebstatic.com/images3_pi/2023/10/28/49/1698479715fa2a889b4000b30c0a4769c736f38346_thumbnail_900x.jpg",
    },
    {
      id: 2,
      name: "SHEIN LUNE Solid Color Jacquard Casual Sweater,Long Sleeve Top",
      price: "1199",
      discount: 15,
      image1:
        "https://img.ltwebstatic.com/images3_pi/2023/10/30/f3/169864417787d3784e3159a9192d91f4416cd4d5ce_thumbnail_336x.webp",
        image2:"https://img.ltwebstatic.com/images3_pi/2023/10/30/64/169864418012004871e354decdcdbef8b7b700a120_thumbnail_900x.jpg",
    },
    {
      id: 3,
      name: "EMERY ROSE Solid Round Neck Sweater,Long Sleeve Tops",
      price: "199",
      discount: 10,
      image1:
        "https://img.ltwebstatic.com/images3_pi/2024/11/15/93/17316818742ae3e75f589801a46dbbea2bc459275a_thumbnail_900x.webp",
        image2:"https://img.ltwebstatic.com/images3_pi/2024/11/17/68/17318561591aaa9d60b10c2f80e3a081ebdd80159d_thumbnail_900x.webp",
    },
    {
      id: 4,
      name: "SHEIN Relaxiva 1pc Casual Oversized Plain Pullover Sweater, Autumn",
      price: "249",
      discount: 25,
      image1:
        "https://img.ltwebstatic.com/images3_pi/2024/09/05/aa/1725524953161fa08892a02cabd1136105e1bc3c07.webp",
        image2:"https://img.ltwebstatic.com/images3_pi/2024/07/10/2c/17206051421bc7891f49479e337541555379d4b373.webp",
    },
    {
      id: 5,
      name: "SHEIN Relaxiva Solid V Neck Drop Shoulder Sweater,Long Sleeve Tops",
      price: "599",
      discount: 30,
      image1:
        "https://img.ltwebstatic.com/images3_pi/2024/06/19/a7/171876876835fd66ac61e4253ed7f920ce94184467_wk_1724257323_thumbnail_336x.webp",
        image2:"https://img.ltwebstatic.com/images3_pi/2024/06/19/78/17187687792c6b6c9309be7d189bd257bda96685db_wk_1724257324_thumbnail_900x.jpg"
    },
  ];

 
    const navigate = useNavigate();
  
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-center mb-6">Flash Sale</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {flashSaleItems.slice(0, 10).map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="group bg-white relative shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                {item.discount}% Off
              </div>
              <div className="relative">
                <img
                  src={item.image1}
                  alt={item.name}
                  className="w-full h-80 object-cover transition-opacity duration-700 group-hover:opacity-0"
                />
                <img
                  src={item.image2}
                  alt={item.name}
                  className="w-full h-80 object-cover absolute top-0 left-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
              </div>
              <h3
                className="text-sm font-semibold text-center truncate mt-2 px-2"
                title={item.name}
              >
                {item.name}
              </h3>
              <div className="flex justify-between items-center mt-2 px-2">
                <p className="text-lg font-bold text-orange-500">${item.price}</p>
                <button className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 transition duration-300">
                  <FaShoppingCart size={18} />
                </button>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-end mt-8">
          <button
            className="px-6 py-2 bg-gray-800 text-white font-semibold hover:bg-gray-700 transition duration-300"
            onClick={() => navigate("/flash-sale")}
          >
            View More
          </button>
        </div>
      </div>
    );
  };
  
  export default FlashSale;