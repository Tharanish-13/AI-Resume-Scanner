import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { parseResumeFromPdf } from "../lib/parse-resume-from-pdf";
import {
  getHasUsedAppBefore,
  saveStateToLocalStorage,
} from "../lib/redux/local-storage";
import { initialSettings } from "../lib/redux/settingsSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { deepClone } from "../lib/deep-clone";

const defaultFileState = {
  name: "",
  size: 0,
  fileUrl: "",
};

export const ResumeDropzone = ({
  onFileUrlChange,
  className,
  playgroundView = false,
}) => {
  const [file, setFile] = useState(defaultFileState);
  const [isHoveredOnDropzone, setIsHoveredOnDropzone] = useState(false);
  const [hasNonPdfFile, setHasNonPdfFile] = useState(false);
  const router = useRouter();

  const hasFile = Boolean(file.name);

  const setNewFile = (newFile) => {
    if (file.fileUrl) {
      URL.revokeObjectURL(file.fileUrl);
    }

    const { name, size } = newFile;
    const fileUrl = URL.createObjectURL(newFile);
    setFile({ name, size, fileUrl });
    onFileUrlChange(fileUrl);
  };

  const onDrop = (event) => {
    event.preventDefault();
    const newFile = event.dataTransfer.files[0];
    if (newFile.name.endsWith(".pdf")) {
      setHasNonPdfFile(false);
      setNewFile(newFile);
    } else {
      setHasNonPdfFile(true);
    }
    setIsHoveredOnDropzone(false);
  };

  const onInputChange = (event) => {
    const files = event.target.files;
    if (!files) return;

    const newFile = files[0];
    setNewFile(newFile);
  };

  const onRemove = () => {
    setFile(defaultFileState);
    onFileUrlChange("");
  };

  const onImportClick = async () => {
    const resume = await parseResumeFromPdf(file.fileUrl);
    const settings = deepClone(initialSettings);

    if (getHasUsedAppBefore()) {
      const sections = Object.keys(settings.formToShow);
      const sectionToFormToShow = {
        workExperiences: resume.workExperiences.length > 0,
        educations: resume.educations.length > 0,
        projects: resume.projects.length > 0,
        skills: resume.skills.descriptions.length > 0,
        custom: resume.custom.descriptions.length > 0,
      };
      for (const section of sections) {
        settings.formToShow[section] = sectionToFormToShow[section];
      }
    }

    saveStateToLocalStorage({ resume, settings });
    router.push("/resume-builder");
  };

  return (
    <div
      className={`dropzone-container ${
        isHoveredOnDropzone ? "dropzone-hovered" : ""
      } ${playgroundView ? "dropzone-playground" : "dropzone-default"} ${className || ""}`}
      onDragOver={(event) => {
        event.preventDefault();
        setIsHoveredOnDropzone(true);
      }}
      onDragLeave={() => setIsHoveredOnDropzone(false)}
      onDrop={onDrop}
    >
      <div className={`dropzone-inner ${playgroundView ? "spacing-sm" : "spacing-lg"}`}>
        {!playgroundView && (
          <Image
            src="/assets/add-pdf.svg"
            className="add-pdf-icon"
            alt="Add PDF"
            aria-hidden="true"
            width={56}
            height={56}
            priority
          />
        )}
        {!hasFile ? (
          <>
            <p className={`dropzone-text ${!playgroundView ? "dropzone-text-lg" : ""}`}>
              Browse a PDF file or drop it here
            </p>
            <p className="dropzone-subtext">
              <LockClosedIcon className="dropzone-lock-icon" />
              File data is used locally and never leaves your browser
            </p>
          </>
        ) : (
          <div className="file-preview">
            <div className="file-info">
              {file.name} - {getFileSizeString(file.size)}
            </div>
            <button
              type="button"
              className="file-remove-btn"
              title="Remove file"
              onClick={onRemove}
            >
              <XMarkIcon className="icon-medium" />
            </button>
          </div>
        )}
        <div className="dropzone-actions">
          {!hasFile ? (
            <>
              <label className={`file-label ${playgroundView ? "outlined" : "filled"}`}>
                Browse file
                <input
                  type="file"
                  className="visually-hidden"
                  accept=".pdf"
                  onChange={onInputChange}
                />
              </label>
              {hasNonPdfFile && (
                <p className="error-message">Only PDF file is supported</p>
              )}
            </>
          ) : (
            <>
              {!playgroundView && (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={onImportClick}
                >
                  Import and Continue <span aria-hidden="true">→</span>
                </button>
              )}
              <p className={`note ${!playgroundView ? "note-spacing" : ""}`}>
                Note: {playgroundView ? "Parser" : "Import"} works best on a single-column resume
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const getFileSizeString = (fileSizeB) => {
  const fileSizeKB = fileSizeB / 1024;
  const fileSizeMB = fileSizeKB / 1024;
  return fileSizeKB < 1000
    ? fileSizeKB.toPrecision(3) + " KB"
    : fileSizeMB.toPrecision(3) + " MB";
};
