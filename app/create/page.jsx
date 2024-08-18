"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { CldUploadButton } from "next-cloudinary";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const Create = () => {
  const {data: session} = useSession();
  const router = useRouter();
  const id = session?.user?._id;

  const [imageUrls, setImageUrls] = useState([
    "https://res.cloudinary.com/dvjs0xmcy/image/upload/v1722781351/eagefvawsxsib8o4wjrs.jpg",
    "https://res.cloudinary.com/dvjs0xmcy/image/upload/v1722765107/eddchi8y2omcs3au5z4g.jpg",
    "https://res.cloudinary.com/dvjs0xmcy/image/upload/v1722765112/qiadxoicwen62rxwp3re.jpg",
    "https://res.cloudinary.com/dvjs0xmcy/image/upload/v1722765119/hbv70qpd2bqknwrdtgzm.jpg",
    // "https://res.cloudinary.com/dvjs0xmcy/image/upload/v1722765124/gjzlngmg4qe6o4up2jof.jpg",
    // "https://res.cloudinary.com/dvjs0xmcy/image/upload/v1722765131/yxpbjw1bwvlkmrjddooe.jpg",
    // "https://res.cloudinary.com/dvjs0xmcy/image/upload/v1722765136/vvvb9cqrpeeazy4ontcl.jpg",
    // "https://res.cloudinary.com/dvjs0xmcy/image/upload/v1722765144/arzsfovuf4bv0qwcjaq5.jpg",
    // "https://res.cloudinary.com/dvjs0xmcy/image/upload/v1722765140/rj5ssxto2uyeqx5rje5v.jpg",
    
  ]);

  const [product, setProduct] = useState({
    user: id,
    name: "Seiko Mod",
    description:
      "A Seiko mod watch is a customized timepiece that combines the reliable craftsmanship of Seiko with unique, personalized modifications. These modifications can range from simple changes, like swapping out the bezel or the dial, to more complex overhauls involving the movement and case design. Enthusiasts often modify Seiko watches to create unique aesthetics that reflect their personal style, drawing inspiration from high-end luxury models, vintage designs, or completely original concepts. The modular nature of Seiko watches, particularly the SKX and 5 series, makes them ideal canvases for such creative endeavors.The allure of Seiko mod watches lies in the blend of practicality and individuality. These customizations not only enhance the watch's appearance but can also improve its functionality and durability. For instance, modders might upgrade the crystal to sapphire for better scratch resistance or replace the stock hands with luminescent ones for improved visibility. The result is a timepiece that maintains Seiko's renowned reliability and precision while standing out as a one-of-a-kind accessory. Whether you're an experienced watch enthusiast or new to the hobby, a Seiko mod watch offers a unique opportunity to own a personalized piece of horological art.",
    condition: "Brand New",
    bracelet: "Oyster Bracelet",
    brand: "Rolex",
    material: "Stainless Steel",
    images: [],
    price: 12500,
    originalPrice: 15000,
    movement: "Seiko NH35a Date Automatik Movement",
    thickness: "12mm",
    glass: "Saphire Glass - Scratch Proof",
    luminova: "Yes",
    casematerial: "316L Stainless Steel",
    crown: "Screwed Down",
    bandsize: "14.5cm to 22cm (Adjustable)",
    lugs: "20mm",
    water: "5 ATM",
  });

  const handleChange = (e)=> {
    const {name, value}= e.target;
    setProduct((prevState)=> ({
        ...prevState, [name]: value
    }))

  };

  const handleUpload = (result)=> {
    if(result.event === "success"){
        const newUrl = result.info.secure_url;
        setImageUrls((prevUrls)=> [...prevUrls, newUrl]);

    }
  }


  const handleRemoveImage = (e, urlToRemove)=> {
    e.preventDefault();
    setImageUrls((prevUrls)=> prevUrls.filter((url)=> url !== urlToRemove));
  }

  const handleSubmit = async (e)=> {
    e.preventDefault();
      if(imageUrls.length > 0){
        try {
            const productData = {
                ...product, images: imageUrls
            };
            const productRes = await axios.post("/api/products", productData);
            if(productRes.status === 200 || productRes.status === 201){
                router.push("/")
            }
        } catch (error) {
            console.log(error);
            
        }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-blue-600 py-6">
          <h1 className="text-center text-white text-3xl font-extrabold">
            Submit a Product
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="px-8 py-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <Input
                type="text"
                name="name"
                id="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <select
                name="brand"
                id="brand"
                value={product.brand}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Select a brand</option>
                <option value="Rolex">Rolex</option>
                <option value="Patek Philipe">Patek Philippe</option>
                <option value="Audemars Piguet">Audemars Piguet</option>
                <option value="Richard Mille">Richard Mille</option>
                <option value="Omega">Omega</option>
                <option value="IWC">IWC</option>
                <option value="Cartier">Cartier</option>
                <option value="Tudor">Tudor</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Images
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <CldUploadButton
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  options={{ multiple: true }}
                  uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                  onSuccess={handleUpload}
                >
                  {imageUrls.length > 0 ? "Add More Images" : "Upload Images"}
                </CldUploadButton>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <Image
                    height={500}
                    width={500}
                    className="h-24 w-full object-cover rounded-md"
                    src={url}
                    alt={`Uploaded image ${index + 1}`}
                  />
                  <button
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md"
                    onClick={(e) => handleRemoveImage(e, url)}
                  >
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Material
              </label>
              <select
                name="material"
                id="material"
                value={product.material}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Select material</option>
                <option value="Stainless Steel">Stainless Steel</option>
                <option value="Gold">Gold</option>
                <option value="Rose Gold">Rose Gold</option>
                <option value="Two Tone">Two Tone</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bracelet Style
              </label>
              <select
                name="bracelet"
                id="bracelet"
                value={product.bracelet}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Select bracelet style</option>
                <option value="Oyster Bracelet">Oyster Bracelet</option>
                <option value="Jubilee Bracelet">Jubilee Bracelet</option>
                <option value="Presidential Bracelet">
                  Presidential Bracelet
                </option>
                <option value="Iconic Brand Bracelet">
                  Iconic Brand Bracelet
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Watch Condition
              </label>
              <select
                name="condition"
                id="condition"
                value={product.condition}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Select condition</option>
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Well Worn">Well Worn</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Movement
              </label>
              <select
                name="movement"
                id="movement"
                value={product.movement}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Select movement</option>
                <option value="Rolex 3235 Automatik Movement">
                  Rolex 3235 Automatik Movement
                </option>
                <option value="Rolex 3225 Automatik Movement">
                  Rolex 3225 Automatik Movement
                </option>
                <option value="Rolex 3245 Automatik Movement">
                  Rolex 3245 Automatik Movement
                </option>
                <option value="Rolex 3265 Automatik Movement">
                  Rolex 3265 Automatik Movement
                </option>
                <option value="Patek Philipe 5711 Automatik Movement">
                  Patek Philipe 5711 Automatik Movement
                </option>
                <option value="Patek Philipe 5712G Automatik Movement">
                  Patek Philipe 5712G Automatik Movement
                </option>
                <option value="Audemars Piguet 412513 Automatik Movement">
                  Audemars Piguet 412513 Automatik Movement
                </option>
                <option value="Audemars Piguet 414221 Automatik Movement">
                  Audemars Piguet 414221 Automatik Movement
                </option>
            
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thickness
              </label>
              <Input
                type="text"
                name="thickness"
                id="thickness"
                value={product.thickness}
                onChange={handleChange}
                placeholder="e.g., 12mm"
                className="w-full"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Glass
              </label>
              <Input
                type="text"
                name="glass"
                id="glass"
                value={product.glass}
                onChange={handleChange}
                placeholder="e.g., Sapphire Glass - Scratch Proof"
                className="w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Luminova
              </label>
              <Input
                type="text"
                name="luminova"
                id="luminova"
                value={product.luminova}
                onChange={handleChange}
                placeholder="e.g., Yes"
                className="w-full"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Case Material
              </label>
              <select
                name="casematerial"
                id="casematerial"
                value={product.casematerial}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Select case material</option>
                <option value="316L Stainless Steel">
                  316L Stainless Steel
                </option>
                <option value="904L Stainless Steel">
                  904L Stainless Steel
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Crown
              </label>
              <Input
                type="text"
                name="crown"
                id="crown"
                value={product.crown}
                onChange={handleChange}
                placeholder="e.g., Screwed"
                className="w-full"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Band Size
              </label>
              <Input
                type="text"
                name="bandsize"
                id="bandsize"
                value={product.bandsize}
                onChange={handleChange}
                placeholder="e.g., 14.5cm to 22cm (Adjustable)"
                className="w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lugs
              </label>
              <Input
                type="text"
                name="lugs"
                id="lugs"
                value={product.lugs}
                onChange={handleChange}
                placeholder="e.g., 20mm"
                className="w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Water Resistance
              </label>
              <Input
                type="text"
                name="water"
                id="water"
                value={product.water}
                onChange={handleChange}
                placeholder="e.g., 3 ATM"
                className="w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description of the Product
            </label>
            <Textarea
              name="description"
              id="description"
              value={product.description}
              onChange={handleChange}
              rows={4}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Detailed product description"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Original Price
              </label>
              <Input
                type="number"
                name="originalPrice"
                id="originalPrice"
                value={product.originalPrice}
                onChange={handleChange}
                placeholder="Enter original price"
                className="w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sale Price
              </label>
              <Input
                type="number"
                name="price"
                id="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter sale price"
                className="w-full"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              variant="myButton"
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
