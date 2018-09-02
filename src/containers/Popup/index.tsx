import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import './styles.styl';

let containerElement: Element;

interface IncomingProps {
    children: React.ReactNode;
    containerSelector?: string;
    open?: boolean;
    onClose?: (...args: any[]) => void; // tslint:disable-line no-any
}

interface DefaultProps {
    containerSelector: string;
    open: boolean;
    onClose: (...args: any[]) => void; // tslint:disable-line no-any
}

type Props =  IncomingProps & DefaultProps;
class PopUp extends React.Component<IncomingProps> {
    static defaultProps: DefaultProps = {
        containerSelector: '.popup__portal',
        open: false,
        onClose: () => null
    };

    render() {
        const {
            containerSelector,
            open,
            onClose,
            children
        } = this.props as Props;
        if (!containerElement) {
            const domNode = document.querySelector(containerSelector);
            if (!domNode) {
                throw(Error(`There is no container for popup-portal provided by ${containerSelector} selector`));
            }
            containerElement = domNode;
        }
        return ReactDOM.createPortal(
            <div className={classNames('popup__container', {open: open})}>
                <div className="popup__close-controll" onClick={onClose}>
                    <span className="popup__close-controll__item first" />
                    <span className="popup__close-controll__item second" />                    
                </div>
                <div className="popup__content">{children}</div>
            </div>,
            containerElement
        );
    }
}

export {
    PopUp
};
