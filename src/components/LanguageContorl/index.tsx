import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as classnames from 'classnames';
import { routes } from '../../config/routes';
import { LanguageControl as Component } from './component';

@inject(({app}, nextProps: LanguageControlLanguageControlPropsProps) => ({
    lang: app.lang,
    changeLanguage: app.setLang,
    route: nextProps.location.pathname,
    ...nextProps,
}))
@observer
class LanguageControl extends React.Component<LanguageControlLanguageControlPropsProps> {
    changeLanguage = (lang: string) => (e: React.MouseEvent<React.ReactNode>) => {
        try {
            e.preventDefault();
            this.props.changeLanguage!(lang);
        } catch (e) {
            console.log(e); // tslint:disable-line
        }
    }
    render() {
        const {
            lang,
            route,
        } = this.props;
        return (
            <div
                className={classnames(
                    'main__footer',
                    {
                        ['main__footer--index']: route === routes.order,
                    },
                )}
            >
                <Component
                    lang={lang}
                    changeLanguage={this.changeLanguage}
                />
            </div>
        );
    }
}

export {
    LanguageControl,
};