import * as React from 'react';
import * as classnames from 'classnames';

class Controll extends React.PureComponent<ControllProps> {
    static defaultProps = {
        isOpen: false,
        type: '',
        onCLick: () => null,
    };

    componentDidMount() {
        this.props.onCLick();
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
