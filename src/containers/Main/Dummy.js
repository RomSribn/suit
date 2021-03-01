import React, { PureComponent, Component } from 'react';
import _ from 'lodash';
import './styles.demo.styl';
import { API_ROOT } from '../../config/routes';
import { currentItems } from '../../stores/garments/galleryStore';
import { isMobile, listeners } from '../../utils';
import { ourCodesToSubgroup } from '../../utils/variables';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router';
import { toJS } from 'mobx';
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
const baseDummyElements = [
  'body',
  'eyes',
  'head',
  'shoes',
  'trousers',
  'shirt',
];
let demoSectionWidth = 400;

@inject(
  ({
    order,
    garments: { Subgroups, garments },
    app: { setDummyY, isMenuUncovered, setIsGarmentLoaded, orderPath },
    filterStore: { setSelectedItems },
    galleryStore,
  }) => ({
    setSelectedItems,
    orderStore: order,
    group: [...orderPath].pop(),
    garments,
    galleryStore,
    SubgroupsStore: new Subgroups('shirt'),
    setDummyY,
    isMenuUncovered,
    setIsGarmentLoaded,
  }),
)
class Widget extends PureComponent {
  constructor(props) {
    super(props);
    if (document.querySelector('html').offsetWidth <= 450) {
    }
    demoSectionWidth = 200;
  }
  componentWillUnmount = () => {
    listeners.orientationchange.unsubscribe(
      this.orientationchangeListenerIndex,
    );
    listeners.resize.unsubscribe(this.resizeListenerIndex);
  };
  componentDidMount() {
    const { resize } = listeners;
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
      this.widget3d &&
        this.widget3d.setCanvasSize(window.innerWidth, window.innerHeight);
    });

    this.widget3d = new Widget3D(this.widgetContainer, {
      basePath: `/webgl_test/4igoom/`,
      dracoPath: `/webgl_test/4igoom/draco/`,
      apiPath: `${API_ROOT}/api/`,
      assetsPath: `${API_ROOT}/assets/models/${SALON_API_ID}/`,
      salonId: SALON_API_ID,
      useMobilePositions: isMobile(),
      onClickAsset: (...args) => {
        this.props.onClickAsset(...args);
      },
      onRotate: ({ y }) => {
        const { setDummyY, isMenuUncovered } = this.props;
        isMobile() && isMenuUncovered && setDummyY(y);
      },
    });
    try {
      this.widget3d.firstUpdate.then(() => {
        this.props.onDummyLoad();
        this.widget3d.setCanvasSize(window.innerWidth, window.innerHeight);
      });

      this.widget3d.update(this.props.assets).then(this.handleUpdated);
    } catch (err) {
      console.log('Ошибка при рендере манекена', err);
    }
  }

  componentDidUpdate(prevProps) {
    const isEqualProps = _.isEqual(prevProps.assets, this.props.assets);

    if (!isEqualProps) {
      const newOrder = { ...this.props.orderStore.order };
      const garment =
        _.get(this, 'props.orderStore.activeElement.elementInfo.garment') ||
        'shirt';
      const group = _.get(this, 'props.group', { id: 'design' });
      const activeExceptions = _.get(
        this,
        'props.orderStore.activeElement.exception',
        [],
      );
      const activeElementCode = _.get(
        this,
        'props.orderStore.activeElement.our_code',
        null,
      );
      const defaultValues = _.get(this, 'props.orderStore.defaultValues', {});
      // TODO:because of weird reset of standard sleeves value to slv4
      _.set(defaultValues, 'shirt[0].design.sleeves.our_code', 'slv1');
      _.set(defaultValues, 'shirt[0].design.sleeves.title', {
        en: 'standard',
        ru: 'стандартный',
      });

      const defaultExceptions = _.get(
        this,
        `props.orderStore.defaultExceptions[${garment}][${group.id}].exceptions`,
        [],
      );

      const exception = [...activeExceptions, ...defaultExceptions];

      const nextAssets = this.props.assets.filter((asset) => {
        const id = asset.id ? asset.id : asset;
        return !exception.includes(id);
      });
      if (exception.length) {
        exception.forEach((item) => {
          const trimmedCode = item.slice(0, 3);
          const codeSubgroup = ourCodesToSubgroup[garment][trimmedCode];
          if (
            !_.get(
              this,
              `props.orderStore.order[${garment}][0].design[${codeSubgroup}].isItemClear`,
            )
          ) {
            // TODO: let order get visible elements to the store,
            //       without multiply elements effects ( move to the mobx )
            // if (item.includes('cfs')) {
            //   delete newOrder.shirt[0].design.cuffs;
            // }
            newOrder[garment][0].design[codeSubgroup] =
              defaultValues[garment][0].design[codeSubgroup];
            this.props.orderStore.setOrder(newOrder);
            this.props.setSelectedItems({
              our_code: defaultValues[garment][0].design[codeSubgroup].our_code,
              garment,
              group: 'design',
              subGroup: codeSubgroup,
            });
            defaultValues[garment][0].design[codeSubgroup] &&
              !nextAssets.includes(
                defaultValues[garment][0].design[codeSubgroup].our_code,
              ) &&
              nextAssets.push(
                defaultValues[garment][0].design[codeSubgroup].our_code,
              );
          }
        });
      }
      const parsedActiveGarments = this.props.garments.activeGarments.filter(
        (el) =>
          !Object.values(this.props.orderStore.hiddenGarments).includes(el),
      );
      this.props.orderStore.setOrderDummyParams(parsedActiveGarments);
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

  handleUpdated = () => {
    const { setIsGarmentLoaded } = this.props;
    setIsGarmentLoaded(true);
  };

  render() {
    return (
      <div
        className="widget3d"
        ref={(node) => (this.widgetContainer = node)}
        style={{ width: `${demoSectionWidth}%`, height: '100%' }}
      />
    );
  }
}

@inject(({ order, garments: { garments } }) => ({
  orderStore: order,
  activeGarments: [...garments.activeGarments],
}))
@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementChanged: false,
      subgroup: null,
    };
  }

  componentDidUpdate(prevProps) {
    const isActiveGarmentsChanged = !_.isEqual(
      prevProps.activeGarments,
      this.props.activeGarments,
    );
    if (isActiveGarmentsChanged) {
      const { orderStore, activeGarments } = this.props;
      const { hiddenGarments } = orderStore;
      const parsedActiveGarments = activeGarments.filter(
        (el) => !Object.values(hiddenGarments).includes(el),
      );
      orderStore.setOrderDummyParams(parsedActiveGarments);
    }
  }
  update = (subgroup) => {
    const items = currentItems;

    const { orderStore } = this.props;

    const codeInOrder = _.get(
      orderStore,
      `order.shirt[0].design.${subgroup}.our_code`,
      null,
    );
    const item = items.find((i) => i.our_code === codeInOrder);

    if (!_.isEmpty(item)) {
      item.elementInfo = {
        garment: 'shirt',
        group: 'design',
        subgroup,
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
    const { orderStore } = this.props;
    const subgroup = _.findKey(orderStore.order.shirt[0].design, [
      'our_code',
      id,
    ]);
    if (id !== this.state.subgroup) {
      this.update(subgroup);
      this.setState({
        subgroup,
      });
    }
    /* eslint-enable */
  };
  render() {
    const { orderStore } = this.props;
    const { subgroup } = this.state;
    let selected = '';
    const focusableGarment = orderStore.focusableGarment;
    const activeElement = orderStore.activeElement || {};
    const hiddenGarments = orderStore.hiddenGarments || {};
    const initials = {};
    /**
     * Need to create deep copy of any arrays elements.
     * I think, this is an old mobx version issue
     * @todo try to updating all mobx extensions
     * P.S. I've tried to do this, got a lot of new issues
     */

    let params = toJS(orderStore.orderDummyParams);

    if (orderStore.isEmptyOrder() || !wasRendered) {
      params = baseDummyElements;
    } else {
      if (!_.isEmpty(initials) && typeof selected !== initials) {
        params.push(initials);
      }
      if (
        !_.isEmpty(activeElement) &&
        activeElement.elementInfo &&
        !hiddenGarments[activeElement.elementInfo.garment]
      ) {
        // Если в параметрах нет активного элемента
        // Может случиться, если по дефолту у элемента нет заданного значения
        if (
          !params.find(
            (param) =>
              activeElement.our_code === param ||
              (param && activeElement.our_code === param.id) ||
              // Если подразделу (воротник и тд) назначена отдельная ткань,
              // то нужно проверять наличие activeElement в массиве materials)
              (param &&
                param.materials &&
                param.materials.includes(activeElement.our_code)),
          )
        ) {
          // Добавляем его в к параметрам отображения
          params.push(activeElement.our_code);
        }
      }
    }
    wasRendered = true;
    return (
      <React.Fragment>
        {subgroup && (
          <Redirect to={`/order/details/shirt/design/${subgroup}`} />
        )}
        <Widget
          selected={focusableGarment}
          paramsSelectedCount={params.length}
          assets={params}
          onClickAsset={this.handleClickAsset}
          onDummyLoad={this.props.onDummyLoad}
        />
      </React.Fragment>
    );
  }
}
