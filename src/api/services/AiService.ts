/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommonResponse_boolean_ } from '../models/CommonResponse_boolean_';
import type { CommonResponse_SseEmitter_ } from '../models/CommonResponse_SseEmitter_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AiService {
    /**
     * 建立链接
     * @returns CommonResponse_SseEmitter_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static connectUsingPost(): CancelablePromise<CommonResponse_SseEmitter_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ai/conversation/connect',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 发送问题
     * @param messages 问题对话入参
     * @returns CommonResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static sendMessageUsingPost(
        messages?: Array<any>,
    ): CancelablePromise<CommonResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ai/conversation/send-question',
            body: messages,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 断开链接
     * @returns CommonResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static unConnectUsingPost(): CancelablePromise<CommonResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/ai/conversation/un-connect',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
