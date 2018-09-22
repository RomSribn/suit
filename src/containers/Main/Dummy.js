import React, { PureComponent, Component } from 'react';
import { observer, inject } from 'mobx-react';
import Widget3D from 'clothes-widget-3d';
import { Redirect } from 'react-router';
import _ from 'lodash';
import { Spinner } from '../../components/Spinner';
import { object } from 'prop-types';

const INITIALS = 'initials';

class Widget extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showSpinner: true,
    };
  }
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
      this.widget3d.firstUpdate.then(() => {
        this.setState({ showSpinner: false });
      });
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
      <React.Fragment key="widget with spinner">
        {(this.state.showSpinner || !this.props.paramsSelectedCount) && <Spinner />}
        <div
          className="widget3d"
          ref={(node) => this.widgetContainer = node}
          style={{ position: 'absolute', width: '400%', height: '100%', left: '-150%' }}
        />
      </React.Fragment>
      );
  }

  handleUpdated = () => {
    console.log('updated');
  }
}

const GROUPS = ['design', 'fabric_ref', 'fitting']
let prevInfo = {};
@inject(({order }) => ({
  orderStore: order
}))
@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementChanged: false,
      subgroup: null
    };
  }
  componentDidMount = () => {
    prevInfo = _.get(this, 'props.orderStore.activeElement.elementInfo', {});
  }
  render() {
    const { orderStore } = this.props;
    const activeElement = orderStore.activeElement || {};
    const initials = {};
    const params = Object.keys(orderStore.order).reduce((acc, garment) => {
      const curGarment = orderStore.order[garment];
      GROUPS.forEach(group => {
        Object.keys(curGarment[0][group] || {}).forEach(subgroup => {
          if (
            activeElement.elementInfo &&
            activeElement.elementInfo.garment === garment &&
            activeElement.elementInfo.group === group &&
            activeElement.elementInfo.subGroup === subgroup
          ) {
            acc.push(activeElement.our_code)
          } else {
            const subgroupVal = curGarment[0][group][subgroup];
            if (subgroup.includes(INITIALS)) {
              if (!initials.text) {
                initials.text = {};
              }
              if(subgroup === `${INITIALS}_text`) {
                initials.text.value = subgroupVal;
              }
              if (subgroup === `${INITIALS}_arrangement`) {
                initials.id = subgroupVal.our_code;
              }
              if (subgroup === `${INITIALS}_color`) {
                initials.text.color = subgroupVal.our_code;
              }
              if (subgroup === `${INITIALS}_style`) {
                initials.text.font = subgroupVal.our_code;
              }
            } else {
              acc.push(subgroupVal.our_code);
            }
          }
        })
      })
      return acc;
    }, []);
    const { subgroup } = this.state;
    let selected = '';
    if (
      activeElement.elementInfo &&
      prevInfo.garment === activeElement.elementInfo.garment &&
      prevInfo.group === activeElement.elementInfo.group &&
      prevInfo.subGroup === activeElement.elementInfo.subGroup
    ) {
      selected = prevInfo.code;
    } else {
      selected = activeElement.our_code;
      prevInfo = {
        code: activeElement.our_code,
        garment: _.get(activeElement, 'elementInfo.garment', ''),
        group: _.get(activeElement, 'elementInfo.group', ''),
        subGroup: _.get(activeElement, 'elementInfo.subGroup', '')
      };
    }
    if (!_.isEmpty(initials)) {
      params.push(initials);
    }
    return (<React.Fragment>
      {subgroup &&<Redirect to={`/order/details/shirt/design/${subgroup}`}/>}
      <Widget
        selected={selected || ''}
        paramsSelectedCount={params.length}
        assets={[
          ...params
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
