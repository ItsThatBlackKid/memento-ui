import React, { Component } from "react";
import "../styles/slider.scss"

class Slider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value || 0.5
        }
    }


    changeMood =(e) => {
        this.props.onValueChange(parseFloat(e.target.value));
        this.setState({value: e.target.value});
    }

    render() {
        const {value} = this.state;

        return (
            <div className="slidecontainer">
                <label>{value}</label>
                <input type="range" min="0" max="1" value={value}
                       step="0.1" onChange={this.changeMood} className="slider" id="mood"/>
            </div>
        )
    }
}

export default Slider;