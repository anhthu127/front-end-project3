/* eslint-disable no-lone-blocks */
import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { LayoutSplashScreen } from "../../../_metronic";
import ListChar from "../Characters/List";
import NewCharater from "../Characters/NewCharacter";
import ListDirector from "../Director/ListDirector";
import DetailSeriesMovie from "../MoviesManages/DetailSeriesMovie";
import Season from "../MoviesManages/Season";
import SeriesMovie from "../MoviesManages/SeriesMovie";
{
	/* =============Dashboard============= */
}
const ListMovies = lazy(() => import('../MoviesManages/ListMovies'))
const NewMovies = lazy(() => import('../MoviesManages/NewMovie'))
const NewDirec = lazy(() => import('../Director/CreateDirector'))
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
					<Redirect exact from="/" to="/admin" />
				}
				<Route path="/admin/movie/list" component={ListMovies} />
				<Route path="/admin/movie/add" exact component={NewMovies} />
				<Route path="/admin/character/add" component={NewCharater} />
				<Route exact path="/admin/movie/season" component={Season} />
				<Route path="/admin/movie/series/detail" component={DetailSeriesMovie} />
				<Route exact path="/admin/movie/series/movie" component={SeriesMovie} />
				<Route path="/admin/character/list" exact component={ListChar} />
				<Route exact path="/admin/director/add" component={NewDirec} />
				<Route exact path="/admin/director/list" component={ListDirector} />

				<Route path="/Error403" component={Error403} />
			</Switch>
		</Suspense>
	);
}
