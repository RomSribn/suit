import * as React from 'react';
import { PopUp } from '../../containers/Popup';
import { Button } from '../Button';
import { loc } from './loc';
import './styles.styl';

const baseClassName = 'confirm-popup';

type AllProps = ConfirmPopupProps & DefaultProps;
class ConfirmPopup extends React.PureComponent<ConfirmPopupProps, ConfirmPopUpState> {
    static defaultProps = {
        lang: 'ru'
    };
    constructor(props: AllProps) {
        super(props);
        this.state = {
            isOpen: false
        };
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
                    onClose={() => this.setState({ isOpen: false })}
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
                                >
                                {loc[lang].confirm}
                                </Button>
                                <Button
                                    className={`${baseClassName}__controls-item`}
                                    theme="white"
                                    onClick={() => this.setState({isOpen: false})}
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
