import React from 'react';
import App from './App';
import {
    Col,
    Thumbnail,
    Table,
    FormGroup,
    FormControl,
    InputGroup,
    Tab
} from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import {
    handleChange,
    getValidationState100,
    getValidationState100Bool,
    getValidationStateTPauseBool,
    getValidationStateTPause,
    sendRequest,
    getJson
} from './util'
class Brewing extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = handleChange.bind(this);
        this.getValidationState100 = getValidationState100.bind(this);
        this.getValidationState100Bool = getValidationState100Bool.bind(this);
        this.getValidationStateTPauseBool = getValidationStateTPauseBool.bind(this);
        this.getValidationStateTPause = getValidationStateTPause.bind(this);
        this.sendRequest = sendRequest.bind(this);
        this.getJson = getJson.bind(this);
        this.tickStart = this.tickStart.bind(this);
        this.setBrew = this.setBrew.bind(this);
        this.startBrew = this.startBrew.bind(this);
        this.stopBrew = this.stopBrew.bind(this);
        this.state = {
            isLoading: false,
            time: '',
            pauseTime1: '',
            pauseTemp1: '',
            pauseTime2: '',
            pauseTemp2: '',
            pauseTime3: '',
            pauseTemp3: '',
            pauseTime4: '',
            pauseTemp4: '',
            startBrewing: 0,
            stepBrewing: 0,
            statusPause1: false,
            statusPause2: false,
            statusPause3: false,
            statusPause4: false,
            temperature: ''
        };
        this.tickUrl = '/brewing.json';
        this.setUrl = "/SettingBrewing?startBrewing=";
    }

    componentDidMount() {
        this.getJson(this.tickUrl, 1)
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

    setBrew() {
        this.sendRequest(this.setUrl+ this.state.startBrewing + "&stepBrewing=" + this.state.stepBrewing +
            "&pauseTemp1=" + this.state.pauseTemp1 + "&pauseTemp2=" + this.state.pauseTemp2 +
            "&pauseTemp3=" + this.state.pauseTemp3 + "&pauseTemp4=" + this.state.pauseTemp4 +
            "&pauseTime1=" + this.state.pauseTime1 + "&pauseTime2=" + this.state.pauseTime2 +
            "&pauseTime3=" + this.state.pauseTime3 + "&pauseTime4=" + this.state.pauseTime4);
    }

    startBrew() {
        this.startBrewing = 1;
        this.stepBrewing = 1;
        this.setBrew();
    }

    stopBrew() {
        this.startBrewing = 0;
        this.stepBrewing = 0;
        this.setBrew();
        this.sendRequest("/SetHeaterPower?heaterPower=0");
    }

    render() {
        const {
            isLoading,
            pauseTime1,
            pauseTemp1,
            pauseTime2,
            pauseTemp2,
            pauseTime3,
            pauseTemp3,
            pauseTime4,
            pauseTemp4,
            statusPause1,
            statusPause2,
            statusPause3,
            statusPause4,
            time,
            temperature
        } = this.state,
            activePause = statusPause1 ? '1' : statusPause2 ? '2' : statusPause3 ? '3' : statusPause4 ? '4' : 'n/a';

        const isvalid = this.getValidationStateTPauseBool(pauseTime1)
            && this.getValidationStateTPauseBool(pauseTime2)
            && this.getValidationStateTPauseBool(pauseTime3)
            && this.getValidationStateTPauseBool(pauseTime4)
            && this.getValidationState100Bool(pauseTemp1)
            && this.getValidationState100Bool(pauseTemp2)
            && this.getValidationState100Bool(pauseTemp3)
            && this.getValidationState100Bool(pauseTemp4);
        return (
            <Tab.Pane eventKey="brewing" onEnter={this.tickStart}>
                <p></p>
                <Col smOffset={3} sm={6} mdOffset={0} md={4}>
                    <Thumbnail>
                        <div className="svg">
                            <svg width="80%" height="80%" viewBox="0 0 170 200">
                                <style>
                                    {'.svg{text-align:center;}.o{fill:none;stroke:'}{ App.online ? 'green' : 'black'}{';stroke-width:2;}.a{fill:none;stroke:#000;}.b{fill:#fff;stroke:#000;}.c{fill:#33c3ff;stroke-width:2;stroke:#000;}.d{text-align:end;text-anchor:end;}.f{fill:red;stroke-width:2;stroke:#000;}.e{fill:#fff;stroke:#000;stroke-width:2;}'}
                                </style>
                                <path d="M23 47h65" className="e"/>
                                <g transform="translate(6 -852)">
                                    <path d="M93 993c11 18 38 4 67 8" className="a"/>
                                    <path d="M93 886.5c11 18 38 4 67 8" className="a"/>
                                    <path d="M-1.84 864.37c0 2.83.45 147.27.7 161.1.2 11.02 10.98 3.19 10.98 8.7v6.83c0 2 2.16 4 4.16 4h71c2 0 4-2 4-4v-45h4v-4h-4v-83.4c0-6.83-10.22-6.56-10.22-6.56l-.43 105.5h-58.4v-105.5s-10.11-.17-10.11 6.56v114.7c0 5.52-6.8 4.62-6.79.21-.25-12.9-.39-144.52-.4-154.47l6.12 6.12A11.69 11.69 0 0 0 24.9 891.3l11.5 11.49c.78.78 1.25 29.21 1.25 29.21h2.69s.33-31.93-.45-32.7l-11.5-11.5a11.69 11.69 0 0 0-16.13-16.14l-10.14-9.9c-2.44-1.25-4.03.16-3.96 2.61z" className="e"/>
                                    <rect x="60" y="1025" width="24" height="4" rx="2" ry="2" className="f"/>
                                    <rect x="60" y="1016" width="24" height="4" ry="2" rx="2" className="f"/>
                                    <rect width="37" height="4" x="60" y="1034" rx="2" ry="2" className="f"/>
                                    <circle cy="1001" cx="107" r="6" className="b"/>
                                    <circle cx="107" cy="895" r="6" className="b"/>
                                    <text x="160" y="890" fontSize="14" className="d">{activePause ? activePause : 'n/a'}</text>
                                    <text x="160" y="997" fontSize="14" className="d">{temperature ? temperature : 'n/a'}&#176;</text>
                                    <text x="104" y="899" fontSize="10">P</text>
                                    <text x="104" y="1005" fontSize="10">1</text>
                                </g>
                                <text x="19" y="35" fontSize="15">M</text>
                                <path d="M100.1 23.6a6.5 6.5 0 0 1 2.84 5.36 6.46 6.46 0 1 1-10.07-5.36M96.48 21.01V29" className="o"/>
                            </svg>
                        </div>
                    </Thumbnail>
                </Col>
                <Col sm={12} md={8}>
                    <FormGroup>
                        <InputGroup>
                            <FormControl type="text" value={time} readOnly/>
                            <InputGroup.Button>
                                <Button bsStyle="success" onClick={this.startBrew} disabled={isLoading || !isvalid}>Старт</Button>
                                <Button bsStyle="danger" onClick={this.stopBrew} disabled={isLoading || !isvalid}>Стоп</Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </FormGroup>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>Пауза</th>
                            <th>Время паузы</th>
                            <th>&#176; паузы</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className={statusPause1 ? 'success' : 'default'}>
                            <td>1</td>
                            <td>
                                <FormGroup validationState={this.getValidationStateTPause(pauseTime1)}>
                                    <InputGroup>
                                        <FormControl type="number" value={pauseTime1} name='pauseTime1' placeholder="0" onChange={this.handleChange}/>
                                        <InputGroup.Addon>мин.</InputGroup.Addon>
                                    </InputGroup>
                                </FormGroup>
                            </td>
                            <td>
                                <FormGroup validationState={this.getValidationState100(pauseTemp1)}>
                                    <InputGroup>
                                        <FormControl type="number" value={pauseTemp1} name='pauseTemp1' placeholder="0" onChange={this.handleChange}/>
                                        <InputGroup.Addon>&#176;</InputGroup.Addon>
                                    </InputGroup>
                                </FormGroup>
                            </td>
                        </tr>
                        <tr className={statusPause2 ? 'success' : 'default'}>
                            <td>2</td>
                            <td>
                                <FormGroup validationState={this.getValidationStateTPause(pauseTime2)}>
                                    <InputGroup>
                                        <FormControl type="number" value={pauseTime2} name='pauseTime2' placeholder="0" onChange={this.handleChange}/>
                                        <InputGroup.Addon>мин.</InputGroup.Addon>
                                    </InputGroup>
                                </FormGroup>
                            </td>
                            <td>
                                <FormGroup validationState={this.getValidationState100(pauseTemp2)}>
                                    <InputGroup>
                                        <FormControl type="number" value={pauseTemp2} name='pauseTemp2' placeholder="0" onChange={this.handleChange}/>
                                        <InputGroup.Addon>&#176;</InputGroup.Addon>
                                    </InputGroup>
                                </FormGroup>
                            </td>
                        </tr>
                        <tr className={statusPause3 ? 'success' : 'default'}>
                            <td>3</td>
                            <td>
                                <FormGroup validationState={this.getValidationStateTPause(pauseTime3)}>
                                    <InputGroup>
                                        <FormControl type="number" value={pauseTime3} name='pauseTime3' placeholder="0" onChange={this.handleChange}/>
                                        <InputGroup.Addon>мин.</InputGroup.Addon>
                                    </InputGroup>
                                </FormGroup>
                            </td>
                            <td>
                                <FormGroup validationState={this.getValidationState100(pauseTemp3)}>
                                    <InputGroup>
                                        <FormControl type="number" value={pauseTemp3} name='pauseTemp3' placeholder="0" onChange={this.handleChange}/>
                                        <InputGroup.Addon>&#176;</InputGroup.Addon>
                                    </InputGroup>
                                </FormGroup>
                            </td>
                        </tr>
                        <tr className={statusPause4 ? 'success' : 'default'}>
                            <td>4</td>
                            <td>
                                <FormGroup validationState={this.getValidationStateTPause(pauseTime4)}>
                                    <InputGroup>
                                        <FormControl type="number" value={pauseTime4} name='pauseTime4' placeholder="0" onChange={this.handleChange}/>
                                        <InputGroup.Addon>мин.</InputGroup.Addon>
                                    </InputGroup>
                                </FormGroup>
                            </td>
                            <td>
                                <FormGroup validationState={this.getValidationState100(pauseTemp4)}>
                                    <InputGroup>
                                        <FormControl type="number" value={pauseTemp4} name='pauseTemp4' placeholder="0" onChange={this.handleChange}/>
                                        <InputGroup.Addon>&#176;</InputGroup.Addon>
                                    </InputGroup>
                                </FormGroup>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                <Button bsStyle="primary" loading={isLoading} onClick={this.setBrew} disabled={isLoading || !isvalid}>
                                    Задать
                                </Button>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </Tab.Pane>
        );
    }
}
export default Brewing;