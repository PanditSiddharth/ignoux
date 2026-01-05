"use client";
import { IProduct } from "@/modals/product.model";
import { Download } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { downloadLink } from "./download-product";


 export const transaction = (product: IProduct ) => {
     if(!product)
         return null
    toast.loading("Fetching transaction details...")

        toast(
            <div className="p-4 max-w-lg sm:max-w-lg rounded-lg shadow-lg bg-white text-gray-900">
                <h3 className="text-lg font-semibold mb-2">Transaction details</h3>
                <p className="text-sm mb-4">
                    See transaction details of your product and download the product.
                </p>
                {product && (
                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center gap-4 mb-4">
                            <Image
                                src={product.thumbnail}
                                alt={product.title}
                                width={80}
                                height={80}
                                className="rounded-md object-cover border"
                            />
                            <div>
                                <h4 className="font-medium">{product.title}</h4>
                                <small className="text-gray-500">ID: {product._id + ""}</small>
                            </div>
                        </div>
                        <p className="text-sm"><strong>Paid:</strong> ${product.price}</p>
            
                    </div>
                )}
                <div className="mt-4 flex gap-3">
                { product?.fileLink ?
                        <div
                            onClick={async ()=> await downloadLink(product?.fileLink + "")}
                            className="flex items-center text-green-400 hover:text-green-800 cursor-pointer"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Download Product
                        </div> : "" }
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

