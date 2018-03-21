import * as React from 'react';
// import { Paralax } from '../../components/OrderDecorationBlocks';
import { Navigation } from '../Navigation';

interface CommonProps {
    children?: React.ReactChildren;
}
const Common = (props: CommonProps) => {
    return (
        <div className="application" >
            {/* <Paralax /> */}
            { window.location.pathname !== '/login' &&
            <Navigation />
            }
            {props.children}
        </div>
    );
};

export {
    Common,
};
