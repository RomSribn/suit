import React, {PureComponent} from 'react';
import { observer, inject } from 'mobx-react';
import Widget3D from 'clothes-widget-3d';
import _ from 'lodash';
import { debug } from 'util';

class Widget extends PureComponent {
  componentDidMount() {
    this.widget3d = new Widget3D(this.widgetContainer, {
      basePath: `/webgl_test/4igoom/`,
      apiPath: 'http://194.87.239.90:8081/api/',
      assetsPath: 'http://194.87.239.90/assets/models/',
      salonId: 1,
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
      this.widget3d.update(this.props.assets).then(this.handleUpdated)
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
        style={{ margin: 'auto', width: '100%', height: '90%' }}
      />
      );
  }

  handleUpdated = () => {
    console.log('updated');
  }
}

const GROUPS = ['design', 'fabric_ref', 'fitting']

@inject(({order }) => ({
  order: order.order
}))
@observer
export default class App extends PureComponent {
  render() {
    const params = Object.values(this.props.order).reduce((acc, cur) => {
      GROUPS.forEach(group => {
        Object.values(cur[0][group] || {}).forEach(val => {
          acc.push(val.our_code)
        })
      })
      return acc;
    }, []);

    return (<Widget
      selected='slv1'
      assets={[
        ...params,
        { 'id': 'head', 'static': true },
        { 'id': 'body', 'static': true },
        { 'id': 'trousers', 'static': true }
      ]}
      onClickAsset={this.handleClickAsset}
    />);
  }

  handleClickAsset = ({ id, group, subgroup }) => {
    console.log('asset was clicked:', id, group, subgroup);
  };
}
