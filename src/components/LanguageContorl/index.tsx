import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { LanguageControl as Component } from './component';

@inject(({app}, nextProps: LanguageControlLanguageControlContainerProps) => ({
    lang: app.lang,
    changeLanguage: app.setLang,
    ...nextProps,
}))
@observer
class LanguageControl extends React.Component<LanguageControlLanguageControlContainerProps> {
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
            mobileOnly,
            className,
            shortcut
        } = this.props;
        return (
            <Component
                lang={lang}
                mobileOnly={mobileOnly}
                changeLanguage={this.changeLanguage}
                className={className}
                shortcut={shortcut}
            />
        );
    }
}

export {
    LanguageControl,
};