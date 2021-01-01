/* eslint-disable no-lone-blocks */
import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { LayoutSplashScreen } from "../../../_metronic";
import ListCharacter from "../Characters/ListCharacter";
import ListChar from "../Characters/List";
import NewCharater from "../Characters/NewCharacter";

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
				<Route path="/admin/movies_list" component={ListMovies} />
				<Route path="/admin/movies_add" exact component={NewMovies} />

				<Route path="/admin/add_character" exact component={NewCharater} />
				<Route path="/admin/list_character" exact component={ListChar} />


				{/* Route organizations */}
				{/* <Route path="/organizations/list" component={ListOrganization} />
 				<Route path="/answer/list" component={ListAnswers} />
 				<Route path="/surveyround/add" exact component={AddEditSurveyRounds} />
				<Route path="/surveyround/update/:id" component={AddEditSurveyRounds} />

 
				<Route path="/surveyroundorg/list" component={ListSurveyRoundsOrg} /> */}

				{/* <Route path="/questions/add" exact component={AddQuestion} />
				<Route path="/questions/update/:id" component={EditQuestion} />
				<Route path="/questions/list" component={ListQuestion} /> */}

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
