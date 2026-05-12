import React, { useState } from 'react';
import uploadimg from "../assets/upload_area.png";
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddItems = () => {

  const [loading, setLoading] = useState(false);
 


  const [images, setImages] = useState({
    image1: null, image2: null, image3: null, image4: null
  });

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const imageSlots = ["image1", "image2", "image3", "image4"];

  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const toastId = toast.loading("Uploading product...");

    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", productDescription);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("price", price);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      imageSlots.forEach(slot => {
        if (images[slot]) formData.append(slot, images[slot]);
      });

      // FIX: Added headers to send the token
      const response = await axios.post(backendUrl + "/api/product/add", formData, { withCredentials:true });

      if (response.data.success) {
        toast.update(toastId, { render: "Product added successfully!", type: "success", isLoading: false, autoClose: 2000 });
        

        setProductName('');
        setProductDescription('');
        setPrice('');
        setImages({ image1: null, image2: null, image3: null, image4: null });
        setSizes([]);
        setBestseller(false);
        setCategory("Men");        // ✅ Add this
        setSubcategory("Topwear"); // ✅ Add this

        
      } else {
        toast.update(toastId, { render: response.data.message, type: "error", isLoading: false, autoClose: 2000 });
      }
    } catch (error) {
      console.error(error);
      toast.update(toastId, { render: error.response?.data?.message || "Server Error", type: "error", isLoading: false, autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form  onSubmit={submitHandler} className="p-4 sm:p-8 w-full max-w-4xl flex flex-col gap-6 text-gray-700">

      {/* --- Image Upload Section --- */}
      <div>
        <p className="mb-3 font-medium">Upload Images</p>
        <div className="flex flex-wrap gap-3">
          {imageSlots.map((id, index) => (
            <label key={index} htmlFor={id} className="cursor-pointer">
              <div className="w-20 h-19 sm:w-24 sm:h-24 border-2 border-dashed border-gray-300 flex items-center justify-center  hover:bg-gray-50 transition-colors">
                <img
                  key={images[id]?.name || id}
                  src={images[id] ? URL.createObjectURL(images[id]) : uploadimg}
                  alt="upload preview"
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover rounded-md opacity-90 transition-opacity hover:opacity-100"
                />
              </div>
              <input onChange={(e) => setImages({ ...images, [id]: e.target.files[0] })} type="file" id={id} hidden />
            </label>
          ))}
        </div>
      </div>

      {/* --- Product Details --- */}
      <div className="w-full max-w-lg flex flex-col gap-4">
        <div className="w-full">
          <p className="mb-2 font-medium">Product Name</p>
          <input value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-400 outline-none" type="text" placeholder="Type here" required />
        </div>

        <div className="w-full">
          <p className="mb-2 font-medium">Product Description</p>
          <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-400 outline-none" rows={4} placeholder="Write content here" required />
        </div>
      </div>

      {/* --- Categories & Price --- */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:gap-8">
        <div className="flex-1">
          <p className="mb-2 font-medium">Category</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none cursor-pointer">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="flex-1">
          <p className="mb-2 font-medium">Sub Category</p>
          <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none cursor-pointer">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
            <option value="Summerwear">Summerwear</option>
          </select>
        </div>

        <div className="flex-1">
          <p className="mb-2 font-medium">Product Price</p>
          <input value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none" type="Number" placeholder="25" />
        </div>
      </div>

      {/* --- Sizes Selection --- */}
      <div>
        <p className="mb-3 font-medium">Product Sizes</p>
        <div className="flex flex-wrap gap-3">
          {["S", "M", "L", "XL", "XXL"].map((item) => (
            <div
              key={item}
              onClick={() => setSizes(prev =>
                prev.includes(item)
                  ? prev.filter(size => size !== item)
                  : [...prev, item]
              )}
            >
              <p className={`${sizes.includes(item) ? "bg-orange-200 border-orange-400" : "bg-slate-200 border-transparent"} px-4 py-1.5 cursor-pointer rounded-sm hover:bg-orange-100 transition-all border`}>
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --- Bestseller Checkbox --- */}
      <div className="flex items-center gap-2 mt-2">
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" className="w-4 h-4 accent-orange-500 cursor-pointer" />
        <label htmlFor="bestseller" className="cursor-pointer select-none">Add to bestseller</label>
      </div>

      <button disabled={loading} type="submit" className="w-full sm:w-40 py-3 mt-4 bg-black text-white text-sm font-medium rounded-md active:bg-gray-800 transition-all">
        {loading ? "ADDING..." : "ADD PRODUCT"}
      </button>

    </form>
  );
};

export default AddItems;