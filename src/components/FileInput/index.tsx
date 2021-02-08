import * as React from 'react';
import Dropzone from 'react-dropzone';
import { Thumb } from './components/Thumb';
import './index.styl';

const CustomFileInput = ({
  title,
  dropMsg,
  onDrop: action,
  files,
  isShowThumb = true,
  handleRemove,
  id,
}: IFileInputProps) => {
  // tslint:disable-next-line
  const onDrop = (acceptedFiles: any) => {
    const acceptedFilesNew = files.concat(acceptedFiles);
    action(acceptedFilesNew);
  };

  const removeItem = (file: File) => {
    handleRemove(file, id);
  };
  const drugndropMsg = {
    active: dropMsg,
    not: title,
  };

  const renderThumbIcons = () => {
    return isShowThumb && files && files.length
      ? // tslint:disable-next-line
        files.map((file: any, index: any) => (
          <Thumb index={index} handleRemove={removeItem} file={file} />
        ))
      : '';
  };
  return (
    <Dropzone multiple={true} onDrop={onDrop}>
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div>
          <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? drugndropMsg.active : drugndropMsg.not}
          </div>
          <div className="dropzone-images">{renderThumbIcons()}</div>
        </div>
      )}
    </Dropzone>
  );
};

export { CustomFileInput };
