import * as React from 'react';
// import { loc } from './loc';
// import { API_ROOT } from '../../../config/routes';
import { GalleryBar } from '../GalleryBar';

// TODO import API_ROOT from the common config
const API_ROOT = 'http://194.87.239.90';
interface GalleryState extends ImageLoadState {
    activeElementIndex: number;
    previewElementIndex: number;
}
class Gallery extends React.PureComponent<GalleryProps, GalleryState> {
    static galleryImageStyle = {
        display: 'block',
        width: 315,
        maxWidth: '50%',
        height: 315,
    };
    constructor(props: GalleryProps) {
        super(props);
        this.state = {
            activeElementIndex: 0,
            previewElementIndex: 0,    
            load: {
                success: null,
                error: null,
            },
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
        } catch (e) {
            this.setState({
                load: {
                    ...this.state.load,
                    error: e,
                },
            });
        }

    }
    setActiveElementIndex = (i: number, action: string = 'click') => () => {
        if (action === 'click') {
            this.setState({
                activeElementIndex: i,
            });
        } else {
            this.setState({
                previewElementIndex: i,
            });
        }
    }
    render() {
        const {
            items: _items,
            lang,
        } = this.props;
        const items = _items
            .filter(i => i.image_url_2d && i.image_url_2d[0]);
        if (!items.length) {
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
            <div className="gallery">
                <div className="gallery__prev-blc">
                    <div className="gallery__prev-wrap clearfix">
                        <div className="gallery__img" style={Gallery.galleryImageStyle}>
                            {   this.state.load.success
                                ? <img
                                    src={image}
                                    alt="gallery image"
                                />
                                : null
                            }
                        </div>
                        <GalleryBar
                            items={items}
                            setActiveElementIndex={this.setActiveElementIndex}
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
