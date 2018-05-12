import React from 'react';
import {Form, ControlLabel, FormGroup, Tab, FormControl, Table} from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import {
    handleChange,
    getValidationState100Bool,
    getValidationState100,
    getJson,
    sendRequest
} from './util'

class Heater extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.sendRequest = sendRequest.bind(this);
        this.handleChange = handleChange.bind(this);
        this.getValidationState100Bool = getValidationState100Bool.bind(this);
        this.getValidationState100 = getValidationState100.bind(this);
        this.getJson = getJson.bind(this);
        this.tickStart = this.tickStart.bind(this);
        this.tickStop = this.tickStop.bind(this);
        this.setHeater = this.setHeater.bind(this);
        this.state = {
            isLoading: false,
            valueHeater: ''
        };
        this.tickUrl = '/heater.json';
        this.setUrl = "/SetHeaterPower?heaterPower=" + this.state.valueHeater + "&heaterStatus=1";
    }

    tickStart() {
        this.interval = setInterval(
            () => {
                this.getJson(this.tickUrl, 0)
            },
            1000
        );
    }

    tickStop() {
        clearInterval(this.interval);
    }

    setHeater() {
        this.sendRequest(this.setUrl);
    }

    componentDidMount() {
        this.tickStart()
    }

    render() {
        const {valueHeater, isLoading} = this.state,
            isvalid = this.getValidationState100Bool(valueHeater);
        return (
            <Tab.Pane eventKey="heater" onEnter={this.tickStart} onExit={this.tickStop}>
                <p></p>
                <Table hover>
                    <tbody>
                    <tr>
                        <td>
                            <Form inline>
                                <FormGroup validationState={this.getValidationState100(valueHeater)}>
                                    <ControlLabel>Мощность ТЭНа</ControlLabel>{' '}
                                    <FormControl type="number" value={valueHeater} name='valueHeater' placeholder="0" onChange={this.handleChange}/>
                                </FormGroup>{' '}
                                <Button bsStyle="primary" loading={isLoading} onClick={this.setHeater} disabled={isLoading || !isvalid}>
                                    Задать
                                </Button>
                            </Form>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Tab.Pane>
        );
    }
}
export default Heater;