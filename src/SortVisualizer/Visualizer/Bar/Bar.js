import React, { Component } from 'react'
import './Bar.css'

const WIDTH = 0.5;

export default class Bar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // console.log("-- Bar#" + this.props.className + "Mounted --");
    }

    render() {
        const { id, value } = this.props;
        const style = calcStyle(value);

        return (
            <>
                <div id={id} data-value={value} data-originalvalue={value} className="bar tooltip" style={style}>
                    <span className="tooltip--text">
                        {value}
                    </span>
                </div >
            </>
        )
    }
}

export function calcStyle(value) {
    return {
        height: (1 + Number(value) * WIDTH) + "rem",
        width: WIDTH + "em"
    }
}