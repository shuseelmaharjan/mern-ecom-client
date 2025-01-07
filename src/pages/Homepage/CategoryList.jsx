import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Technology', image: 'https://img.ltwebstatic.com/images3_pi/2023/10/28/c7/1698479712d473e97fd5117575eb6bec9f7447b025_thumbnail_336x.webp' },
  { id: 2, name: 'Health', image: 'https://img.ltwebstatic.com/images3_pi/2023/12/27/28/1703649298ba9cafd3c35c0796730ad29e1b27ced7_thumbnail_336x.webp' },
  { id: 3, name: 'Education', image: 'https://img.ltwebstatic.com/images3_pi/2023/11/13/f3/1699839859efecbf56e8f532555b0da275319874f6_thumbnail_900x.webp' },
  { id: 4, name: 'Sports', image: 'https://img.ltwebstatic.com/images3_pi/2024/09/03/49/172533305154d9d705e3722212de1a2d99cd4241c4_thumbnail_405x.webp' },
  { id: 5, name: 'Entertainment', image: 'https://img.ltwebstatic.com/images3_spmp/2024/11/07/dc/1730971058aea198869bcd4357c907851937687e61_square_thumbnail_900x.png' },
  { id: 6, name: 'Girld', image: 'https://img.ltwebstatic.com/images3_pi/2023/08/28/b0/1693189156c1347ec76f27af0bf4c6a800ae16f59a_thumbnail_336x.webp' },
  { id: 7, name: 'Girld', image: 'https://img.ltwebstatic.com/images3_pi/2023/09/22/00/1695382383a3b008d72dd91eeab0444ccc35a2c58c_thumbnail_336x.webp' },
  { id: 8, name: 'Technology', image: 'https://img.ltwebstatic.com/images3_pi/2023/10/28/c7/1698479712d473e97fd5117575eb6bec9f7447b025_thumbnail_336x.webp' },
  { id: 9, name: 'Health', image: 'https://img.ltwebstatic.com/images3_pi/2023/12/27/28/1703649298ba9cafd3c35c0796730ad29e1b27ced7_thumbnail_336x.webp' },
  { id: 10, name: 'Education', image: 'https://img.ltwebstatic.com/images3_pi/2023/11/13/f3/1699839859efecbf56e8f532555b0da275319874f6_thumbnail_900x.webp' },
  { id: 11, name: 'Sports', image: 'https://img.ltwebstatic.com/images3_pi/2024/09/03/49/172533305154d9d705e3722212de1a2d99cd4241c4_thumbnail_405x.webp' },
  { id: 12, name: 'Entertainment', image: 'https://img.ltwebstatic.com/images3_spmp/2024/11/07/dc/1730971058aea198869bcd4357c907851937687e61_square_thumbnail_900x.png' },
  { id: 13, name: 'Girld', image: 'https://img.ltwebstatic.com/images3_pi/2023/08/28/b0/1693189156c1347ec76f27af0bf4c6a800ae16f59a_thumbnail_336x.webp' },
  { id: 14, name: 'Girld', image: 'https://img.ltwebstatic.com/images3_pi/2023/09/22/00/1695382383a3b008d72dd91eeab0444ccc35a2c58c_thumbnail_336x.webp' },
];

const CategoryList = () => {
  return (
    <div className="container mx-auto p-4 mt-12">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
        {categories.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`} className="flex flex-col items-center">
            <img
              src={category.image}
              alt={category.name}
              className="w-28 h-28 rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-center">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
