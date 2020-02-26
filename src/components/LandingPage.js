import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Icon, Paper, useTheme} from "@material-ui/core";


const LandingPage = () => {
    const theme = useTheme();

    return (
        <Grid container direction={"column"}>
            <Grid
                container
                item
                alignItems={"center"}
                justify="center"
                style={{height: 300}}
               >
                <Grid
                    xs={6}
                    item
                    direction={"row-reverse"}
                    container
                >
                    <Typography variant={"h2"}>
                        What is Memento?
                    </Typography>
                </Grid>

                <Grid
                    container
                    direction={"column"}
                    alignItems={"center"}
                    justify={"center"}
                    item
                    xs={6}
                >
                    <Icon
                        fontSize={"large"}
                    >
                        menu_book
                    </Icon>
                    <Typography variant={"body1"}>
                        Memento is a mental health journal
                    </Typography>
                </Grid>


            </Grid>
            <Grid
                container
                item
                justify="center"

            >
                <Typography variant="h2">
                    Why did I build it?
                </Typography>
            </Grid>
        </Grid>

    )
}

export default LandingPage