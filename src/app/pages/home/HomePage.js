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
import DetailSingleMovie from '../MoviesManages/DetailSingleMovie';
import NewMovies from '../MoviesManages/NewMovie'
import MultipleItems from "../SharingComponents/CardMovie";
{
	/* =============Dashboard============= */
}
const ListMovies = lazy(() => import('../MoviesManages/ListMovies'))
// const NewMovies = lazy(() => import('../MoviesManages/NewMovie'))
const NewDirec = lazy(() => import('../Director/CreateDirector'))
const AddSeriesMovie = lazy(() => import('../MoviesManages/AddSeriesMovie'))
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
					<Redirect exact from="/" to="/admin/movie/list" />
				}
				<Route path="/admin/movie/list" component={ListMovies} />
				<Route exact path="/admin/movie/add/" component={NewMovies} />
				<Route path="/admin/character/add" component={NewCharater} />
				<Route exact path="/admin/movie/season" component={Season} />
				<Route exact path="/admin/movie/single/:id" component={DetailSingleMovie} />
				<Route path="/admin/movie/series/:id" component={DetailSeriesMovie} />
				<Route path="/admin/character/list" exact component={ListChar} />
				<Route exact path="/admin/director/add" component={NewDirec} />
				<Route exact path="/admin/director/list" component={ListDirector} />
				<Route exact path="/admin/" component={MultipleItems} />

				<Route path="/Error403" component={Error403} />
			</Switch>
		</Suspense>
	);
}
