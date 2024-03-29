import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { isMobile, isLandscape } from '../../../utils';
import { PopUp } from '../../../containers/Popup';
import { SquareSpinner } from './SquareSpinner';
import { SwiperPopup } from '../../../components/SwiperPopup';
import * as _ from 'lodash';
import * as classnames from 'classnames';

interface GalleryItemState extends ImageLoadState {
  isActive?: boolean;
}

interface P {
  activeGarments?: string[];
  hiddenGarments?: IHiddenGarments;
  setSelectedItems?: SelectedItemsAction;
  setIsGarmentLoaded?: (isGarmentLoaded: boolean) => void;
  isGarmentLoaded?: boolean;
  group?: string;
  subgroup?: string;
  selectedItems?: any; //tslint:disable-line
  garment?: string;
  app?: IAppStore;
  item: GalleryStoreItem;
  shownItem: GalleryStoreItem;
  orderStore?: IOrderStore;
  partOfShirtToggle?: string;
  closeFilter?: () => void;
  userFilters?: UserFilters;
  zoomId: string | null;
  setZoomId: (id: string) => void;
  onClick(): void;
  setOrderDummyParams(activeGarments: string[]): void;
  onMouseEnter(): void;
  onMouseLeave(): void;
  incremetLoadedCount(): void;
}

// TODO: переделать GalleryItem под observer компоненту и убрать ненужно прокинутые пропсы
@inject(
  ({
    order,
    filterStore: { selectedItems, setSelectedItems, closeFilter, userFilters },
    garments: { garments },
    app,
  }) => ({
    orderStore: order,
    hiddenGarments: order.hiddenGarments,
    activeGarments: garments.activeGarments,
    partOfShirtToggle: order.partOfShirtToggle,
    setIsGarmentLoaded: app.setIsGarmentLoaded,
    isGarmentLoaded: app.isGarmentLoaded,
    closeFilter,
    app,
    selectedItems,
    setSelectedItems,
    userFilters,
  }),
)
@observer
class GalleryItem extends React.Component<P, GalleryItemState> {
  constructor(props: P) {
    super(props);
    this.state = {
      load: {
        error: null,
        success: null,
      },
      isActive: this.isActive(),
    };
  }

  handleSelectGarment(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    props: P,
  ) {
    if (!props) {
      return;
    }
    const {
      item: { elementInfo, our_code },
      onClick,
      setOrderDummyParams,
      activeGarments,
      hiddenGarments,
      setSelectedItems,
      closeFilter,
      setZoomId,
      setIsGarmentLoaded,
    } = props;

    if (!this.isActive()) {
      setIsGarmentLoaded!(false);
    }
    const garment = elementInfo && elementInfo.garment;
    const group = elementInfo && elementInfo.group;
    const subGroup = elementInfo && elementInfo.subGroup;
    const parsedActiveGarments = activeGarments!.filter(
      (el) => !Object.values(hiddenGarments!).includes(el),
    );
    setZoomId(our_code);
    closeFilter!();
    onClick();
    setSelectedItems!({ garment, group, subGroup, our_code });
    setOrderDummyParams(parsedActiveGarments);
  }

  handleToggleSwipe(props: P) {
    if (!props) {
      return;
    }
    const { app } = props;
    app!.toggleSwiperPopup();
  }

  isActive() {
    const {
      item: { elementInfo, our_code },
      partOfShirtToggle,
      selectedItems,
    } = this.props;
    const garment = elementInfo && elementInfo.garment;
    const group = elementInfo && elementInfo.group;
    const subGroup = elementInfo && elementInfo.subGroup;
    const orderStore = this.props.orderStore!;

    const codeInOrder = _.get(
      orderStore,
      `order[${garment}][0][${group}][${subGroup}].our_code`,
      '',
    );
    const codeInStore = _.get(
      selectedItems,
      `[${garment}][${group}][${subGroup}]`,
      '',
    );
    const codeInStoreShirt = _.get(
      selectedItems,
      `[${garment}][${group}][${partOfShirtToggle}]`,
      '',
    );
    if (garment === 'shirt' && group === 'fabric_ref') {
      const comparedValue = codeInStoreShirt || codeInOrder;
      return comparedValue === our_code;
    }
    if (!Object.values(selectedItems).length || !codeInStore) {
      return codeInOrder === our_code;
    }
    return codeInStore === our_code;
  }

  componentDidUpdate(prevProps: P, prevState: GalleryItemState) {
    if (!_.isEqual(prevProps, this.props)) {
      const {
        item: { our_code },
        orderStore,
      } = this.props;

      const { focusableGarment, setFocusableGarment } = orderStore!;
      const isActive = this.isActive();
      this.setState({ isActive });
      if (isActive && focusableGarment !== our_code) {
        setFocusableGarment(our_code);
      }
      if (this.props.app && this.state.isActive) {
        this.props.app!.setSwiperPopupData(this.props.item);
      }
    }
  }

