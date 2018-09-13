import * as React from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { SaveButton } from './SaveButton';
import { routes } from '../routes';
import { Button } from '../../../components/Button';
import { FadeIn } from '../../../containers/Transitions';
import { loc } from './loc';

import './styles.styl';

class FooterBar extends React.Component<FooterBarProps> {
    static defaultProps = {
        goBack: () => undefined,
        popOrderPathitem: () => undefined,
        lang: 'en',
        backLink: '',
    };
    onBackClick = () => {
        const {
            popOrderPathitem,
        } = this.props;
        popOrderPathitem!();
    }
    render() {
        const {
            lang,
            backLink
        } = this.props;
        return (
            <div className="footer-btn-bar">
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
                                <Link
                                    to={`${routes.details}/${props[0].match.params.garment}`}
                                    onClick={this.onBackClick}
                                >
                                    <SaveButton {...props[0]} isUpdate={true}>{loc[lang!].save}</SaveButton>
                                </Link>
                            );
                        }}
                    />
                    <Route path={routes.details}>
                        <FadeIn>
                            <SaveButton>{loc[lang!].create}</SaveButton>
                        </FadeIn>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export {
    FooterBar,
};