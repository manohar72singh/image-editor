import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import ImageGrid from "./components/ImageGrid";
import Canvas from "./components/Canvas";
import { ImageIcon } from "lucide-react";

// Demo key for testing
const YOUR_ACCESS_KEY = "7aTGa05xp9a9OzN5GRi1MGaXGR3Nwh75xLLL8IAsvV8";
function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${YOUR_ACCESS_KEY}`
      );
      const data = await response.json();

      if (response.ok) {
        const images = data.results.map((image) => ({
          id: image.id,
          urls: {
            regular: image.urls.regular,
            small: image.urls.small,
          },
          alt_description: image.alt_description,
        }));
        setImages(images);
      } else {
        throw new Error(data.errors[0]);
      }
    } catch (err) {
      setError("Failed to fetch images. Please try again.");
      console.error("Error fetching images:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ImageIcon size={40} className="text-blue-500" />
            <h1 className="text-4xl font-bold ml-2">Image Editor</h1>
          </div>
          <p className="text-gray-600">
            Search for images, add captions and shapes, then download your
            creation
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="mt-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <ImageGrid
            images={images}
            onImageSelect={(image) => setSelectedImage(image)}
          />
        )}

        {selectedImage && (
          <Canvas
            imageUrl={selectedImage.urls.regular}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
