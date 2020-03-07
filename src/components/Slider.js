import React, { useEffect, useState} from "react";
import {Slider as MuiSlider} from "@material-ui/core";
import "../styles/slider.scss"
import {createUseStyles  as createStyles} from "react-jss";
import {colourBetween, getGradient} from "../util/colours";

const mementoSlider = createStyles({
    root: {
        height: 6
    },
    track: {
        color: value => colourBetween(value),
        height: 6
    },

    thumb: {
        color: value => colourBetween(value)
    },

    rail: {
        color: getGradient(),
        height: 6,
    }

});

const Slider = ({value, onValueChange}) => {
    const slider = mementoSlider(value);
    const [sliderValue, setValue] = useState(value);

    useEffect(() => {
        setValue(value)
    }, [value]);

    const onChange = (v) => {
        setValue(v);
        onValueChange(v);
    };



    return (
        <MuiSlider
            className={"slider"}
            classes={{...slider}}
            value={value}
            onChange={(e,v) => onChange(v)}
            valueLabelDisplay={"auto"}
            step={0.1}
            min={0}
            max={1}
        />
    )
}
export default Slider;