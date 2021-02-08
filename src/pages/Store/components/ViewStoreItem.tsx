import * as React from 'react';
import { StoreItemTitle } from './StoreItemTitle';
import { CustomFileInput } from '../../../components/FileInput';
import ReactPlayer from 'react-player';
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
  setUsersStoreItems,
  usersStoreItems,
  removeSpecificFileFromItem,
}: ViewStoreItemProps) => {
  const [files, setFiles] = React.useState({ id, droppedFiles: [] });
  const currentUsersStoreItems = usersStoreItems.find((item) => item.id === id);
  const currentFiles = currentUsersStoreItems
    ? currentUsersStoreItems.files
    : files.id === id
    ? files.droppedFiles
    : [];
  // tslint:disable-next-line
  const onDrop = (droppedFiles: any) => {
    setFiles({ id, droppedFiles });
    setUsersStoreItems({
      id,
      title,
      files: droppedFiles,
      fields: inputs,
    });
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
    </div>
  );
};

export { ViewStoreItem };
