import React, { Component } from 'react';
import './Visualizer.css';
import { log } from '../Logger';
import Bar from './Bar/Bar';

export default class Visualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bars: []
        };
    }

    generateBars = (min, max, length, keepBars) => {
        if (keepBars !== true) {
            const bars = [];
            min = Number(min);
            max = Number(max);
            for (let i = 0; i < length; ++i) {
                const random = Math.floor(Math.random() * (max - min + 1)) + min;
                bars.push(<Bar id={i} key={i} value={random}></Bar>);
            }
            return bars.map((bar) => {
                return bar;
            });
        }
        return this.state.bars.map((bar) => {
            return bar;
        });
    }

    componentDidMount() {
        log("--Visualizer Mounted-- | min: " + this.props.minValue);
        const bars = this.generateBars(this.props.minValue, this.props.maxValue, this.props.length);
        this.setState({ bars: bars });
    }

    handleReset = () => {
        log("--Visualizer.js: handleReset--");
        this.updateBars(this.props.minValue, this.props.maxValue, this.props.length, false);
    }

    render() {
        const { minValue, maxValue, length, keepBars } = this.props;

        return (
            <div className="visualizer">
                {this.generateBars(minValue, maxValue, length, keepBars)}
            </div>
        )
    }
}



