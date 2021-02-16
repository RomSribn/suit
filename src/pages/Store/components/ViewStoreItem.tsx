import * as React from 'react';
import { StoreItemTitle } from './StoreItemTitle';
import { Link } from 'react-router-dom';
import { CustomFileInput } from '../../../components/FileInput';
import ReactPlayer from 'react-player';
import { TextInput } from '../../../components/TextInput';
import { isMobile } from '../../../utils';
import '../styles/viewStoreItem.styl';

const ViewStoreItem = ({
  id,
  title,
  description,
  priceBlock,
  inputs,
  video,
  droppMsg,
  isFileInput,
  setUsersStoreFiles,
  usersStoreItems,
  removeSpecificFileFromItem,
  setTextInputFields,
  storeError,
  file,
  fileBtnTitle,
}: ViewStoreItemProps) => {
  const [files, setFiles] = React.useState({ id, droppedFiles: [] });
  const [inputValues, setInputValues] = React.useState<IInputsData>({
    id,
    title,
    fields: inputs,
    files: [],
    textInputs: {},
  });
  const currentUsersStoreItems = usersStoreItems.find((item) => item.id === id);
  const currentFiles = currentUsersStoreItems
    ? currentUsersStoreItems.files
    : files.id === id
    ? files.droppedFiles
    : [];
  const currentInputValues = currentUsersStoreItems
    ? currentUsersStoreItems.textInputs
    : inputValues.id === id
    ? inputValues.textInputs
    : {};

  // tslint:disable-next-line
  const onDrop = (droppedFiles: any) => {
    setFiles({ id, droppedFiles });
    setUsersStoreFiles({
      id,
      title,
      files: droppedFiles,
      fields: inputs,
      textInputs: currentInputValues,
    });
  };

  const onInputChange = (value: string) => {
    const [inputTitle, inputPlaceholder] = value.split(':');
    const data = {
      id,
      title,
      files: [],
      fields: inputs,
      textInputs: { ...inputValues.textInputs, [inputTitle]: inputPlaceholder },
    };
    setInputValues(data);
    setTextInputFields(data);
  };

  const renderPreviewFileDownload = () => {
    return file ? (
      <Link to={file} className="pdf-link" target="_blank" download={true}>
        {fileBtnTitle}
      </Link>
    ) : (
      ''
    );
  };

  const renderFileInputs = () => {
    return isFileInput
      ? inputs.map((inputTitle, index) => (
          <CustomFileInput
            title={inputTitle}
            dropMsg={droppMsg}
            onDrop={onDrop}
            files={currentFiles}
            isShowThumb={inputs.length - 1 === index}
            handleRemove={removeSpecificFileFromItem!}
            id={id!}
            limitOfFiles={7}
          />
        ))
      : '';
  };

  const renderTextInputs = () => {
    return !isFileInput ? (
      <div className="text-inputs">
        {inputs.map((input) => {
          const [inputTitle, inputPlaceholder] = input.split(':');
          const value = currentInputValues[inputTitle];
          return (
            <TextInput
              key={input}
              title={inputTitle}
              placeholder={inputPlaceholder}
              onChange={onInputChange}
              value={value}
            />
          );
        })}
      </div>
    ) : (
      ''
    );
  };

  return (
    <div className="view-store-item">
      <ReactPlayer
        url={video}
        width="100%"
        height={isMobile() ? 'auto' : '30%'}
        controls={true}
        playing={true}
        loop={true}
        className={'react-player'}
      />

      <StoreItemTitle title={title} priceBlock={priceBlock} />
      <div className="view-store-item__description">
        {renderPreviewFileDownload()}
        <p>{description}</p>
      </div>
      <span className="error-message">{storeError && storeError.message}</span>
      {renderFileInputs()}
      {renderTextInputs()}
    </div>
  );
};

export { ViewStoreItem };
