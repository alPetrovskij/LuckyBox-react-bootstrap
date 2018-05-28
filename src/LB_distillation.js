import React from 'react';
import App from './App';
import {
    Col,
    Thumbnail,
    Table,
    FormGroup,
    FormControl,
    InputGroup,
    Tab,
    Badge
} from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import {handleChange, getValidationState100Bool, getValidationState100, getJson, sendRequest} from './util';


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
            temperature3: '',
            temperature2: '',
            temperature: '',
            settingTank: '',
            valueDistillation: '',
            settingAlarmDistillation: false,
            settingAlarmDistillationFlash: false
        };
        this.tickUrl = '/distillation.json';
        this.setUrl = '/SetTempTank?SettingTank=';
    }

    tickStart() {
        clearInterval(App.onlineTick);
        console.log('---------------------tickStart');
        App.onlineTick = setInterval(
            () => {
                this.getJson(this.tickUrl, 0, this)
            },
            1000
        );

        this.flash = setInterval(
            () => {
                if(this.state.settingAlarmDistillation){
                    // this.setState({settingAlarmDistillationFlash: !this.state.settingAlarmDistillationFlash})

                    this.setState(prevState => ({
                        settingAlarmDistillationFlash: !prevState.settingAlarmDistillationFlash
                    }));

                }
            },
            1000
        );
    }
    tickStop() {
        clearInterval(this.flash);
        console.log('---------------------tickStop');
    }

    setTank() {
        this.sendRequest(this.setUrl + this.state.valueDistillation);
    }

    render() {
        const {
                temperature3,
                temperature2,
                temperature,
                settingTank,
                valueDistillation,
                settingAlarmDistillation,
                settingAlarmDistillationFlash,
                isLoading
            } = this.state,
            isvalid = this.getValidationState100Bool(valueDistillation);
        return (
            <Tab.Pane eventKey="distillation" onEnter={this.tickStart} onExit={this.tickStop}>
                <p></p>
                <Col smOffset={3} sm={6} mdOffset={0} md={4}>
                    <Thumbnail>
                        <div className="svg">
                            <svg width="80%" height="80%" viewBox="0 0 160 300">
                                <style>
                                    { '.svg{text-align:center;}.o{fill:none;stroke:'}{ this.props.onl ? 'green' : 'black'}{';stroke-width:2;}.r1{fill:'}{settingAlarmDistillationFlash ? 'red' : 'none'}{';stroke-width:2;stroke:#000;}.a{fill:none;stroke:#000;}.b{fill:#fff;stroke:#000;}.c{fill:#33c3ff;stroke-width:2;stroke:#000;}.d{text-align:end;text-anchor:end;}.f{fill:red;stroke-width:2;stroke:#000;}.e{fill:#fff;stroke:#000;stroke-width:2;}' }
                                </style>
                                <g transform="translate(0 -752)">
                                    <path d="M62 823c32 30 67 11 96 14M62 779c23 30 67 10 96 13M93 993c11 18 38 4 67 8M92 1033c11 17 39 6 68 9" className="a"/>
                                    <path d="M42 925.5v5s-32 7-32 18v93c0 2 2 4 4 4h71c2 0 4-2 4-4v-45h4v-4h-4v-44c0-12-32-18-32-18v-5z" className="r1"/>
                                    <path d="M42 807.5v11c-13 0-23 4-23 14v44c2 5 2 16 2 16h2s0-11 2-16v-42c0-10 17-8 17-8v11h15v-13h5v-4h-5v-13zm0-31V804h15v-30.6c-5.3 2.8-10.6 2.8-15 0z" className="e"/>
                                    <path d="M42 841v81h15v-81z" className="e"/>
                                    <rect x="38" y="779" width="32" height="4" rx="2" ry="2" className="c"/>
                                    <rect x="38" y="787" width="24" height="4" ry="2" rx="2" className="c"/>
                                    <rect x="38" y="795" width="24" height="4" rx="2" ry="2" className="c"/>
                                    <rect x="60" y="1020" width="24" height="4" rx="2" ry="2" className="f"/>
                                    <rect x="60" y="1011" width="24" height="4" rx="2" ry="2" className="f"/>
                                    <rect x="60" y="1029" width="37" height="4" rx="2" ry="2" className="f"/>
                                    <circle cx="107" cy="840" r="6" className="b"/>
                                    <circle cx="107" cy="797" r="6" className="b"/>
                                    <circle cx="107" cy="1001" r="6" className="b"/>
                                    <circle cx="107" cy="1042" r="6" className="b"/>
                                    <text x="160" y="789" fontSize="12" className="d">{temperature3 ? temperature3 : 'n/a'}&#176;</text>
                                    <text x="160" y="833" fontSize="12" className="d">{temperature2 ? temperature2 : 'n/a'}&#176;</text>
                                    <text x="160" y="997" fontSize="12" className="d">{temperature ? temperature : 'n/a'}&#176;</text>
                                    <text x="160" y="1039" fontSize="12" className="d">{this.props.heaterVal}</text>
                                    <text x="104" y="801" fontSize="10">4</text>
                                    <text x="104" y="844" fontSize="10">3</text>
                                    <text x="104" y="1005" fontSize="10">2</text>
                                    <text x="104" y="1046" fontSize="10">1</text>
                                </g>
                                <path d="M49.4 4.4v8" className="o"/>
                                <path d="M53 6.9a6.5 6.5 0 0 1 2.9 5.4 6.5 6.5 0 1 1-10.1-5.4" className="o"/>
                            </svg>
                        </div>
                    </Thumbnail>
                </Col>
                <Col sm={12} md={8}>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>Температура</th>
                            <th>Значение</th>
                            <th>Установка&nbsp;&nbsp;&nbsp;&nbsp;</th>
                            <th>Уставка</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><Badge>4</Badge> - &#176; воды на выходе</td>
                            <td><FormControl type="text" value={temperature3} readOnly/></td>
                            <td colSpan="2"></td>
                        </tr>
                        <tr>
                            <td><Badge>3</Badge> - &#176; в узле отбора</td>
                            <td><FormControl type="text" value={temperature2} readOnly/></td>
                            <td colSpan="2"></td>
                        </tr>
                        <tr className={settingAlarmDistillation ? 'danger' : 'success'}>
                            <td><Badge>2</Badge> - &#176; в кубе</td>
                            <td><FormControl type="text" value={temperature} readOnly/></td>
                            <td>
                                <FormGroup validationState={this.getValidationState100(valueDistillation)}>
                                    <InputGroup>
                                        <FormControl type="number" value={valueDistillation} name='valueDistillation' placeholder="0" onChange={this.handleChange}/>
                                        <InputGroup.Button>
                                            <Button bsStyle="primary" loading={isLoading} onClick={this.setTank} disabled={isLoading || !isvalid}>&#62;</Button>
                                        </InputGroup.Button>
                                    </InputGroup>
                                </FormGroup>
                            </td>
                            <td><FormControl type="text" value={settingTank} readOnly/></td>
                        </tr>
                        <tr>
                            <td><Badge>1</Badge> - мощность тена</td>
                            <td><FormControl type="text" value={this.props.heaterVal} readOnly/></td>
                            <td colSpan="2"></td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Tab.Pane>
        );
    }
}
export default Distillation;