import React, { Component } from 'react';
import './AlgorithmSelect.css';

export default class AlgorithmSelect extends Component {
    constructor(props) {
        super(props);

        this.handleDisplay = this.handleDisplay.bind(this);
        this.handleOptionClick = this.handleOptionClick.bind(this);

        this.state = {
            defaultSelectText: "",
            showOptionList: false,
            selectedId: 0,
            optionsList: []
        }
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
        this.setState({
            defaultSelectText: this.props.defaultSelectText
        });
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (e) => {
        if (
            !e.target.classList.contains("algorithm-select__option") &&
            !e.target.classList.contains("selected-text")
        ) {
            this.setState({
                showOptionList: false
            });
        }
    };

    handleDisplay = () => {
        this.setState(prevState => {
            return { showOptionList: !prevState.showOptionList };
        });
    };

    handleOptionClick = (e) => {
        this.props.onAlgorithmSelected(e.target.dataset.id);
        this.setState({
            defaultSelectText: e.target.getAttribute("data-name"),
            selectedId: e.target.dataset.id,
            showOptionList: false
        });
    };

    render() {
        const { optionsList } = this.props;
        const { showOptionList, defaultSelectText, selectedId } = this.state;
        return (
            <div className="algoritm-select__container">
                <div id="selected-algorithm" className={showOptionList ? "selected-text active" : "selected-text"} onClick={this.handleDisplay} data-value={selectedId}>
                    {defaultSelectText}
                    <div className="arrow"></div>
                </div>

                <ul className={showOptionList ? "algorithm-select__list active" : "algorithm-select__list"}>
                    {optionsList.map(option => {
                        return (
                            <li className="algorithm-select__option" data-name={option.name} data-id={option.id} key={option.id} onClick={this.handleOptionClick}>
                                {option.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
