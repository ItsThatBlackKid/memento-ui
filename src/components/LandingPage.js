import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Icon} from "@material-ui/core";


const LandingPage = () => {

    return (
        <Grid container direction={"column"}>
            <Grid
                container
                item
                alignItems={"center"}
                justify="center"
                style={{height: 300}}
               >
                <Typography variant={"h2"}>
                    Memento
                </Typography>

            </Grid>
            <Grid
                container
                item
                justify="center"

            >
                <Typography variant="h3">
                    A mental health journal
                </Typography>
            </Grid>
        </Grid>

    )
}

export default LandingPage