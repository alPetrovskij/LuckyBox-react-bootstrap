import React from 'react';
import {connect} from 'react-redux';
import {Tab, MenuItem, Nav, Row, NavItem, NavDropdown, Badge} from 'react-bootstrap';
import Settings from './LB_settings';
import Graphics from './LB_graphics';
import Appreciation from './LB_appreciation';
import Distillation from './LB_distillation';
import Reflux from './LB_reflux';
import Brewing from './LB_brewing';
import Heater from './LB_heater';
import Camera from './camera.js';
import SettingSensors from './LB_settingSensors';
import './index.css';
import './App.css';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class App extends React.Component {

    static onlineTick = null;

    onOnline = () => {
        this.props.onOnlineOn();
    };
    onOnSetHeater = (val) => {
        this.props.onOnSetHeater(val);
    };

    constructor(props, context) {
        super(props, context);
        this.onsideBar = this.onsideBar.bind(this);
        this.state = {
            active: false
        };
    }

    onsideBar() {
        console.log('-------------------onsideBar')
        this.setState(prevState => ({
            active: !prevState.active
        }));
    }

    render() {
        return (
            <Tab.Container id="tab1" defaultActiveKey="home" className="wrapper">
                <Row className="clearfix">
                <nav id="sidebar" className={ this.state.active ? 'active' : ''}>
                        <Nav id="paddingTop" bsStyle="pills" stacked>
                            <NavItem onSelect={this.onsideBar} className="ml" eventKey="home"><Badge bsStyle={this.props.online ? 'success' : 'danger'}>Дом</Badge></NavItem>
                            <NavItem onSelect={this.onsideBar} className="ml" eventKey="settings">Настройки</NavItem>
                            <NavItem onSelect={this.onsideBar} className="ml" eventKey="graphics">Графики</NavItem>
                            <NavDropdown className="ml" title="Помощь">
                                <MenuItem onSelect={this.onsideBar} eventKey="settingSensors">Подключение датчиков</MenuItem>
                                <MenuItem onSelect={this.onsideBar} eventKey="help2" href="https://luckycenter.ru/mnogofunkcionalnaja-avtomatika-luckybox">Обновление прошивки</MenuItem>
                                <MenuItem onSelect={this.onsideBar} eventKey="help3">Благодарности</MenuItem>
                                <MenuItem onSelect={this.onsideBar} eventKey="help4" href="https://luckycenter.ru/forum/konstruktorskoe-bjuro/avtomatizacija/avtomatika-luckybox">Форум поддержки</MenuItem>
                            </NavDropdown>

                        </Nav>
                    </nav>
                    <div id="content">
                            <button type="button" id="sidebarCollapse" className="btn btn-info navbar-btn" onClick={this.onsideBar}>
                                <i className="glyphicon glyphicon-align-left"></i>
                                {/*<span>Toggle Sidebar</span>*/}
                            </button>
                        <CSSTransitionGroup
                            transitionName="carousel"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}>
                            <img key='a1' alt="Заставка" src="headerLB.jpg" width="100%"/>
                        </CSSTransitionGroup>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="home"><Navigation2 onOnSetHeater={this.onOnSetHeater} onOnline={this.onOnline} online={this.props.online} heaterVal={this.props.heaterVal}/></Tab.Pane>
                            <Settings/>
                            <Graphics/>
                            <SettingSensors/>
                            <Appreciation/>
                        </Tab.Content>
                    </div>
                </Row>
            </Tab.Container>
        );
    }
}
export default connect(
    state => ({
        online: state.online,
        heaterVal: state.heaterVal
    }),
    dispatch => ({
        onOnlineOn: () => {
            dispatch({type: 'ONLINE_ON'});
        },
        onOnSetHeater: (val) => {
            dispatch({type: 'HEATER_VAL', payload: val});
        }
    })
)(App);

class Navigation2 extends React.Component {
    render() {
        return (
            <Tab.Container id="tab2" defaultActiveKey="heater">
                <Row className="clearfix">
                    <Nav bsStyle="tabs">
                        <NavItem eventKey="distillation">Дистилляция</NavItem>
                        <NavItem eventKey="reflux">РК</NavItem>
                        <NavItem eventKey="brewing">Затирание</NavItem>
                        <NavItem eventKey="heater">Мощность ТЭНа</NavItem>
                        <NavItem eventKey="camera">Камера</NavItem>
                    </Nav>
                    <Tab.Content animation>
                        <Distillation heaterVal={ this.props.heaterVal } online={ this.props.online} onOnline={this.props.onOnline}/>
                        <Reflux heaterVal={ this.props.heaterVal } online={ this.props.online } onOnline={this.props.onOnline}/>
                        <Brewing online={ this.props.online } onOnline={this.props.onOnline}/>
                        <Heater onOnSetHeater={this.props.onOnSetHeater} onOnline={this.props.onOnline}/>
                        <Camera/>
                    </Tab.Content>
                </Row>
            </Tab.Container>
        );
    }
}

