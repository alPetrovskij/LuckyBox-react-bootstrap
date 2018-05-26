import React from 'react';
import {Tab} from 'react-bootstrap';
import {getJson} from './util';
import App from './App';

class Camera extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.getJson = getJson.bind(this);
        this.tickStart = this.tickStart.bind(this);
        this.state = {
            cameraURL: ''
        };
        this.tickUrl = '/heater.json';
    }

    tickStart() {
        clearInterval(App.onlineTick);

        App.onlineTick = setInterval(
            () => {
                this.getJson(this.tickUrl, 0, this)
            },
            1000
        );
    }
    render() {
        return (
            <Tab.Pane eventKey="camera" onEnter={this.tickStart}>
                <p></p>
                {/*<img alt="camera" src={this.state.cameraURL ? this.state.cameraURL : 'http://10.0.1.20:8081'} width="100%"/>*/}
                <img alt="camera" src={this.state.cameraURL ? this.state.cameraURL : 'http://192.168.1.86:8081'} width="100%"/>
            </Tab.Pane>
        );
    }
}
export default Camera;