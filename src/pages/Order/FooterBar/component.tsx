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
            backLink,
            hasOrder
        } = this.props;
        return (
            <div className="footer-btn-bar">
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
                            <SaveButton>{Boolean(hasOrder!) ? loc[lang!].save : loc[lang!].create}</SaveButton>
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