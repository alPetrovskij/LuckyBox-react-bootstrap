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
        case 'url':
            re = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
            break;
        default:
            return "error"
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


export function getJson(url, arg, component) {

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');
    var myInit = {
        method: 'PUT',
        headers: myHeaders,
    };
    fetch(url, myInit)
    // .then((response) => {
    //     if (!response.ok)
    //         console.log('Network response was not ok.');
    // })
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
                console.log('---------json result ' + JSON.stringify(result));

                if (arg === 0)
                    component.props.onOnline();
                 else if (arg === 1) {
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
                    component.setState(ss);
                }
                for (var property in result) {
                    component.setState({[property]: result[property]});
                }
            },
            (error) => {
                console.log('json err ' + error + '  ' + url);
            }
        )
}

export function sendRequest(url, arg) {
    this.setState({isLoading: true});
    fetch(url, {method: 'get'})
        .then((response) => {
            if (response.ok) {
                console.log('res.ok');
                setTimeout(() => {
                    this.setState({
                        isLoading: false,
                        [arg]: false
                    });
                }, 1000);
            }
            // else
            // console.log('Network response was not ok.');
        });
}
export function sendRequestFile(url, arg, file) {
    this.setState({isLoading: true});
    var formData = new FormData();
    // formData.append('username', 'abc123');
    formData.append('file', file);
    fetch(url, {
        method: 'PUT',
        body: formData
    })
        .then((response) => {
            if (response.ok) {
                console.log('res.ok');
                setTimeout(() => {
                    this.setState({
                        isLoading: false,
                        [arg]: false
                    });
                }, 1000);
            }
            // else
            // console.log('Network response was not ok.');
        });
}