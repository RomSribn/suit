import * as React from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { SaveButton } from './SaveButton';
import { routes } from '../routes';
import { Button } from '../../../components/Button';
import { MutuallyExclusivePopup } from '../../../components/MutuallyExclusivePopup';
import { PopUp } from '../../../containers/Popup';
import { FadeIn } from '../../../containers/Transitions';
import { loc } from './loc';
import { updateOrder } from './utils';

import './styles.styl';
import { FooterBarProps } from './typings';

type Props = FooterBarProps & { orderStore: IOrderStore };

class FooterBar extends React.Component<Props> {
    static defaultProps = {
        goBack: () => undefined,
        popOrderPathitem: () => undefined,
        lang: 'en',
        backLink: '',
    };

    onBackClick = () => {
        const props = this.props;
        const { setActiveItem } = props.orderStore;
        setActiveItem(null);
        props.popOrderPathitem!();
    }
    saveCallback = (linkToRedirect: string | undefined) => {
        const {
            popOrderPathitem,
            routing
        } = this.props;
        routing.push(linkToRedirect);
        popOrderPathitem!();
    }

    handleSetOrder = (
        orderStore: IOrderStore,
        newValue: Order,
        garment: string,
        subgroup: string,
        subgroupData: Subgroup
      ) => {
        orderStore.setOrder(
          newValue,
          {
            [garment]: {
              [subgroup]: {
                exceptions: orderStore.activeElement!.exception,
                titleSubGroup: subgroupData.title!,
                titleElement: orderStore.activeElement!.title,
                is_item_clear: orderStore.activeElement!.is_item_clear
              }
            }
          }
        );
      }

    handleExclsuive = (
        isRemovable: boolean,
        exceptionsForPopup: {
          garmentKey: string,
          elementKey: string,
        }[],
        orderStore: IOrderStore,
        newValue: Order,
        garment: string,
        subgroup: string,
        subgroupData: Subgroup
      ) => {
        if (isRemovable) {
          exceptionsForPopup.forEach(exceptionForPopup => {
            const { garmentKey, elementKey } = exceptionForPopup;
            orderStore.clearException(garmentKey, elementKey, 'default');
            orderStore.clearElement(garmentKey, elementKey, 'default');
          });
        } else {
          exceptionsForPopup.forEach(exceptionForPopup => {
            const { garmentKey, elementKey } = exceptionForPopup;
            orderStore.clearException(garmentKey, elementKey, 'default');
          });
        }
        this.handleSetOrder(orderStore!, newValue, garment, subgroup, subgroupData);
        orderStore.setMutuallyExclusivePopup!({ show: false });
      }

    render() {
        const {
            lang,
            backLink = '',
            mutuallyExclusivePopup
        } = this.props;
        return (
            <div className="footer-btn-bar footer-btn-bar__mobile">
                <PopUp open={mutuallyExclusivePopup && mutuallyExclusivePopup!.show}>
                  {
                    mutuallyExclusivePopup && mutuallyExclusivePopup!.show ?
                    <MutuallyExclusivePopup lang={lang!} {...mutuallyExclusivePopup!} /> :
                    null
                  }
                </PopUp>

                <Switch>
                    <Route
                        path={routes.subgroupChoice}
                        component={(...args: any[]) => { // tslint:disable-line
                            return (
                                <Link
                                    to={backLink}
                                >
                                    <Button
                                        theme="white"
                                        className="back-button"
                                        onClick={() => {
                                            updateOrder({
                                                match: args[0].match,
                                                Subgroups: this.props.Subgroups,
                                                orderStore: this.props.orderStore,
                                                setOrderCallback: this.handleSetOrder,
                                                handleExclsuiveCallback: this.handleExclsuive,
                                            });
                                            this.onBackClick();
                                        }}
                                    >
                                        {loc[lang!].back}
                                    </Button>
                                </Link>
                            );
                        }}
                    />
                    <Route path={routes.garment}>
                        <Link to={backLink}>
                            <Button
                                theme="white"
                                className="back-button"
                            >
                                {loc[lang!].back}
                            </Button>
                        </Link>
                    </Route>
                    <Route
                        path={routes.details}
                        component={() => {
                            return (
                                <a href={process.env.BASE_SERVICE_LINK || '#'}>
                                    <Button
                                        theme="white"
                                        className="back-button"
                                    >
                                        {loc[lang!].back}
                                    </Button>
                                </a>
                            );
                        }}
                    />
                </Switch>

                <Switch>
                    <Route
                        path={routes.subgroupChoice}
                        component={(...props: any[]) => { // tslint:disable-line
                            const group: string = props[0].match.params.group;
                            const subGroup: string = props[0].match.params.subgroup;
                            const garment: string = props[0].match.params.garment;

                            const currentData = JSON.parse(JSON.stringify(this.props.subgroupsStore!.data));

                            let link = `${routes.details}/${garment}`;

                            if (group === 'fabric_ref') {
                                link = `${link}/design/${currentData.design[0].subsection_our_code}`;
                            }

                            if (group === 'design') {
                                let currentIndex =
                                    (currentData.design as Subgroup[])
                                        .findIndex(item => item.subsection_our_code === subGroup);
                                if (currentData.design[currentIndex + 1]) {
                                    try {
                                        const checkedValue: string = this.props.orderStore!.activeElement!.our_code;
                                        if (currentData.design[currentIndex + 1]
                                            .items
                                            // tslint:disable-next-line
                                            .every((item: any) => item.exception.includes(checkedValue))
                                        ) {
                                            if (currentData.design[currentIndex + 2]) {
                                                link =
                                                    `${link}/design/` +
                                                    `${currentData.design[currentIndex + 2].subsection_our_code}`;
                                            } else {
                                                link = `${link}/fitting/fitting`;
                                            }
                                        } else {
                                            link =
                                                `${link}/design/` +
                                                `${currentData.design[currentIndex + 1].subsection_our_code}`;
                                        }
                                    } catch (_) {
                                        link =
                                            `${link}/design/` +
                                            `${currentData.design[currentIndex + 1].subsection_our_code}`;
                                    }
                                    }
                            } else {
                                link = `${link}/fitting/fitting`;
                            }

                            if (link.includes('/fitting/fitting')) {
                                link = `/order/details/${garment}`;
                            }

                            return (
                                <Link
                                    to={`${routes.details}/${props[0].match.params.garment}`}
                                    onClick={this.onBackClick}
                                >
                                    <SaveButton
                                        {...props[0]}
                                        saveCallback={
                                            () => {
                                                this.saveCallback(
                                                    `${routes.details}/${props[0].match.params.garment}`
                                                );
                                            }
                                        }
                                        isUpdate={true}
                                        lang={lang}
                                        link={link}
                                    >
                                        {loc[lang!].save}
                                    </SaveButton>
                                </Link>
                            );
                        }}
                    />
                    <Route path={routes.garment}>
                        <SaveButton>{loc[lang!].create}</SaveButton>
                    </Route>

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
