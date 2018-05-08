import App from './App';
export function handleChange(e) {
    let fieldName = e.target.name;
    let fleldVal = e.target.value;
    this.setState({[fieldName]: fleldVal});
}

export function getValidationState(val, type) {
    if (val === '')
        return null;
    var re;
    switch (type) {
        case 'name':
            re = /^[0-9a-zA-Zа-яА-Я.()]{1,15}$/;
            break;
        case 'password':
            re = /(?=.*\d)(?=.*[a-z]).{6,}/;
            break;
        case 'timez':
            re = /^[0-9]{1,3}$/;
            break;
        default:

    }
    var ret = re.test(val);
    return ret ? "success" : "error";
}

export function getValidationState100Bool(val) {
    if (val < 0 || val > 100)
        return false;
    return true;
}

export function getValidationState100(val) {
    if (val > -1 && val < 101)
        return 'success';
    else if (val < 0 || val > 100)
        return 'error';
    return null;
}

export function getValidationStateTPauseBool(val) {
    if (val < 0)
        return 'error';
    else if (val > -1)
        return 'success';
    return null;
}

export function getValidationStateTPause(val) {
    if (val < 0)
        return 'error';
    else if (val > -1)
        return 'success';
    return null;
}
export function getJson(url, arg) {
    fetch(url)
        .then((response) => {
            if (response.ok) {
                if(arg === 0) {
                    App.restarttickOnline();
                }
            } else{
                // console.log('Network response was not ok.');
            }
        })
        .then(res => res.json())
        .then(
            (result) => {
                if(arg === 1){
                    const ss = {
                        time: result.time,
                        stepBrewing: result.stepBrewing
                    };
                    switch (result.stepBrewing) {
                        case '1':
                        case '2':
                            ss.statusPause1 = true;
                            break;
                        case '3':
                        case '4':
                            ss.statusPause2 = true;
                            break;
                        case '5':
                        case '6':
                            ss.statusPause3 = true;
                            break;
                        case '7':
                        case '8':
                            ss.statusPause4 = true;
                            break;
                        default:
                            break;
                    }
                    this.setState(ss);
                }else {
                    for (var property in result) {
                        this.setState({[property]: result[property]});
                    }
                }
            },
            (error) => {
                console.log('json err ' + error);
            }
        )
}

export function sendRequest(url) {
    this.setState({isLoading: true});
    const opt = {method: 'get'};
    fetch(url, opt)
        .then((response) => {
            if (response.ok) {
                console.log('res.ok');
                setTimeout(() => {
                    this.setState({
                        isLoading: false
                    });
                }, 1000);
            }
            // else
                // console.log('Network response was not ok.');
        });
}