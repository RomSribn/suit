
import * as React from 'react';
import DemoDummy from '../../containers/Main/Dummy';

import './style.styl';

const DemoSection = (props: any) => { // tslint:disable-line no-any
    const isIndexPage = window.location.pathname === '/order';

    return (
        <div className="demo" style={{ display: isIndexPage ? 'none' : 'block' }} >
            <DemoDummy onDummyLoad={props.onDummyLoad} />
        </div>);
};

export {
    DemoSection,
};
