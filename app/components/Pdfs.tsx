"use client";

import React from 'react'
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const Pdfs = () => {
  const materials = useQuery(api.courses.getAllMaterials);

  if (materials === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-200">Loading materials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="flex justify-center text-white text-2xl font-bold mb-6">Download PDFs</h1>
     
      {materials.map(material => (
       <main className="p-3" key={material._id}>
        <button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto p-2">
          <a href={material.url} download>{material.nameArabic}</a>
        </button>
        </main>
      ))}
      </div>
  )
}

export default Pdfs;