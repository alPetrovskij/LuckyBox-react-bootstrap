import React from 'react';
import {
    Col,
    Thumbnail,
    Table,
    FormGroup,
    FormControl,
    Form,
    Tab,
    Button,
    Glyphicon,
    ListGroup,
    ListGroupItem,
    Badge
} from 'react-bootstrap';
import {handleChange, getValidationState100Bool, getValidationState100, getJson, sendRequest} from './util'

class Distillation extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = handleChange.bind(this);
        this.getValidationState100Bool = getValidationState100Bool.bind(this);
        this.getValidationState100 = getValidationState100.bind(this);
        this.sendRequest = sendRequest.bind(this);
        this.getJson = getJson.bind(this);
        this.tickStart = this.tickStart.bind(this);
        this.tickStop = this.tickStop.bind(this);
        this.setTank = this.setTank.bind(this);
        this.state = {
            isLoading: false,
            tempWater: '',
            tempTakeOff: '',
            tempTank: '',
            settingTank: '',
            value: '',
            settingAlarmDistillation: false
        };
        this.tickUrl = '/distillation.json';
        this.setUrl = '/SetTempTank?SettingTank=' + this.state.value;
    }

    tickStart() {
        this.interval = setInterval(
            () => this.getJson(this.tickUrl, 0),
            1000
        );
    }

    tickStop() {
        clearInterval(this.interval);
    }

    setTank() {
        this.sendRequest(this.setUrl);
    }

    render() {
        const {
                tempWater,
                tempTakeOff,
                tempTank,
                settingTank,
                value,
                settingAlarmDistillation,
                isLoading
            } = this.state,
            isvalid = this.getValidationState100Bool(value);
        return (
            <Tab.Pane eventKey="distillation" onEnter={this.tickStart} onExit={this.tickStop}>
                <p></p>
                <Col md={3}>
                    <Thumbnail src="/LB_distillator.png">
                        <ListGroup>
                            <ListGroupItem>Подключите датчики согласно рисунка</ListGroupItem>
                            <ListGroupItem>
                                <small>3 - <Badge>{tempWater}&#176;</Badge> воды на выходе из дефлегматора</small>
                            </ListGroupItem>
                            <ListGroupItem>
                                <small>2 - <Badge>{tempTakeOff}&#176;</Badge> в узле отбора</small>
                            </ListGroupItem>
                            <ListGroupItem bsStyle={settingAlarmDistillation ? 'danger' : 'success'}>
                                <small>1 - <Badge>{tempTank}&#176;</Badge> в кубе</small>
                            </ListGroupItem>
                        </ListGroup>
                    </Thumbnail>
                </Col>
                <Col md={9}>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>Температура</th>
                            <th className="col-sm-2 col-md-3">Значение</th>
                            <th>Установка</th>
                            <th className="col-sm-2 col-md-3">Уставка</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>&#176; Воды на выходе</td>
                            <td><FormControl type="text" value={tempWater} readOnly/></td>
                            <td colSpan="2"></td>
                        </tr>
                        <tr>
                            <td>&#176; в узле отбора</td>
                            <td><FormControl type="text" value={tempTakeOff} readOnly/></td>
                            <td colSpan="2"></td>
                        </tr>
                        <tr className={settingAlarmDistillation ? 'danger' : 'success'}>
                            <td>&#176; в кубе</td>
                            <td><FormControl type="text" value={tempTank} readOnly/></td>
                            <td>
                                <Form inline>
                                    <FormGroup validationState={this.getValidationState100(value)}>
                                        <FormControl type="number" value={value} name='value' placeholder="число от 1 до 100" onChange={this.handleChange}/>
                                    </FormGroup>{' '}
                                    <Button bsStyle="primary" onClick={this.setTank} disabled={isLoading || !isvalid}>
                                        {isLoading ? 'Подождите...' : <Glyphicon glyph="save"/>}
                                    </Button>
                                </Form>
                            </td>
                            <td><FormControl type="text" value={settingTank} readOnly/></td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Tab.Pane>
        );
    }
}
export default Distillation;