import * as React from 'react';
import * as classNames from 'classnames';

interface TProps {
  show: boolean;
  data?: FilterData;
  lang: string;
  onClickOuterPopup(): void;
}

interface TState {
  dateFrom?: string;
  dateTo?: string;
  initialDatePickerPosition: {
    left: number;
    top: number;
  } | null;
}

const getOffset = (el: HTMLElement | null) => {
  var rect = el!.getBoundingClientRect();
  return { top: rect.top, left: rect.left };
};

class ListPickerDropdown extends React.PureComponent<TProps, TState> {
  static defaultProps = {
    setFilterValue: () => undefined
  };
  listPickerInner?: HTMLElement;
  constructor(props: TProps) {
    super(props);
    this.state = {
      initialDatePickerPosition: null
    };
  }
  
  onClickItem = ({ item, index }: {item: ListItem, index: number}) => {
    const {
      data
    } = this.props;
    data!.setFilterValue!(item.value); // tslint:disable-line
  }
  componentDidMount() {
    const {
      show,
    } = this.props;
    if (show) {
      this.setPosition();
    }
  }
  componentDidUpdate(prevProps: TProps) {
    if ((this.props.show !== prevProps.show && this.props.show) 
      || this.props.data !== prevProps.data) {
      this.setPosition();
    }
  }
  setPosition = () => {
    const {
      data
    } = this.props;
    const {
      initialDatePickerPosition
    } = this.state;
    if (data!.inputRef && data!.inputRef.current && this.listPickerInner) {
      const wrapperElementPosition = getOffset(data!.inputRef.current);
      const listPickerPosition = initialDatePickerPosition || getOffset(this.listPickerInner!);
      !initialDatePickerPosition && this.setState({ initialDatePickerPosition: listPickerPosition }) // tslint:disable-line
      this.listPickerInner!.style.left = (
          wrapperElementPosition.left - (listPickerPosition.left * 1)
        ) + 'px';
      this.listPickerInner!.style.top = (
          wrapperElementPosition.top - (listPickerPosition.top / 2)
        ) + 'px';
    }
  }
  renderListItem = ({ item, index }: { item: ListItem, index: number }) => {
    return (
      <div onClick={() => this.onClickItem({item, index})} className="list-item">
        <p className="list-item-text">
          {item.text}
        </p>
      </div>
    );
  }

  keyExtractorListItem = (key: string, idx: number) => 'listItem_' + key + '_' + idx;

  render() {
    const {
      show,
      onClickOuterPopup,
      data
    } = this.props;
    if (!show) {
      return null;
    }
    const baseClassConst = 'orders__list-picker';
    return (
      <div
        onClick={onClickOuterPopup}
        className={classNames(baseClassConst, baseClassConst + '__wrapper')}
      >
        <div
          ref={comp => this.listPickerInner = comp!}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className={classNames(baseClassConst, baseClassConst + '__inner')}
        >
          {
            data! && data!.title && (
              <div className="list__title">
                <p className="list__title list__title-text">
                  {data! && data!.title}
                </p>
              </div>
            )
          }
          <div className="list-wrapper">
            {
              data! && data!.options && data!.options!.map((item: ListItem, idx: number) => (
                <div key={this.keyExtractorListItem(item.value, idx)} className="list-item-wrapper">
                  {this.renderListItem({item, index: idx})}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export {
  ListPickerDropdown
};