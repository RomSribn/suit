import * as React from 'react';
import * as classnames from 'classnames';
import { isMobile } from '../../../utils';

class Controll extends React.Component<ControllProps> {
    static defaultProps = {
        isOpen: false,
        type: '',
        onCLick: () => null,
    };

    componentDidMount() {
        if (!this.props.isOpen) {
            this.props.onCLick();
        }
    }

    render() {
        const {
            onCLick,
            isOpen,
            openModal,
            isSearchBarOpened,
            toggleIsSearchBarOpened
        } = this.props;

        return (
            <button
                style={{ zIndex: 99, width: '90px' }}
                className={classnames(
                    'btn gallery__filter-btn',
                    { open: isOpen },
                )}
                onClick={() => {
                    if ( !isMobile() ) {
                        onCLick();
                        if (isSearchBarOpened) { toggleIsSearchBarOpened!(); }
                        return;
                    }
                    openModal();
                }}
                title="filter"
            >
                <span /> <span /> <span />
            </button>
        );
    }
}

export {
    Controll,
};
