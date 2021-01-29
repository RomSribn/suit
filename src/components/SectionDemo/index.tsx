import * as React from 'react';
import DemoDummy from '../../containers/Main/Dummy';
import './style.styl';

// tslint:disable-next-line
const DemoSection = (props: any) => {
  const isIndexPage = window.location.pathname === '/order';

  return (
    <div className="demo" style={{ display: isIndexPage ? 'none' : 'block' }}>
      <DemoDummy onDummyLoad={props.onDummyLoad} />
    </div>
  );
};

export { DemoSection };
