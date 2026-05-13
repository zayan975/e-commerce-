import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const ListItems = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list", { withCredentials: true });
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message || "Failed to fetch products.");
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
      toast.error("Failed to fetch product list. Please try again later.");
    }
  };

  const removeProduct = async (id) => {
    try {
      // Example delete logic - replace with your actual endpoint
      const response = await axios.delete(
        backendUrl + '/api/product/remove',
        {
          data: { id },
          withCredentials: true
        }
      );
      if (response.data.success) {
        toast.success("Product removed");
        await fetchList();
      }
    } catch (error) {
      toast.error("Error deleting product");
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4 md:p-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-700">All Products List</h2>

      <div className="flex flex-col gap-2">
        {/* Table Header - Hidden on mobile, visible on desktop */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-gray-100 text-sm font-bold">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Delete</span>
        </div>

        {/* Product List */}
        {list.length > 0 ? (
          list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-4 border text-sm hover:bg-gray-50 transition-colors"
            >
              <img
                className="w-12 h-12 object-cover rounded"
                src={item.image[0]}
                alt={item.name}
              />
              <p className="font-medium">{item.name}</p>
              <p className="hidden md:block text-gray-600">{item.category}</p>
              <p className="font-semibold text-green-600">
                ${item.price}
              </p>
              <p
                onClick={() => removeProduct(item._id)}
                className="text-right md:text-center cursor-pointer text-red-500 hover:text-red-700 font-bold"
              >
                X
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-10">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ListItems;