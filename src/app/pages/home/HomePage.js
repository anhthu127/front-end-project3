/* eslint-disable no-lone-blocks */
import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { LayoutSplashScreen } from "../../../_metronic";
 import ListChar from "../Characters/List";
import NewCharater from "../Characters/NewCharacter";
import Season from "../MoviesManages/Season";

{
	/* =============Dashboard============= */
}
const Dashboard = lazy(() => import("../dashboard/Dashboard"));
const ListMovies = lazy(() => import('../MoviesManages/ListMovies'))
const NewMovies = lazy(() => import('../MoviesManages/NewMovie'))
{
	/* =============Error Page============= */
}
const Error403 = lazy(() => import("../common/Error403"));
{
	/* ==================================== */
}

export default function HomePage() {
	return (
		<Suspense fallback={<LayoutSplashScreen />}>
			<Switch>
				{
					/* Redirect from root URL to /dashboard. */
					<Redirect exact from="/" to="/dashboard" />
				}
				<Route path="/admin/movie/list" component={ListMovies} />
				<Route path="/admin/movie/add" exact component={NewMovies} />
				<Route   path="/admin/character/add" component={NewCharater} />
				<Route exact path="/admin/movie/season" component={Season} />
				<Route path="/admin/character/list" exact component={ListChar} />
				{/* Route questions */}
				{/* <Route path="/survey-sections/add" exact component={AddSurveySection} />
				<Route
					path="/survey-sections/update/:id"
					component={EditSurveySection}
				/>
				<Route path="/survey-sections/list" component={ListSurveySection} /> */}

				<Route path="/dashboard" component={Dashboard} />

				{/* Route other */}
				{/* <Route path="/formSurvey" component={FormSurvey} />
				<Route path="/form/add" component={AddForm} />
				<Route path="/showForm" component={ShowFormSurvey} />
				<Route path="/form/list" component={ListForm} />
				<Route path="/form/edit/:id" component={EditForm} /> */}
				{/* <Route path="/answers" component={ListAnswers} /> */}
				{/* <Route path="/report/table" component={FormReport} />
				<Route path="/report/chart" component={ChartReport} /> */}

				{/* <Redirect to="Error403" /> */}
				<Route path="/Error403" component={Error403} />

			</Switch>
		</Suspense>
	);
}
