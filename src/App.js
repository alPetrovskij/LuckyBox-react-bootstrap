import React from 'react';
import {Tab, MenuItem, Nav, Row, Col, NavItem, NavDropdown, Badge} from 'react-bootstrap';
import Settings from './LB_settings';
import Graphics from './LB_graphics';
import Appreciation from './LB_appreciation';
import Distillation from './LB_distillation';
import Reflux from './LB_reflux';
import Brewing from './LB_brewing';
import Heater from './LB_heater';
import Camera from './camera.js';
import './index.css';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class App extends React.Component {
    static online = true;
    static onlineTick = null;

    static tickStartOnline() {
        this.intervalOnline = setInterval(
            () => {
                this.online = false;
            },
            3000
        );
    }

    static restarttickOnline() {
        this.online = true;
        clearInterval(this.intervalOnline);
        this.tickStartOnline();
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            onlineT: true
        };
        this.tickOnline = this.tickOnline.bind(this);
    }

    tickOnline() {
        setInterval(
            () => {
                this.setState({
                    onlineT: this.constructor.online
                });
                console.log('onlineT ' + this.constructor.online);
            },
            2000
        );
    }


    componentDidMount() {
        this.constructor.tickStartOnline();
        this.tickOnline();
    }

    render() {
        const {onlineT} = this.state;
        return (
            <Tab.Container id="tab1" defaultActiveKey="home">
                <Row className="clearfix">
                    <Col sm={12}>
                        <Nav bsStyle="tabs">
                            <NavItem eventKey="home"><Badge bsStyle={onlineT ? 'success' : 'danger'}>Дом</Badge></NavItem>
                            <NavItem eventKey="settings">Настройки</NavItem>
                            <NavItem eventKey="graphics">Графики</NavItem>
                            <NavDropdown title="Помощь">
                                <MenuItem eventKey="help1">Подключение датчиков</MenuItem>
                                <MenuItem eventKey="help2" href="https://luckycenter.ru/mnogofunkcionalnaja-avtomatika-luckybox">Обновление
                                    прошивки</MenuItem>
                                <MenuItem eventKey="help3">Благодарности</MenuItem>
                                <MenuItem divider/>
                                <MenuItem eventKey="help4" href="https://luckycenter.ru/forum/konstruktorskoe-bjuro/avtomatizacija/avtomatika-luckybox">Форум
                                    поддержки</MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <CSSTransitionGroup
                            transitionName="carousel"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}>
                            <Header />
                        </CSSTransitionGroup>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="home"><Navigation2 onl = {this.state.onlineT} /></Tab.Pane>
                            <Settings/>
                            <Graphics/>
                            <Tab.Pane eventKey="help1">Подключение датчиков</Tab.Pane>
                            <Appreciation/>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
}
export default App;

class Navigation2 extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            heatervalue: 0
        };
    }

    heaterCB = (dataFromHeater) => {
        this.setState({heatervalue: dataFromHeater});
    };

    render() {
        return (
            <Tab.Container id="tab2" defaultActiveKey="heater">
                <Row className="clearfix">
                    <Col sm={12}>
                        <Nav bsStyle="tabs">
                            <NavItem eventKey="distillation">Дистилляция</NavItem>
                            <NavItem eventKey="reflux">РК</NavItem>
                            <NavItem eventKey="brewing">Затирание</NavItem>
                            <NavItem eventKey="heater">Мощность ТЭНа</NavItem>
                            <NavItem eventKey="camera">Камера</NavItem>
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content animation>
                            <Distillation heaterVal={ this.state.heatervalue } onl={ this.props.onl } />
                            <Reflux heaterVal={ this.state.heatervalue } onl={ this.props.onl }/>
                            <Brewing onl={ this.props.onl } />
                            <Heater callbackFromParent={this.heaterCB}/>
                            <Camera/>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <img key='a1' alt="Заставка" src="headerLB.jpg" width="100%"/>
                    </div>
                </div>
            </div>
        );
    }
}

