import * as React from 'react';
import { Button } from '../../components/Button';
import { loc, generateTranslatedText } from './loc';

import './style.styl';

interface MutuallyExclusiveProps extends MutuallyExclusive {
  lang: string;
}

class MutuallyExclusivePopup extends React.Component<MutuallyExclusiveProps> {
  render() {
    const {
      lang,
      activeItem,
      activeSubgroup,
      exceptions,
      onClick,
      onClose,
    } = this.props;
    return (
      <div className="container">
        <span className="popup-text">
          {generateTranslatedText(
            lang,
            activeItem![lang],
            activeSubgroup![lang],
            exceptions,
          )}
        </span>
        <div className="container-control-panel">
          <Button theme={'black'} onClick={onClick} className="approve-button">
            <span>{loc[lang].continue}</span>
          </Button>
          <Button theme={'white'} onClick={onClose}>
            <span>{loc[lang].back}</span>
          </Button>
        </div>
      </div>
    );
  }
}

export { MutuallyExclusivePopup };
