import React, { useEffect, useRef, useState } from "react";
import AddPhoto from "../../../../public/icons/AddPhoto";
import { useFormikContext } from "formik";
import axios from "axios";
import { baseUrl } from "@/lib/config/apiConfig";
interface ImageUploaderProps {
  onUploadSuccess: (files: File[]) => void;
  allowedTypes?: string[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUploadSuccess,
  allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"],
}) => {
  const formik = useFormikContext();
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  useEffect(() => {
    (async () => {
      if (files.length > 0) {
      }
      const formData = new FormData();

      files.forEach((file, index) => {
        formData.append(`imageData[${index}]`, file);
      });
      const fetchImages = await axios.post(`${baseUrl}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("fetch--------images", fetchImages);
    })();
  }, [files]);
  console.log("files---------------imageuploader", files);
  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);

    const droppedFiles = event.dataTransfer.files;
    const validFiles = [];

    for (let i = 0; i < droppedFiles.length; i++) {
      const file = droppedFiles[i];
      if (allowedTypes.includes(file.type)) {
        validFiles.push(file);
      } else {
        console.warn(
          `Invalid file type: ${file.name}. Only ${allowedTypes.join(
            ", "
          )} are allowed.`
        );
      }
    }

    setFiles(validFiles);
  };

  //--------------- UPLOADING THE IMAGES ---------------------
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    const validFiles = [];

    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        if (allowedTypes.includes(file.type)) {
          validFiles.push(file);

          // formik.setFieldValue("imageData", validFiles);
        } else {
          console.warn(
            `Invalid file type: ${file.name}. Only ${allowedTypes.join(
              ", "
            )} are allowed.`
          );
        }
      }
      setFiles(validFiles);
    }
  };

  const handleUpload = () => {
    if (files.length > 0) {
      onUploadSuccess(files);
      setFiles([]);
    } else {
      console.info("No files selected to upload.");
    }
  };

  return (
    <div
      className={`relative rounded-lg p-4 border border-dashed border-gray-300 hover:border-gray-400  "bg-gray-100"`}
    >
      <input
        ref={inputRef}
        name="file"
        type="file"
        multiple
        accept={allowedTypes.join(", ")}
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={handleChange}
      />
      {!files.length && (
        <div className="flex flex-col justify-center items-center space-y-2">
          <AddPhoto className="w-32 h-24 text-gray-500" />
          <p className="text-gray-500">Drag & drop or click to browse</p>
        </div>
      )}
      {files.length > 0 && (
        <ul className="list-disc pl-4">
          {files.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      )}
      {files.length > 0 && (
        <button
          type="button"
          className="mt-4 px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset focus:ring-offset-white"
          onClick={handleUpload}
        >
          Upload
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