  componentDidMount() {
    try {
      const {
        item: { img_url_2d: imageUrl },
        incremetLoadedCount,
      } = this.props;
      const image = new Image();
      image.src = imageUrl;
      image.onload = () => {
        this.setState({
          load: {
            ...this.state.load,
            success: imageUrl,
          },
          isActive: this.isActive(),
        });
        incremetLoadedCount();
      };
      image.onerror = () => {
        incremetLoadedCount();
      };
    } catch (e) {
      this.props.incremetLoadedCount();
      this.setState({
        load: {
          ...this.state.load,
          error: e,
        },
      });
    }
  }

  render() {
    const { onMouseEnter, onMouseLeave, isGarmentLoaded } = this.props;

    const { isActive } = this.state;

    const {
      img_url_2d: image,
      img_url_2d_list,
      our_code: id,
      elementInfo,
    } = this.props.item;
    if (!this.state.load.success) {
      return null;
    }

    const isFabricImg = elementInfo && elementInfo.subGroup === 'fabric';
    const hoverImg = isFabricImg
      ? `${process.env.API_ROOT}${
          (img_url_2d_list.length > 1 && img_url_2d_list[1].slice(5)) || id
        }`
      : image;

    return (
      <>
        {this.props.app && (
          <div
            onClick={(e) => this.handleSelectGarment(e, this.props)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={classnames('gallery__item-blc', {
              landscape: isMobile() && isLandscape(),
            })}
          >
            <div
              className={classnames('gallery__item', {
                active: isActive && isGarmentLoaded,
              })}
            >
              <img
                src={hoverImg}
                className="gallery__item--main-image"
                alt={`${id}`}
              />
              <img
                src={image}
                className="gallery__item--hover-image"
                alt={`${id}`}
              />
              {this.props.app && this.props.app.changeSearchedItemsCount()}
              {isActive && !isGarmentLoaded && <SquareSpinner />}
              {isActive && this.props.app && (
                <span
                  onClick={() => this.handleToggleSwipe(this.props)}
                  className="zoom-icon"
                />
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

const galleryItemsCache: Record<string, React.ReactNode[]> = {};
type makeGalleryItems = (
  items: GalleryStoreItems,
  setActiveElementIndex: (
    ourCode: string,
    action?: string,
    id?: string,
    fabric?: string,
  ) => () => void,
  setPreviewElementIndex: (ourCode: string, action?: string) => void,
  shownItem: GalleryStoreItem,
  incremetLoadedCount: () => void,
  zoomId: string,
  setZoomId: (id: string) => void,
  setOrderDummyParams: TSetOrderDummyParams,
) => React.ReactNode[];

const makeGalleryItems: makeGalleryItems = (
  items,
  setActiveElementIndex,
  setPreviewElementIndex,
  shownItem,
  incremetLoadedCount,
  zoomId,
  setZoomId,
  setOrderDummyParams,
) => {
  const cache =
    items
      .reduce((acc: string[], item): string[] => {
        acc.push(item.our_code);
        return acc;
      }, [])
      .join('') +
    shownItem.our_code +
    zoomId;
  // временно отключено
  // if (galleryItemsCache[cache]) {
  //     return galleryItemsCache[cache];
  // }

  const result = items.map((item, elementIndex) => {
    return (
      <GalleryItem
        key={item.fabric_code + item.our_code}
        item={item}
        onClick={setActiveElementIndex(item.our_code)}
        shownItem={shownItem}
        setOrderDummyParams={setOrderDummyParams}
        onMouseEnter={() => {
          setPreviewElementIndex(item.our_code, 'enter');
        }}
        onMouseLeave={() => {
          setPreviewElementIndex('', 'leave');
        }}
        incremetLoadedCount={incremetLoadedCount}
        zoomId={zoomId}
        setZoomId={setZoomId}
      />
    );
  });

  galleryItemsCache[cache] = result;
  return result;
};

type State = {
  allLoaded: false;
  loadingProgress: number;
  renderedElementsCount: number;
  isShowedExceptionPopup: boolean;
  titleSubGroup: string;
  titleElement: Translations<string> | null;
  zoomId: string;
};

@inject(
  ({
    app,
    filterStore,
    garments: {
      garments: { activeGarments, currentActiveGarment },
    },
    order: { setOrderDummyParams, setFocusableGarment },
  }) => ({
    app,
    filterStore,
    activeGarments,
    currentActiveGarment,
    setOrderDummyParams,
    setFocusableGarment,
  }),
)
@observer
class GalleryBar extends React.Component<GalleryBarProps, State> {
  loadedCount = 0;
  isScrolling = false;
  galleryBar: React.RefObject<HTMLDivElement>;
  galleryItemElement: HTMLDivElement | null;

  incremetLoadedCount = () => {
    this.loadedCount++;
  };
  constructor(props: GalleryBarProps) {
    super(props);
    this.state = {
      allLoaded: false,
      loadingProgress: 0,
      renderedElementsCount: 35,
      isShowedExceptionPopup: false,
      titleSubGroup: '',
      titleElement: null,
      zoomId: this.props.activeElementCode,
    };
    this.props.setPreviewElementIndex(this.props.activeElementCode, 'enter');
    this.galleryBar = React.createRef();
  }

  _handleScroll = (event: ScrollEvent) => {
    if (this.state.renderedElementsCount >= this.props.items.length) {
      return;
    }
    if (!this.galleryBar.current) {
      return;
    }

    const galleryWrapper = this.galleryBar.current;

    const itterStep = 10;

    if (
      event.target &&
      event.target.scrollTop > 0.5 * galleryWrapper.offsetHeight
    ) {
      this.setState({
        renderedElementsCount: this.state.renderedElementsCount + itterStep,
      });
    }
  };

  throttledHandleScroll = _.throttle(this._handleScroll, 300); // tslint:disable-line

  handleScroll = (event: ScrollEvent) => {
    event.persist();
    this.throttledHandleScroll(event);
  };

  showExceptionPopup = (
    titleSubGroup: string,
    titleElement: Translations<string> | null,
  ) =>
    this.setState({
      isShowedExceptionPopup: true,
      titleSubGroup,
      titleElement,
    });

  hideExceptionPopup = () => this.setState({ isShowedExceptionPopup: false });

  setZoomId = (id: string) => this.setState({ zoomId: id });

  componentWillUnmount() {
    const { setFocusableGarment } = this.props;
    setFocusableGarment!('fab34');
  }

  render() {
    const {
      items,
      setActiveElementIndex,
      setPreviewElementIndex,
      shownItem,
      currentActiveGarment = 'shirt',
      app,
      setOrderDummyParams,
      filterStore,
    } = this.props;
    const { renderedElementsCount } = this.state;
    const withAppliedFilters = (): GalleryStoreItems => {
      if (!filterStore) {
        return items;
      }
      const filters = filterStore.userFilters[currentActiveGarment]
        ? Object.keys(filterStore.userFilters[currentActiveGarment])
        : [];
      return items.filter(
        (item) =>
          filters &&
          filters.every(
            (filterId) =>
              !filterStore.userFilters[currentActiveGarment][filterId].length ||
              filterStore.userFilters[currentActiveGarment][filterId].includes(
                item[filterId].value,
              ),
          ),
      );
    };
    const filteredItems = window.location.pathname.includes('design')
      ? items
      : withAppliedFilters().filter((item: GalleryStoreItem) => {
          const { our_code: id, title, manufacturer, catalog } = item;
          const userFilters = filterStore && filterStore.userFilters;
          // TODO: (KMP) убрать стору. Надеюсь, к этому не надо будет притрагиваиться
          // только при рефакторе всего проекта
          if (userFilters) {
            const filterNames = Object.keys(userFilters);

            for (const name in filterNames) {
              // Если в массиве значений данного фильтра filters[name]
              // есть такое же значение, как у данного элемента галлереи,
              // тогда выходим с метода
              if (
                userFilters[name] &&
                userFilters[name].includes(item[name].filterValue)
              ) {
                return false;
              }
            }
          }
          const isSearchedValue =
            app &&
            app.currentSearchValue &&
            (id.includes(app.currentSearchValue.toLowerCase()) ||
              title.en
                .toLowerCase()
                .includes(app.currentSearchValue.toLowerCase()) ||
              (manufacturer &&
                manufacturer.manufacturerName
                  .toLocaleLowerCase()
                  .includes(app.currentSearchValue.toLowerCase())) ||
              (catalog &&
                catalog.catalogName
                  .toLocaleLowerCase()
                  .includes(app.currentSearchValue.toLowerCase())));

          return isSearchedValue;
        });
    const activeItems =
      renderedElementsCount > filteredItems.length
        ? filteredItems
        : filteredItems.slice(0, renderedElementsCount);
    return (
      <div
        className="gallery__bar"
        onScroll={this.handleScroll}
        id="js-bar-wrap"
      >
        {app && app.showSwiperPopup && app.swiperPopupData && (
          <PopUp open={app.showSwiperPopup}>
            <SwiperPopup
              item={app.swiperPopupData}
              currentActiveGarment={currentActiveGarment}
              closeButton={app.toggleSwiperPopup}
              lang={app.lang}
            />
          </PopUp>
        )}
        <div
          ref={this.galleryBar}
          className="gallery__bar-cont"
          id="js-bar-container"
        >
          {makeGalleryItems(
            activeItems,
            setActiveElementIndex,
            setPreviewElementIndex,
            shownItem,
            this.incremetLoadedCount,
            this.state.zoomId,
            this.setZoomId,
            setOrderDummyParams!,
          )}
        </div>
      </div>
    );
  }
}

export { GalleryBar };
