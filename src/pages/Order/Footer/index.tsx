import * as React from 'react';
import { Route } from 'react-router';
import { LanguageControl } from '../../../components/LanguageContorl';
import { OrderControl } from '../OrederControl';

const Footer = (props: FooterProps) => {
    const {
        routes,
    } = props;
    return (
        //  main__footer--index addition
        <div style={{ width: '100%' }}>
            <Route exact={true} path={routes.index} component={LanguageControl}/>
            <Route path={routes.details} component={OrderControl} />
        </div>
    );
};

export {
    Footer,
};