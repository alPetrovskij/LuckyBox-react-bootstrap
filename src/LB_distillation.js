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
                    <Thumbnail>
                        <div className="svg">
                            <svg width="160" height="300" >
                                <style>
                                    { '.svg{text-align:center;}.a{fill:none;stroke-width:2;stroke:#000;}.b{fill:none;stroke:#000;}.c{fill:#fff;stroke-width:2;stroke:#000;}.d{text-align:end;text-anchor:end;}' }
                                </style>
                                <g transform="translate(0 -752)">
                                    <path d="M42 860v70a40 20 0 0 0-32 16v95c0 2 2 4 4 4h71c2 0 4-2 4-4v-43h12l2-2v-1l-2-1H89v-46-2a40 20 0 0 0-32-16v-70H42z" className="a"/>
                                    <path d="M42 807v22H27a6 6 0 0 0-4-2 6 6 0 0 0-6 6 6 6 0 0 0 2 4v49c3 2 2 6 2 9h3c0-3-1-7 2-9v-48a6 6 0 0 0 2-2h14v21h15v-23h14l2-1v-1l-2-2H57v-23H42z" className="a"/>
                                    <path d="M49.5 761c-4 0-8 4-8 8v35h16v-22-13c0-4-3-8-8-8z" className="b"/>
                                    <path d="M70 779l22 14h60M95 1005l22 14h36M68 842l22 14h62" className="b"/>
                                    <rect width="36" height="4" x="37" y="770" rx="2" ry="2" className="c"/>
                                    <rect ry="2" rx="2" y="788" x="37" height="4" width="24" className="c"/>
                                    <rect width="24" height="4" x="37" y="779" rx="2" ry="2" className="c"/>
                                    <rect ry="2" rx="2" y="797" x="37" height="4" width="24" className="c"/>
                                    <text y="789" x="154" fontSize="20" className="d">{tempWater}</text>
                                    <text y="851" x="154" fontSize="20" className="d">{tempTakeOff}</text>
                                    <text x="154" y="1015" fontSize="20" className="d">{tempTank}</text>
                                    <text y="989" x="94" fontSize="13">1</text>
                                    <text y="825" x="64" fontSize="13">2</text>
                                    <text x="64" y="767" fontSize="13">3</text>
                                </g>
                            </svg>
                        </div>
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
                            <td><Badge>3</Badge> - &#176; воды на выходе</td>
                            <td><FormControl type="text" value={tempWater} readOnly/></td>
                            <td colSpan="2"></td>
                        </tr>
                        <tr>
                            <td><Badge>2</Badge> - &#176; в узле отбора</td>
                            <td><FormControl type="text" value={tempTakeOff} readOnly/></td>
                            <td colSpan="2"></td>
                        </tr>
                        <tr className={settingAlarmDistillation ? 'danger' : 'success'}>
                            <td><Badge>1</Badge> - &#176; в кубе</td>
                            <td><FormControl type="text" value={tempTank} readOnly/></td>
                            <td>
                                <Form inline>
                                    <FormGroup validationState={this.getValidationState100(value)}>
                                        <FormControl type="number" value={value} name='value' placeholder="0" onChange={this.handleChange}/>
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