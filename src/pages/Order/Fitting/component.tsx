import * as React from 'react';
import * as classnames from 'classnames';

interface Props {
    item: GalleryStoreItem;
    lang: string;
}
type State = {
    valid: boolean;
    value: string;
};
class FittingItem extends React.PureComponent<Props, State> {
    static Ftest (val: string): boolean {
        return !val.replace(/\d*\.?\d*/, '').length;
    }
    focuseOnLabel = (e: React.ChangeEvent<any>) => { // tslint:disable-line
        const input = e.target;
        const val = input.value.trim();
        if (val && FittingItem.Ftest(val)) {
            this.setState({
                valid: true,
                value: val,
            });
        } else {
            if (!val) {
                this.setState({
                    valid: false,
                    value: '',
                });
            }
        }
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            valid: false,
            value: '',
        };
    }
    render () {
    const {
        item,
        lang,
    } = this.props;
    return (
        <label className="size">
            <span
                className={classnames(
                    'size__wrap',
                    { valid: this.state.valid }
                )}
            >
                <span className="size__name">{item[`title_${lang}`]}</span>
                <input
                    className="size__input"
                    type="text"
                    value={this.state.value}
                    onChange={this.focuseOnLabel}
                    onInput={(e: any) => { e.preventDefault(); }}  // tslint:disable-line
                /> 
                <span className="size__output-lines-group">
                    <span className="size__output-line size__output-line--1" />
                    <span className="size__output-line size__output-line--2"/>
                    <span className="size__output-line size__output-line--3" />
                </span>
                <span className="size__color-elem"/>
            </span>
            <span className="size__units">см</span>
        </label>);
    }
}

class Fitting extends React.PureComponent<FittingProps> {
    render() {
        const { items, lang } = this.props;
        return (
            <div className="sizes__wrap sizes">
            {items.map(i => <FittingItem item={i} key={i.id} lang={lang} />)}
            </div>);
    }
}

export {
    Fitting,
};
