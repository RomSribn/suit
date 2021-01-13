import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { isMobile, isLandscape } from '../../../utils';
import { PopUp } from '../../../containers/Popup';
import { SwiperPopup } from '../../../components/SwiperPopup';
import * as _ from 'lodash';
import * as classnames from 'classnames';

interface P {
    app?: IAppStore;
    item: GalleryStoreItem;
    shownItem: GalleryStoreItem;
    orderStore?: IOrderStore;
    filterStore?: IFilterStore;
    zoomId: string | null;
    setZoomId: (id: string) => void;
    onClick(): void;
    setOrderDummyParams(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    incremetLoadedCount(): void;
}

interface GalleryItemState extends ImageLoadState {
}

// TODO: переделать GalleryItem под observer компоненту и убрать ненужно прокинутые пропсы
@inject(({
    order,
    filterStore,
    app
}) => ({
    orderStore: order,
    filterStore,
    app
})
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
        };
    }
    componentDidMount() {
        try {
            const { item: { img_url_2d: imageUrl }, incremetLoadedCount } = this.props;
            const image = new Image();
            image.src = imageUrl;
            image.onload = () => {
                this.setState({
                    load: {
                        ...this.state.load,
                        success: imageUrl,
                    },
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
        const {
            onMouseEnter,
            onMouseLeave,
            shownItem,
            onClick,
            setOrderDummyParams
        } = this.props;

        const {
            img_url_2d: image,
            img_url_2d_list,
            our_code: id,
            title,
            elementInfo
        } = this.props.item;
        if (!this.state.load.success) {
            return null;
        }

        // TODO: (KMP) убрать стору. Надеюсь, к этому не надо будет притрагиваиться
        // только при рефакторе всего проекта
        if (this.props.filterStore) {
            const filters = this.props.filterStore.userFilters;
            const filterNames = Object.keys(filters);

            for (const name in filterNames) {
                // Если в массиве значений данного фильтра filters[name]
                // есть такое же значение, как у данного элемента галлереи,
                // тогда выходим с метода
                if (filters[name] && filters[name].includes(this.props.item[name].filterValue)) {
                    return null;
                }
            }
        }
        const orderStore = this.props.orderStore!;
        const active =
            _.get(orderStore, 'activeElement.our_code', '') === id ||
            shownItem.our_code === id;
        const click = () => {
            this.props.setZoomId(id);
            this.props.filterStore!.closeFilter();
            onClick();
            setOrderDummyParams();
        };
        if (this.props.app && active) {
            this.props.app!.setSwiperPopupData(this.props.item);
        }

        const toggleSwipe = () => {
            this.props.app!.toggleSwiperPopup();
        };

        const isFabricImg = elementInfo && elementInfo.subGroup === 'fabric';
        const hoverImg = isFabricImg ?
            `${process.env.API_ROOT}${(img_url_2d_list.length > 1) && img_url_2d_list[1].slice(5) || id}` :
            image;
        return (
            <>
                {this.props.app &&
                    (window.location.pathname.includes('design')
                        ? true
                        : (this.props.app.currentSearchValue &&
                            id.includes(
                                this.props.app.currentSearchValue.toLowerCase()
                            ) ||
                            title.en.toLowerCase().includes(
                                this.props.app.currentSearchValue.toLowerCase()
                            ))) && (
                        <div
                            onClick={click}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                            className={classnames('gallery__item-blc', {
                                landscape: isMobile() && isLandscape(),
                            })}
                        >
                            <div className={classnames('gallery__item', { active })}>
                                <img
                                    src={hoverImg}
                                    className="gallery__item--hover-image"
                                    alt={`${id}`}
                                />
                                <img
                                    src={image}
                                    className="gallery__item--main-image"
                                    alt={`${id}`}
                                />
                                {this.props.app &&
                                    this.props.app.changeSearchedItemsCount()}
                                {this.props.zoomId === id &&
                                    this.props.app && (
                                        <span onClick={toggleSwipe} className="zoom-icon" />
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
    setActiveElementIndex: (i: number, action?: string, id?: string, fabric?: string) => () => void,
    setPreviewElementIndex: (elementIndex: number, action?: string) => void,
    shownItem: GalleryStoreItem,
    incremetLoadedCount: () => void,
    isMouseOverElement: boolean,
    zoomId: string,
    setZoomId: (id: string) => void,
    filterStore: IFilterStore,
    activeGarments: string[],
    setOrderDummyParams: (params: string[]) => void
) => React.ReactNode[];

const makeGalleryItems: makeGalleryItems = (
    items,
    setActiveElementIndex,
    setPreviewElementIndex,
    shownItem,
    incremetLoadedCount,
    isMouseOverElement,
    zoomId,
    setZoomId,
    filterStore,
    activeGarments,
    setOrderDummyParams
) => {
    const cache = items.reduce((acc: string[], item): string[] => {
        acc.push(item.our_code);
        return acc;
    }, []).join('') + shownItem.our_code + zoomId;
    // временно отключено
    // if (galleryItemsCache[cache]) {
    //     return galleryItemsCache[cache];
    // }

    const filtered = (): GalleryStoreItems => {
        const filters = Object.keys(filterStore.userFilters);
        const result2 = items.filter(item => {
            let res;
            for (let i = 0; i < filters.length; i++) {
                if (filterStore.userFilters[filters[i]].includes(item[filters[i]].value)) {
                    return res = true;
                }
            }
            return res;
        });

        if (result2.length < 1) {
            return items;
        }

        return result2;
    };

    const result = filtered().map((item, elementIndex) => {
        return (
            <GalleryItem
                key={item.fabric_code + item.our_code}
                item={item}
                onClick={setActiveElementIndex(elementIndex)}
                shownItem={shownItem}
                setOrderDummyParams={() => {
                    setOrderDummyParams(activeGarments);
                }}
                onMouseEnter={() => {
                    setPreviewElementIndex(elementIndex, 'enter');
                }}
                onMouseLeave={() => {
                    setPreviewElementIndex(-1, 'leave');
                }}
                incremetLoadedCount={incremetLoadedCount}
                zoomId={zoomId}
                setZoomId={setZoomId}
            />);
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

@inject(({
    app,
    filterStore,
    garments: { garments },
    order: { setOrderDummyParams }
}) => ({
    app,
    filterStore,
    activeGarments: [...garments.activeGarments],
    setOrderDummyParams
})
)
@observer
class GalleryBar extends React.Component<GalleryBarProps, State> {
    loadedCount = 0;
    isScrolling = false;
    galleryBar: React.RefObject<HTMLDivElement>;
    galleryItemElement: HTMLDivElement | null;

    incremetLoadedCount = () => {
        this.loadedCount++;
    }
    constructor(props: GalleryBarProps) {
        super(props);
        this.state = {
            allLoaded: false,
            loadingProgress: 0,
            renderedElementsCount: 35,
            isShowedExceptionPopup: false,
            titleSubGroup: '',
            titleElement: null,
            zoomId: this.props.items[this.props.activeElementIndex].our_code,
        };
        this.props.setPreviewElementIndex(this.props.activeElementIndex || 0, 'enter');
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

        if (event.target && event.target.scrollTop > 0.5 * galleryWrapper.offsetHeight) {
            this.setState({
                renderedElementsCount: this.state.renderedElementsCount + itterStep,
            });
        }
    }

    throttledHandleScroll = _.throttle(this._handleScroll, 300); // tslint:disable-line

    handleScroll = (event: ScrollEvent) => {
        event.persist();
        this.throttledHandleScroll(event);
    }

    showExceptionPopup = (titleSubGroup: string, titleElement: Translations<string> | null) => (
        this.setState({
            isShowedExceptionPopup: true,
            titleSubGroup,
            titleElement
        })
    )

    hideExceptionPopup = () => this.setState({ isShowedExceptionPopup: false });

    setZoomId = (id: string) => this.setState({ zoomId: id });

    render() {
        const {
            items,
            setActiveElementIndex,
            setPreviewElementIndex,
            shownItem,
            isMouseOverElement,
            activeGarments,
            setOrderDummyParams
        } = this.props;
        const {
            renderedElementsCount
        } = this.state;
        const activeItems =
            renderedElementsCount > items.length ? items : items.slice(0, renderedElementsCount);
        return (
            <div
                className="gallery__bar"
                onScroll={this.handleScroll}
                id="js-bar-wrap"
            >
                { (this.props.app && this.props.app.showSwiperPopup && this.props.app.swiperPopupData) &&
                    <PopUp open={this.props.app.showSwiperPopup}>
                        <SwiperPopup
                            item={this.props.app.swiperPopupData}
                            closeButton={this.props.app.toggleSwiperPopup}
                            lang={this.props.app.lang}
                        />
                    </PopUp>
                }
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
                        isMouseOverElement,
                        this.state.zoomId,
                        this.setZoomId,
                        this.props.filterStore!,
                        activeGarments!,
                        setOrderDummyParams!
                    )}
                </div>
            </div>
        );
    }
}

export {
    GalleryBar,
};
