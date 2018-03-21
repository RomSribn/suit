import * as React from 'react';

interface Props {
    item: GalleryStoreItem;
    lang: string;
}
const FittingItem = (props: Props) => {
    const {
        item,
        lang,
    } = props;
    return (
        <label className="size">
            <span className="size__wrap">
                <span className="size__name">{item[`title_${lang}`]}</span>
                <input className="size__input" type="text" /> 
                <span className="size__output-lines-group">
                    <span className="size__output-line size__output-line--1" />
                    <span className="size__output-line size__output-line--2"/>
                    <span className="size__output-line size__output-line--3" />
                </span>
                <span className="size__color-elem"/>
            </span>
            <span className="size__units">см</span>
        </label>
    );
};

class Fitting extends React.PureComponent<FittingProps> {
    render() {
        const { items, lang } = this.props;
        return (
            <div className="sizes__wrap">
            {items.map(i => <FittingItem item={i} key={i.id} lang={lang} />)}
            </div>);
    }
}

export {
    Fitting,
};
