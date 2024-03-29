import * as React from 'react';
import { StoreItemTitle } from './StoreItemTitle';
import { Link } from 'react-router-dom';
import { findDOMNode } from 'react-dom';
import { CustomFileInput } from '../../../components/FileInput';
import ReactPlayer from 'react-player';
import { TextInput } from '../../../components/TextInput';
import { isMobile } from '../../../utils';
import * as screenfull from 'screenfull';
import * as classnames from 'classnames';
import '../styles/viewStoreItem.styl';

const ViewStoreItem = ({
  id,
  title,
  description,
  priceBlock,
  inputs,
  videoWebm,
  videoMp4,
  droppMsg,
  isFileInput,
  setUsersStoreFiles,
  usersStoreItems,
  removeSpecificFileFromItem,
  setTextInputFields,
  storeError,
  file,
  fileBtnTitle,
  isAuth,
  anonUserInfo,
  setAnonUserInfo,
  nameBtn,
  emailBtn,
}: ViewStoreItemProps) => {
  const [player, setPlayer] = React.useState<ReactPlayer | null>(null);
  const [fullscreen, setFullscreen] = React.useState<boolean>(false);
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

  const handleClickFullscreen = () => {
    if (screenfull.isEnabled && !window.chrome) {
      // tslint:disable-next-line
      const playerInDOM: any = findDOMNode(player);
      screenfull.toggle(playerInDOM);
    }
  };
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
            key={inputTitle + id}
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

  const renderAnonUserInfoInputs = () => {
    const name = anonUserInfo ? anonUserInfo.name : '';
    const email = anonUserInfo ? anonUserInfo.email : '';
    return !isAuth ? (
      <div className="anon-userinfo-inputs">
        <TextInput
          title={nameBtn}
          placeholder={nameBtn}
          onChange={(userStoresValue, e) =>
            setAnonUserInfo({ name: e.target.value, email })
          }
          value={name}
        />
        <TextInput
          title={emailBtn}
          placeholder={emailBtn}
          onChange={(userStoresValue, e) =>
            setAnonUserInfo({ name, email: e.target.value })
          }
          value={email}
          type={emailBtn}
        />
      </div>
    ) : (
      ''
    );
  };

  if (screenfull.isEnabled) {
    screenfull.on('change', () => {
      if (screenfull.isEnabled) {
        setFullscreen(screenfull.isFullscreen);
      }
    });
  }
  return (
    <div className="view-store-item" onDoubleClick={handleClickFullscreen}>
      <ReactPlayer
        ref={(playerRef) => setPlayer(playerRef)}
        width="100%"
        height={isMobile() ? 'auto' : '50%'}
        controls={true}
        playing={true}
        playsinline={true}
        loop={true}
        className={classnames('react-player', { fullscreen })}
        url={[
          { src: videoWebm, type: 'video/webm' },
          { src: videoMp4, type: 'video/mp4' },
        ]}
      />

      <StoreItemTitle title={title} priceBlock={priceBlock} />
      <div className="view-store-item__description">
        {renderPreviewFileDownload()}
        <p>{isMobile() ? description : description.slice(0, 140) + '…'}</p>
      </div>
      <span className="error-message">{storeError && storeError.message}</span>
      {renderFileInputs()}
      {renderTextInputs()}
      {renderAnonUserInfoInputs()}
    </div>
  );
};

export { ViewStoreItem };
