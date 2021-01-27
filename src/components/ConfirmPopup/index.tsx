import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ConfirmPopup as Component } from './component';

@inject(({ app }) => ({
  lang: app.lang,
}))
@observer
class ConfirmPopup extends React.Component<ConfirmPopupProps> {
  render() {
    return <Component {...this.props} />;
  }
}

export { ConfirmPopup };
