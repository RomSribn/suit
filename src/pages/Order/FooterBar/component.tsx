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

import './styles.styl';

type Props = FooterBarProps & { orderStore: IOrderStore };

class FooterBar extends React.Component<Props> {
    static defaultProps = {
        goBack: () => undefined,
        popOrderPathitem: () => undefined,
        lang: 'en',
        backLink: '',
    };

    onBackClick = () => {
        const {
            popOrderPathitem
        } = this.props;
        const orderStore = this.props.orderStore!;
        const { setActiveItem } = orderStore;
        setActiveItem(null);
        popOrderPathitem!();
    }
    saveCallback = (linkToRedirect: string | undefined) => {
        const {
            popOrderPathitem,
            routing
        } = this.props;
        routing.push(linkToRedirect);
        popOrderPathitem!();
    }
    render() {
        const {
            lang,
            backLink = '',
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

                <Switch>
                    <Route
                        path={routes.garment}
                        component={() => {
                            return (
                                <Link
                                    to={backLink}
                                >
                                    <Button
                                        theme="white"
                                        className="back-button"
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
                                    >
                                        {loc[lang!].save}
                                    </SaveButton>
                                </Link>
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