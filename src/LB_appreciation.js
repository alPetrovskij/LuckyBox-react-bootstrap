import React from 'react';
import {Tab} from 'react-bootstrap';

class Appreciation extends React.Component {
    render() {
        return (
            <Tab.Pane eventKey="help3">
                <p></p>
                <h3 align="center">Признательность за вклад в проект</h3>
                <dl>
                    <dt>
                        Skalinas
                    </dt>
                    <dd>
                        Реализация алгоритма Брезенхема для управления ТЭНом
                    </dd>
                    <dt>
                        Роман
                    </dt>
                    <dd>
                        Сильно помог сдвинуться с мертвой точки, при изучении JavaScript
                    </dd>
                    <dt>
                        KD с форума homedistiller.ru
                    </dt>
                    <dd>
                        У него подсмотрел алгоритм затирания зерновых
                    </dd>
                    <dt>
                        Сергей Третьяков
                    </dt>
                    <dd>
                        У него на сайте http://esp8266-arduinoide.ru/ подсмотрел реализацию системы обновления настроек
                        WIFI, SSDP и еще кучу полезного.
                    </dd>
                    <dt>
                        ers
                    </dt>
                    <dd>
                        За дельные советы и ссылки
                    </dd>
                    <dt>
                        www.esp8266.ru
                    </dt>
                    <dd>
                        Очень полезный ресурс. Дает массу информации для размышления
                    </dd>
                </dl>
            </Tab.Pane>
        );
    }
}
export default Appreciation;