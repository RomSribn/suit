import * as React from 'react';
import * as _ from 'lodash';
import { inject, observer } from 'mobx-react';
import * as classnames from 'classnames';

import { isMobile, isLandscape } from '../../../utils';

interface P {
    item: GalleryStoreItem;
    shownItem: GalleryStoreItem;
    orderStore?: IOrderStore;
    filterStore?: IFilterStore;
    onClick(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    incremetLoadedCount(): void;
}

interface S extends ImageLoadState {

}

// TODO: переделать GalleryItem под observer компоненту и убрать ненужно прокинутые пропсы
@inject(({
    order,
    filterStore
}) => ({
        orderStore: order,
        filterStore
    })
)
@observer
class GalleryItem extends React.Component<P, S > {
    constructor(props: P) {
        super(props);
        this.state = {
            load: {
                error: null,
                success: null,
            }
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
            onClick
        } = this.props;
        const {
            img_url_2d: image,
            our_code: id,
        } = this.props.item;
        if (!this.state.load.success) {
            return null;
        }
        // TODO: (KMP) убрать нахуй в стору. Надеюсь, к этому куску говна надо будет притрагиваиться
        // только при рефакторе всего проекта
        if (this.props.filterStore) {
            const filters = this.props.filterStore.userFilters;
            const filterNames = Object.keys(filters);

            for (const name in filterNames) {
                // Если в массиве значений данного фильтра filters[name]
                // есть такое же значение, как у данного элемента галлереи,
                // тогда шлем все нахуй
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
            onClick();
        };
        return (
            <div
                onClick={click}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={classnames(
                    'gallery__item-blc',
                    { landscape:  isMobile() && isLandscape() }
                )}
            >
                <div
                    className={classnames(
                        'gallery__item',
                        { active }
                    )}
                >
                    <img src={image} alt={`${id}`} />
                </div>
            </div>
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
) => React.ReactNode[];

const makeGalleryItems: makeGalleryItems = (
    items,
    setActiveElementIndex,
    setPreviewElementIndex,
    shownItem,
    incremetLoadedCount,
    isMouseOverElement,
) => {
    const cache = items.reduce((acc: string[], item): string[] => {
        acc.push(item.our_code);
        return acc;
    }, []).join('') + shownItem.our_code;
    if (galleryItemsCache[cache]) {
        return galleryItemsCache[cache];
    }
    const result = items.map((item, elementIndex) => {
        return (
            <GalleryItem
                key={item.fabric_code + item.our_code}
                item={item}
                onClick={setActiveElementIndex(elementIndex)}
                shownItem={shownItem}
                onMouseEnter={() => {
                    setPreviewElementIndex(elementIndex, 'enter');
                }}
                onMouseLeave={() => {
                    setPreviewElementIndex(-1, 'leave');
                }}
                incremetLoadedCount={incremetLoadedCount}
            />);
    });
    galleryItemsCache[cache] = result;
    return result;
};

type State = {
    allLoaded: false;
    loadingProgress: number;
    renderedElementsCount: number;
    isScrolling: boolean;
    isShowedExceptionPopup: boolean;
    titleSubGroup: string;
    titleElement: Translations<string> | null;
};

class GalleryBar extends React.Component<GalleryBarProps, State> {
    loadedCount = 0;
    isScrolling = false;
    scrollGallery?: HTMLElement;

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
            isScrolling: false,
            titleElement: null
        };
        this.props.setPreviewElementIndex(this.props.activeElementIndex || 0, 'enter');
    }

    handlerItemScrollLoader = (event: ScrollEvent) => {
        const galleryItem = event.target.querySelector('.gallery__item-blc');
        const wrapHeight = galleryItem!.offsetHeight,
              wrapWidth = galleryItem!.offsetWidth,
              barWrapWidth = wrapWidth - wrapHeight - 2,
              containerHeight = event.target.offsetHeight;

        let divider = 1;
        if (barWrapWidth / 4 <= 36) {
            divider = 1;
        } else if (barWrapWidth / 4 <= 71) {
            divider = 2;
        } else if (barWrapWidth / 4 <= 142) {
            divider = 3;
        } else if (barWrapWidth / 4 <= 284) {
           divider = 4;
        }

        const itterStep = 10;
        const heightOfAllItems = (this.state.renderedElementsCount / divider) * wrapHeight;
        // // max height for scrolls
        if (heightOfAllItems > containerHeight && !this.isScrolling) {
            if (this.scrollGallery!.scrollTop + this.scrollGallery!.clientHeight >=
                this.scrollGallery!.scrollHeight) {
                    this.setState({
                        renderedElementsCount: this.state.renderedElementsCount + itterStep,
                    });
                    // optimize ui rerender
                    this.isScrolling = true;
                    setTimeout(() => this.isScrolling = false, 100);
                }
        }
    }

    showExceptionPopup = (titleSubGroup: string, titleElement: Translations<string> | null) => (
        this.setState({
            isShowedExceptionPopup: true,
            titleSubGroup,
            titleElement
        })
    )

    hideExceptionPopup = () => this.setState({ isShowedExceptionPopup: false });

    render() {
        const {
            items,
            setActiveElementIndex,
            setPreviewElementIndex,
            shownItem,
            isMouseOverElement,
        } = this.props;
        const {
            renderedElementsCount,
        } = this.state;
        const activeItems =
        renderedElementsCount > items.length ? items : items.slice(0, renderedElementsCount);
        return (
            <div
                ref={comp => this.scrollGallery = comp!}
                onScroll={this.handlerItemScrollLoader}
                className="gallery__bar"
                id="js-bar-wrap"
            >
                <div
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
                )}
                </div>
            </div>
        );
    }
}

export {
    GalleryBar,
};
