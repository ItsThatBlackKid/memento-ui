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
        this.setState({value: e.target.value});
    }

    render() {
        const {value} = this.state;
        this.props.onValueChange(this.state.value);

        return (
            <div className="slidecontainer">
                <input type="range" min="0" max="1" value={value} step="0.1" onChange={this.changeMood} className="slider" id="mood"/>
            </div>
        )
    }
}

export default Slider;