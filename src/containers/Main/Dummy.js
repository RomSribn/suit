import React, { PureComponent, Component } from 'react';
import { observer, inject } from 'mobx-react';
import Widget3D from 'clothes-widget-3d';
import { Redirect } from 'react-router';
import _ from 'lodash';
const INITIALS = 'initials';

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
      this.widget3d.firstUpdate.then(() => {
        this.props.onDummyLoad();
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
          const subgroupVal = curGarment[0][group][subgroup];
          if (subgroup.includes(INITIALS)) {
            if (!initials.text) {
              initials.text = { value: ''};
            }
            if(subgroup === `${INITIALS}_text`) {
              initials.text.value = subgroupVal;
            }
            const val = _.get(activeElement , 'elementInfo.subGroup') === subgroup ?
              activeElement.our_code :
              subgroupVal.our_code;
            if (subgroup === `${INITIALS}_arrangement`) {
              initials.id = val
            }
            if (subgroup === `${INITIALS}_color`) {
              initials.text.color = val;
            }
            if (subgroup === `${INITIALS}_style`) {
              initials.text.font = val;
            }
          }
          if (
            activeElement.elementInfo &&
            activeElement.elementInfo.garment === garment &&
            activeElement.elementInfo.group === group &&
            activeElement.elementInfo.subGroup === subgroup
          ) {
            if (subgroup === `${INITIALS}_arrangement`) {
              initials.id = activeElement.our_code;
            } else {
              if (!subgroup.includes(INITIALS)) {
                acc.push(activeElement.our_code)
              }
            }
          } else {
            if (!subgroup.includes(INITIALS)) {
              acc.push(subgroupVal.our_code);
            }
          }
          // TODO: Хак из-за того, что виджет не воспринимает цвет через selected.text.color
          if (subgroup ===`${INITIALS}_color`) {
            if (_.get(activeElement, 'elementInfo.subGroup') ===`${INITIALS}_color`) {
              acc.push(activeElement.our_code);
            } else {
              acc.push(subgroupVal.our_code)
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
      prevInfo.subGroup === activeElement.elementInfo.subGroup &&
      !activeElement.elementInfo.subGroup.includes(INITIALS)
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
    if (activeElement.elementInfo &&
      activeElement.elementInfo.subGroup && 
      activeElement.elementInfo.subGroup.includes(INITIALS)) {
      selected = initials;
    }
    if (!_.isEmpty(initials) && typeof selected !== initials) {
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
        onDummyLoad={this.props.onDummyLoad}
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
