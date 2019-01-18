import React, { PureComponent, Component } from 'react';
import { observer, inject } from 'mobx-react';
import Widget3D from 'clothes-widget-3d';
import { Redirect } from 'react-router';
import _ from 'lodash';
import { currentItems } from '../../stores/garments/galleryStore';
import { isMobile, isTablet, isIpadPro, listeners } from '../../utils';

import './styles.demo.styl';

const INITIALS = 'initials';

/**
 * Ух бля. Костылеми больше, костылем меньше. Уже абсолютно похуй, крч. Прости меня, будущий Я.
 * Основное назначение этой поебени - при первом рендере рендерить
 * только базовые элементы манекена
 *
 */
let wasRendered = false;

/** Эти элементы рендерятся при первой отрисовке для снижения трафика */
const baseDummyElements = ['body', 'eyes', 'head', 'shoes', 'trousers', 'shirt'];
let demoSectionWidth = 400;

@inject(({ order, garments: {Subgroups}, }) => ({
  orderStore: order,
  SubgroupsStore: new Subgroups('shirt'),
}))
class Widget extends PureComponent {
  constructor(props) {
    super(props);
    if (document.querySelector('html').offsetWidth <= 450) {
    }
    demoSectionWidth = 200;
  }
  componentWillUnmount = () => {
    listeners.orientationchange.unsubscribe(this.orientationchangeListenerIndex);
    listeners.resize.unsubscribe(this.resizeListenerIndex);
  }
  componentDidMount() {
    const { resize, orientationchange } = listeners
    if (isMobile() || isTablet() || isIpadPro()) {
      document.ontouchmove = function (e) {
        e.preventDefault();
      }
    }

    this.resizeListenerIndex = resize.subscribe(() => {
      this.widget3d && this.widget3d.setCanvasSize(window.innerWidth, window.innerHeight)
    });

    this.widget3d = new Widget3D(this.widgetContainer, {
      basePath: `/webgl_test/4igoom/`,
      apiPath: 'http://194.87.239.90:8081/api/',
      assetsPath: 'http://194.87.239.90/assets/models/',
      salonId: 1,
      useMobilePositions: isMobile(),
      onClickAsset: (...args) => {
        this.props.onClickAsset(...args);
      }
      }
    );
    try {
      this.widget3d.firstUpdate.then(() => {
        this.props.onDummyLoad();
        this.widget3d.setCanvasSize(window.innerWidth, window.innerHeight)
      });
      this.widget3d.update(this.props.assets)
      .then(this.handleUpdated);
    } catch(err) {
      console.log('here', err)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.assets !== this.props.assets) {
      const exceptions = _.get(this, "props.orderStore.exceptions", []);
      const activeExceptions = _.get(this, "props.orderStore.activeElement.exception", []);
      const activeElementCode = _.get(this, "props.orderStore.activeElement.our_code", null);
      const subGroup = _.get(this, "props.orderStore.activeElement.elementInfo.subGroup");
      const defaultValues = _.get(this, "props.orderStore.defaultValues", {});
      let allExceptions = exceptions ?
        Object.keys(exceptions).reduce((ac, garmentKey) => {
          Object.keys(exceptions[garmentKey]).forEach(elementKey => {
            if (elementKey !== subGroup) {
              ac.push(...exceptions[garmentKey][elementKey].exceptions)
            }
          })

          return ac
        }, [])
        : [];

        const defaultItemValues = {}
        if (defaultValues) {
          Object.keys(defaultValues)
          .filter(item => !item.includes(['manequin']))
          .map(filteredGarment =>
              defaultValues[filteredGarment].reduce((ac, i) => [...ac, i], [])
                .map(garmentObject => Object.keys(garmentObject.design)
                  .forEach(
                    elementKey => defaultItemValues[elementKey] = garmentObject.design[elementKey].our_code
                  )
                )
          )
        }
        const  mutuallyExclusiveItems = activeExceptions.filter(activeExceptionCode => this.props.assets.includes(activeExceptionCode));

        if (mutuallyExclusiveItems.length && exceptions) {
          mutuallyExclusiveItems.forEach((item) => {
            Object.keys(exceptions).forEach((garmentKey) => {
              Object.keys(exceptions[garmentKey]).forEach((elementKey) => {
                if (exceptions[garmentKey][elementKey].exceptions.includes(activeElementCode)) {
                  allExceptions = allExceptions.filter((i) => {
                    if (exceptions[garmentKey][elementKey].exceptions.includes(i) && !exceptions[garmentKey][elementKey].is_active_clear) {
                        if (!this.props.assets.includes(defaultItemValues[elementKey])) {
                          this.props.assets.push(defaultItemValues[elementKey])
                        }
                    }

                    return !exceptions[garmentKey][elementKey].exceptions.includes(i)
                    })
                }
              })
            })
          })
        }

        const actualExceptions = [...allExceptions, ...activeExceptions];
        const nextAssets = this.props.assets
          .filter(i => !actualExceptions.includes(i))

          /**
           * При загрузке без кеша все хорошо.
           * Но по какой-то непонятной ссаной бесовщине при перезагузке
           * порядок первого рендера такой:
           * отрендерил состояние с дефолтами -> отрендерил дефолты оО
           * потому здесь какой-то непонятный грязный хак.
           * У меня заканчиваются крылышки и пиво. так что читай todo:
           * @todo Если ты знаешь в чем причина - U R welcome, fix it
           */
          setTimeout(() => {
            this.widget3d.update(nextAssets).then(this.handleUpdated);
          }, 500);
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
          style={{ width: `${demoSectionWidth}%`, height: '100%' }}
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
  update = (subgroup) => {
    const items = currentItems;

          const {
            orderStore
          } = this.props;

          const codeInOrder =
            _.get(orderStore, `order.shirt[0].design.${subgroup}.our_code`, null);
          const item = items.find(i => i.our_code === codeInOrder);

          if (!_.isEmpty(item)) {
              item.elementInfo = {
                  garment: 'shirt',
                  group: 'design',
                  subgroup
              };
          }
          orderStore.setActiveItem(item);
          orderStore.setPreviewElement(null);
  };
  handleClickAsset = ({ id }) => {
    // TODO
    /**
     * заблокировано в связи с order70
     * https://trello.com/c/b4EoFe3q/155-order70-
     * %D0%B1%D0%BB%D0%BE%D0%BA%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C-
     * %D0%BE%D1%82%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-
     * %D0%BF%D0%BE%D0%B4%D1%80%D0%B0%D0%B7%D0%B4%D0%B5%D0%BB%D0%BE%D0%B2-
     * %D0%BF%D1%80%D0%B8-%D0%BD%D0%B0%D0%B6%D0%B0%D1%82%D0%B8%D0%B8-
     * %D0%BD%D0%B0-%D0%BC%D0%B0%D0%BD%D0%B5%D0%BA%D0%B5%D0%BD
     */
    return;
    /* eslint-disable */
    const {
      orderStore
    } = this.props;
    console.log(this);
    const subgroup =
      _.findKey(
          orderStore.order.shirt[0].design,
          ['our_code', id]
      );
    if (id !== this.state.subgroup) {
      this.update(subgroup);
      this.setState({
        subgroup
      })
    }
    /* eslint-enable */
  };
  render() {
    const { orderStore } = this.props;
    const { subgroup } = this.state;
    let selected = '';
    const activeElement = orderStore.activeElement || {};
    const initials = {};
    let params = [];

    if (orderStore.isEmptyOrder() || !wasRendered) {
      params = baseDummyElements;
    } else {
      params = Object.keys(orderStore.order).reduce((acc, garment) => {
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
              if (!subgroup.includes(INITIALS) && subgroupVal) {
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
      if (!_.isEmpty(activeElement)) {
        // Если в параметрах нет активного элемента
        // Может случиться, если по дефолту у элемента нет заданного значения
        if (!params.find(param => (
          activeElement.our_code === param ||
          activeElement.our_code === param.id
        ))) {
          // Добавляем его в к параметрам отображения
          params.push(activeElement.our_code);
        }

      }
    }
    wasRendered = true;
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

}
