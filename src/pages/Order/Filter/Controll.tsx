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
    if (!this.props.isOpen && this.props.isFabric) {
      this.props.onCLick();
    }
  }

  render() {
    const {
      onCLick,
      isOpen,
      openModal,
      isSearchBarOpened,
      toggleIsSearchBarOpened,
      disableBtn,
    } = this.props;

    return (
      <button
        className={classnames('btn gallery__filter-btn', { open: isOpen })}
        disabled={disableBtn}
        onClick={() => {
          if (!isMobile()) {
            onCLick();
            if (isSearchBarOpened) {
              toggleIsSearchBarOpened!();
            }
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

export { Controll };
