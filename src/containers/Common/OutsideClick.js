import { Component } from 'react';
import ReactDOM from 'react-dom';

class OutsideClick extends Component {
  constructor() {
    super();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(e) {
    let withinListItems = ReactDOM.findDOMNode(this).contains(e.target);
    if (!withinListItems) {
      this.clickOutside(e);
    }
  }
}

export default OutsideClick;
