import * as React from 'react';
import { PopUp } from '../../containers/Popup';
import { Button } from '../Button';
import { loc } from './loc';
import './styles.styl';

const baseClassName = 'confirm-popup';

type AllProps = ConfirmPopupProps & DefaultProps;
class ConfirmPopup extends React.PureComponent<ConfirmPopupProps, ConfirmPopUpState> {
    static defaultProps: DefaultProps = {
        lang: 'ru',
        actionText: '',
        onAcceptClick: () => undefined
    };
    constructor(props: AllProps) {
        super(props);
        this.state = {
            isOpen: false
        };
    }
    closePopup = () => {
        this.setState({ isOpen: false });
    }
    onAccetpClick = () => {
        const acceptClickResult = this.props.onAcceptClick!();
        if (acceptClickResult &&  acceptClickResult instanceof Promise) {
            acceptClickResult.then(this.closePopup);
        } else {
            this.closePopup();
        }
    }
    render() {
        const {
            isOpen
        } = this.state;
        const {
            lang
        } = this.props as AllProps;
        return (
            <React.Fragment>
                 <span onClick={() => this.setState({ isOpen: true })}>{this.props.children}</span>
                <PopUp
                    open={isOpen}
                    onClose={this.closePopup}
                >
                    <div className={`${baseClassName}__wrapper`}>
                        <div className={baseClassName}>
                            <div
                                className={`${baseClassName}__text`}
                            >{loc[lang].confirmText + (this.props.actionText || loc[lang].defaultActionText)}?
                            </div>

                            <div className={`${baseClassName}__controls`}>
                                <Button
                                    className={`${baseClassName}__controls-item`}
                                    onClick={this.onAccetpClick}
                                >
                                {loc[lang].confirm}
                                </Button>
                                <Button
                                    className={`${baseClassName}__controls-item no-margin`}
                                    theme="white"
                                    onClick={this.closePopup}
                                >{loc[lang].back}
                                </Button>
                            </div>
                        </div>
                    </div>
                </PopUp>
            </React.Fragment>
        );
    }
}

export {
    ConfirmPopup
};
