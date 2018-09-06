import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import './styles.styl';

// TODO: Доработать возможность корректно использовать несколько модалок

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
            <div className={classNames('popup__container', {open: open})} onClick={onClose}>
                <span onClick={(e) => { e.stopPropagation(); }}>{children}</span>
            </div>,
            containerElement
        );
    }
}

export {
    PopUp
};
