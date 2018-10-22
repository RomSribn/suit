/* tslint:disable */
import * as React from 'react';
import { Route } from 'react-router-dom';
import { observer, inject } from 'mobx-react'
import { Breadcrumb } from 'react-breadcrumbs';

declare module "react-breadcrumbs" {
	export interface BreadcrumbsProps {
		separator?: string;
	}
}

interface CrumbRouteProps {
	component?: any;  // tslint:disable-line
	routeKey: string;
	includeSearch?: Boolean;
	render?: (props: any) => React.ReactNode; // tslint:disable-line
	children?: React.ReactNode | React.ReactNode[]; 
	[key: string]: any // tslint:disable-line
}

const getTitle = (lang: string, titleObj: any, computedMatchParams: { [key: string]: string }) => {
	if (titleObj[lang]) {
		return titleObj[lang]
	} else {
		const computedMatchKey = Object.keys(computedMatchParams)[Object.keys(computedMatchParams).length - 1]
		return titleObj[computedMatchKey][lang][computedMatchParams[computedMatchKey]]
	}
}

export default inject(({app}) => ({
  lang: app.lang,
	}))(
	observer(
		({ component, includeSearch = false, render, children, routeKey, ...props }: CrumbRouteProps) => (
			<Route
				{...props}
				render={routeProps => {
					const RouteComponent = component
					return (
						<Breadcrumb
							data={{
								title: getTitle(props.lang, props.title, props.computedMatch.params),
								pathname: routeProps.match.url,
								search: includeSearch ? routeProps.location.search : undefined
							}}
						>
							{
								RouteComponent
									? <RouteComponent {...routeProps} />
									: render
										?	render(routeProps)
										: children
							}
						</Breadcrumb>
					)
				}}
			/>
		)
	)
)