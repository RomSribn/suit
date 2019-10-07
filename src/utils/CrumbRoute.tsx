/* tslint:disable */
import * as React from 'react';
import { Route } from 'react-router-dom';
import { observer, inject } from 'mobx-react'

interface CrumbRouteProps {
	component?: any;  // tslint:disable-line
	routeKey: string;
	includeSearch?: Boolean;
	render?: (props: any) => React.ReactNode; // tslint:disable-line
	children?: React.ReactNode | React.ReactNode[]; 
	[key: string]: any // tslint:disable-line
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
						<>
							{
								RouteComponent
									? <RouteComponent {...routeProps} />
									: render
										?	render(routeProps)
										: children
							}
						</>
					)
				}}
			/>
		)
	)
)