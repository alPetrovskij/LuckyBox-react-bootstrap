import React from 'react';
import {Button, Form, ControlLabel, FormGroup, Tab, FormControl, Table, PageHeader} from 'react-bootstrap';
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
            value: ''
        };
        this.tickUrl = '/heater.json';
        this.setUrl = "/SetHeaterPower?heaterPower=" + this.state.value;
    }

    tickStart() {
        this.interval = setInterval(
            () => {
                // console.log('heater tickStart');
                this.getJson(this.tickUrl, 0)
            },
            1000
        );
    }

    tickStop() {
        // console.log('heater tickStop');
        clearInterval(this.interval);
    }

    setHeater() {
        this.sendRequest(this.setUrl);
    }

    componentDidMount() {
        this.tickStart()
    }

    render() {
        const {value, isLoading} = this.state,
            isvalid = this.getValidationState100Bool(value);
        return (
            <Tab.Pane eventKey="heater" onEnter={this.tickStart} onExit={this.tickStop}>
                <PageHeader>
                    Мощность ТЭНа <small></small>
                </PageHeader>
                <Table hover>
                    <tbody>
                    <tr>
                        <td>
                            <Form inline>
                                <FormGroup validationState={this.getValidationState100(value)}>
                                    <ControlLabel>Мощность ТЭНа</ControlLabel>{' '}
                                    <FormControl type="number" value={value} name='value' placeholder="0" onChange={this.handleChange}/>
                                </FormGroup>{' '}
                                <Button bsStyle="primary" onClick={this.setHeater} disabled={isLoading || !isvalid}>
                                    {isLoading ? 'Подождите...' : 'Задать'}
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