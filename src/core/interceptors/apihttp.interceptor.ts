import { HttpInterceptorFn } from '@angular/common/http';

export const apihttpInterceptor: HttpInterceptorFn = (req, next) => {
    let baseUrl = '';
    const prefix = 'ctry/';
    // const mainUrl = 'https://unmandatory-curvaceous-juliann.ngrok-free.dev/api/'
    const mainUrl = 'https://btlgatewayservice.azurewebsites.net/api/'
    //const mainUrl = 'http://localhost:7000/api/';
    const countryUrl = 'http://dstatoka-001-site7.htempurl.com/';

    let currentUrl = req.url;
    if (currentUrl.startsWith(prefix)) {
        baseUrl = countryUrl;
    } else {
        baseUrl = mainUrl
    }
    let skipToken: boolean = false;
    console.log('baseUrl ' + baseUrl);

    if (req.url.startsWith(prefix)) {
        skipToken = true;
    }
    let url = req.url.startsWith(prefix)
        ? baseUrl + req.url.slice(prefix.length)
        : baseUrl + req.url;

    let headers = req.headers;
    let token = '';
    console.log('url  ===> ', url);

    if (!skipToken) {
        let userData = localStorage.getItem('signup-details');
        if (userData !== null) {
            let user = JSON.parse(userData)
            token = user.token;
        }


        let userDat = localStorage.getItem('user');
        if (userDat !== null) {
            let user = JSON.parse(userDat ?? '')
            token = user.token;
        }

    }
    if (token && !headers.has('Authorization')) {
        headers = headers.set('Authorization', `Bearer ${token}`);
    }

    if (!headers.has('Content-Type') && !(req.body instanceof FormData)) {
        headers = headers.set('Content-Type', 'application/json');
    }

    return next(req.clone({ url, headers }));
};
