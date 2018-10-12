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
    garment: string,
    defaultValues?: OrderItem 
) => SubgroupChoiceItem;
const filterFields: FilterFields = (item, subgroup, lang, order, garment, defaultValues) => {
    let status;
    try {
        const orderVal = order[garment][order[garment].length - 1];
        if (item.is_input) {
            status = orderVal[subgroup][item.subsection_our_code];
        } else {
            status = orderVal[subgroup][item.subsection_our_code].title[lang];
        }
        status = Boolean(status) ? status : loc[lang].noStatus;

    } catch (_) {
        status = loc[lang].noStatus;
    }
    if (item.subsection_our_code === 'fitting') {
        status = null;
    }
    let ourCode = null;
    let defaultCode = null;
    if (order[garment][0].design[item.subsection_our_code]) {
        ourCode = order[garment][0].design[item.subsection_our_code].our_code;
        defaultCode = defaultValues!.design[item.subsection_our_code]!.our_code;
    } else if (order[garment][0].fabric_ref[item.subsection_our_code]) {
        ourCode = order[garment][0].fabric_ref[item.subsection_our_code].our_code;
        defaultCode =  defaultValues!.fabric_ref![item.subsection_our_code].our_code;
    }
    return {
        link: `${subgroup}/${item.subsection_our_code}`,
        linkName: item.title[lang],
        id: item.subsection_our_code,
        isSubclear: item.is_subclear,
        isInput: item.is_input,
        status,
        subgroupTitle: item.title,
        ourCode: ourCode,
        defaultCode: defaultCode,
    };
};

@inject((
    {
        app,
        user,
        garments: {Subgroups},
        order,
        routing:
        {location: { pathname }} },
    nextProps: SubgroupChoiceProps) => ({
        lang: app.lang,
        SubgroupsStore: new Subgroups(nextProps.match.params.garment),
        order: order.order,
        defaultValues: order.defaultValues ? order.defaultValues![nextProps.match.params.garment][0] : {},
        userStore: user,
        activeExceptions: order.exceptions,
        setSubgroupTitle: order.setSubgroupTitle,
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
            setSubgroupTitle,
            defaultValues
        } = this.props;
        const $store = SubgroupsStore.data as SubgroupsI;
        const isLogin = this.props.userStore!.isAuth;
        const fittingSection = !isLogin || !$store ? [] :
            $store.fitting.map((v: Subgroup) => filterFields(
                v,
                'fitting',
                lang!,
                order!,
                garment,
                defaultValues
            ));
        const data = $store
            ? [
                // filterFields($store.fabric_ref, 'fabric_ref', lang!),
                ...$store.fabric_ref.map((v: Subgroup) => filterFields(
                    v,
                    'fabric_ref',
                    lang!,
                    order!,
                    garment,
                    defaultValues
                )),
                ...$store.design.map((v: Subgroup) => filterFields(
                    v,
                    'design',
                    lang!,
                    order!,
                    garment,
                    defaultValues
                )),
                ...fittingSection]
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
                                setSubgroupTitle={setSubgroupTitle!}
                                backLink={backLink!}
                                choiceItem={choiceItem!}
                                lang={lang!}
                                order={order!}
                            />
                        );
                    }}
                />
                <Route
                    exact={true}
                    path={match.path}
                >
                    <Component lang={lang} match={match} data={data} />
                </Route>
                <Redirect to={match.url} />
            </Switch>);
    }
}

export {
    SubgroupChoice,
};
