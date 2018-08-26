import * as React from 'react';
import * as classnames from 'classnames';
// TODO import API_ROOT from the common config
// const API_ROOT = 'http://194.87.239.90';

interface P {
    item: GalleryStoreItem;
    active: boolean;    
    onClick(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    incremetLoadedCount(): void;
}
interface S extends ImageLoadState {

}
class GalleryItem extends React.PureComponent<P, S > {
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
            onMouseLeave,
            active,
        } = this.props;
        const {
            img_url_2d: image,
            id,
        } = this.props.item;
        // const image = img_url_2d
        //     ? img_url_2d[0]
        //         ?   `${API_ROOT}` +
        //             `${img_url_2d[0]}` +
        //             `${id}` + '.' +
        //             `${img_url_2d[0].split('/')[5] === 'fabric' ? 'png' : 'svg'}`
        //         : process.env.STATIC_IMAGES + 'colors/material.jpg'
        //     : process.env.STATIC_IMAGES + 'colors/material.jpg';
        if (!this.state.load.success) {
            return null;
        }
        return (
            <div
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className="gallery__item-blc"
                style={{
                    maxWidth: '33.3333%',
                    width: '100%',
                    padding: '0 0 1.2666rem 1.2666rem',
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
const makeGalleryItems: makeGalleryItems = (
    items,
    setActiveElementIndex,
    activeElementIndex,
    incremetLoadedCount,
    isMouseOverElement,
    mouseEnter,
    mouseLeave,
) => items.map((item, i) => {
    return (
        <GalleryItem
            key={item.fabric_code + item.id}
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
            active={i === activeElementIndex && !isMouseOverElement}
            incremetLoadedCount={incremetLoadedCount}
        />);
});

type State = {
    allLoaded: false;
    loadingProgress: number;
};
class GalleryBar extends React.PureComponent<GalleryBarProps, State> {
    loadedCount = 0;
    intervalID: number;
    static sizing() {
        try {
            const barWrap = document.getElementById('js-bar-wrap') as HTMLElement,
                imageWrap = document.getElementById('js-gallery-img') as HTMLElement;
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
        };
    }
    componentDidMount() {
        this.intervalID = window.setInterval(GalleryBar.sizing, 1000);
    }
    componentwillUnmount() {
        window.removeEventListener('resize', GalleryBar.sizing);
        window.clearInterval(this.intervalID);
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
        return (
           <div className="gallery__bar" id="js-bar-wrap">
                <div
                    className="gallery__bar-cont"
                    id="js-bar-container"
                    // style={ { 
                    //     display: 'flex',
                    //     flexWrap: 'wrap',
                    //     position: 'relative',
                    // } }
                >
                {makeGalleryItems(
                    items,
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