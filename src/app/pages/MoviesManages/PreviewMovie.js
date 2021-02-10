import React, { useEffect, useState } from "react";
import BrushIcon from '@material-ui/icons/Brush';
import {
    Typography,
    Box,
    CardMedia,
    makeStyles,
    Tabs,
    Tab,
    Divider,
} from "@material-ui/core";
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import { media_url } from "../../Utils/constants";
import { Label } from "reactstrap";
import { Input } from "antd";
import { Movie } from "@material-ui/icons";
function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}
const useStyles = makeStyles((theme) => ({
    tabs: {
        marginLeft: theme.spacing(5),
        marginBottom: theme.spacing(1),
    },
    cardVideo: {
        width: 550,
        borderRadius: '8px',
        height: "100%",
    },
    cardMedia: {
        height: "100%",
        width: "auto",
        borderRadius: 0,
    },
}));
const PreView = ({ details, changeLinkFilms, changeLinkTrailer }) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [linkMovie, setLinkMovie] = useState(details.linkMovie);
    const [linkTrailer, setLinkTrailer] = useState(details.linkTrailer);
    useEffect(() => {
        console.log(details);
    }, [])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const changeFilms = (e) => {
         const { name, value } = e.target
        setLinkMovie(value)
        changeLinkFilms({ [name]: value })
    }
    const changeTrailer = (e) => {
        const { name, value } = e.target
        setLinkTrailer(value)
        changeLinkTrailer({ [name]: value })
    }
    return (
        <>
            <div>
                <div>
                    <Label className='label-in-character' >Link phim </Label>
                    <Input id="custom-input-name" onChange={(e) => { changeFilms(e) }}
                        name='link_movie' value={linkMovie}></Input>
                </div>
                <div>
                    <Label className='label-in-character' >Link trailer </Label>
                    <Input id="custom-input-name" onChange={(e) => { changeTrailer(e) }}
                        name='link_trailer' value={linkTrailer}></Input>
                </div>
                <Box display="flex" alignItems="center">
                    <Typography variant="h5" gutterBottom>
                        Preview
                     </Typography>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        className={classes.tabs}
                    >
                        <Tab label="Movie" icon={<LocalMoviesIcon />} {...a11yProps(0)} />
                        <Tab label="Trailer"   {...a11yProps(1)} />
                        <Tab label="Comment" icon={<InsertCommentIcon />} {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <Box display="flex" alignItems="center" height={300}>
                    {value === 0 &&
                        (details.linkMovie ? (
                            <CardMedia component='iframe'
                                className={classes.cardVideo}
                                src={details.linkMovie}
                            />
                        ) : (
                                <Typography>Video này hiện không khả dụng</Typography>
                            ))}
                    {value === 1 &&
                        (details.linkTrailer ? (
                            <CardMedia
                                component="iframe"
                                className={classes.cardVideo}
                                src={details.linkTrailer}
                            />
                        ) : (
                                <Typography>Video này hiện không khả dụng</Typography>
                            ))
                    }
                    {value === 2 && (
                        <div>Comment</div>
                    )}
                </Box>
            </div>
            <Divider />
        </>
    );
};

export default PreView;
