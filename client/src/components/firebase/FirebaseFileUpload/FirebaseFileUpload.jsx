import React, { useState } from "react";
import { storage } from "../index";
import "./FirebaseFileUpload.css";
import Attachmentfile from "../../attachmentfile";
import LinearProgress from "@material-ui/core/LinearProgress";

const FirebaseFileUpload = ({ filsesToSend = [], filesSetter }) => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      var files = e.target.files;
      var filesArr = Array.prototype.slice.call(files);
      setSelectedFiles(filesArr);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();

    try {
      const uploadTask = storage.ref(`files/${file?.name}`).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("files")
            .child(file?.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              filesSetter([...filsesToSend, { name: file?.name, url: url }]);
            });
          // setFilesToUpload([...filesToUpload, { name: file?.name, url: url }]);
          setSelectedFiles([]);
        }
      );
    } catch (error) {
      console.log("error occurred while uploading the files !", error);
    }
  };

  return (
    <div className="firebaseFileUpload">
      <br />
      <br />
      <label className="btn uploadButton">
        <input type="file" multiple onChange={handleChange} />
        בחר קובץ +
      </label>
      <div className="attachments-div">
        <div className="attachments-list">
          <div
            className="sleeted-files"
            style={{
              display: selectedFiles.length ? "block" : "none",
            }}
          >
            <h4 className="underlinedTitle">הקובץ שנבחר</h4>

            {selectedFiles.map((file, index) => {
              return <Attachmentfile key={index} fileTitle={file.name} />;
            })}
            <LinearProgress
              style={{ width: "50%" }}
              variant="determinate"
              value={progress}
            />
          </div>

          <button
            style={{ display: selectedFiles.length ? "block" : "none" }}
            id="upload-to-firebase"
            onClick={handleUpload}
          >
            תכין לשליחה +
          </button>
          <h4
            className="underlinedTitle"
            style={{
              display: filsesToSend?.length ? "block" : "none",
            }}
          >
            קבצים לשלוח עם ההצעה{" "}
          </h4>
          {filsesToSend?.map((file, index) => {
            return <Attachmentfile key={index} fileTitle={file.name} />;
          })}
        </div>
      </div>

      <br />
      <br />
    </div>
  );
};

export default FirebaseFileUpload;
