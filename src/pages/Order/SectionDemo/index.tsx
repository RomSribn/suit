
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { DemoDummy } from '../DemoDummy';
import { Demo } from '../OrderDecorationBlocks';

const DemoSection = (props: DemoSectionProps) => {
    const {
        routes,
    } = props;
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
