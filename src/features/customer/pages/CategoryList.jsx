import  { useEffect, useState } from 'react'
import api from '../../../api'
import { useDispatch, useSelector } from "react-redux";
import { setCategory, fetchProducts } from '../../../redux/productSlice'

function CategoryList() {
     const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
const selected = useSelector((state) => state.products.category);
     useEffect(() => {
        fetchcategories();
  }, []);
  const fetchcategories = async()=>{
  const response =  await api.get("/admin/getactivecategories")
  setCategories(response.data)
  }


return (
  <div className="py-10 bg-gradient-to-b from-gray-50 to-white">

  {/* Heading */}
  <h2 className="text-3xl font-bold text-center mb-10 tracking-tight">
    Shop by Category
  </h2>

  <div className="flex justify-center">
    <div
      className="
        flex gap-8 overflow-x-auto no-scrollbar px-4 py-4
        sm:flex-wrap sm:overflow-visible sm:justify-center
        lg:grid lg:grid-cols-6 lg:gap-10
        max-w-7xl w-full
      "
    >
      {/* ALL CATEGORY */}
      <button
        onClick={() => {
          dispatch(setCategory(null));
          dispatch(fetchProducts());
        }}
        className="flex flex-col items-center min-w-[90px] group"
      >
        <div
          className={`
            w-20 h-20 rounded-full flex items-center justify-center
            border bg-white
            transition-all duration-300
            ${
              selected === null
                ? "border-teal-500 shadow-lg scale-105 ring-4 ring-teal-100"
                : "border-gray-200 group-hover:shadow-lg group-hover:-translate-y-2"
            }
          `}
        >
          <span className="text-sm font-semibold text-gray-700">
            All
          </span>
        </div>

        <span className="mt-3 text-sm font-medium text-gray-600 group-hover:text-black transition">
          All
        </span>
      </button>

      {/* CATEGORY ITEMS */}
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => {
            dispatch(setCategory(cat.name));
            dispatch(fetchProducts());
          }}
          className="flex flex-col items-center min-w-[90px] group"
        >
          <div
            className={`
              w-20 h-20 rounded-full overflow-hidden
              border bg-white
              transition-all duration-300 ease-out
              ${
                selected === cat.name
                  ? "border-teal-500 shadow-xl scale-105 ring-4 ring-teal-100"
                  : "border-gray-200 group-hover:shadow-xl group-hover:-translate-y-2"
              }
            `}
          >
            <img
              src={cat.imageUrl}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <span className="mt-3 text-sm font-medium text-gray-700 text-center group-hover:text-black transition">
            {cat.name}
          </span>
        </button>
      ))}
    </div>
  </div>
</div>
);

}

export default CategoryList