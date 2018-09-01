import * as React from 'react';
import * as classnames from 'classnames';
// import { loc } from './loc';
import { services } from '../../../config/routes';
import { Controll } from '../Filter';
import { GalleryBar } from '../GalleryBar';

interface GalleryState extends ImageLoadState {
    activeElementIndex: number;
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
            mouseOverElement: false,
        };
    }
    componentWillMount() {
        this.props.filterStore.loadFilters(services.shirtFilters);
    }
    componentDidMount() {
        try {
            if (this.props.items.length) {
                this.setActiveElementIndex(
                    this.state.activeElementIndex &&
                    this.state.activeElementIndex > -1 ?
                    this.state.activeElementIndex :
                    0)
                    ();
            }
            const item = this.props.items[
                this.state.previewElementIndex === -1
                    ? this.state.activeElementIndex
                    : this.state.previewElementIndex
            ];
            const { img_url_2d: imageUrl } = item;
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
            group: this.props.galleryStore.group,
            subGroup: this.props.galleryStore.subGroup
        };
        if (action === 'click') {
            this.setState({
                activeElementIndex: i,
            });
            const {
                setActiveOrderItem,
                items,
            } = this.props;
            setActiveOrderItem({
                ...items[i],
                elementInfo
            });
        } else {
            this.setState({
                previewElementIndex: i,
            });
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
            group,
        } = this.props;

        if (!items.length) {
            this.state.load.error = 'empty';
            this.state.load.success = null;
            return null;
        }
        const item = items[
            this.state.previewElementIndex === -1
                ? this.state.activeElementIndex
                : this.state.previewElementIndex
        ];
        const title = item.title[lang];
        const description = item.description[lang];
        const {
            our_code: code,
            price,
            img_url_2d: image
        } = item;
        return (
            <div className={classnames('gallery', { 'gallery--colors': group === 'fabric' })}>
                <div className="gallery__prev-blc">
                    <div className="gallery__prev-wrap clearfix" id="js-gallery-wrap">
                        {group === 'fabric' && <Controll />}
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
                            activeElementIndex={this.state.activeElementIndex}
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
                       {    description ||
                            'deafult description text'
                       }
                    </div>
                </div>
            </div>
        );
    }
}

export {
    Gallery,
};
