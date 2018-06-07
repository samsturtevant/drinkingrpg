import React from 'react';
import ReactTooltip from 'react-tooltip';
import MajorSelectCard from './MajorSelectCard';
import '../App.css';

export default class MajorSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    onMajor1Change(val) {
        this.setState(() => {
            return {major1: val};
        });
    }

    onMajor2Change(val) {
        this.setState(() => {
            return {major2: val};
        })
    }

    onMajor3Change(val) {
        this.setState(() => {
            return {major3: val};
        })
    }

    onMajor4Change(val) {
        this.setState(() => {
            return {major4: val};
        })
    }

    checkDamage() {
        if (Math.floor(this.state.major1 / 4) === 0 ||
            Math.floor(this.state.major2 / 4) === 0 ||
            Math.floor(this.state.major3 / 4) === 0 ||
            Math.floor(this.state.major4 / 4) === 0) {
            return <h4>DMG</h4>
        } else {
            return <h4 style={{color: "gray"}}>DMG</h4>
        }
    }

    checkTank() {
        if (Math.floor(this.state.major1 / 4) === 1 ||
            Math.floor(this.state.major2 / 4) === 1 ||
            Math.floor(this.state.major3 / 4) === 1 ||
            Math.floor(this.state.major4 / 4) === 1) {
            return <h4>TNK</h4>
        } else {
            return <h4 style={{color: "gray"}}>TNK</h4>
        }
    }

    checkUtility() {
        if (Math.floor(this.state.major1 / 4) === 2 ||
            Math.floor(this.state.major2 / 4) === 2 ||
            Math.floor(this.state.major3 / 4) === 2 ||
            Math.floor(this.state.major4 / 4) === 2) {
            return <h4>UTL</h4>
        } else {
            return <h4 style={{color: "gray"}}>UTL</h4>
        }
    }

    checkRestoration() {
        if (Math.floor(this.state.major1 / 4) === 3 ||
            Math.floor(this.state.major2 / 4) === 3 ||
            Math.floor(this.state.major3 / 4) === 3 ||
            Math.floor(this.state.major4 / 4) === 3) {
            return <h4>RST</h4>
        } else {
            return <h4 style={{color: "gray"}}>RST</h4>
        }
    }

    render() {
        return (
            <div className="selectionContainer">
                <h1>Choose your party!</h1>
                <p>Party composition is up to you, but we suggest one major for each role (damage, tank, utility, restoration).</p>
                <div className="majorSuggestion">
                    <div data-tip="Damage majors use heavy-hitting attacks to damage enemies.">{this.checkDamage()}</div>
                    <div data-tip="Tank majors use defensive moves to protect themselves and allies.">{this.checkTank()}</div>
                    <div data-tip="Utility majors use special moves to boost their allies or weaken their enemies.">{this.checkUtility()}</div>
                    <div data-tip="Restoration majors use healing moves to restore the party's health.">{this.checkRestoration()}</div>
                </div>
                <div className="majorSelectContainer">
                    <MajorSelectCard onMajorChange={this.onMajor1Change.bind(this)} />
                    <MajorSelectCard onMajorChange={this.onMajor2Change.bind(this)} />
                    <MajorSelectCard onMajorChange={this.onMajor3Change.bind(this)} />
                    <MajorSelectCard onMajorChange={this.onMajor4Change.bind(this)} />
                </div>
            </div>
        )
    }
}
