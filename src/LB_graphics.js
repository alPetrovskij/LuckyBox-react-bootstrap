import React from 'react';
import {Tab} from 'react-bootstrap';
import Dygraph from 'dygraphs';
import {getJson} from './util'

class Graphics extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.getJson = getJson.bind(this);
        this.tickStart = this.tickStart.bind(this);
        this.tickStop = this.tickStop.bind(this);
        this.state = {
            temperature: '',
            temperature2: '',
            temperature3: '',
            temperature4: ''
        };
        this.tickUrl = '/configs.json';
    }
    tickStart() {
        this.interval = setInterval(
            () => this.getJson(this.tickUrl),
            1000
        );
        var data = [];
        var t = new Date();
        for (var i = 10; i >= 0; i--) {
            var x = new Date(t.getTime() - i * 10000);
            data.push([x, this.temperature]);
        }
        const g = new Dygraph(document.getElementById("div_g"), data,
            {
                // drawPoints: true,
                showRoller: true,
                // valueRange: [20.0, 50.0],
                labels: ['Время', 'Температура']

            });
        this.interval2 = setInterval(
            () => {
                var x = new Date();
                data.push([x, this.temperature]);
                g.updateOptions({'file': data});
            },
            2000
        );
    }
    tickStop() {
        clearInterval(this.interval);
        clearInterval(this.interval2);
    }

    render() {
        return (
            <Tab.Pane eventKey="graphics" onEnter={this.tickStart} onExit={this.tickStop}>
                <p></p>
                {/*<h3>График температуры</h3>*/}
                <div id="div_g"></div>
            </Tab.Pane>
        );
    }
}
export default Graphics;