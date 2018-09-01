import * as React from 'react';
import {  Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TRANSITION_DUARAION } from '../../config/constants';

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
                    <Link
                        to={`${basicRoute}/${item.link}`}
                        onClick={this.onClick({
                            value: item.linkName,
                            link: `${basicRoute}/${item.link}`})}
                        key={item.id}
                        style={{
                            marginBottom: '1.333rem',
                            display: 'block',
                        }}
                    >
                    <div className="custom">
                        <span className="custom__content">
                            <span
                                className="custom__name"
                                style={{
                                    color: 'black',
                                }}
                            >
                                {item.linkName} {!!item.status && ':'}
                            </span>
                            <span className="custom__status">{item.status}</span>
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
                                        <span onClick={this.clearClick(garment, item.id!)}>clear</span> :
                                        null;
                                    }}
                                />
                            </Switch>
                        </span>
                    </div>
                    </Link>
                )
        )}
        </ReactCSSTransitionGroup>
        );

    }
}

export {
    ChoiceItems,
};