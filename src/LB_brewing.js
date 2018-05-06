import React from 'react';
import {
    Col,
    Thumbnail,
    Table,
    FormGroup,
    FormControl,
    Button,
    InputGroup,
    Tab,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';
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
        this.tickStop = this.tickStop.bind(this);
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
            statusPause4: false
        };
        this.tickUrl = '/brewing.json';
        this.setUrl = "/SettingBrewing?startBrewing=" + this.state.startBrewing + "&stepBrewing=" + this.state.stepBrewing +
            "&pauseTemp1=" + this.state.pauseTemp1 + "&pauseTemp2=" + this.state.pauseTemp2 +
            "&pauseTemp3=" + this.state.pauseTemp3 + "&pauseTemp4=" + this.state.pauseTemp4 +
            "&pauseTime1=" + this.state.pauseTime1 + "&pauseTime2=" + this.state.pauseTime2 +
            "&pauseTime3=" + this.state.pauseTime3 + "&pauseTime4=" + this.state.pauseTime4;
    }

    tickStart() {
        this.interval = setInterval(
            () => this.getJson(this.tickUrl, 1),
            1000
        );
    }

    tickStop() {
        clearInterval(this.interval);
    }

    setBrew() {
        this.sendRequest(this.setUrl);
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
        this.sendRequest("/SetHeaterPower?heaterPower=" + 0);
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
                time
            } = this.state,
            activePause = statusPause1 ? '1' : statusPause2 ? '2' : statusPause3 ? '3' : statusPause4 ? '4' : 'нажите старт для начала работы';

        const isvalid = this.getValidationStateTPauseBool(pauseTime1)
            && this.getValidationStateTPauseBool(pauseTime2)
            && this.getValidationStateTPauseBool(pauseTime3)
            && this.getValidationStateTPauseBool(pauseTime4)
            && this.getValidationState100Bool(pauseTemp1)
            && this.getValidationState100Bool(pauseTemp2)
            && this.getValidationState100Bool(pauseTemp3)
            && this.getValidationState100Bool(pauseTemp4);
        return (
            <Tab.Pane eventKey="brewing" onEnter={this.tickStart} onExit={this.tickStop}>
                <p></p>
                <Col md={3}>
                    <Thumbnail src="/LB_brewing.png">
                        <ListGroup>
                            <ListGroupItem>Подключите датчики согласно рисунка</ListGroupItem>
                            <ListGroupItem>
                                <small>Подключите насос и отрегулируйте подачу сусла</small>
                            </ListGroupItem>
                            <ListGroupItem>
                                <small>Т1, температура в заторе</small>
                            </ListGroupItem>
                            <ListGroupItem>
                                <small>Пауза: {activePause}</small>
                            </ListGroupItem>
                        </ListGroup>
                    </Thumbnail>
                </Col>
                <Col md={9}>
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
                            <th className="col-sm-3 col-md-5">Время паузы</th>
                            <th className="col-sm-3 col-md-5">&#176; паузы</th>
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
                                <Button bsStyle="primary" onClick={this.setBrew} disabled={isLoading || !isvalid}>
                                    {isLoading ? 'Подождите...' : 'Задать'}
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