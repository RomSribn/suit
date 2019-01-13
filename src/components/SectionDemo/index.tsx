
import * as React from 'react';
import DemoDummy from '../../containers/Main/Dummy';

import './style.styl';

const DemoSection = (props: any) => { // tslint:disable-line no-any
    return (
    <div className="demo" >
        <DemoDummy onDummyLoad={props.onDummyLoad} />
    </div>);
};

export {
    DemoSection,
};
