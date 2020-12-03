import * as React  from 'react';
import './style.styl';

interface IModalProps {
    closeModal(): void;
    children?: React.ElementType;
}

const CustomModal: React.FunctionComponent<IModalProps> = ({closeModal, children}) => {
    const backDrop = React.useRef(null);

    const handleBackdropClick = (e:  React.MouseEvent<HTMLDivElement>) => {
        const { current } = backDrop;
        if (e.target !== current) {
            return;
        }
        closeModal();
    };


    const handleKeyPress = () => {
        // const directionCode: string = e.keyCode;
        //
        // if (directionCode !== 'Escape') {
        //     return;
        // }
        // props.closeModal();
    };


    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyPress, false);

        return () => {
            window.removeEventListener('keydown', handleKeyPress, false);
        };
    });


    return (
        <div className={'backdrop'} ref={backDrop} onClick={handleBackdropClick}>
            <div className={'modalContent'}>
                <div className={'closeBtn'} onClick={closeModal}>
                </div>
                <h2 className={'modalTitle'}>Newsletter</h2>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default CustomModal;
