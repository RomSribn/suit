import * as React from 'react';
// import { Route } from 'react-router';
// import { ViewControl } from './ViewControl';
// import { loc } from './loc';

interface Props {
    lang: string;
}

class Footer extends React.Component<Props> {
    render() {
        return (
            <div className="panel__footer">
                <div className="tools">
                    {/* {viewControl} */}
                    {/* <button className="btn tools__item tools__item--3d" title="3d">3d</button> */}
                </div>
            </div>);
    }
}

export {
    Footer
};
