import * as React from 'react';
import * as classnames from 'classnames';
// import { loc } from './loc';
// import { API_ROOT } from '../../../config/routes';
import { Controll } from '../Filter';
import { GalleryBar } from '../GalleryBar';

// TODO import API_ROOT from the common config
const API_ROOT = 'http://194.87.239.90';
interface GalleryState extends ImageLoadState {
    activeElementIndex: number;
    previewElementIndex: number;
    mouseOverElement: boolean;
}
class Gallery extends React.PureComponent<GalleryProps, GalleryState> {
    constructor(props: GalleryProps) {
        super(props);
        const activeIndex = props.items.findIndex(i => i.id === ( props.order!.activeElement || {})['id']); // tslint:disable-line
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
    componentDidMount() {
        try {
            const item = this.props.items[
                this.state.previewElementIndex === -1
                    ? this.state.activeElementIndex
                    : this.state.previewElementIndex
            ];
            const { image_url_2d, id } = item;
            const imageUrl =
                API_ROOT +
                `${image_url_2d![0]}` +
                `${id}` + '.' +
                `${image_url_2d![0].split('/')[5] === 'fabric' ? 'png' : 'svg'}`;
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
        if (action === 'click') {
            this.setState({
                activeElementIndex: i,
            });
            const {
                setActiveOrderItem,
                items,
            } = this.props;
            setActiveOrderItem(items[i]);
        } else {
            this.setState({
                previewElementIndex: i,
            });
            if (action === 'enter') {
                // this.mouseEnterElement(this.props.items[i].id);
                this.props.setPreviewElement({
                    garment: this.props.galleryStore.garment,
                    group: this.props.galleryStore.group,
                    subGroup: this.props.galleryStore.subGroup,
                    value: this.props.items[i].id,
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
        // debugger // tslint:disable-line
    }
    mouseLeaveElement = () => {
        this.setState({
            mouseOverElement: false,
        });
        this.props.setPreviewElement(null);
    }
    render() {
        const {
            items: _items,
            lang,
            group,
        } = this.props;
        const items = _items
            .filter(i => i.image_url_2d && i.image_url_2d[0]);
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
        const title = item[`title_${lang}`];
        const description = item[`description_${lang}`];
        const {
            code,
            price,
            image_url_2d,
            id,
        } = item;
        const image = image_url_2d
            ?   `${API_ROOT}` +
                `${image_url_2d[0]}` +
                `${id}` + '.' +
                `${image_url_2d[0].split('/')[5] === 'fabric' ? 'png' : 'svg'}`
            : undefined;
        return (
            <div className={classnames('gallery', { 'gallery--colors': group === 'fabric' })}>
                <div className="gallery__prev-blc">
                    <div className="gallery__prev-wrap clearfix" id="js-gallery-wrap">
                        {group === 'model' && <Controll />}
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
                        <div className="gallery__footer--articul">₽{price || 99} / {code || 'code'}</div>
                    </div>
                    <div className="gallery__footer--txt">
                       {    description ||
                            `Redo 1194 ткань произведена во Франции.
                            в провинции Цифрон. Плотность, плетение s120 во Франции.`
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
