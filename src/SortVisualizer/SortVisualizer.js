import React, { Component } from 'react';
import './SortVisualizer.css';
import Visualizer from './Visualizer/Visualizer';
import AlgorithmSelect from './AlgorithmSelect/AlgorithmSelect';
import { Sort, setSpeed, stopSort } from './Sorter';
import { calcStyle } from './Visualizer/Bar/Bar';

const MAX_LENGTH = 120;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 75;
const DEFAULT_SPEED = 50;

let isSorting = false;
let speed = DEFAULT_SPEED;
let algorithmId = 0;

export default class SortVisualizer extends Component {
    constructor(props) {
        super(props);
        this.handleChangeMinValue = this.handleChangeMinValue.bind(this);
        this.handleChangeMaxValue = this.handleChangeMaxValue.bind(this);
        this.handleChangeLength = this.handleChangeLength.bind(this);
        this.handleStartSort = this.handleStartSort.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleAlgorithmSelected = this.handleAlgorithmSelected.bind(this);

        this.state = {
            minValue: DEFAULT_MIN,
            maxValue: DEFAULT_MAX,
            length: MAX_LENGTH,
            algorithmList: [
                { id: 0, name: "Selection Sort" },
                { id: 1, name: "Bubble Sort" },
                { id: 2, name: "Insertion Sort" },
                { id: 3, name: "Merge Sort" },
                { id: 4, name: "Quicksort (Lomuto)" },
                { id: 5, name: "Quicksort (Hoare)" },
                { id: 6, name: "Heap Sort" },
                { id: 7, name: "Counting Sort [WIP]" },
                { id: 8, name: "Radix Sort [WIP]" },
                { id: 9, name: "Bucket Sort [WIP]" }
            ]
        };
    }

    componentDidMount() {
        console.log("--SortVisualizer Mounted--");
        this.updateVisualizer(DEFAULT_MIN, DEFAULT_MAX, MAX_LENGTH);
    }

    handleChangeMinValue = (e) => {
        console.log("--SortVisualizer.js: handleChangeMinValue--");
        const val = e.target.value;
        this.updateVisualizer(val, this.state.maxValue, this.state.length);
    }

    handleChangeMaxValue = (e) => {
        console.log("--SortVisualizer.js: handleChangeMaxValue--");
        const val = e.target.value;
        this.updateVisualizer(this.state.minValue, val, this.state.length);
    }

    handleChangeLength = (e) => {
        console.log("--SortVisualizer.js: handleChangeLength--");
        const val = e.target.value;
        this.updateVisualizer(this.state.minValue, this.state.maxValue, val);
    }

    handleChangeSpeed = (e) => {
        console.log("--SortVisualizer.js: handleChangeSpeed--");
        const val = e.target.value;
        speed = val;
        setSpeed(speed);
        document.getElementById("settings--speed").innerText = val;
    }

    handleStartSort = () => {
        console.log("--SortVisualizer.js: handleStartSort--");
        if (isSorting) return;
        isSorting = true;
        Sort(algorithmId, this.state.length, speed);
    }

    handleReset = () => {
        if (isSorting) {
            stopSort();
        }
        let a = Array.from(document.querySelectorAll(".bar"));
        a.forEach(element => {
            element.dataset.value = element.dataset.originalvalue;
            element.className = "bar tooltip";
            element.style.height = calcStyle(element.dataset.value).height;
            element.firstChild.innerText = element.dataset.value;
        });
    }

    handleAlgorithmSelected = (value) => {
        algorithmId = value;
    }

    updateVisualizer = (min, max, len) => {
        if (isSorting) return;
        this.handleReset();
        this.setState({ minValue: min, maxValue: max, length: len });
    }

    render() {
        const { minValue, maxValue, length, algorithmList } = this.state;

        return (
            <div className="content">
                <div className="top">
                    <div className="title">
                        <h1 className="title">Sorting Algorithm <br /> Visualizer</h1>
                    </div>
                    <div className="algorithm">
                        <span className="algorithm--title">Algorithm: </span>
                        <div className="algorithm__select">
                            <AlgorithmSelect
                                defaultSelectText={algorithmList[0].name}
                                optionsList={algorithmList}
                                onAlgorithmSelected={this.handleAlgorithmSelected}
                            />
                        </div>

                    </div>
                    <div className="settings">
                        <div className="settings--input">
                            <span className="settings--input__title">Mininum</span>
                            <input
                                name="settings--input_min"
                                type="range"
                                className="settings--input__slider settings--input__min"
                                min="0"
                                max="75"
                                defaultValue="0"
                                onChange={this.handleChangeMinValue}>
                            </input>
                            <label htmlFor="settings--input__min" className="settings--input__label">{minValue}</label>
                        </div>
                        <div className="settings--input">
                            <span className="settings--input__title">Maximum</span>
                            <input
                                name="settings--input_max"
                                type="range"
                                className="settings--input__slider settings--input__max"
                                min="0"
                                max="75"
                                defaultValue="75"
                                onChange={this.handleChangeMaxValue}>
                            </input>
                            <label htmlFor="settings--input__max" className="settings--input__label">{maxValue}</label>
                        </div>
                        <div className="settings--input">
                            <span className="settings--input__title">Count</span>
                            <input
                                name="settings--input_count"
                                type="range"
                                className="settings--input__slider settings--input__count"
                                min="3"
                                max="120"
                                defaultValue="120"
                                onChange={this.handleChangeLength}>
                            </input>
                            <label htmlFor="settings--input__count" className="settings--input__label">{length}</label>
                        </div>
                        <div className="settings--input">
                            <span className="settings--input__title">Speed</span>
                            <input
                                name="settings--input_speed"
                                type="range"
                                className="settings--input__slider settings--input__speed"
                                min="1"
                                max="100"
                                defaultValue="50"
                                onChange={this.handleChangeSpeed}>
                            </input>
                            <label id="settings--speed" htmlFor="settings--input__speed" className="settings--input__label">{speed}</label>
                        </div>
                    </div>
                    <div className="nav">
                        <button className="nav__btn" onClick={this.handleStartSort}>Start</button>
                        <button className="nav__btn" onClick={this.handleReset}>Reset</button>
                    </div>
                </div>
                <div className="body">
                    <Visualizer id="visualizer" minValue={minValue} maxValue={maxValue} length={length} keepBars="false" />
                </div>
            </div>
        );
    }
}

export function sortingFinished() {
    isSorting = false;
}