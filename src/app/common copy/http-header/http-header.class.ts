import { HttpHeaders } from '@angular/common/http';
import { ENVIRONMENT } from 'src/environments/environment';
export enum APIStatus {
    SUCCESS = 200,
    FAILURE = 500,
    EXCEPTION = 400,
    UNAUTHORIZED = 401
}

export interface CustomHttpHeaderOptions {
    loader?: boolean;
    errorMessage?: boolean;
    token?: boolean;
    X_Lang?: boolean;
    isJSONRequest?: boolean;
    isMultiPart?: boolean;
    additionalParams?: Array<{ name: string, value: string }>;
}
export interface HTTPRESPONSE {
    data: any;
    success: any;
    result: any;
    message: string;
    statusCode: APIStatus;
}
export type Boolean_number_range = 0 | 1;

export class HttpHelper {

    protected apiUrl = '';
    protected hostUrl = '';

    constructor() {
        this.apiUrl = ENVIRONMENT.API.hostUrl ;
        this.hostUrl = ENVIRONMENT.API.hostUrl;
    }

    protected getHttpOptions(options?: CustomHttpHeaderOptions) {

        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', `Bearer ${localStorage.getItem('access_token')}`);

        if (options && options.loader === false) {
            headers = headers.append('InterceptorNoLoader', '');
        }

        if (options && options.errorMessage === false) {
            headers = headers.append('InterceptorNoErrorMessage', '');
        }

        if (options && options.token === false) {
            headers = headers.delete('Authorization');
        }

        if (options && options.hasOwnProperty('isJSONRequest') && options.isJSONRequest) {
            headers.append('Content-Type', 'application/json');
        }
if (options && options.hasOwnProperty('isMultiPart') && options.isMultiPart) {
            headers.append('Content-Type', 'multipart/form-data');
        }

        // if (options && options.isJSONRequest === false) {
        //     headers = headers.delete('Content-Type');
        // } else {
        //     headers = headers.append('Content-Type', 'application/json');
        // }

        if (options && options.hasOwnProperty('additionalParams')) {
            options.additionalParams.map((param) => {
                headers = headers.append(param.name, param.value);
            });
        }


        const httpOptions = {
            headers
        };

        return httpOptions;
    }
}