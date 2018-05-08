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
                            <svg width="160" height="300">
                                <style>
                                    { '.r1{fill:'}{settingAlarmDistillation ? 'red' : 'none'}{';stroke-width:2;stroke:#000;}.a{fill:none;stroke:#000;}.b{fill:#fff;stroke:#000;}.c{fill:#33c3ff;stroke-width:2;stroke:#000;}.d{text-align:end;text-anchor:end;}.f{fill:red;stroke-width:2;stroke:#000;}.e{fill:#fff;stroke:#000;stroke-width:2;}' }
                                </style>
                                <g transform="translate(0 -752)">
                                    <path d="M62 823c32 30 67 11 96 14M62 779c23 30 67 10 96 13M93 993c11 18 38 4 67 8M92 1033c11 17 39 6 68 9" className="a"/>
                                    <path d="M42 925v5s-32 7-32 18v93c0 2 2 4 4 4h71c2 0 4-2 4-4v-45h4v-4h-4v-44c0-12-32-18-32-18v-5z" className="r1"/>
                                    <path d="M42 808v11c-13 0-23 4-23 14v44c2 5 2 16 2 16h2s0-11 2-16v-42c0-10 17-8 17-8v11h15v-13h5v-4h-5v-13zM50 765c-7 5-8 6-8 10v29h15v-29c0-4 0-5-7-10z" className="e"/>
                                    <path d="M42 841v81h15v-81z" className="e"/>
                                    <rect x="38" y="796" width="24" height="4" rx="2" ry="2" className="c"/>
                                    <rect x="38" y="779" width="32" height="4" rx="2" ry="2" className="c"/>
                                    <rect x="38" y="788" width="24" height="4" ry="2" rx="2" className="c"/>
                                    <rect x="60" y="1020" width="24" height="4" rx="2" ry="2" className="f"/>
                                    <rect x="60" y="1011" width="24" height="4" rx="2" ry="2" className="f"/>
                                    <rect x="60" y="1029" width="37" height="4" rx="2" ry="2" className="f"/>
                                    <circle cx="107" cy="840" r="6" className="b"/>
                                    <circle cx="107" cy="797" r="6" className="b"/>
                                    <circle cx="107" cy="1001" r="6" className="b"/>
                                    <circle cx="107" cy="1042" r="6" className="b"/>
                                    <text x="160" y="789" fontSize="20" className="d">{tempWater}</text>
                                    <text x="160" y="833" fontSize="20" className="d">{tempTakeOff}</text>
                                    <text x="160" y="997" fontSize="20" className="d">{tempTank}</text>
                                    <text x="160" y="1039" fontSize="20" className="d">{}</text>
                                    <text x="103" y="801" fontSize="10">4</text>
                                    <text x="104" y="844" fontSize="10">3</text>
                                    <text x="104" y="1005" fontSize="10">2</text>
                                    <text x="104" y="1046" fontSize="10">1</text>
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