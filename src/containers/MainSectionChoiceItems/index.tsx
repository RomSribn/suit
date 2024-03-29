import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { ChoiceItems as Component } from './component';

@inject(({ app, order, garments: { garments }, filterStore: { setSelectedItems } }) => ({
  pushOrderPathItem: app.pushOrderPathItem,
  addVisitedChoiceItem: app.addVisitedChoiceItem,
  removeVisitedChoiceItem: app.removeVisitedChoiceItem,
  visitedChoiceItems: app.visitedChoiceItems,
  orderStore: order,
  activeGarments: garments.activeGarments,
  setSelectedItems,
}))
@observer
class ChoiceItems extends React.Component<ChoiceItemsProps> {
  render() {
    const {
      pushOrderPathItem,
      addVisitedChoiceItem,
      removeVisitedChoiceItem,
      visitedChoiceItems,
      setSelectedItems
    } = this.props;
    return (
      <Component
        {...this.props}
        pushOrderPathItem={pushOrderPathItem}
        addVisitedChoiceItem={addVisitedChoiceItem}
        removeVisitedChoiceItem={removeVisitedChoiceItem}
        visitedChoiceItems={visitedChoiceItems}
        setSelectedItems={setSelectedItems}
      />
    );
  }
}

export { ChoiceItems };
