import * as React from 'react';
import * as classnames from 'classnames';
import * as _ from 'lodash';
import { services } from '../../../config/routes';
import { GalleryBar } from '../GalleryBar';

import { listeners, isLandscapeInitial, isMobile } from '../../../utils';

import './styles.styl';
import { updateOrder } from '../FooterBar/utils';
import { FadeIn } from '../../../containers/Transitions';

interface GalleryState extends ImageLoadState {
    activeElementIndex: number;
    previewElementIndex: number;
    mouseOverElement: boolean;
    isFooterVisible: boolean;
}
class Gallery extends React.PureComponent<GalleryProps, GalleryState> {
    private imageRef: React.RefObject<HTMLDivElement>;
    private galleryBarWrapperRef: React.RefObject<HTMLDivElement>;
    private galleryFooterRef: React.RefObject<HTMLDivElement>;
    private resizeSubscriptionIndex: number | null;
    private resizeCalled = false;
    constructor(props: GalleryProps) {
        super(props);
        const {
            match,
            items,
        } = this.props;
        let activeIndex;
        const orderStore = this.props.orderStore!;
        if (orderStore.activeElement && orderStore.activeElement!.our_code) {
            activeIndex = items.findIndex(i => i.our_code === (orderStore.activeElement && orderStore.activeElement!.our_code || '')); // tslint:disable-line
        } else {
            if (match) {
                const {
                    garment,
                    group,
                    subgroup } = match.params;
                const orderValue = orderStore.order;
                activeIndex = items.findIndex(i => i.our_code === (orderValue[garment][0][group][subgroup] && orderValue[garment][0][group][subgroup].our_code || '')); // tslint:disable-line
            }
        }
        this.imageRef = React.createRef();
        this.galleryBarWrapperRef = React.createRef();
        this.galleryFooterRef = React.createRef();
        this.resizeSubscriptionIndex = null;
        this.state = {
            activeElementIndex: (activeIndex === -1 || !activeIndex) ? 0 : activeIndex,
            previewElementIndex: 0,
            load: {
                success: null,
                error: null,
            },
            mouseOverElement: false,
            isFooterVisible: true,
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
            orderStore
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
            if (this.props.items[0]) {
                this.props.setActiveOrderItem(this.props.items[0]);
            }
            return;
        }
        const { img_url_2d: imageUrl } = item;
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
            }, () => {
                if (!this.resizeCalled) {
                    this.resizeCalled = true;
                    this.resizeHandler();
                }
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
    componentWillReceiveProps(nextProps: GalleryProps, nextState: GalleryState) {
        const item = this.shownItem;
        if (
            _.isEmpty(this.props.activeElement) && item ||
            !_.isEqual(
                _.get(nextProps, 'activeElement.elementInfo'),
                _.get(item, 'elementInfo')
            )
        ) {
            this.props.setActiveOrderItem(item);
        } else {
            this.updateActiveElement();
        }
    }

    componentWillUpdate(nextProps: Readonly<GalleryProps>, nextState: Readonly<GalleryState>) {
        if (this.state.load.success !== nextState.load.success) {
            setTimeout(() => {
                this.resizeHandler();
            }, 300);
        }
    }

    resizeHandler = () => {
        if (!this.galleryBarWrapperRef.current) {
            return;
        }

        const ref = this.imageRef.current;

        this.galleryBarWrapperRef.current.setAttribute(
            'style',
            isLandscapeInitial ?
                /** У элемента превью элемента есть отступ 5px */
                `width: calc(100% - ${(ref && ref.offsetHeight ? ref.offsetHeight + 7 : 0)}px);` : ''
            );

        if (ref) {
            ref.setAttribute('style', '');
            ref.setAttribute('style', `width: ${
                // Исключаем учет border-ов
                ref.offsetHeight > 7 ?
                    Math.max(ref.offsetHeight, this.galleryBarWrapperRef.current.offsetWidth) :
                    this.galleryBarWrapperRef.current.offsetWidth
                }px`);
        }

        this.galleryBarWrapperRef.current.setAttribute(
            'style',
            isLandscapeInitial ?
                /** У элемента превью элемента есть отступ 5px + 2 бордеры с обеих сторон по 1px */
                `width: calc(100% - ${(ref && ref.offsetWidth ? ref.offsetWidth + 7 : 0)}px);` :
                `height: calc(100% - ${
                    (ref ? ref.offsetHeight : 0) ? (this.galleryBarWrapperRef.current.offsetWidth + 10) : 0}px);`
            );
    }

    componentDidMount() {
        try {
            listeners.resize.subscribe(this.resizeHandler);
            this.resizeHandler();
            setTimeout(this.resizeHandler, 300);
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
    componentWillUnmount() {
        if (this.resizeSubscriptionIndex) {
            listeners.resize.unsubscribe(this.resizeSubscriptionIndex);
        }
    }
    setPreviewElementIndex = (elementIndex: number, action?: 'enter') => {
        const elementInfo = {
            garment: this.props.galleryStore.garment,
            // TODO: разобраться с путаницей наименований
            group: this.props.galleryStore.subGroup,
            subGroup: this.props.galleryStore.group
        };
        if (action === 'enter') {
            this.props.setPreviewElement({
                ...elementInfo,
                value: this.props.items[elementIndex].our_code
            });
        } else {
            this.props.setPreviewElement(null);
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
                match,
                orderStore
            } = this.props;
            const newOrderItem = {
                ...items[i],
                elementInfo
            };
            setActiveOrderItem(newOrderItem);
            if (match) {
                const {
                    garment,
                    group,
                    subgroup } = match.params;
                let newOrder = JSON.parse(JSON.stringify(orderStore!.order));
                if (!newOrder) {
                    newOrder = {};
                }
                newOrder[garment][0][group][subgroup] = {};
                newOrder[garment][0][group][subgroup].our_code = newOrderItem.our_code;
                newOrder[garment][0][group][subgroup].title = newOrderItem.title;
                orderStore!.updateOrderInfo(newOrder);
                const props = this.props;

                updateOrder({
                    match: props.match!,
                    Subgroups: props.Subgroups,
                    orderStore: props.orderStore!,
                });
            }
        }
    }

    showFooter = () => {
        this.setState({ isFooterVisible: true });
    }

    hideFooter = () => {
        this.setState({ isFooterVisible: false });
    }

    render() {
        const {
            items,
            lang,
            group
        } = this.props;
        const {
            activeElementIndex,
            load,
            mouseOverElement
        } = this.state;

        if (!items.length) {
            load.error = 'empty';
            load.success = null;
            return null;
        }
        const item = this.shownItem;
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
            price,
            our_code: code,
        } = item;
        return (
            <div className={classnames('gallery', { 'gallery--colors': group === 'fabric_ref' })}>
                <div className="gallery__prev-blc">
                    <div className="gallery__prev-wrap clearfix" id="js-gallery-wrap">
                        <div ref={this.galleryBarWrapperRef} className="gallery__bar-wrapper">
                            <GalleryBar
                                items={items}
                                shownItem={item}
                                activeElementIndex={activeElementIndex}
                                setActiveElementIndex={this.setActiveElementIndex}
                                setPreviewElementIndex={this.setPreviewElementIndex}
                                isMouseOverElement={mouseOverElement}
                                galleryFooterRef={this.galleryFooterRef}
                                showFooter={this.showFooter}
                                hideFooter={this.hideFooter}
                            />
                        </div>
                    </div>
                </div>
                <FadeIn>
                    {this.state.isFooterVisible && (
                        <div className="gallery__footer" ref={this.galleryFooterRef}>
                            <div className="gallery__footer-header">
                                <h2 className="gallery__footer--title">{title || 'title'}</h2>
                                {!isMobile() &&
                                <div className="gallery__footer--articul">₽{price.ru}{code && (' / ' + code)}</div>
                                }
                            </div>
                            <div className="gallery__footer--txt">
                                <p className="gallery__footer--txt-clamp">
                                    {    description ||
                                    'deafult description text'
                                    }
                                </p>
                            </div>
                        </div>
                    )}
                </FadeIn>
            </div>
        );
    }
}

export {
    Gallery,
};
