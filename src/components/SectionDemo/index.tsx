
import * as React from 'react';
import { Route, Switch } from 'react-router';
import DemoDummy from '../../containers/Main/Dummy';
import { routes } from '../../config/routes';

const DemoSection = (props: any) => { // tslint:disable-line no-any
    return (
    <div className="demo" >
        <Switch>
            <Route path={routes.details} component={DemoDummy}/>
        </Switch>
    </div>);
};

export {
    DemoSection,
};
