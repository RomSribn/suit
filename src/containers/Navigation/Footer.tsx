import * as React from 'react';

interface Props {
  lang: string;
}

class Footer extends React.Component<Props> {
  render() {
    return (
      <div className="panel__footer">
        <div className="tools" />
      </div>
    );
  }
}

export { Footer };
