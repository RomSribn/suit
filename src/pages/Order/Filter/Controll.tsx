import * as React from 'react';
import * as classnames from 'classnames';

class Controll extends React.PureComponent<ControllProps> {
    static defaultProps = {
        isOpen: false,
        type: '',
        onCLick: () => null,
    };
    componentWillUnmount() {
        const { filterStore } = this.props;
        filterStore!.closeFilter();
        filterStore!.clearUserFilters();
        filterStore!.clearFilters();
    }

    render() {
        const {
            onCLick,
            isOpen
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
                <span /> <span /> <span />
            </button>
        );
    }
}

export {
    Controll,
};
