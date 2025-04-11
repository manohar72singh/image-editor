/* eslint-disable default-case */
import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { Download, Square, Circle, Triangle, Type } from "lucide-react";

const Canvas = ({ imageUrl, onClose }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const canvasElement = document.getElementById("canvas");
    if (!canvasElement) return;

    requestAnimationFrame(() => {
      const canvas = new fabric.Canvas(canvasElement, {
        width: containerRef.current.offsetWidth,
        height: 600,
      });

      canvasRef.current = canvas;

      fabric.Image.fromURL(imageUrl, (img) => {
        const scale = Math.min(
          canvas.width / img.width,
          canvas.height / img.height
        );
        img.scale(scale);
        canvas.add(img);
        if (canvasRef.current) {
          canvasRef.current.renderAll();
        }
      });

      return () => {
        canvas.dispose();
      };
    });
  }, [imageUrl]);

  const addObject = (type) => {
    if (!canvasRef.current) return;

    let object;

    switch (type) {
      case "text":
        object = new fabric.IText("Double click to edit", {
          left: 100,
          top: 100,
          fontSize: 20,
          fill: "#000000",
        });
        break;
      case "rect":
        object = new fabric.Rect({
          left: 100,
          top: 100,
          width: 50,
          height: 50,
          fill: "#ff0000",
        });
        break;
      case "circle":
        object = new fabric.Circle({
          left: 100,
          top: 100,
          radius: 25,
          fill: "#00ff00",
        });
        break;
      case "triangle":
        object = new fabric.Triangle({
          left: 100,
          top: 100,
          width: 50,
          height: 50,
          fill: "#0000ff",
        });
        break;
    }

    if (object) {
      canvasRef.current.add(object);
      canvasRef.current.setActiveObject(object);
      canvasRef.current.renderAll();
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "modified-image.png"; // Set the default file name

    // Programmatically click the link to trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up the DOM
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Edit Image</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => addObject("text")}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Type size={20} />
            <span>Add Text</span>
          </button>
          <button
            onClick={() => addObject("rect")}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            <Square size={20} />
            <span>Add Rectangle</span>
          </button>
          <button
            onClick={() => addObject("circle")}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <Circle size={20} />
            <span>Add Circle</span>
          </button>
          <button
            onClick={() => addObject("triangle")}
            className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            <Triangle size={20} />
            <span>Add Triangle</span>
          </button>
          <button
            onClick={downloadImage}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            <Download size={20} />
            <span>Download</span>
          </button>
        </div>
        <div ref={containerRef} className="w-full">
          <canvas id="canvas" className="border border-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default Canvas;
