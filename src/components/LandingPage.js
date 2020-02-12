import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Paper, useTheme} from "@material-ui/core";


const LandingPage = () => {
    const theme = useTheme();

    return (
        <Grid container direction={"column"}>
            <Grid
                container
                item
                justify="center"
                style={{background: theme.palette.primary.main}}>
                    <Typography variant={"h2"}>
                        What is Memento?
                    </Typography>

            </Grid>
            <Grid
                container
                item
                justify="center"
                style={{background: theme.palette.secondary.main, color: theme.palette.secondary.contrastText}}
            >
                <Typography variant="h2">
                    Why did I build it?
                </Typography>
            </Grid>
        </Grid>

    )
}

export default LandingPage