import React from 'react';
import {FormGroup, FormControl, Button, Form, Table, Alert, Tab} from 'react-bootstrap';
import {handleChange, getJson, getValidationState} from './util'

class Settings extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = handleChange.bind(this);
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
        this.sendRequestArr = this.sendRequestArr.bind(this);
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
    }

    handleDismiss() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    setSSDP() {
        const url = "/ssdp?ssdp=" + this.state.ssdp;
        this.sendRequestArr(url, 'isLoadingSSDP');
    }

    setSSID() {
        const url = "/ssid?ssid=" + this.state.ssid + "&password=" + encodeURIComponent(this.state.password);
        this.sendRequestArr(url, 'isLoadingSSID');
        alert("Изменения вступят в силу после перезагрузки. Пожалуйста перезагрузите устройство.");
    }

    setSSIDAP() {
        const url = "/ssidap?ssidAP=" + this.state.ssidAP + "&passwordAP=" + encodeURIComponent(this.state.passwordAP);
        this.sendRequestArr(url, 'isLoadingSSIDAP');
        alert("Изменения вступят в силу после перезагрузки. Пожалуйста перезагрузите устройство.");

    }

    setTIMEZONE() {
        const url = "/TimeZone?timezone=" + this.state.timezone;
        this.sendRequestArr(url, 'isLoadingTIMEZONE');
    }

    setAUTOTIMEZONE() {
        const set_date = new Date();
        const gmtHours = -set_date.getTimezoneOffset() / 60;
        this.setState({timezone: gmtHours});
        const url = "/TimeZone?timezone=" + gmtHours;
        this.sendRequestArr(url, 'isLoadingAUTOTIMEZONE');
    }

    restart() {
        this.handleDismiss();
        const url = "/restart?device=ok";
        this.sendRequestArr(url, 'isLoadingRESTART');
    }

    sendRequestArr(url, respBool) {
        this.setState({
            isLoading: true,
            [respBool]: true
        });
        const opt = {method: 'get'};
        fetch(url, opt)
            .then((response) => {
                if (response.ok) {
                    console.log('res.ok');
                    this.setState({
                        isLoading: false
                    });
                    setTimeout(() => {
                        this.setState({
                            [respBool]: false
                        });
                    }, 1000);
                } else {
                    console.log('Network response was not ok.');
                }
            });
    }

    componentDidMount() {
        this.getJson("/configs.json")
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
        } = this.state;

        const isvalidSSDP = /^[a-zA-Zа-яА-Я.]{1,15}$/.test(ssdp),
            isvalidSSID = /^[a-zA-Zа-яА-Я.]{1,15}$/.test(ssid) && /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password),
            isvalidSSIDAP = /^[a-zA-Zа-яА-Я.]{1,15}$/.test(ssidAP) && /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passwordAP),
            isvalidTIMEZONE = /^[0-9]{1,3}$/.test(timezone);

        if (show) {
            return (
                <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                    <h4>Вы действительно хотите перезагрузить устройство?</h4>
                    {/*<p>*/}
                    {/*Change this and that and try again. Duis mollis, est non commodo*/}
                    {/*luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.*/}
                    {/*Cras mattis consectetur purus sit amet fermentum.*/}
                    {/*</p>*/}
                    <p>
                        <Button
                            bsStyle="danger"
                            onClick={this.restart}
                        >
                            Да
                        </Button>
                        <span> or </span>
                        <Button
                            onClick={this.handleDismiss}
                        >
                            Нет
                        </Button>
                    </p>
                </Alert>
            );
        }
        return (
            <Tab.Pane eventKey="settings">
                <p></p>
                <Table hover>
                    <tbody>
                    <tr>
                        <td>Обновление</td>
                        <td>
                            <Form inline>
                                <Button
                                    href="/edit"
                                    bsStyle="primary"
                                    bsSize="small"
                                    disabled={isLoading}
                                >
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
                                    <FormControl
                                        type="file"
                                        name='file'
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>{' '}
                                <Button
                                    type="submit"
                                    bsStyle="primary"
                                    disabled={isLoading}
                                >
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
                                    <FormControl
                                        type="text"
                                        value={ssdp}
                                        placeholder="Имя устройства"
                                        name='ssdp'
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>{' '}
                                <Button
                                    bsStyle="primary"
                                    onClick={!isLoading ? this.setSSDP : null}
                                    disabled={isLoading || !isvalidSSDP}
                                >
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
                                    <FormControl
                                        type="text"
                                        value={ssid}
                                        placeholder="Имя WiFi сети"
                                        name='ssid'
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>{' '}
                                <FormGroup validationState={this.getValidationState(password, 'password')}>
                                    <FormControl
                                        type="text"
                                        value={password}
                                        placeholder="Пароль"
                                        name='password'
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>{' '}
                                <Button
                                    bsStyle="primary"
                                    onClick={!isLoading ? this.setSSID : null}
                                    disabled={isLoading || !isvalidSSID}
                                >
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
                                    <FormControl
                                        type="text"
                                        value={ssidAP}
                                        placeholder="Имя WiFi сети"
                                        name='ssidAP'
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>{' '}
                                <FormGroup validationState={this.getValidationState(passwordAP, 'password')}>
                                    <FormControl
                                        type="text"
                                        value={passwordAP}
                                        placeholder="Пароль"
                                        name='passwordAP'
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>{' '}
                                <Button
                                    bsStyle="primary"
                                    onClick={!isLoading ? this.setSSIDAP : null}
                                    disabled={isLoading || !isvalidSSIDAP}
                                >
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
                                    <FormControl
                                        type="text"
                                        value={timezone}
                                        placeholder="Часовой пояс"
                                        name='timezone'
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>{' '}
                                <Button
                                    bsStyle="primary"
                                    onClick={!isLoading ? this.setTIMEZONE : null}
                                    disabled={isLoading || !isvalidTIMEZONE}
                                >
                                    {isLoadingTIMEZONE ? 'Подождите...' : 'Сохранить'}
                                </Button>{' '}
                                <Button
                                    bsStyle="primary"
                                    onClick={!isLoading ? this.setAUTOTIMEZONE : null}
                                    disabled={isLoading}
                                >
                                    {isLoadingAUTOTIMEZONE ? 'Подождите...' : 'Авто определение и сохранение зоны'}
                                </Button>
                            </Form>
                        </td>
                    </tr>
                    <tr>
                        <td>Перезагрузка устройства</td>
                        <td>
                            <Form inline>
                                <Button
                                    bsStyle="danger"
                                    onClick={!isLoading ? this.handleShow : null}
                                    disabled={isLoading}
                                >
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

