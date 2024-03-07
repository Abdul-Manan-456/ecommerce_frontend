import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import AddPhoto from "../../../../public/icons/AddPhoto";

interface ImageUploaderProps {
  allowedTypes?: string[];
  setFiles: (arg: File[]) => void;
  files: File[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"],
  setFiles,
  files,
}) => {
  // --------- hanlde change -----
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e target: ", e.target.files);
    if (e.target.files) {
      const selectedFiles: File[] = Array.from(e.target.files);
      setFiles(selectedFiles);
    }
  };

  //  -------- handle image upload ----------------------

  return (
    <div className="relative rounded-lg p-4 border border-dashed border-gray-300 hover:border-gray-400  bg-gray-100">
      <input
        name="file"
        type="file"
        required
        multiple
        accept={allowedTypes.join(", ")}
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={(e) => handleChange(e)}
      />
      {!files.length && (
        <div className="flex flex-col justify-center items-center space-y-2">
          <AddPhoto className="w-24 h-16 text-gray-500" />
          <p className="text-gray-500">Click to browse</p>
        </div>
      )}
      {files.length > 0 && (
        <ul className="list-disc pl-4">
          {files.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      )}
      {/* <Button>upload</Button> */}
    </div>
  );
};

export default ImageUploader;
