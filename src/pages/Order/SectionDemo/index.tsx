
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { DemoDummy } from '../DemoDummy';
import { Demo } from '../OrderDecorationBlocks';
import { routes } from '../routes';

const DemoSection = () => {
    return (
    <div className="demo" >
        <Switch>
            <Route path={routes.details} component={DemoDummy}/>
            <Route path={routes.index} component={Demo}/>
        </Switch>
    </div>);
};

export {
    DemoSection,
};
