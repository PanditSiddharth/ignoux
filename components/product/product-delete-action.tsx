"use client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IProduct } from "@/modals/product.model";
import Image from "next/image";
import { deleteProducts } from "@/server-functions/product";

    const handleDelete = async (product: Partial<IProduct>) => {
        try {
            const res = await deleteProducts(product._id + "");
            if(res.error){
               return toast.error("Failed to delete the product", {
                    className: "bg-red-500 text-white font-semibold p-4 rounded-lg shadow-md",
                });
            }
            window.location.reload()
            return toast.success("Product deleted successfully", {
                className: "bg-green-500 text-white font-semibold p-4 rounded-lg shadow-md",
            });
    
        } catch (error) {
            console.error("Failed to delete the product", error);
            toast.error("Failed to delete the product", {
                className: "bg-red-500 text-white font-semibold p-4 rounded-lg shadow-md",
            });
        }
    };

 export const confirmDelete = (product: Partial<IProduct>) => {
if(!product)
    return null
        toast(
            <div className="p-4 max-w-lg sm:max-w-lg rounded-lg shadow-lg bg-white text-gray-900">
                <h3 className="text-lg font-semibold mb-2">Delete Product</h3>
                <p className="text-sm mb-4">
                    Are you sure you want to delete this product? This action cannot be undone.
                </p>
                {product && (
                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center gap-4 mb-4">
                            <Image
                                src={product.thumbnail!}
                                alt={product.title!}
                                width={80}
                                height={80}
                                className="rounded-md object-cover border"
                            />
                            <div>
                                <h4 className="font-medium">{product.title}</h4>
                                <small className="text-gray-500">ID: {product.slug + ""}</small>
                            </div>
                        </div>
                        <p className="text-sm"><strong>Price:</strong> ${product.price}</p>
                        <p className="text-sm"><strong>Description:</strong> {product?.description?.substring(0, 100)}</p>
                        <p className="text-sm mt-2"><strong>Tags:</strong> {product?.tags?.map(tag => (
                            <span key={tag} className="mr-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-lg">{tag}</span>
                        ))}</p>
                    </div>
                )}
                <div className="mt-4 flex gap-3">
                    <button
                        className="bg-red-600 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-red-700"
                        onClick={() => {handleDelete(product)}}
                    >
                        Confirm
                    </button>
                    <button
                        className="bg-gray-300 text-gray-800 px-4 py-1.5 rounded-lg font-semibold hover:bg-gray-400"
                        onClick={() => {
                            toast.dismiss();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>,
            {
                closeButton: false,
                autoClose: false,
                position: "top-center",
                className: "custom-toast",
            }
        );
    };

