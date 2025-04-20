import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AdminPage = () => {
  const [productName, setProductName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const uniqueId = uuidv4();
    const link = `${window.location.origin}/track/${uniqueId}`;
    setGeneratedLink(link);
    // Logic to store product and customer details along with the uniqueId
    console.log("Product:", productName);
    console.log("Customer:", customerName);
    console.log("Generated Link:", link);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin - Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Customer Name
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate Link
        </button>
      </form>
      {generatedLink && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700">Generated Link:</p>
          <a
            href={generatedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            {generatedLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
