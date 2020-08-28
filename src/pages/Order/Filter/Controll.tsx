import * as React from 'react';
import * as classnames from 'classnames';

class Controll extends React.PureComponent<ControllProps> {
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
            isSearchBarOpened,
            toggleIsSearchBarOpened
        } = this.props;
        return (
            <button
                style={{ zIndex: isSearchBarOpened ? 9999 : 9999 }}
                className={classnames(
                    'btn gallery__filter-btn',
                    { open: isOpen },
                )}
                onClick={() => { onCLick(); if (isSearchBarOpened) { toggleIsSearchBarOpened!(); } }}
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
