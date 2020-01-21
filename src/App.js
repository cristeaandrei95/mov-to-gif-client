import React, { useState, useCallback } from "react";
import styles from "./App.module.scss";
import Dropzone from "./Components/Dropzone";
import FilesQueue from "./Components/FilesQueue";
import { getData, postData } from "./services";

const fileLimit = 10;

function App() {
  const [files, setFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [ticket, setTicket] = useState(null);
  const handleRemoveFile = name => {
    setFiles(files => {
      const filteredFiles = files.filter(item => item.name !== name);

      return [...filteredFiles];
    });
  }
  const handleFilesUpload = async () => {
    setIsConverting(true);

    const formData = new FormData();
    const { ticketID } = await getData("v1/ticket");

    formData.append("ticketID", ticketID);
    files.forEach((file, i) => formData.append(`file${i}`, file));

    await postData("v1/upload-files", formData);
    await getData(`v1/convert?ticketID=${ticketID}`);

    setTicket(ticketID);
    setIsConverting(false);
  };

  const onDrop = useCallback(
    acceptedFiles => {
      const totalFilesNumber = files.length + acceptedFiles.length;

      if (totalFilesNumber > fileLimit) {
        alert("Limit exceeded!");

        return;
      }

      if (isConverting || ticket) return;

      setFiles(files => {
        const filesWithUniqueName = acceptedFiles.filter(
          newFile => !files.find(oldFile => oldFile.name === newFile.name)
        );

        return [...files, ...filesWithUniqueName];
      });
    },
    [files.length, setFiles, isConverting, ticket]
  );

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Convert videos to Gifs</h1>
      <section className={styles.content}>
        <Dropzone onDrop={onDrop} />
        <FilesQueue
          files={files}
          handleRemoveFile={handleRemoveFile}
          handleFilesUpload={handleFilesUpload}
          isConverting={isConverting}
          ticket={ticket}
        />
      </section>
    </div>
  );
}

export default App;
