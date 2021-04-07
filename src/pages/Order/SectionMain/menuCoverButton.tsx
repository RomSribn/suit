import * as React from 'react';
import * as classnames from 'classnames';
import { setCoverByTouchEnd } from '../../../utils/common';
import './styles.styl';

const MenuCoverButton = ({
  setIsMenuUncovered,
  isMenuUncovered,
  initialTouch,
  onTouchStart,
}: IMenuCoverButtonProps) => (
  <div
    className="menu-cover-btn"
    onClick={() => setIsMenuUncovered!(!isMenuUncovered)}
    onTouchStart={onTouchStart}
    onTouchEnd={(event: React.TouchEvent<HTMLInputElement>) =>
      setCoverByTouchEnd(event, initialTouch, setIsMenuUncovered!)
    }
  >
    <div
      className={classnames('menu-cover-btn__icon', {
        up: !isMenuUncovered,
        down: isMenuUncovered,
      })}
    />
  </div>
);

export { MenuCoverButton };
