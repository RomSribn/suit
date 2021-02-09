import * as React from 'react';
import { StoreItemTitle } from './StoreItemTitle';
import { CustomFileInput } from '../../../components/FileInput';
import ReactPlayer from 'react-player';
import { TextInput } from '../../../components/TextInput';
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
              value={value && value.trim()}
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
      <ReactPlayer url={video} width="100%" height="50%" controls={true} />

      <StoreItemTitle title={title} priceBlock={priceBlock} />
      <div className="view-store-item__description">
        <span className="pdf-link">
          {`скачать пример pdf заказа для клиента`}
        </span>
        <p>{description}</p>
      </div>
      {renderFileInputs()}
      {renderTextInputs()}
    </div>
  );
};

export { ViewStoreItem };
