import * as React from 'react';
import * as classNames from 'classnames';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TRANSITION_DUARAION } from '../../config/constants';
import { loc } from './loc';
import { isMobile, isLandscape } from '../../utils';

interface CommonProps {
    children?: React.ReactNode;
    clearClick: (...args: any[]) => (...args: any[]) => void; // tslint:disable-line no-any
    item: SubgroupChoiceItem;
    noCursorPointer?: boolean;
    lang: string | undefined;
    visitedChoiceItems?: string[];
}

const Common = (props: CommonProps) => {
    const {
        item,
        clearClick,
        noCursorPointer,
        lang = 'en',
        visitedChoiceItems,
    } = props;

    const renderClearButton = (choiceItem: SubgroupChoiceItem) => {
        switch (choiceItem.id) {
            case 'initials_text':
                return choiceItem.status && typeof choiceItem.status === 'string'
                    && choiceItem.status !== loc[lang].noStatus;
            default:
                return choiceItem.isSubclear !== null &&
                    choiceItem.ourCode && choiceItem.ourCode !== choiceItem.defaultCode;
        }
    };

    const showVerticalBar = (choiceItem: SubgroupChoiceItem) => {
        switch (choiceItem.id) {
            case 'initials_text':
                return choiceItem.status && typeof choiceItem.status === 'string'
                    && choiceItem.status !== loc[lang].noStatus;
            default:
                return visitedChoiceItems && visitedChoiceItems.includes(item.id);

        }
    };

    const commonClasses = classNames(
        'custom', '_design',
        {
            'custom__no-pointer': noCursorPointer,
            'custom--chosen': showVerticalBar(item),
        }
    );

    return (
        <div className={commonClasses}>
            <span className="custom__content">
                <span
                    className="custom__name"
                    style={{
                        color: 'black',
                    }}
                >
                    {`${item.linkName}${!!item.status ? ':' : ''}`}
                </span>
                <span className="custom__status">{props.children}</span>

            </span>
            {
                !noCursorPointer ?
                    <span className="custom__control">
                        <Switch>
                            <Route
                                exact={true}
                                path="/order/details"
                            />
                            <Route
                                path="/order/details/:garment"
                                component={(...args: any[]) => { // tslint:disable-line no-any
                                    const garment = args[0].match.params.garment;
                                    // TODO: check the structure for intials_text
                                    return renderClearButton(item) && !isMobile() ?
                                        <span onClick={clearClick(garment, item.id!)}>{loc[lang!].clear}</span> :
                                        null;
                                }}
                            />
                        </Switch>
                    </span>
                    : null
            }
        </div>
    );
};

interface LinkProps {
    item: SubgroupChoiceItem;
    onClick: (...args: any[]) => (...args: any[]) => void; // tslint:disable-line no-any
    clearClick: (...args: any[]) => (...args: any[]) => void; // tslint:disable-line no-any
    basicRoute: string;
    lang?: string;
    visitedChoiceItems?: string[];
}
class CustomLink extends React.PureComponent<LinkProps> {

    render() {
        const {
            item,
            basicRoute,
            onClick,
            clearClick,
            lang,
            visitedChoiceItems,
        } = this.props;
        const status = isMobile() && !isLandscape() && item.status && item.status!.length > 13
            ? item.status!.slice(0, 10) + '...'
            : item.status;
        return (
            <Link
                to={`${basicRoute}/${item.link}`}
                onClick={onClick({
                    value: item.linkName,
                    link: `${basicRoute}/${item.link}`,
                    id: item.id,
                })}
                key={item.id}
                style={{
                    marginBottom: '1.333rem',
                    display: 'block',
                }}
            >
                <Common
                    lang={lang}
                    item={item}
                    clearClick={clearClick}
                    visitedChoiceItems={visitedChoiceItems}
                >
                    {status}
                </Common>
            </Link>
        );
    }
}
interface InputProps {
    item: SubgroupChoiceItem;
    orderStore: IOrderStore;
    clearClick: (...args: any[]) => (...args: any[]) => void; // tslint:disable-line no-any
    lang?: string;
}
class CustomInput extends React.PureComponent<InputProps> {
    input: React.RefObject<HTMLInputElement>;
    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.props.orderStore.setShirtInitials(e.target.value || '');
    }
    save = () => {
        const {
            orderStore
        } = this.props;
        if (orderStore.orderInfo && orderStore.orderInfo.orderId) {
            this.props.orderStore.saveOrder();
        }
    }

    onFocus = () => {
        const {
            orderStore
        } = this.props;
        orderStore.setActiveItem(
            {
                // tslint:disable-next-line
                our_code: orderStore.order.shirt[0].design['initials_arrangement'].our_code
            } as GalleryStoreItem
        );
    }

    onBLur = () => {
        this.props.orderStore.setActiveItem(null);
        this.save();
    }

    render() {
        const {
            lang,
            item,
            clearClick,
        } = this.props;
        return (
            <Common
                item={item}
                clearClick={clearClick}
                noCursorPointer={true}
                lang={lang}
            >
                <input
                    type="text"
                    maxLength={8}
                    placeholder={loc[lang!].noStatus}
                    value={item.status}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBLur}
                    ref={this.input}
                />
            </Common>
        );
    }
}

class ChoiceItems extends React.PureComponent<ChoiceItemsProps> {
    static defaultProps = {
        items: [],
        basicRoute: '/',
        pushOrderPathitem: () => undefined,
        addVisitedChoiceItem: () => undefined,
        removeVisitedChoiceItem: () => undefined,
    };
    onClick = (nextOrderPath: OrderPathItem) => () => {
        if (nextOrderPath.id) {
            this.props.addVisitedChoiceItem!(nextOrderPath.id);
        }
        this.props.pushOrderPathItem!(nextOrderPath);
    }
    clearClick = (garment: string, element: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.removeVisitedChoiceItem!(element);
        const orderStore = this.props.orderStore!;
        orderStore.clearException(garment, element, 'click');
        orderStore.clearElement(garment, element, 'click');
        orderStore.setActiveItem(null);
        orderStore.setOrderDummyParams(['shirt', 'jacket', 'pants']);
    }

    render() {
        const {
            items,
            basicRoute,
            lang,
            visitedChoiceItems,
        } = this.props;
        return (
            <ReactCSSTransitionGroup
                transitionName="height-fade-in"
                transitionEnterTimeout={TRANSITION_DUARAION}
                transitionLeaveTimeout={TRANSITION_DUARAION}
                className={'design-items-wrapper'}
            >
                {items.map(
                    (item: SubgroupChoiceItem) => (
                        item.isInput ?
                            <CustomInput
                                lang={lang}
                                item={item}
                                clearClick={this.clearClick}
                                orderStore={this.props.orderStore!}
                                key={`custom-input-${item.id}`}
                            /> :
                            <CustomLink
                                lang={lang}
                                basicRoute={basicRoute}
                                item={
                                    {
                                        ...item,
                                        linkName: lang &&
                                            loc[lang].garments[item.linkName.toLowerCase()] || item.linkName
                                    }
                                }
                                onClick={this.onClick}
                                clearClick={this.clearClick}
                                key={`custom-link-${item.id}`}
                                visitedChoiceItems={visitedChoiceItems}
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
