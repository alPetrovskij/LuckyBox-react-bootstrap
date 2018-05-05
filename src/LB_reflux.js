import React from 'react';
import {Col, Thumbnail, Table, FormGroup, FormControl, Button, Form, Tab, Glyphicon, ListGroup, ListGroupItem, Badge} from 'react-bootstrap';
import {handleChange, getValidationState100Bool, getValidationState100, getJson, sendRequest} from './util'

class Reflux extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = handleChange.bind(this);
        this.getValidationState100Bool = getValidationState100Bool.bind(this);
        this.getValidationState100 = getValidationState100.bind(this);
        this.sendRequest = sendRequest.bind(this);
        this.getJson = getJson.bind(this);
        this.setReflux = this.setReflux.bind(this);
        this.tickStart = this.tickStart.bind(this);
        this.tickStop = this.tickStop.bind(this);
        this.state = {
            isLoading: false,
            temperature4: '',
            temperature3: '',
            temperature2: '',
            temperature: '',
            settingAlarmReflux: false,
            value: '',
            setting: '',
            pressure: '',
            temperatureAlcoholBoil: ''
        };
    }
    setReflux() {
        this.sendRequest("/SetTemp?delta=" + this.state.value + "&setting=" + this.state.setting + "&temperatureAlcoholBoil=" + this.state.temperatureAlcoholBoil);
    }
    tickStart() {
        this.interval = setInterval(
            () => this.getJson("/reflux.json", 0),
            1000
        );
    }
    tickStop() {
        clearInterval(this.interval);
    }
    render() {
        const {
            isLoading,
            temperature,
            temperature2,
            temperature3,
            temperature4,
            settingAlarmReflux,
            value,
            setting,
            pressure,
            temperatureAlcoholBoil
        } = this.state;
        const isvalid = this.getValidationState100Bool(value);
        return (
            <Tab.Pane eventKey="reflux" onEnter={this.tickStart} onExit={this.tickStop}>
                <p></p>
                <Col md={3}>
                    <Thumbnail src="/LB_reflux.png">
                        <ListGroup>
                            <ListGroupItem>Подключите датчики согласно рисунка</ListGroupItem>
                            <ListGroupItem><small>4 - <Badge>{temperature4}&#176;</Badge> воды на выходе из дефлегматора</small></ListGroupItem>
                            <ListGroupItem><small>3 - <Badge>{temperature3}&#176;</Badge> в узле отбора</small></ListGroupItem>
                            <ListGroupItem bsStyle = {settingAlarmReflux ? 'danger' : 'success'}><small>2 - <Badge>{temperature2}&#176;</Badge> в царге</small></ListGroupItem>
                            <ListGroupItem><small>1 - <Badge>{temperature}&#176;</Badge> в кубе</small></ListGroupItem>
                        </ListGroup>
                    </Thumbnail>
                </Col>
                <Col md={9}>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>Параметр</th>
                            <th className="col-sm-2">Значение</th>
                            <th>Дельта</th>
                            <th className="col-sm-2">Уставка</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>&#176; Воды на выходе</td>
                            <td><FormControl type="text" value={temperature4} readOnly/></td>
                            <td colSpan="2"></td>
                        </tr>
                        <tr>
                            <td>&#176; в узле отбора</td>
                            <td><FormControl type="text" value={temperature3} readOnly/></td>
                            <td colSpan="2"></td>
                        </tr>
                        <tr className={settingAlarmReflux ? 'danger' : 'success'}>
                            <td>&#176; в царге</td>
                            <td><FormControl type="text" value={temperature2} readOnly/></td>
                            <td>
                                <Form inline>
                                    <FormGroup validationState={this.getValidationState100(value)}>
                                        <FormControl
                                            type="number"
                                            value={value}
                                            name='value'
                                            placeholder="число от 1 до 100"
                                            onChange={this.handleChange}/>
                                    </FormGroup>{' '}
                                    <Button
                                        bsStyle="primary"
                                        onClick={this.setReflux}
                                        disabled={isLoading || !isvalid}
                                    >
                                        {isLoading ? 'Подождите...' : <Glyphicon glyph="save"/>}
                                    </Button>
                                </Form>
                            </td>
                            <td><FormControl type="text" value={setting} readOnly/></td>
                        </tr>
                        <tr>
                            <td>&#176; в кубе</td>
                            <td><FormControl type="text" value={temperature} readOnly/></td>
                            <td colSpan="2"></td>
                        </tr>
                        <tr>
                            <td>Атмосферное давление</td>
                            <td><FormControl type="text" value={pressure} readOnly/></td>
                            <td colSpan="2"></td>
                        </tr>
                        <tr>
                            <td>&#176; кипения спирта при данном давлении</td>
                            <td><FormControl type="text" value={temperatureAlcoholBoil} readOnly/></td>
                            <td colSpan="2"></td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Tab.Pane>
        );
    }
}
export default Reflux;