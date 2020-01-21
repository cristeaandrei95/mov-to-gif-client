import React from "react";
import { useDropzone } from "react-dropzone";
import cubes from "./../cubes.png";
import styles from "./Dropzone.module.scss";

export default function Dropzone({ onDrop }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={styles.root}>
      <div className={styles.dropzone} {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <h2 className={styles.title}>Yes, right here ...</h2>
        ) : (
          <h2 className={styles.title}>Drop your files here</h2>
        )}
        <img src={cubes} className={styles.image} alt="cubes" />
        <p className={styles.text}>
          or <span className={styles.span}>Click to select files</span>
        </p>
      </div>
    </div>
  );
}
