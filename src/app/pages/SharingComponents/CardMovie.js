import React, { useEffect, useState } from 'react'

import { media_url } from '../../Utils/constants';
import {
    Typography,
    GridList,
    GridListTile,
    Divider,
    makeStyles,
    Card,
    CardMedia,
    Box,
    useMediaQuery,
    CardActionArea,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import MakeRequest from '../../Utils/MakeRequest';
// const character = [{
//     image: "media/1610371975472-Cloudy_with_a_Chance_of_Meatballs_(video_game).jpg",
//     link_trailer: null,
//     movie_type: "unknown",
//     name: "phim bộ 1",
// },
// {
//     image: "media/1610371975472-Cloudy_with_a_Chance_of_Meatballs_(video_game).jpg",
//     link_trailer: null,
//     movie_type: "unknown",
//     name: "phim bộ 1",
// },
// {
//     image: "media/1610371975472-Cloudy_with_a_Chance_of_Meatballs_(video_game).jpg",
//     link_trailer: null,
//     movie_type: "unknown",
//     name: "phim bộ 1",
// },
// {
//     image: "media/1610371975472-Cloudy_with_a_Chance_of_Meatballs_(video_game).jpg",
//     link_trailer: null,
//     movie_type: "unknown",
//     name: "phim bộ 1",
// },
// {
//     image: "media/1610371975472-Cloudy_with_a_Chance_of_Meatballs_(video_game).jpg",
//     link_trailer: null,
//     movie_type: "unknown",
//     name: "phim bộ 1",
// },
// {
//     image: "media/1610371975472-Cloudy_with_a_Chance_of_Meatballs_(video_game).jpg",
//     link_trailer: null,
//     movie_type: "unknown",
//     name: "phim bộ 1",
// },
// {
//     image: "media/1610371975472-Cloudy_with_a_Chance_of_Meatballs_(video_game).jpg",
//     link_trailer: null,
//     movie_type: "unknown",
//     name: "phim bộ 1",
// }
// ]
const useStyles = makeStyles((theme) => ({
    seriesCast: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
    },
    gridList: {
        flexGrow: 1,
        flexWrap: "nowrap",
        transform: "translateZ(0)",
        marginBottom: "0 !important",
    },
    card: {
        height: "100%",
    },
    cardMedia: {
        height: 0,
        paddingTop: "130%",
        borderRadius: 0,
    },
    cardActionArea: {
        borderRadius: 0,
    },
    viewMore: {
        display: "flex",
        alignSelf: "center",
        alignItems: "center",
    },
    icon: {
        verticalAlign: "middle",
    },
}));
const SeriesCast = (props) => {
    const [character, setCharacter] = useState([])
    useEffect(() => {
        console.log(props.character);
        setCharacter(props.character)
    }, [props.character])
    const classes = useStyles();
    const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return (
        <>
            <div>
                <Typography variant="h5" gutterBottom>
                    Diễn viên
          </Typography>

                <div className={classes.seriesCast}>
                    <GridList
                        className={classes.gridList}
                        cellHeight="auto"
                        cols={matches ? 2.5 : 5.5}
                        spacing={8}
                    >
                        {character.slice(0, 9).map((cast) => (
                            <GridListTile key={cast.credit_id}>
                                <Card className={classes.card}>
                                    <CardActionArea
                                        component={Link}
                                        to={`/person/${cast.id}`}
                                        className={classes.cardActionArea}
                                    >
                                        <CardMedia
                                            image={media_url + cast.image}
                                            title={cast.name}
                                            className={classes.cardMedia}
                                        />
                                    </CardActionArea>
                                    <Box m={1}>
                                        <Typography
                                            variant="subtitle1"
                                            component={Link}
                                        // to={`/person/${cast.id}`}
                                        >
                                            <h6> {character.name}</h6>
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            {cast.name}
                                        </Typography>
                                    </Box>
                                </Card>
                            </GridListTile>
                        ))}
                        {character.length >= 9 && (
                            <GridListTile className={classes.viewMore}>
                                View more
                                <ArrowForwardIcon className={classes.icon} />
                            </GridListTile>
                        )}
                    </GridList>
                </div>

            </div>

            <Divider />
        </>
    );
};

export default SeriesCast;

