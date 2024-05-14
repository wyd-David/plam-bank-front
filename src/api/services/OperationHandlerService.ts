/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OperationHandlerService {
    /**
     * handle
     * @param body body
     * @returns any OK
     * @throws ApiError
     */
    public static handleUsingGet1(
        body?: Record<string, string>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/actuator/health',
            body: body,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * handle
     * @param body body
     * @returns any OK
     * @throws ApiError
     */
    public static handleUsingGet(
        body?: Record<string, string>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/actuator/health/**',
            body: body,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
