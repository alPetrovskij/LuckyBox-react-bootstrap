import React from 'react';
import {FormGroup, FormControl, Button, Form, Table, Alert, Tab} from 'react-bootstrap';
import {handleChange, getJson, getValidationState, sendRequest} from './util'

class Settings extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = handleChange.bind(this);
        this.sendRequest = sendRequest.bind(this);
        this.getJson = getJson.bind(this);
        this.getValidationState = getValidationState.bind(this);
        this.setSSDP = this.setSSDP.bind(this);
        this.setSSID = this.setSSID.bind(this);
        this.setSSIDAP = this.setSSIDAP.bind(this);
        this.setTIMEZONE = this.setTIMEZONE.bind(this);
        this.setAUTOTIMEZONE = this.setAUTOTIMEZONE.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.restart = this.restart.bind(this);
        this.tickStart = this.tickStart.bind(this);
        this.tickStop = this.tickStop.bind(this);
        this.state = {
            show: false,
            isLoading: false,
            isLoadingSSDP: false,
            isLoadingSSID: false,
            isLoadingSSIDAP: false,
            isLoadingTIMEZONE: false,
            isLoadingAUTOTIMEZONE: false,
            isLoadingRESTART: false,
            ssdp: '',
            ssid: '',
            password: '',
            timezone: '',
            ssidAP: '',
            passwordAP: ''
        };
        this.tickUrl = '/configs.json';
        this.setUrlSSDP = "/ssdp?ssdp=" + this.state.ssdp;
        this.setUrlSSID = "/ssid?ssid=" + this.state.ssid + "&password=" + encodeURIComponent(this.state.password);
        this.setUrlSSIDAP = "/ssidap?ssidAP=" + this.state.ssidAP + "&passwordAP=" + encodeURIComponent(this.state.passwordAP);
        this.setUrlTIMEZONE = "/TimeZone?timezone=" + this.state.timezone;
        this.setUrlRESTART = "/restart?device=ok";
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

    handleDismiss() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    setSSDP() {
        this.sendRequest(this.setUrlSSDP);
    }

    setSSID() {
        this.sendRequest(this.setUrlSSID);
        alert("Изменения вступят в силу после перезагрузки. Пожалуйста перезагрузите устройство.");
    }

    setSSIDAP() {
        this.sendRequest(this.setUrlSSIDAP);
        alert("Изменения вступят в силу после перезагрузки. Пожалуйста перезагрузите устройство.");
    }

    setTIMEZONE() {
        this.sendRequest(this.setUrlTIMEZONE);
    }

    setAUTOTIMEZONE() {
        const set_date = new Date();
        const gmtHours = -set_date.getTimezoneOffset() / 60;
        this.setState({timezone: gmtHours});
        this.sendRequest(this.setUrlTIMEZONE);
    }

    restart() {
        this.handleDismiss();
        this.sendRequest(this.setUrlRESTART);
    }

    render() {
        const {
                isLoading,
                isLoadingSSDP,
                isLoadingSSID,
                isLoadingSSIDAP,
                isLoadingTIMEZONE,
                isLoadingAUTOTIMEZONE,
                isLoadingRESTART,
                show,
                ssdp,
                ssid,
                password,
                ssidAP,
                passwordAP,
                timezone,
            } = this.state,
            isvalidSSDP = /^[0-9a-zA-Zа-яА-Я.()]{1,15}$/.test(ssdp),
            isvalidSSID = /^[0-9a-zA-Zа-яА-Я.()]{1,15}$/.test(ssid) && /(?=.*\d)(?=.*[a-z]).{6,}/.test(password),
            isvalidSSIDAP = /^[0-9a-zA-Zа-яА-Я.()]{1,15}$/.test(ssidAP) && /(?=.*\d)(?=.*[a-z]).{6,}/.test(passwordAP),
            isvalidTIMEZONE = /^[0-9]{1,3}$/.test(timezone);

        if (show) {
            return (
                <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                    <h4>Вы действительно хотите перезагрузить устройство?</h4>
                    <p>
                        <Button bsStyle="danger" onClick={this.restart}>Да</Button>
                        <span> or </span>
                        <Button onClick={this.handleDismiss}>Нет</Button>
                    </p>
                </Alert>
            );
        }
        return (
            <Tab.Pane eventKey="settings" onEnter={this.tickStart} onExit={this.tickStop}>
                <p></p>
                <Table hover>
                    <tbody>
                    <tr>
                        <td>Обновление</td>
                        <td>
                            <Form inline>
                                <Button href="/edit" bsStyle="primary" bsSize="small" disabled={isLoading}>
                                    Открыть редактор HTML
                                </Button>
                            </Form>
                        </td>
                    </tr>
                    <tr>
                        <td>Загрузить прошивку (bin)</td>
                        <td>
                            <Form inline method="POST" action="/update">
                                <FormGroup>
                                    <FormControl type="file" name='file' onChange={this.handleChange}/>
                                </FormGroup>{' '}
                                <Button type="submit" bsStyle="primary" disabled={isLoading}>Загрузить</Button>
                            </Form>
                        </td>
                    </tr>
                    <tr>
                        <td>Имя устройства</td>
                        <td>
                            <Form inline>
                                <FormGroup validationState={this.getValidationState(ssdp, 'name')}>
                                    <FormControl type="text" value={ssdp} placeholder="Имя устройства" name='ssdp' onChange={this.handleChange}/>
                                </FormGroup>{' '}
                                <Button bsStyle="primary" onClick={!isLoading ? this.setSSDP : null} disabled={isLoading || !isvalidSSDP}>
                                    {isLoadingSSDP ? 'Подождите...' : 'Сохранить'}
                                </Button>
                            </Form>
                        </td>
                    </tr>
                    <tr>
                        <td>Подключение к WiFi роутеру</td>
                        <td>
                            <Form inline>
                                <FormGroup validationState={this.getValidationState(ssid, 'name')}>
                                    <FormControl type="text" value={ssid} placeholder="Имя WiFi сети" name='ssid' onChange={this.handleChange}/>
                                </FormGroup>{' '}
                                <FormGroup validationState={this.getValidationState(password, 'password')}>
                                    <FormControl type="text" value={password} placeholder="Пароль" name='password' onChange={this.handleChange}/>
                                </FormGroup>{' '}
                                <Button bsStyle="primary" onClick={!isLoading ? this.setSSID : null} disabled={isLoading || !isvalidSSID}>
                                    {isLoadingSSID ? 'Подождите...' : 'Сохранить'}
                                </Button>
                            </Form>
                        </td>
                    </tr>
                    <tr>
                        <td>Точка доступа</td>
                        <td>
                            <Form inline>
                                <FormGroup validationState={this.getValidationState(ssidAP, 'name')}>
                                    <FormControl type="text" value={ssidAP} placeholder="Имя WiFi сети" name='ssidAP' onChange={this.handleChange}/>
                                </FormGroup>{' '}
                                <FormGroup validationState={this.getValidationState(passwordAP, 'password')}>
                                    <FormControl type="text" value={passwordAP} placeholder="Пароль" name='passwordAP' onChange={this.handleChange}/>
                                </FormGroup>{' '}
                                <Button bsStyle="primary" onClick={!isLoading ? this.setSSIDAP : null} disabled={isLoading || !isvalidSSIDAP}>
                                    {isLoadingSSIDAP ? 'Подождите...' : 'Сохранить'}
                                </Button>
                            </Form>
                        </td>
                    </tr>
                    <tr>
                        <td>Часовой пояс</td>
                        <td>
                            <Form inline>
                                <FormGroup validationState={this.getValidationState(timezone, 'timez')}>
                                    <FormControl type="text" value={timezone} placeholder="Часовой пояс" name='timezone' onChange={this.handleChange}/>
                                </FormGroup>{' '}
                                <Button bsStyle="primary" onClick={!isLoading ? this.setTIMEZONE : null} disabled={isLoading || !isvalidTIMEZONE}>
                                    {isLoadingTIMEZONE ? 'Подождите...' : 'Сохранить'}
                                </Button>{' '}
                                <Button bsStyle="primary" onClick={!isLoading ? this.setAUTOTIMEZONE : null} disabled={isLoading}>
                                    {isLoadingAUTOTIMEZONE ? 'Подождите...' : 'Авто определение и сохранение зоны'}
                                </Button>
                            </Form>
                        </td>
                    </tr>
                    <tr>
                        <td>Перезагрузка устройства</td>
                        <td>
                            <Form inline>
                                <Button bsStyle="danger" onClick={!isLoading ? this.handleShow : null} disabled={isLoading}>
                                    {isLoadingRESTART ? 'Подождите...' : 'Перезагрузить'}
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
export default Settings;

