import { useState, useRef } from "react";
import { BsCardImage } from "react-icons/bs";

export default function UploadImage({ storeFile, uploadedUrl }) {
  const logo = useRef(null);
  const [src, setSrc] = useState(uploadedUrl);
  const handleImageSelection = () => {
    const pic = logo.current;
    if (pic.files[0]) {
      setSrc(URL.createObjectURL(pic.files[0]));
      storeFile(pic.files[0]);
    }
  };
  return (
    <div className="relative flex items-center justify-center w-48 h-48 mt-4 mr-4 text-lg text-center border border-dashed rounded md:ml-4 border-primary text-primary">
      {src ? (
        <img src={src} alt={`${src}`} className="rounded w-44 h-44" />
      ) : (
        <div>
          <BsCardImage className="mx-auto text-3xl" />
          <p className="mt-2">Drop image here</p>
          <p className="my-1">or</p>
          <p>Click here</p>
        </div>
      )}
      <input
        ref={logo}
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={handleImageSelection}
      />
    </div>
  );
}
