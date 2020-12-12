import * as React from 'react';
import * as classnames from 'classnames';
import { isMobile, isLandscape } from '../../../utils';

interface Props {
    item: GalleryStoreItem;
    lang: string;
    initialValue?: number;
    setFitting: (value: number) => void;
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

    onBlur = () => {
        const props =  this.props;
        const state = this.state;
        if (state.valid && state.value) {
            props.setFitting(Number(state.value));
        }
    }

    constructor(props: Props) {
        super(props);
        if (props.initialValue) {
            this.state = {
                valid: true,
                value: props.initialValue.toString(),
            };
        } else {
            this.state = {
                valid: false,
                value: '',
            };
        }
    }
    render () {
        const {
            item,
            lang,
        } = this.props;
        const title = isMobile() && !isLandscape() && item.title[lang].length > 11 ?
            item.title[lang].slice(0, 10) + '...'
            : item.title[lang];
        
        return (
            <label className="size">
                <span
                    className={classnames(
                        'size__wrap',
                        { valid: this.state.valid }
                    )}
                >
                    <span className="size__name">{title}</span>
                    <input
                        className="size__input"
                        type="text"
                        value={this.state.value}
                        onChange={this.focuseOnLabel}
                        onBlur={this.onBlur}
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
            </label>
        );
    }
}

class Fitting extends React.PureComponent<FittingProps> {
    render() {
        const { items, lang, orderStore } = this.props;
        const setFitting = (id: string) => (value: number) => {orderStore!.setFitting('shirt', {id, value}); };
        return (
            <>
            <div className={'design-navigation-wrapper'}>
                <a href="/random" className={'design-navigation'}>Все</a>
                <a href="/random" className={'design-navigation _active'}>Тело</a>
                <a href="/random" className={'design-navigation'}>Альтерации</a>
            </div>
            <div className="sizes__wrap sizes">
            {items.map(
                item => (
                    <FittingItem 
                        item={item}
                        key={item.our_code}
                        lang={lang}
                        initialValue={orderStore!.getFitting('shirt')(item.our_code)}
                        setFitting={setFitting(item.our_code)}
                    />
                )
            )}
            </div>
            </>);
    }
}

export {
    Fitting,
};
