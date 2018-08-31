import * as React from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { FadeIn } from '../../../containers/Transitions';
import { SaveButton } from './SaveButton';
import { loc } from './loc';

class FooterBar extends React.PureComponent<FooterBarProps> {
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
                    className="footer-btn-bar__white"
                    onClick={this.onBackClick}
                    style={{
                        cursor: 'pointer',
                    }}
                >
                    {loc[lang!].back}
                    <div className="footer-btn-bar__white-frame">
                        <svg width="100%" height="100%">
                            <rect
                                className="footer-btn-bar__white-rect footer-btn-bar__white-rect--1"
                                width="100%"
                                height="100%"
                            />
                            <rect
                                className="footer-btn-bar__white-rect footer-btn-bar__white-rect--2"
                                width="100%"
                                height="100%"
                            />
                        </svg>
                    </div>
                </Link>
                <Switch>
                    <Route
                        path="/order/details/:garment/:group/:subgroup"
                        component={(...props: any[]) => { // tslint:disable-line
                            return <SaveButton {...props[0]}>{loc[lang!].add}</SaveButton>;
                        }}
                    />
                    <Route path="/order/details/">
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