import { useState } from "react";
import "./App.css";
import ColorThief from "colorthief";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [colorPalette, setColorPalette] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const generateColorPalette = () => {
    if (selectedImage) {
      const colorThief = new ColorThief();
      setIsLoading(true);

      const img = new Image();
      img.src = selectedImage;

      img.addEventListener("load", () => {
        const colors = colorThief.getPalette(img, 5); // Change 5 to the number of colors you want in the palette
        const hexColors = colors.map(
          (color) =>
            `#${color[0].toString(16)}${color[1].toString(
              16,
            )}${color[2].toString(16)}`,
        );

        setColorPalette(hexColors);
        setIsLoading(false);
      });
    }
  };

  return (
    <>
      <div className="grid grid-rows-2 gap-4">
        <div className="flex flex-row justify-around">
          <div className="flex items-center justify-center h-[300px] w-[300px] p-4 border-4">
            <div className="text-center">
              {isLoading ? (
                <p>Loading...</p>
              ) : selectedImage ? (
                <>
                  <img
                    src={selectedImage}
                    alt="Selected"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </>
              ) : (
                <>
                  <label htmlFor="imageInput" className="cursor-pointer">
                    Add Image
                  </label>
                  <input
                    id="imageInput"
                    name="ip"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {colorPalette.map((color, index) => (
              <div
                key={index}
                className="flex items-end h-64 w-20 p-4 border-4"
                style={{ backgroundColor: color }}
              >
                <p>{color}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          <div>
            <button
              className="w-[200px] h-[50px] bg-mg border-4 border-black"
              onClick={generateColorPalette}
            >
              Generate
            </button>
          </div>
          <div>
            <button className="w-[100px] h-[50px] bg-mb border-4 border-black">
              d
            </button>
          </div>
          <div>
            <button className="w-[100px] h-[50px] bg-mr border-4 border-black">
              r
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
