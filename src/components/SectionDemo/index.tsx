
import * as React from 'react';
import DemoDummy from '../../containers/Main/Dummy';

const DemoSection = (props: any) => { // tslint:disable-line no-any
    return (
    <div className="demo" >
        <DemoDummy onDummyLoad={props.onDummyLoad} showSpinner={props.showSpinner} />
    </div>);
};

export {
    DemoSection,
};
