import * as React from 'react';
import blankFileIcon from '../../../assets/images/svg/blank-file.svg';
import '../styles/thumb.styl';

const Thumb = ({ file, index, handleRemove }) => {
  const [loading, setLoading] = React.useState(true);
  const [thumb, setThumb] = React.useState();

  const reader = new FileReader();

  React.useEffect(() => {
    reader.onload = () => {
      setThumb(reader.result);
    };
    reader.readAsDataURL(file);
    setLoading(false);
  }, [file, handleRemove, loading, reader]);

  if (loading) {
    return <p>loading...</p>;
  }
  return (
    <figure className="hover-img-thumb">
      <img
        onClick={() => {
          handleRemove(file);
        }}
        src={blankFileIcon}
        alt={file.name}
        className="hover-img"
        height={200}
      />
      <span className="thumb-name">{file.name}</span>
    </figure>
  );
};

export { Thumb };
