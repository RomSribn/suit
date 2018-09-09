import * as React from 'react';
import * as _ from 'lodash';
import { inject, observer } from 'mobx-react';
import * as classnames from 'classnames';

interface P {
    item: GalleryStoreItem;
    orderStore?: IOrderStore;
    onClick(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    incremetLoadedCount(): void;
}
interface S extends ImageLoadState {

}

// TODO: переделать GalleryItem под observer компоненту и убрать ненужно прокинутые пропсы
@inject(({ order }) => ({
        orderStore: order
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
            onClick,
            onMouseEnter,
            onMouseLeave
        } = this.props;
        const {
            img_url_2d: image,
            our_code: id,
        } = this.props.item;
        if (!this.state.load.success) {
            return null;
        }
        const orderStore = this.props.orderStore!;
        const active = _.get(orderStore, 'activeElement.our_code', '') === id;
        return (
            <div
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className="gallery__item-blc"
                style={{
                    maxWidth: '33.3333%',
                    width: '100%',
                    padding: '0 0 1.333rem 1.333rem',
                }}
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
type makeGalleryItems = (
    items: GalleryStoreItems,
    setActiveElementIndex: (i: number, action?: string, id?: string, fabric?: string) => () => void,
    activeElementIndex: number,
    incremetLoadedCount: () => void,
    isMouseOverElement: boolean,
    mouseEnter: (link: string) => void,
    mouseLeave: () => void,
) => React.ReactNode[];

const galleryItemsCache: Record<string, React.ReactNode[]> = {};
const makeGalleryItems: makeGalleryItems = (
    items,
    setActiveElementIndex,
    activeElementIndex,
    incremetLoadedCount,
    isMouseOverElement,
    mouseEnter,
    mouseLeave,
) => {
    const cache = items.reduce((acc: string[], item): string[] => {
        acc.push(item.our_code);
        return acc;
    }, []).join('');
    if (galleryItemsCache[cache]) {
        return galleryItemsCache[cache];
    }
    const result = items.map((item, i) => {
        return (
            <GalleryItem
                key={item.fabric_code + item.our_code}
                item={item}
                onClick={setActiveElementIndex(i)}
                onMouseEnter={() => {
                    setActiveElementIndex(i, 'enter')();
                    mouseEnter(item.image_url_3d!);
                }}
                onMouseLeave={(): void => {
                    setActiveElementIndex(-1, 'leave')();
                    mouseLeave();
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
};

class GalleryBar extends React.Component<GalleryBarProps, State> {
    loadedCount = 0;
    intervalID: number;
    isScrolling = false;
    static sizing() {
        try {
            const barWrap = document.getElementById('js-bar-wrap') as HTMLElement,
                imageWrap = document.getElementById('js-gallery-img') as HTMLElement;

            // для устранения скачков при скролинге в хроме и опере, баг возникает из-за:
            // barWrap.style.display = 'none';
            // imageWrap.style.display = 'none';
            if ((barWrap.scrollHeight) && (barWrap.scrollHeight > barWrap.offsetHeight)) {
                barWrap.style.overflowY = 'scroll';
            } else {
                barWrap.style.overflowY = 'auto';
            }

            // БАГ: в опере и хроме, если зажать скрол левой кнопкой мыши, 
            // то с него слетит фокус, из-за display = 'none',   
            barWrap.style.display = 'none';
            imageWrap.style.display = 'none';
            
            const wrapHeight = document.getElementById('js-gallery-wrap')!.offsetHeight,
                wrapWidth = document.getElementById('js-gallery-wrap')!.offsetWidth,
                barContainer = document.getElementById('js-bar-container')!, 
                barItems = barContainer.querySelectorAll('.gallery__item-blc') as NodeListOf<HTMLElement>,
                barWrapWidth = wrapWidth - wrapHeight - 2;            
            
            if (wrapHeight >= wrapWidth - 140) {
                imageWrap.style.width = `${wrapWidth - 141}px`;
                barWrap.style.width = '140px';
            } else {
                imageWrap.style.width = `${wrapHeight}px`;
                barWrap.style.width = `${barWrapWidth}px`;
                if (barWrapWidth / 4 <= 36) {
                    for (let _i = 0; _i < barItems.length; _i++) {
                        barItems[_i].style.maxWidth = '100%';
                    }
                } else if (barWrapWidth / 4 <= 71) {
                    for (var i = 0; i < barItems.length; i++) { 
                        barItems[i].style.maxWidth = '50%';
                    }
                } else if (barWrapWidth / 4 <= 142) {
                    for (let _i = 0; _i < barItems.length; _i++) {
                        barItems[_i].style.maxWidth = '33.3333%';
                    }
                } else if (barWrapWidth / 4 <= 284) {
                    for (let _i = 0; _i < barItems.length; _i++) {
                        barItems[_i].style.maxWidth = '25%';
                    }
                }
            }
            imageWrap.style.height = `${wrapHeight}px`;
            barWrap.style.height = `${wrapHeight}px`;
            imageWrap.style.display = 'block';
            barWrap.style.display = 'block';            
        } catch (_) {
            //
        }
    }

    incremetLoadedCount = () => {
        this.loadedCount++;
        if (this.loadedCount === this.props.items.length) {
            GalleryBar.sizing();
            window.addEventListener('resize', GalleryBar.sizing);
        }
    }
    constructor(props: GalleryBarProps) {
        super(props);
        this.state = {
            allLoaded: false,
            loadingProgress: 0,
            renderedElementsCount: 35,
        };
    }
    componentDidMount() {
        this.intervalID = window.setInterval(GalleryBar.sizing, 1000);
    }
    componentwillUnmount() {
        window.removeEventListener('resize', GalleryBar.sizing);
        window.clearInterval(this.intervalID);
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
        if ( heightOfAllItems > containerHeight && !this.isScrolling) {
            this.setState({ 
                renderedElementsCount: this.state.renderedElementsCount + itterStep,
            });
            // optimize ui rerender
            this.isScrolling = true;
            setTimeout(() => this.isScrolling = false, 100);
        }
    }

    render() {
        const {
            items,
            setActiveElementIndex,
            activeElementIndex,
            mouseEnter,
            mouseLeave,
            isMouseOverElement,
        } = this.props;
        const {
            renderedElementsCount
        } = this.state;
        const activeItems =
        renderedElementsCount > items.length ? items : items.slice(0, renderedElementsCount);
        return (
           <div onScroll={this.handlerItemScrollLoader} className="gallery__bar" id="js-bar-wrap">
                <div
                    className="gallery__bar-cont"
                    id="js-bar-container"
                >
                {makeGalleryItems(
                    activeItems,
                    setActiveElementIndex,
                    activeElementIndex,
                    this.incremetLoadedCount,
                    isMouseOverElement,
                    mouseEnter,
                    mouseLeave,
                )}
                </div>
           </div>
        );
    }
}

export {
    GalleryBar,
};