import React from 'react';
import {
    Col,
    Thumbnail,
    Table,
    FormGroup,
    FormControl,
    Button,
    Form,
    Tab,
    Glyphicon,
    Badge
} from 'react-bootstrap';
import {handleChange, getValidationState100Bool, getValidationState100, getJson, sendRequest} from './util'

class Reflux extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = handleChange.bind(this);
        this.getValidationState100Bool = getValidationState100Bool.bind(this);
        this.getValidationState100 = getValidationState100.bind(this);
        this.sendRequest = sendRequest.bind(this);
        this.getJson = getJson.bind(this);
        this.tickStart = this.tickStart.bind(this);
        this.tickStop = this.tickStop.bind(this);
        this.setReflux = this.setReflux.bind(this);
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
        this.tickUrl = '/reflux.json';
        this.setUrl = '/SetTemp?delta=' + this.state.value + '&setting=' + this.state.setting + '&temperatureAlcoholBoil=' + this.state.temperatureAlcoholBoil;
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

    setReflux() {
        this.sendRequest(this.setUrl);
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
            } = this.state,
            isvalid = this.getValidationState100Bool(value);
        return (
            <Tab.Pane eventKey="reflux" onEnter={this.tickStart} onExit={this.tickStop}>
                <p></p>
                <Col md={3}>
                    <Thumbnail >
                        <div className="svg">
                            <svg width="160" height="300">
                                <style>
                                    { '.svg{text-align:center;}.h{fill:none;stroke-width:2;stroke:#000;}a{fill:none;stroke:#000;}.b{fill:#fff;stroke-width:2;stroke:#000;}.c{line-height:100%;text-align:end;text-anchor:end;}.r{fill:'}{settingAlarmReflux ? 'red' : 'none'}{';stroke-width:2;stroke:#000;}' }
                                </style>
                                <g transform="translate(0 -752)">
                                    <path d="M42 925v5s-32 7-32 18v93c0 2 2 4 4 4h71c2 0 4-2 4-4v-43h6v-4h-6v-46c0-12-32-18-32-18v-5zM42 808v11c-13 0-23 4-23 14v44c2 5 2 16 2 16h3s-1-11 1-16v-42c0-10 17-8 17-8v11h15v-13h7v-4h-7v-13z" className="h"/>
                                    <path d="M50 761c-5 0-8 4-8 8v35h15v-22l1-1-1-12c0-4-3-8-7-8z" className="a"/>
                                    <rect ry="2" rx="2" y="788" x="37" height="4" width="24" className="b"/>
                                    <rect width="24" height="4" x="37" y="779" rx="2" ry="2" className="b"/>
                                    <rect ry="2" rx="2" y="797" x="37" height="4" width="41" className="b"/>
                                    <path d="M42 841v81h15v-59h7v-5h-7v-17z" className="r"/>
                                    <path d="M76 827l16 11h66" className="a"/>
                                    <ellipse cx="72" cy="773" rx="6" ry="6" className="a"/>
                                    <ellipse cx="72" cy="823" rx="6" ry="6" className="a"/>
                                    <ellipse ry="6" rx="6" cy="860" cx="72" className="a"/>
                                    <ellipse ry="6" rx="6" cy="996" cx="104" className="a"/>
                                    <rect ry="2" rx="2" y="771" x="37" height="4" width="24" className="b"/>
                                    <path d="M76 777l16 10h66" className="a"/>
                                    <path d="M109 1000l13 10h36" className="a"/>
                                    <path d="M76 865l16 10h66" className="a"/>
                                    <text x="74.5" y="777" font-size="10" className="d">4</text>
                                    <text x="75" y="826.5" font-size="10" className="d">3</text>
                                    <text x="75" y="863.5" font-size="10" className="d">2</text>
                                    <text x="106.5" y="1000" font-size="10" className="d">1</text>
                                    <text y="782" x="160" font-size="20" className="c">{temperature4}</text>
                                    <text y="833" x="160" font-size="20" className="c">{temperature3}</text>
                                    <text x="160" y="870" font-size="20" className="c">{temperature2}</text>
                                    <text x="160" y="1005" font-size="20" className="c">{temperature}</text>
                                </g>
                            </svg>
                        </div>
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
                            <td><Badge>4</Badge> - &#176; воды на выходе</td>
                            <td><FormControl type="text" value={temperature4} readOnly/></td>
                            <td colSpan="2"></td>
                        </tr>
                        <tr>
                            <td><Badge>3</Badge> - &#176; в узле отбора</td>
                            <td><FormControl type="text" value={temperature3} readOnly/></td>
                            <td colSpan="2"></td>
                        </tr>
                        <tr className={settingAlarmReflux ? 'danger' : 'success'}>
                            <td><Badge>2</Badge> - &#176; в царге</td>
                            <td><FormControl type="text" value={temperature2} readOnly/></td>
                            <td>
                                <Form inline>
                                    <FormGroup validationState={this.getValidationState100(value)}>
                                        <FormControl type="number" value={value} name='value' placeholder="0" onChange={this.handleChange}/>
                                    </FormGroup>{' '}
                                    <Button bsStyle="primary" onClick={this.setReflux} disabled={isLoading || !isvalid}>
                                        {isLoading ? 'Подождите...' : <Glyphicon glyph="save"/>}
                                    </Button>
                                </Form>
                            </td>
                            <td><FormControl type="text" value={setting} readOnly/></td>
                        </tr>
                        <tr>
                            <td><Badge>1</Badge> - &#176; в кубе</td>
                            <td><FormControl type="text" value={temperature} readOnly/></td>
                            <td colSpan="2"></td>
                        </tr>
                        <tr>
                            <td>атмосферное давление</td>
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