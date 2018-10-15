import * as React from 'react';
import * as classNames from 'classnames';

class Filter extends React.Component<FilterParams> {
    static defaultProps = {
        updatePickerData: () => undefined
    };
    componentDidUpdate(prevProps: FilterParams) {
        const {
            updatePickerData,
        } = this.props;
        if (prevProps.pickerKey !== this.props.pickerKey || prevProps.text !== this.props.text) {
            updatePickerData!(this.props);
        }
    }
    
    renderOrderTitle = (params: FilterParams) => {
        const {
            onChange,
            text,
            type,
            onClickFilterItem,
            pickerKey,
            textIsActive
        } = params;
        const baseClass = 'orders__title';
        switch (type) {
            case 'select': {
                return (
                    <div
                        id={pickerKey}
                        className={classNames(baseClass, baseClass + '--filter', baseClass + '--filter_select')}
                    >
                        <p 
                            onClick={
                                () => onClickFilterItem!(
                                    params,
                                    onChange, // tslint:disable-line no-any
                                )
                            } 
                            className={classNames('action-text-wrapper', {'active': textIsActive})}
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
                        id={pickerKey}
                        className={classNames(baseClass, baseClass + '--filter', baseClass + '--filter_date')}
                    >
                        <p
                            onClick={
                                () => onClickFilterItem!(
                                    params,
                                    (value: any) => onChange!(value.dateFrom + '--' + value.dateTo), // tslint:disable-line
                                )
                            }
                            className={classNames('action-text-wrapper', {'active': textIsActive})}
                        >
                            <span className={`${baseClass}-text`}>{text}</span>
                            <span className="arrow" />
                        </p>
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