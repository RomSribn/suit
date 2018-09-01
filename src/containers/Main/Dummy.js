import React, {PureComponent} from 'react';
import { observer, inject } from 'mobx-react';
import Widget3D from 'clothes-widget-3d';
import { Redirect } from 'react-router';
import _ from 'lodash';

class Widget extends PureComponent {
  componentDidMount() {
    this.widget3d = new Widget3D(this.widgetContainer, {
      basePath: `/webgl_test/4igoom/`,
      apiPath: 'http://194.87.239.90:8081/api/',
      assetsPath: 'http://194.87.239.90/assets/models/',
      salonId: 1,
      onClickAsset: (...args) => {
        this.props.onClickAsset(...args);
      }
      }
    );
    try {
      this.widget3d.update(this.props.assets)
      .then(this.handleUpdated);
    } catch(err) {
      console.log('here', err)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.assets !== this.props.assets) {
      this.widget3d.update(this.props.assets).then(this.handleUpdated);
    }

    if (prevProps.selected !== this.props.selected) {
      this.widget3d.select(this.props.selected);
    }
  }

  render() {
    return (
      <div
        className="widget3d"
        ref={(node) => this.widgetContainer = node}
        style={{ position: 'absolute', width: '400%', height: '100%', left: '-150%' }}
      />
      );
  }

  handleUpdated = () => {
    console.log('updated');
  }
}

const GROUPS = ['design', 'fabric_ref', 'fitting']

@inject(({order }) => ({
  orderStore: order,
}))
@observer
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      subgroup: null
    };
  }
  render() {
    const { orderStore } = this.props;
    const params = Object.values(orderStore.order).reduce((acc, cur) => {
      GROUPS.forEach(group => {
        Object.values(cur[0][group] || {}).forEach(val => {
          acc.push(val.our_code)
        })
      })
      return acc;
    }, []);
    const { subgroup } = this.state;
    return (<React.Fragment>
      {subgroup &&<Redirect to={`/order/details/shirt/design/${subgroup}`}/>}
      <Widget
        selected={orderStore.activeElement && orderStore.activeElement.our_code}
        assets={[
          ...params,
          { 'id': 'head', 'static': true },
          { 'id': 'body', 'static': true },
          { 'id': 'trousers', 'static': true }
        ]}
        onClickAsset={this.handleClickAsset}
    />
    </React.Fragment>);
  }

  handleClickAsset = ({ id }) => {
    const subgroup =
      _.findKey(
          this.props.orderStore.order.shirt[0].design,
          ['our_code', id]
      );
    if (id !== this.state.subgroup) {
      this.setState({
        subgroup
      })
    }
  };
}
