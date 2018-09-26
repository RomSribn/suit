import * as React from 'react';
import * as classnames from 'classnames';
import * as _ from 'lodash';
import { services } from '../../../config/routes';
import { Controll } from '../Filter';
import { GalleryBar } from '../GalleryBar';

import './styles.styl';

interface GalleryState extends ImageLoadState {
    activeElementIndex: number;
    shownItem: GalleryStoreItem;
    previewElementIndex: number;
    mouseOverElement: boolean;
}
class Gallery extends React.PureComponent<GalleryProps, GalleryState> {
    constructor(props: GalleryProps) {
        super(props);
        const activeIndex = props.items.findIndex(i => i.our_code === ( props.order!.activeElement || {})['id']); // tslint:disable-line
        this.state = {
            activeElementIndex: activeIndex === -1 ? 0 : activeIndex,
            previewElementIndex: 0,
            load: {
                success: null,
                error: null,
            },
            shownItem: this.shownItem,
            mouseOverElement: false,
        };
    }
    componentWillMount() {
        this.props.filterStore.loadFilters(services.shirtFilters);
    }
    get shownItem(): GalleryStoreItem {
        const {
            items,
            previewElement,
            activeElement,
            galleryStore,
            order: orderStore
        } = this.props;

        const {
            garment,
            subGroup: group,
            group: subGroup
        } = galleryStore;

        const previewVal = items.find(i => i.our_code === _.get(previewElement, 'value'));
        let item = previewVal;

        if (_.isEmpty(item)) {
            item = activeElement!;
        }

        if (_.isEmpty(item)) {
            const codeInOrder: string|null =
                _.get(orderStore, `order.${garment}[0].${group}.${subGroup}.our_code`, null);
            item = items.find(i => i.our_code === codeInOrder);
        }

        if (!_.isEmpty(item)) {
            item!.elementInfo = {
                garment: garment,
                group,
                subGroup
            };
        }
        return item!;
    }
    updateActiveElement = () => {
        const item = this.shownItem;
        if (_.isEmpty(item)) {
            return;
        }
        const { img_url_2d: imageUrl } = item;
        if (this.state.shownItem.our_code !== item.our_code) {
            this.setState({
                shownItem: item
            });
        }
        if (this.state.load.success === imageUrl) {
            return;
        }
        const image = new Image();
        image.src = imageUrl;
        image.onload = () => {
            this.setState({
                load: {
                    ...this.state.load,
                    success: imageUrl,
                },
            });
        };
        image.onerror = () => {
            this.setState({
                load: {
                    ...this.state.load,
                    error: 'no image provided',
                },
            });
        };
    }
    componentWillUpdate() {
        const item = this.shownItem;
        if (
            _.isEmpty(this.props.activeElement) && item ||
            !_.isEqual(
                _.get(this, 'props.activeElement.elementInfo'),
                _.get(item, 'elementInfo')
            )
        ) {
            this.props.setActiveOrderItem(item);
        } else {
            this.updateActiveElement();
        }
    }
    componentDidMount() {
        try {
            this.updateActiveElement();
        } catch (e) {
            this.setState({
                load: {
                    ...this.state.load,
                    error: e,
                },
            });
        }

    }
    setActiveElementIndex = (i: number, action: string = 'click', link = '' ) => () => {
        const elementInfo = {
            garment: this.props.galleryStore.garment,
            // TODO: разобраться с путаницей наименований
            group: this.props.galleryStore.subGroup,
            subGroup: this.props.galleryStore.group
        };
        if (action === 'click') {
            const {
                setActiveOrderItem,
                items,
            } = this.props;
            setActiveOrderItem({
                ...items[i],
                elementInfo
            });
        } else {
            if (action === 'enter') {
                this.props.setPreviewElement({
                    ...elementInfo,
                    value: this.props.items[i].our_code
                });
            } else {
                this.props.setPreviewElement(null);
            }
        }
        }
    mouseEnterElement = () => {
        this.setState({
            mouseOverElement: true,
        });
    }
    mouseLeaveElement = () => {
        this.setState({
            mouseOverElement: false,
        });
        this.props.setPreviewElement(null);
    }
    render() {
        const {
            items,
            lang,
            group
        } = this.props;

        if (!items.length) {
            this.state.load.error = 'empty';
            this.state.load.success = null;
            return null;
        }
        this.updateActiveElement();
        const item = this.state.shownItem;
        if (_.isEmpty(item)) {
            return null;
        }
        const title = item.title[lang];
        let description = item.description[lang];
        const descriptionSize = 153;
        if (description.length > descriptionSize) { 
        // if ((description) && (description.length > descriptionSize)) {  
        // если description == null, без проверки "if ((description) &&..." будет ошибка
        // в TS для description тип string указан, так что скорее всего лишнее
            description = description.substring(0, descriptionSize).trim() + '...';
        } 
        const {
            our_code: code,
            price,
            img_url_2d: image
        } = item;
        return (
            <div className={classnames('gallery', { 'gallery--colors': group === 'fabric' })}>
                <div className="gallery__prev-blc">
                    <div className="gallery__prev-wrap clearfix" id="js-gallery-wrap">
                        {group === 'fabric_ref' && <Controll />}
                        { !this.state.load.success && !this.state.load.error
                        ? <div
                            className="preloader"
                            style={{
                                background: 'rgba(0,0,0, .2)',
                                zIndex: 999999999,
                            }}
                        >
                        <div className="preloader__progbar">
                            <div className="preloader__progline loaded"/>
                        </div>
                        </div>
                        : this.state.load.success ?
                        <div className="gallery__img" id="js-gallery-img">
                            <img
                                src={image}
                                alt="gallery image"
                            />
                        </div>
                        : null
                         }
                        <GalleryBar
                            items={items}
                            shownItem={item}
                            setActiveElementIndex={this.setActiveElementIndex}
                            mouseEnter={this.mouseEnterElement}
                            mouseLeave={this.mouseLeaveElement}
                            isMouseOverElement={this.state.mouseOverElement}
                        />
                    </div>
                </div>
                <div className="gallery__footer">
                    <div className="gallery__footer-header">
                        <h2 className="gallery__footer--title">{title || 'title'}</h2>
                        <div className="gallery__footer--articul">₽{price.ru} / {code || 'code'}</div>
                    </div>
                    <div className="gallery__footer--txt">
                        <p className="gallery__footer--txt-clamp">
                            {    description ||
                                    'deafult description text'
                            }
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export {
    Gallery,
};
