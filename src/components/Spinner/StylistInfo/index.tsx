import * as React from 'react';
import {
  StylistInfo as StylistInfoComponent,
  StylistInfoComponentProps,
} from './salons';

import './StylesInfo.styles.styl';
import { inject, observer } from 'mobx-react';
import { CommonStores } from '../../../types/commonStores';

const injector = <T extends CommonStores>(stores: T) => {
  return {
    // @ts-ignore
    lang: stores.app.lang,
  };
};

@inject<CommonStores, {}, {}, {}>(injector)
@observer
class StylistInfoClass extends React.Component<StylistInfoComponentProps> {
  render() {
    const props = this.props;
    return <StylistInfoComponent lang={props.lang} />;
  }
}

export const StylistInfo =
  // @ts-ignore
  StylistInfoClass as React.FC<
    Omit<StylistInfoComponentProps, keyof ReturnType<typeof injector>>
  >;
