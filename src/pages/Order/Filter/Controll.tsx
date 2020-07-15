import * as React from 'react';
import * as classnames from 'classnames';
import { loc } from './loc';

class Controll extends React.PureComponent<ControllProps> {
    static defaultProps = {
        isOpen: false,
        type: '',
        filterCount: 0,
        lang: 'ru',
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
            filterCount,
            lang,
        } = this.props;
        return (
            <button
                className={classnames(
                    'btn gallery__filter-btn',
                    { open: isOpen },
                )}
                onClick={onCLick}
                title="filter"
            >
                {loc[lang!].filters} ({filterCount})
            </button>
        );
    }
}

export {
    Controll,
};
