import * as React from 'react';
import { ChoiceItems } from '../../../containers/MainSectionChoiceItems';

class Main extends React.PureComponent<DetailsProps> {
  static defaultProps = {
    activeGarments: [],
  };
  render() {
    const { activeGarments, lang } = this.props;
    return (
      <ChoiceItems
        lang={lang!}
        items={activeGarments!}
        basicRoute="/order/details"
      />
    );
  }
}

export { Main };
