import React from "react";
import classnames from "classnames";
import styles from "./FilesQueue.module.scss";
import { ReactComponent as ImageFile } from "./../file.svg";
import { ReactComponent as ImageZip } from "./../zip.svg";

export default ({
  files,
  handleRemoveFile,
  handleFilesUpload,
  isConverting,
  ticket
}) => (
  <div className={styles.root}>
    <div className={styles.fileQueue}>
      <h3 className={styles.title}>Files queue:</h3>
      {Boolean(files.length) && (
        <div className={styles.fileList}>
          {files.map((file, i) => (
            <File
              key={i}
              data={file}
              handleRemoveFile={() => handleRemoveFile(file.name)}
              isConverting={isConverting}
              ticket={ticket}
            />
          ))}
        </div>
      )}
      <div className={styles.spacer}></div>
      {!ticket && (
        <div className={styles.footer}>
          <button
            disabled={!files.length || isConverting}
            className={styles.button}
            onClick={handleFilesUpload}
          >
            {!isConverting ? "Convert files" : <div className="loader"></div>}
          </button>
        </div>
      )}
      {ticket && (
        <div className={styles.footer}>
          <a
            className={styles.button}
            href={`http://localhost:3001/api/v1/download/${ticket}`}
          >
            Download
            <ImageZip className={styles.imageZip} alt="zip" />
          </a>
        </div>
      )}
    </div>
  </div>
);

const File = ({ data, handleRemoveFile, isConverting, ticket }) => (
  <div
    className={classnames(styles.file, {
      [styles.disabled]: isConverting || ticket
    })}
  >
    {!isConverting && !ticket && (
      <button className={styles.close} onClick={handleRemoveFile}>
        &times;
      </button>
    )}
    <ImageFile className={styles.imageFile} alt="file icon" />
    <p className={styles.text}>{data.name}</p>
  </div>
);
