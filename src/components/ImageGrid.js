import React from "react";
import { Edit2 } from "lucide-react";

const ImageGrid = ({ images, onImageSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      {images.map((image) => (
        <div key={image.id} className="relative group">
          <img
            src={image.urls.small}
            alt={image.alt_description}
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            onClick={() => onImageSelect(image)}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg">
              <Edit2 size={20} />
              <span>Edit Image</span>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
