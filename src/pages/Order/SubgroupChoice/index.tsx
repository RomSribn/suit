import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Switch, Route, Redirect } from 'react-router';
import { SubgroupChoice as Component } from './component';
import { GroupChoice } from '../GroupChoice';
import { trim } from '../../../config/routes';
import { loc } from './loc';

type FilterFields = (
    item: Subgroup,
    subgroup: string,
    lang: string,
    order: Order,
    garment: string) => SubgroupChoiceItem;
const filterFields: FilterFields = (item, subgroup, lang, order, garment) => {
    let status;
    try {
        status = order[garment][order[garment].length - 1][subgroup][item.id];
        status = !!status ? status : loc[lang].noStatus;

    } catch (_) {
        status = loc[lang].noStatus;
    }
    if (item.id === 'fitting') {
        status = null;
    }
    return {
        link: `${subgroup}/${item.id}`,
        linkName: item[`title_${lang}`],
        id: item.id,
        status,
    };
};

@inject((
    { app, garments: {Subgroups}, order, routing: {location : { pathname }} }, nextProps: SubgroupChoiceProps) => ({
    lang: app.lang,
    SubgroupsStore: new Subgroups(nextProps.match.params.garment),
    order: order.order,
    choiceItem: [...app.orderPath].pop(),
    popOrderPathitem: app.popOrderPathItem,    
    backLink:
    '/' + trim(
        pathname
        .split('/')
        .reduce(
            (acc: string,
            cur: string,
            i: number,
            arr: string[]) => `${acc}/${i === arr.length - 1 ? '' : cur}`, ''),
            '/'),
    ...nextProps,
}))
@observer
class SubgroupChoice extends React.Component<SubgroupChoiceProps> {
    render() {
        const {
            lang,
            SubgroupsStore,
            match,
            match: { params: { garment } },
            order,
            choiceItem,
            popOrderPathitem,
            backLink,
        } = this.props;
        const $store = SubgroupsStore.data as SubgroupsI;
        const data = $store
            ? [
                // filterFields($store.fabric_ref, 'fabric_ref', lang!),
                ...$store.fabric_ref.map((v: Subgroup) => filterFields(
                    v,
                    'fabric_ref',
                    lang!,
                    order!,
                    garment
                )),                
                ...$store.design.map((v: Subgroup) => filterFields(
                    v,
                    'design',
                    lang!,
                    order!,
                    garment
                )),
                ...$store.fitting.map((v: Subgroup) => filterFields(
                    v,
                    'fitting',
                    lang!,
                    order!,
                    garment
                ))]
            : [];
        return (
            <Switch>
                <Route
                    path={`${match.path}/:subgroup/:group`}
                    render={(props) => {
                        const _match = props.match;
                        return (
                            <GroupChoice
                                match={_match}
                                popOrderPathitem={popOrderPathitem!}
                                backLink={backLink!}
                                choiceItem={choiceItem!}
                                order={order!}
                            />
                        );
                    }}
                />
                <Route
                    exact={true}
                    path={match.path}
                >
                    <Component match={match} data={data} />
                </Route>
                <Redirect to={match.url}/>
            </Switch>);
    }
}

export {
    SubgroupChoice,
};
