import { useId, useState } from "react";
import ValidatingFile from "./ValidatingFile.jsx";

const MAX_FILE_SIZE_MB = 10;

function getFileExtension(fileName) {
  const dotIndex = fileName.lastIndexOf(".");

  if (dotIndex === -1) return "";

  return fileName.slice(dotIndex).toLowerCase();
}

function getAllowedExtensions(acceptedFileTypes) {
  return acceptedFileTypes
    .split(",")
    .map((type) => type.trim().toLowerCase())
    .filter(Boolean);
}

function UploadBox({
  config,
  uploadConfig,
  monthDetails,
  onUploadSuccess,
  onUploadError,
  showMonthInButton = true,
  validatingMessage = "Validating file...",
}) {
  const inputId = useId();

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const validateAndProcessFile = (file) => {
    if (!file) {
      onUploadError({
        title: "No File Selected",
        message: "Please select a file before continuing.",
        detail: `Upload a valid ${config.title} ${uploadConfig.reportName.toLowerCase()}.`,
      });
      return;
    }

    const allowedExtensions = getAllowedExtensions(
      uploadConfig.acceptedFileTypes,
    );
    const fileExtension = getFileExtension(file.name);

    if (!allowedExtensions.includes(fileExtension)) {
      onUploadError({
        title: "Invalid File Type",
        message: `Invalid file type. Please upload a valid ${config.title} ${uploadConfig.reportName.toLowerCase()} (${uploadConfig.acceptedFileLabel} format only).`,
        detail: `Please upload a valid ${config.title} ${uploadConfig.reportName.toLowerCase()} (${uploadConfig.acceptedFileLabel} format only).`,
      });
      return;
    }

    if (file.size === 0) {
      onUploadError({
        title: "Empty File",
        message: "The uploaded file is empty.",
        detail: "Please export the report again and upload a file with data.",
      });
      return;
    }

    const fileSizeInMB = file.size / (1024 * 1024);

    if (fileSizeInMB > MAX_FILE_SIZE_MB) {
      onUploadError({
        title: "File Too Large",
        message: `File size is too large. Maximum allowed size is ${MAX_FILE_SIZE_MB}MB.`,
        detail:
          "Please upload a smaller report file or export only the selected month.",
      });
      return;
    }

    setSelectedFileName(file.name);
    setIsValidating(true);

    // Temporary mock validation.
    // Later replace this with backend/API response.
    setTimeout(() => {
      setIsValidating(false);
      onUploadSuccess(file);
    }, 1500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    validateAndProcessFile(file);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    validateAndProcessFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  if (isValidating) {
    return <ValidatingFile message={validatingMessage} />;
  }

  return (
    <div
      className={`upload-box ${isDragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        id={inputId}
        type="file"
        accept={uploadConfig.acceptedFileTypes}
        hidden
        onChange={handleFileChange}
      />

      <label htmlFor={inputId} className="upload-main-btn">
        <span>☁</span>
        {uploadConfig.uploadButtonText}
        {showMonthInButton && <> — {monthDetails.displayMonth}</>}
      </label>

      <p>{uploadConfig.dragDropText}</p>
      <small>{uploadConfig.acceptedText}</small>

      {selectedFileName && (
        <div className="selected-file-pill">
          Selected file: <strong>{selectedFileName}</strong>
        </div>
      )}
    </div>
  );
}

export default UploadBox;
