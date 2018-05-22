import React from 'react';
import App from './App';
import {FormGroup, FormControl, Form, Table, Alert, Tab, InputGroup} from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import {handleChange, getJson, getValidationState, sendRequest, sendRequestFile} from './util'

class Settings extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.handleChange = handleChange.bind(this);
        this.sendRequest = sendRequest.bind(this);
        this.sendRequestFile = sendRequestFile.bind(this);
        this.getJson = getJson.bind(this);
        this.getValidationState = getValidationState.bind(this);
        this.setUPDATE0 = this.setUPDATE0.bind(this);
        this.setUPDATE100 = this.setUPDATE100.bind(this);
        this.setSSDP = this.setSSDP.bind(this);
        this.setSSDP = this.setSSDP.bind(this);
        this.setSSID = this.setSSID.bind(this);
        this.setSSIDAP = this.setSSIDAP.bind(this);
        this.setTIMEZONE = this.setTIMEZONE.bind(this);
        this.setAUTOTIMEZONE = this.setAUTOTIMEZONE.bind(this);
        this.setCAMERA = this.setCAMERA.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.restart = this.restart.bind(this);
        this.tickStart = this.tickStart.bind(this);
        this.state = {
            show: false,
            isLoading: false,
            isLoadingUPDATE0: false,
            isLoadingUPDATE100: false,
            isLoadingSSDP: false,
            isLoadingSSID: false,
            isLoadingSSIDAP: false,
            isLoadingTIMEZONE: false,
            isLoadingAUTOTIMEZONE: false,
            isvalidCAMERA: false,
            isLoadingRESTART: false,
            update0: '',
            update100: '',
            ssdp: '',
            ssid: '',
            password: '',
            timezone: '',
            ssidAP: '',
            passwordAP: '',
            cameraURL: ''
        };
        this.tickUrl = '/configs.json';
        this.urlUPDATE0 = "/update?cmd=0";
        this.urlUPDATE100 = "/update?cmd=100";
        this.urlSSDP = "/ssdp?ssdp=";
        this.urlSSID = "/ssid?ssid=";
        this.urlSSIDAP = "/ssidap?ssidAP=";
        this.urlTIMEZONE = "/TimeZone?timezone=";
        this.urlCAMERA = "/camera?cameraurl=";
        this.urlRESTART = "/restart?device=ok";
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

    handleDismiss() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    setUPDATE0() {
        this.setState({isLoadingUPDATE0: true});
        this.sendRequestFile(this.urlUPDATE0, 'isLoadingUPDATE0', this.state.update0);
    }
    setUPDATE100() {
        this.setState({isLoadingUPDATE100: true});
        this.sendRequestFile(this.urlUPDATE100, 'isLoadingUPDATE100', this.state.update100);
    }

    setSSDP() {
        this.setState({isLoadingSSDP: true});
        this.sendRequest(this.urlSSDP + this.state.ssdp, 'isLoadingSSDP');
    }

    setSSID() {
        this.setState({isLoadingSSID: true});
        this.sendRequest(this.urlSSID + this.state.ssid + "&password=" + encodeURIComponent(this.state.password), 'isLoadingSSID');
        alert("Изменения вступят в силу после перезагрузки. Пожалуйста перезагрузите устройство.");
    }

    setSSIDAP() {
        this.setState({isLoadingSSIDAP: true});
        this.sendRequest(this.urlSSIDAP + this.state.ssidAP + "&passwordAP=" + encodeURIComponent(this.state.passwordAP), 'isLoadingSSIDAP');
        alert("Изменения вступят в силу после перезагрузки. Пожалуйста перезагрузите устройство.");
    }

    setTIMEZONE() {
        this.setState({isLoadingTIMEZONE: true});
        this.sendRequest(this.urlTIMEZONE + this.state.timezone, 'isLoadingTIMEZONE');
    }

    setAUTOTIMEZONE() {
        this.setState({isLoadingAUTOTIMEZONE: true});
        const set_date = new Date();
        const gmtHours = -set_date.getTimezoneOffset() / 60;
        this.setState({timezone: gmtHours});
        this.sendRequest(this.urlTIMEZONE + this.state.timezone, 'isLoadingAUTOTIMEZONE');
    }

    setCAMERA() {
        this.setState({isLoadingCAMERA: true});
        this.sendRequest(this.urlCAMERA + this.state.cameraURL, 'isLoadingCAMERA');
    }

    restart() {
        this.setState({isLoadingRESTART: true});
        this.handleDismiss();
        this.sendRequest(this.urlRESTART, 'isLoadingRESTART');
    }

    render() {
        var {
                isLoading,
                isLoadingUPDATE0,
                isLoadingUPDATE100,
                isLoadingSSDP,
                isLoadingSSID,
                isLoadingSSIDAP,
                isLoadingTIMEZONE,
                isLoadingAUTOTIMEZONE,
                isLoadingRESTART,
                isLoadingCAMERA,
                show,
                update0,
                update100,
                ssdp,
                ssid,
                password,
                ssidAP,
                passwordAP,
                timezone,
                cameraURL
            } = this.state,
            isvalidSSDP = /^[0-9a-zA-Zа-яА-Я.()]{1,15}$/.test(ssdp),
            isvalidSSID = /^[0-9a-zA-Zа-яА-Я.()]{1,15}$/.test(ssid) && /(?=.*\d)(?=.*[a-z]).{6,}/.test(password),
            isvalidSSIDAP = /^[0-9a-zA-Zа-яА-Я.()]{1,15}$/.test(ssidAP) && /(?=.*\d)(?=.*[a-z]).{6,}/.test(passwordAP),
            isvalidTIMEZONE = /^[0-9]{1,3}$/.test(timezone),
            isvalidCAMERA = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
                .test(cameraURL);

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
            <Tab.Pane eventKey="settings" onEnter={this.tickStart}>
                <p></p>
                <Table hover>
                    <tbody>
                    {/*<tr>*/}
                    {/*<td>Обновление</td>*/}
                    {/*<td>*/}
                    {/*<Form inline>*/}
                    {/*<Button href="/edit" bsStyle="primary" bsSize="small" disabled={isLoading}>*/}
                    {/*Открыть редактор HTML*/}
                    {/*</Button>*/}
                    {/*</Form>*/}
                    {/*</td>*/}
                    {/*</tr>*/}
                    <tr>
                        <td>Загрузить прошивку (bin)</td>
                        <td>
                            {/*<Form inline method="POST" action="/update?cmd=0">*/}
                            <Form inline>
                                <FormGroup>
                                    <FormControl type="file" value={update0} name='update0' onChange={this.handleChange}/>
                                </FormGroup>{' '}
                                {/*<Button type="submit" bsStyle="primary" disabled={isLoading}>Загрузить</Button>*/}
                                <Button loading={isLoadingUPDATE0} bsStyle="primary" onClick={!isLoading ? this.setUPDATE0 : null} disabled={isLoading}>
                                    Загрузить
                                </Button>
                            </Form>
                        </td>
                    </tr>
                    <tr>
                        <td>Загрузить (WEBсервер)</td>
                        <td>
                            {/*<Form inline method="POST" action="/update?cmd=100">*/}
                            <Form inline>
                                <FormGroup>
                                    <FormControl type="file" value={update100} name='update100' onChange={this.handleChange}/>
                                </FormGroup>{' '}
                                {/*<Button type="submit" bsStyle="primary" disabled={isLoading}>Загрузить</Button>*/}
                                <Button loading={isLoadingUPDATE100} bsStyle="primary" onClick={!isLoading ? this.setUPDATE100 : null} disabled={isLoading}>
                                    Загрузить
                                </Button>
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
                                <Button loading={isLoadingSSDP} bsStyle="primary" onClick={!isLoading ? this.setSSDP : null} disabled={isLoading || !isvalidSSDP}>
                                    Сохранить
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
                                <Button loading={isLoadingSSID} bsStyle="primary" onClick={!isLoading ? this.setSSID : null} disabled={isLoading || !isvalidSSID}>
                                    Сохранить
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
                                <Button loading={isLoadingSSIDAP} bsStyle="primary" onClick={!isLoading ? this.setSSIDAP : null} disabled={isLoading || !isvalidSSIDAP}>
                                    Сохранить
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
                                <FormGroup>
                                    <InputGroup.Button>
                                        <Button bsStyle="primary" onClick={!isLoading ? this.setTIMEZONE : null} disabled={isLoading || !isvalidTIMEZONE} loading={isLoadingTIMEZONE}>Сохранить</Button>
                                        <Button bsStyle="primary" onClick={!isLoading ? this.setAUTOTIMEZONE : null} disabled={isLoading} loading={isLoadingAUTOTIMEZONE}>Авто
                                            определение и сохранение зоны</Button>
                                    </InputGroup.Button>
                                </FormGroup>
                            </Form>
                        </td>
                    </tr>
                    <tr>
                        <td>URL камеры</td>
                        <td>
                            <Form inline>
                                <FormGroup validationState={this.getValidationState(cameraURL, 'url')}>
                                    <FormControl type="text" value={cameraURL} placeholder="URL камеры" name='cameraURL' onChange={this.handleChange}/>
                                </FormGroup>{' '}
                                <Button loading={isLoadingCAMERA} bsStyle="primary" onClick={!isLoading ? this.setCAMERA : null} disabled={isLoading || !isvalidCAMERA}>
                                    Сохранить
                                </Button>
                            </Form>
                        </td>
                    </tr>
                    <tr>
                        <td>Перезагрузка устройства</td>
                        <td>
                            <Form inline>
                                <Button bsStyle="danger" onClick={!isLoading ? this.handleShow : null} disabled={isLoading} loading={isLoadingRESTART}>
                                    Перезагрузить
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

