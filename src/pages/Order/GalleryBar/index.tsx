import * as React from 'react';

// TODO import API_ROOT from the common config
const API_ROOT = 'http://194.87.239.90';

interface P {
    item: GalleryStoreItem;
    onClick(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
}
class GalleryItem extends React.PureComponent<P> {
    render() {
        const {
            onClick,
            onMouseEnter,
            onMouseLeave,
        } = this.props;
        const {
            image_url_2d,
            id,
        } = this.props.item;
        const image = image_url_2d
            ? image_url_2d[0]
                ?   `${API_ROOT}` +
                    `${image_url_2d[0]}` +
                    `${id}` + '.' +
                    `${image_url_2d[0].split('/')[5] === 'fabric' ? 'png' : 'svg'}`
                : process.env.STATIC_IMAGES + 'colors/material.jpg'
            : process.env.STATIC_IMAGES + 'colors/material.jpg';
        return (
            <div
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            // className="gallery__item-blc"
                style={{
                    maxWidth: '33.3333%',
                    width: '100%',
                    padding: '0 0 1.2666rem 1.2666rem',
                }}
            >
                <div className="gallery__item">
                    <img src={image} alt={`${id}`} />
                </div>
            </div>
        );
    }
}
type makeGalleryItems = (
    items: GalleryStoreItems,
    setActiveElementIndex: (i: number, action?: string) => () => void,
) => React.ReactNode[];
const makeGalleryItems: makeGalleryItems = (items, setActiveElementIndex) => items.map((item, i) => {
    return (
        <GalleryItem
            key={item.fabric_code + item.id}
            item={item}
            onClick={setActiveElementIndex(i)}
            onMouseEnter={setActiveElementIndex(i, 'enter')}
            onMouseLeave={setActiveElementIndex(-1, 'leave')}
        />);
});

class GalleryBar extends React.PureComponent<GalleryBarProps> {
    static style = {
        display: 'block',
        width: '50%',
        height: 315,
    };
    render() {
        const {
            items,
            setActiveElementIndex,
        } = this.props;
        return (
           <div className="gallery__bar" style={GalleryBar.style}>
                <div
                    className="gallery__bar-cont"
                    style={ { 
                        display: 'flex',
                        flexWrap: 'wrap',
                        position: 'relative',
                    } }
                >
                {makeGalleryItems(
                    items,
                    setActiveElementIndex
                )}
                </div>
           </div>
        );
    }
}

export {
    GalleryBar,
};