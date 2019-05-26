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
                    <Route
                        path={routes.details}
                        component={() => {
                            return (
                                <span>
                                    <Button
                                        theme="white"
                                        className="back-button"
                                        disabled={true}
                                    >
                                        {loc[lang!].back}
                                    </Button>
                                </span>
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

                            const currentData = JSON.parse(JSON.stringify(this.props.subgroupsStore!.data));

                            let link = `${routes.details}/shirt`;

                            if (group === 'fabric_ref') {
                                link = `${link}/design/${currentData.design[0].subsection_our_code}`;
                            }

                            if (group === 'design') {
                                let currentIndex =
                                    (currentData.design as Subgroup[])
                                        .findIndex(item => item.subsection_our_code === subGroup);
                                if (currentData.design[currentIndex + 1]) {
                                    link = `${link}/design/${currentData.design[currentIndex + 1].subsection_our_code}`;
                                } else {
                                    link = `${link}/fitting/fitting`;
                                }
                            }
                            if (group) {
                                link = `${link}`;
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
                        <Link
                            to={backLink}
                        >
                            <Button theme="black">
                                {loc[lang!].done}
                            </Button>
                        </Link>
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