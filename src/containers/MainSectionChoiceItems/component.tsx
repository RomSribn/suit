import * as React from 'react';
import * as classNames from 'classnames';
import {  Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TRANSITION_DUARAION } from '../../config/constants';

interface CommonProps {
    children?: React.ReactNode;
    clearClick: (...args: any[]) => (...args: any[]) => void; // tslint:disable-line no-any
    item: SubgroupChoiceItem;
    noCursorPointer?: boolean;
}
const Common = (props: CommonProps) => {
    const {
        item,
        clearClick,
        noCursorPointer
    } = props;

    return (
        <div className={classNames('custom', { 'custom__no-pointer': noCursorPointer})}>
            <span className="custom__content">
                <span
                    className="custom__name"
                    style={{
                        color: 'black',
                    }}
                >
                    {item.linkName} {!!item.status && ':'}
                </span>
                {/* <span className="custom__status">{item.status}</span> */}
                <span className="custom__status">{props.children}</span>

            </span>
            <span title="clear" className="custom__control">
                <Switch>
                    <Route
                        exact={true}
                        path="/order/details"
                    />
                    <Route
                        path="/order/details/:garment"
                        component={(...args: any[]) => { // tslint:disable-line no-any
                            const garment = args[0].match.params.garment;
                            return item.isSubclear !== null ?
                            <span onClick={clearClick(garment, item.id!)}>clear</span> :
                            null;
                        }}
                    />
                </Switch>
            </span>
        </div>
    );
};

interface LinkProps {
    item: SubgroupChoiceItem;
    onClick: (...args: any[]) => (...args: any[]) => void; // tslint:disable-line no-any    
    clearClick: (...args: any[]) => (...args: any[]) => void; // tslint:disable-line no-any
    
    basicRoute: string;
}
class CustomLink extends React.PureComponent<LinkProps> {
    render () {
        const {
            item,
            basicRoute,
            onClick,
            clearClick
        } = this.props;
        return (
        <Link
            to={`${basicRoute}/${item.link}`}
            onClick={onClick({
                value: item.linkName,
                link: `${basicRoute}/${item.link}`})}
            key={item.id}
            style={{
                marginBottom: '1.333rem',
                display: 'block',
            }}
        >
            <Common item={item} clearClick={clearClick} >
                {item.status}
            </Common>
        </Link>
        );
    }
}
interface InputProps {
    item: SubgroupChoiceItem;
    clearClick: (...args: any[]) => (...args: any[]) => void; // tslint:disable-line no-any    
}
class CustomInput extends React.PureComponent<InputProps, {text: string}> {
    constructor(props: InputProps) {
        super(props);
    }
    render() {
        return (
            <Common item={this.props.item} clearClick={this.props.clearClick} noCursorPointer={true}>
                <input type="text" maxLength={8} placeholder="не выбрано" />
            </Common>
        );
    }
}

class ChoiceItems extends React.PureComponent<ChoiceItemsProps> {
    static defaultProps = {
        items: [],
        basicRoute: '/',
        pushOrderPathitem: () => undefined,
    };
    onClick = (item: OrderPathItem) => () => {
        const { pushOrderPathItem } = this.props;
        pushOrderPathItem!(item);
    }
    clearClick = (garment: string, element: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        const orderStore = this.props.orderStore!;
        orderStore.clearElement(garment, element);
    }

    render() {
        const {
            items,
            basicRoute,
        } = this.props;
        return (
        <ReactCSSTransitionGroup
            transitionName="height-fade-in"
            transitionEnterTimeout={TRANSITION_DUARAION}
            transitionLeaveTimeout={TRANSITION_DUARAION}
        >
            {items.map(
            (item: SubgroupChoiceItem) => (
                    item.isInput ? 
                    <CustomInput
                        item={item}
                        clearClick={this.clearClick}
                    /> :
                    <CustomLink
                        basicRoute={basicRoute}
                        item={item}
                        onClick={this.onClick}
                        clearClick={this.clearClick}
                    />
                )
        )}
        </ReactCSSTransitionGroup>
        );

    }
}

export {
    ChoiceItems,
};