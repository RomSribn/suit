import * as React from 'react';
import { Button } from '../Button';
import { PopUp } from '../../containers/Popup';
import * as classNames from 'classnames';

import './style.styl';

class SimpleModal extends React.Component<SimpleModalProps, {}> {
  renderButtons = (buttons: ButtonType[]) => {
    return buttons && buttons.map((buttonObj: ButtonType) => (
      <div className="button-wrapper" key={buttonObj!.key}>
        <Button
          onClick={() => this.onClickButton(buttonObj.key)}
          theme={buttonObj!.theme}
        >
          <p className="button-text">
            {buttonObj.text}
          </p>
        </Button>
      </div>
    ));
  }

  onClickButton = (buttonKey?: string) => {
    const { callback } = this.props;
    callback && callback(buttonKey); // tslint:disable-line
  }

  componentDidMount() {
    const {
      timeout,
    } = this.props;
    if (timeout) {
      setTimeout(() => {
        this.onClickButton();
      }, timeout);
    }
  }

  render() {
    const { data, show, isSmall, isTransparent} = this.props;
    const { title, desc, buttons } = data;
    const baseClassName = 'simple-modal-wrapper';

    return (
      <PopUp open={show} onClose={this.onClickButton}>
        <div
          className={
            classNames(
              baseClassName, { [baseClassName + '_small']: isSmall, [baseClassName + '_transparent']: isTransparent }
            )
          }
        >
          <div className="simple-modal">
            <div className="title-wrapper">
              <p className={classNames('title-text', {['title-text_black']: isTransparent})}>
                {title}
              </p>
            </div>
            <div className="desc-wrapper">
              <p className={classNames('desc-text', {['desc-text_black']: isTransparent})}>
                {desc}
              </p>
            </div>
            <div className="buttons-wrapper">
              {this.renderButtons(buttons)}
            </div>
          </div>
        </div>
      </PopUp>
    );
  }
}

export {
  SimpleModal
};