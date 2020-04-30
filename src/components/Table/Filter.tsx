import * as React from 'react';
import * as classNames from 'classnames';

class Filter extends React.Component<FilterParams> {
    static defaultProps = {
        updatePickerData: () => undefined
    };
    private inputWrapper: React.RefObject<HTMLDivElement>;
    constructor(props: FilterParams) {
        super(props);
        this.inputWrapper = React.createRef();
    }
    
    componentDidUpdate(prevProps: FilterParams) {
        const {
            updatePickerData,
        } = this.props;
        if (prevProps.text !== this.props.text && this.props.isActive) {
            updatePickerData!(this.props, this.inputWrapper);
        }
    }
    
    renderOrderTitle = (params: FilterParams) => {
        const {
            onChange,
            text,
            type,
            onClickFilterItem,
            isActive,
            inputValue,
        } = params;
        const baseClass = 'orders__title';
        switch (type) {
            case 'select': {
                return (
                    <div
                        ref={this.inputWrapper}
                        className={classNames(baseClass, baseClass + '--filter', baseClass + '--filter_select')}
                    >
                        <p 
                            onClick={
                                () => onClickFilterItem!(
                                    params,
                                    this.inputWrapper,
                                    onChange
                                )
                            } 
                            className={classNames('action-text-wrapper', {'active': isActive})}
                        >
                            <span className={`${baseClass}-text`}>{text}</span>
                            <span className="arrow" />
                        </p>
                    </div>
                );
            }
            case 'date': {
                return (
                    <div
                        ref={this.inputWrapper}
                        className={classNames(baseClass, baseClass + '--filter', baseClass + '--filter_date')}
                    >
                        <p
                            onClick={
                                () => onClickFilterItem!(
                                    params,
                                    this.inputWrapper,
                                    (
                                        value: DatePickerFilterFields
                                    ) => onChange!(value.dateFrom + '--' + value.dateTo)
                                )
                            }
                            className={classNames('action-text-wrapper', {'active': isActive})}
                        >
                            <span className={`${baseClass}-text`}>{text}</span>
                            <span className="arrow" />
                        </p>
                    </div>
                );
            }
            case 'disabled': {
                // выводим только заголовок фильтра
                return (
                    <div className={classNames(baseClass, baseClass + '--filter')}>
                        <span className={`${baseClass}-text`}>{text}</span>
                    </div>
                );
            }
            default: {
                return (
                    <div className={classNames(baseClass, baseClass + '--filter')}>
                        <input
                            className="orders__input"
                            onChange={event => onChange!(event.target.value)}
                            type="text"
                            placeholder={text}
                            value={inputValue}
                        />
                    </div>
                );
            }
        }
    }
    render() {
        const baseClass = 'orders__title';
        return (
            <div className={classNames(baseClass + '-wrapper')}>
                {this.renderOrderTitle(this.props)}
            </div>
        );
    }
}

export {
    Filter
};