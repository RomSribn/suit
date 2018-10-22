import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Route, Switch } from 'react-router';
import { SaveButton } from './SaveButton';
import { routes } from '../routes';
import { Button } from '../../../components/Button';
import { MutuallyExclusivePopup } from '../../../components/MutuallyExclusivePopup';
import { PopUp } from '../../../containers/Popup';
import { FadeIn } from '../../../containers/Transitions';
import { loc } from './loc';

import './styles.styl';

@inject(({ order, routing}) => ({
    orderStore: order,
    routing,
    setActiveItem: order.setActiveItem
}))
@observer
class FooterBar extends React.Component<FooterBarProps, { prevOrder?: Order }> {
    static defaultProps = {
        goBack: () => undefined,
        popOrderPathitem: () =>          undefined,
        lang: 'en',
        backLink: '',
    };
    componentDidMount() {
        const {
            orderStore
        } = this.props;
        console.warn('set prev order');
        this.setState({ prevOrder: JSON.parse(JSON.stringify(orderStore!.order) )});
    }
    onBackClick = () => {
        const {
            popOrderPathitem,
            orderStore,
            setActiveItem
        } = this.props;
        const {
            prevOrder
        } = this.state;
        console.warn('onBackClick');
        prevOrder && orderStore!.updateOrderInfo(prevOrder); // tslint:disable-line
        setActiveItem && setActiveItem(null); // tslint:disable-line
        popOrderPathitem!();
    }
    saveCallback = (linkToRedirect: string | undefined) => {
        const {
            popOrderPathitem,
            routing,
            orderStore
        } = this.props;
        routing.push(linkToRedirect);
        popOrderPathitem!();
        this.setState({ prevOrder: JSON.parse(JSON.stringify(orderStore!.order))});
        console.warn('set prev order saveCallback');
    }
    render() {
        const {
            lang,
            backLink,
            mutuallyExclusivePopup
        } = this.props;
        return (
            <div className="footer-btn-bar">
                <PopUp open={mutuallyExclusivePopup && mutuallyExclusivePopup!.show}>
                  {
                    mutuallyExclusivePopup && mutuallyExclusivePopup!.show ?
                    <MutuallyExclusivePopup lang={lang!} {...mutuallyExclusivePopup!} /> :
                    null
                  }
                </PopUp>

                <Route
                    path={routes.subgroupChoice}
                    exact={true}
                    component={() => {
                        return (
                            <Link
                                to={backLink!}
                                onClick={this.onBackClick}
                                style={{
                                    cursor: 'pointer',
                            }}
                            >
                                <Button theme="white" className="back-button">
                                    {loc[lang!].back}
                                </Button>
                            </Link>
                        );
                    }}
                />
                <Route
                    path={routes.garment}
                    exact={true}
                    component={() => {
                        return (
                            <span
                            >
                                <Button theme="white" className="back-button" disabled={true}>
                                    {loc[lang!].back}
                                </Button>
                            </span>
                        );
                    }}
                />
                <Switch>
                    <Route
                        path={routes.subgroupChoice}
                        component={(...props: any[]) => { // tslint:disable-line
                            return (
                                    <SaveButton
                                        {...props[0]}
                                        saveCallback={
                                            () => this.saveCallback(
                                                `${routes.details}/${props[0].match.params.garment}`
                                            )
                                        }
                                        isUpdate={true}
                                        lang={lang}
                                    >
                                        {loc[lang!].save}
                                    </SaveButton>
                            );
                        }}
                    />
                    <Route path={routes.details}>
                        {   this.props.orderId ?
                            <SaveButton
                                saveExistingOrder={true}
                            >
                                {loc[lang!].update}
                            </SaveButton> :
                            <FadeIn>
                                <SaveButton>{loc[lang!].create}</SaveButton>
                            </FadeIn>
                        }
                    </Route>
                </Switch>
            </div>
        );
    }
}

export {
    FooterBar,
};