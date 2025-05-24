import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import useDrivePicker from 'react-google-drive-picker';
import './App.css';

export const App = () => {
  const [files, setFiles] = useState([]);
  const [openPicker] = useDrivePicker();

  // Drag and Drop function
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: acceptedFiles => setFiles(prev => [...prev, ...acceptedFiles]),
  });

  // Google Drive Picker function
  const handleGoogleDrive = () => {
    openPicker({
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      developerKey: process.env.REACT_APP_GOOGLE_API_KEY,
      viewId: 'DOCS',
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      callbackFunction: (data) => {
        if (data.action === 'picked') {
          setFiles(prev => [ ...prev, ...data.docs.map(doc => ({
                                      name: doc.name || doc.title,
                                       url: doc.url }))
          ]);
        }
      },
    });
  };

  return (
    <div className='contain'>
      <div className='heading'>Welcome to the File Uploader</div>
      <div className="uploader">
        <div {...getRootProps()}
          className={`dropzone${isDragActive ? ' active' : ''}`}
        >
          <input {...getInputProps()} />
          {isDragActive ? 'Drop files here...' : 'Drag & drop files, or click to select'}
        </div>

        <div className='or-comp'>
            <span className='or-left'>--------------</span> 
            <span className='letter-or'>OR</span>
            <span className='or-right'>-------------</span>
        </div>

        <button className="drive-btn" onClick={handleGoogleDrive} > Select from Google Drive </button>
       
        <div className="file-list">
          {files.length > 0 && <strong>Uploaded Files:</strong>}
          {files.map((file, i) => (
            <div key={i} className="file-item">
              {file.name}
              {file.url && (
                <a href={file.url} className='link' target="_blank" rel="noreferrer"> LINK </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
}
