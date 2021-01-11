import React, { PureComponent, Component } from 'react';
import _ from 'lodash';
import './styles.demo.styl';
import { API_ROOT } from '../../config/routes';
import { currentItems } from '../../stores/garments/galleryStore';
import { isMobile, listeners } from '../../utils';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router';
import Widget3D from 'clothes-widget-3d';

const INITIALS = 'initials';

const SALON_API_ID = process.env.SALON_API_ID;

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

@inject(({ order, garments: { Subgroups }, app: { setDummyY, isMenuUncovered } }) => ({
  orderStore: order,
  SubgroupsStore: new Subgroups('shirt'),
  setDummyY,
  isMenuUncovered
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
    const { resize } = listeners
    /**
     * setting a lot of errors at the console, try to disable and test
     * P.S. It has been here, early
    */
    // if (isMobile() || isTablet() || isIpadPro()) {
    //   document.ontouchmove = function (e) {
    //     e.preventDefault();
    //   }
    // }

    this.resizeListenerIndex = resize.subscribe(() => {
      this.widget3d && this.widget3d.setCanvasSize(window.innerWidth, window.innerHeight)
    });

    this.widget3d = new Widget3D(this.widgetContainer, {
      basePath: `/webgl_test/4igoom/`,
      dracoPath: `/webgl_test/4igoom/draco/`,
      apiPath: `${API_ROOT}/api/`,
      assetsPath: `${API_ROOT}/assets/models/${SALON_API_ID}/`,
      salonId: SALON_API_ID,
      useMobilePositions: isMobile(),
      onRotate: (event) => {
        console.log(event.x, event.y);
      },
      onClickAsset: (...args) => {
        this.props.onClickAsset(...args);
      },
      onRotate: ({ y }) => {
        const { setDummyY, isMenuUncovered } = this.props;
        isMobile() && isMenuUncovered && setDummyY(y);
      }
      }
    );
    try {
      this.widget3d.firstUpdate.then(() => {
        this.props.onDummyLoad();
        this.widget3d.setCanvasSize(window.innerWidth, window.innerHeight);
      });
      this.widget3d.update(this.props.assets)
      .then(this.handleUpdated);
    } catch(err) {
      console.log('Ошибка при рендере манекена', err)
    }
  }

  componentDidUpdate(prevProps) {
    const isEqualProps = _.isEqual(prevProps.assets, this.props.assets);

    if (!isEqualProps) {
      const exceptions = _.get(this, "props.orderStore.exceptions", []);
      const activeExceptions = _.get(this, "props.orderStore.activeElement.exception", []);
      const activeElementCode = _.get(this, "props.orderStore.activeElement.our_code", null);
      const subGroup = _.get(this, "props.orderStore.activeElement.elementInfo.subGroup");
      const defaultValues = _.get(this, "props.orderStore.defaultValues", {});
      let allExceptions = exceptions ?
        Object.keys(exceptions).reduce((ac, garmentKey) => {
          Object.keys(exceptions[garmentKey]).forEach(elementKey => {
            if (elementKey !== subGroup && exceptions[garmentKey][elementKey].exceptions) {
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
        const assetsIds = this.props.assets.map(asset => asset.id || asset);
        const mutuallyExclusiveItems = activeExceptions.filter(activeExceptionCode => assetsIds.includes(activeExceptionCode));

        if (mutuallyExclusiveItems.length && exceptions) {
          mutuallyExclusiveItems.forEach((item) => {
            Object.keys(exceptions).forEach((garmentKey) => {
              Object.keys(exceptions[garmentKey]).forEach((elementKey) => {
                if (
                  exceptions[garmentKey][elementKey].exceptions &&
                  exceptions[garmentKey][elementKey].exceptions.includes(activeElementCode)
                  ) {
                  allExceptions = allExceptions.filter((i) => {
                    if (exceptions[garmentKey][elementKey].exceptions.includes(i) && !exceptions[garmentKey][elementKey].is_active_clear) {
                        if (defaultItemValues[elementKey] && !this.props.assets.includes(defaultItemValues[elementKey])) {
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
            .filter(asset => {
              const id = asset.id ? asset.id : asset;
              return !actualExceptions.includes(id)
            })

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

    if (this.props.selected && prevProps.selected !== this.props.selected) {
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

  handleUpdated = (props) => {
    console.log('updated');
  }
}

const GROUPS = ['design', 'fabric_ref', 'fitting']
let prevInfo = {};
@inject(({order, garments: { garments }}) => ({
  orderStore: order,
  activeGarments: [...garments.activeGarments],
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
    const { orderStore, activeGarments } = this.props;
    const { subgroup } = this.state;
    let selected = '';
    const activeElement = orderStore.activeElement || {};
    const initials = {};
    let params = [];

    if (orderStore.isEmptyOrder() || !wasRendered) {
      params = baseDummyElements;
    } else {
      params = activeGarments.reduce((acc, garment) => {
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
            const additionalFabric = curGarment[0].design[subgroup] && curGarment[0].design[subgroup].additionalFabric;
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
                  if (subgroup === 'fabric') {
                    acc.push(subgroupVal.our_code);
                  } else {
                    const value = additionalFabric ?
                        { id: activeElement.our_code, materials: [additionalFabric] } : activeElement.our_code;
                    acc.push(value);
                  }
                }
              }
            } else {
              if (!subgroup.includes(INITIALS) && subgroupVal) {
                const value = additionalFabric ?
                    { id: subgroupVal.our_code, materials: [additionalFabric] } : subgroupVal.our_code;
                acc.push(value);
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
          (param && (activeElement.our_code === param.id)) ||
          // Если подразделу (воротник и тд) назначена отдельная ткань,
          // то нужно проверять наличие activeElement в массиве materials)
          (param && param.materials && param.materials.includes(activeElement.our_code))
        ))) {
          // Добавляем его в к параметрам отображения
          params.push(activeElement.our_code);
        }

      }
    }
    const defaultGarments = [...baseDummyElements]
    if(activeGarments.includes('shirt')) {
        defaultGarments.splice(defaultGarments.indexOf('shirt'), 1);
    }
    if(activeGarments.includes('pants')) {
        defaultGarments.splice(defaultGarments.indexOf('trousers'), 1);
    }

    wasRendered = true;
    return (<React.Fragment>
      {subgroup &&<Redirect to={`/order/details/shirt/design/${subgroup}`}/>}
      <Widget
        selected={selected || ''}
        paramsSelectedCount={params.length}
        assets={[
          ...params,
          ...defaultGarments
        ]}
        onClickAsset={this.handleClickAsset}
        onDummyLoad={this.props.onDummyLoad}
    />
    </React.Fragment>);
  }

}
