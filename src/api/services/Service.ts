/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommonResponse_ } from '../models/CommonResponse_';
import type { CommonResponse_boolean_ } from '../models/CommonResponse_boolean_';
import type { CommonResponse_List_vo_ } from '../models/CommonResponse_List_vo_';
import type { CommonResponse_object_ } from '../models/CommonResponse_object_';
import type { CommonResponse_PageResult_ } from '../models/CommonResponse_PageResult_';
import type { CommonResponse_string_ } from '../models/CommonResponse_string_';
import type { CommonResponse_vo_ } from '../models/CommonResponse_vo_';
import type { CommonResponse_Void_ } from '../models/CommonResponse_Void_';
import type { vo } from '../models/vo';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class Service {
    /**
     * 新创建一个篇帖子
     * @param communityPostVo 输入社区实体
     * @returns CommonResponse_Void_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static createOneUsingPost(
        communityPostVo?: any,
    ): CancelablePromise<CommonResponse_Void_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/community/post/create-one',
            body: communityPostVo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 社区热门帖子
     * @returns CommonResponse_PageResult_ OK
     * @throws ApiError
     */
    public static hotListUsingGet(): CancelablePromise<CommonResponse_PageResult_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/community/post/hot-list',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 查询帖子的list列表
     * @param pageNo 页码
     * @param pageSize 每页数
     * @returns CommonResponse_PageResult_ OK
     * @throws ApiError
     */
    public static indexListUsingGet(
        pageNo: number = 1,
        pageSize: number = 10,
    ): CancelablePromise<CommonResponse_PageResult_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/community/post/index-list',
            query: {
                'pageNo': pageNo,
                'pageSize': pageSize,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 全部搜索接口
     * @param keywords 搜索关键字
     * @param pageNo 页码
     * @param pageSize 每页数
     * @param searchCode 搜索类型
     * @returns CommonResponse_object_ OK
     * @throws ApiError
     */
    public static searchAllUsingGet(
        keywords?: string,
        pageNo: number = 1,
        pageSize: number = 10,
        searchCode: number = 1,
    ): CancelablePromise<CommonResponse_object_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/search/keywords/search-all',
            query: {
                'keywords': keywords,
                'pageNo': pageNo,
                'pageSize': pageSize,
                'searchCode': searchCode,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 执行交易
     * @param reqVo 转账入参实体
     * @returns CommonResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doTradingUsingPost(
        reqVo?: vo,
    ): CancelablePromise<CommonResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/trade/do-trading',
            body: reqVo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 查询我的所有交易记录
     * @param endTime 结束时间
     * @param startTime 开始时间
     * @param tradeType RECHARGE(充值),TRADE(转账),WITHDRAW(提现)
     * @returns CommonResponse_List_vo_ OK
     * @throws ApiError
     */
    public static getMyTradeRecordsUsingGet(
        endTime?: string,
        startTime?: string,
        tradeType?: string,
    ): CancelablePromise<CommonResponse_List_vo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/trade/my-trades',
            query: {
                'endTime': endTime,
                'startTime': startTime,
                'tradeType': tradeType,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 获取支持的交易转账渠道
     * @returns CommonResponse_List_vo_ OK
     * @throws ApiError
     */
    public static getSupportTradeChannelUsingGet(): CancelablePromise<CommonResponse_List_vo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/trade/query/support-trade-channel',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 获取交易token，服务端下发，每次真实交易前前端获取，调用交易接口的时候前端传入，后端进行校验
     * @returns CommonResponse_string_ OK
     * @throws ApiError
     */
    public static getTradingTokenUsingGet(): CancelablePromise<CommonResponse_string_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/trade/query/trading-token',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 根据卡号或者用户名称搜索转账用户
     * @param keywords 搜索关键字
     * @returns CommonResponse_List_vo_ OK
     * @throws ApiError
     */
    public static searchUserForTradeUsingGet(
        keywords?: string,
    ): CancelablePromise<CommonResponse_List_vo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/trade/search/trade-user',
            query: {
                'keywords': keywords,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 查询对对账数据
     * @returns CommonResponse_ OK
     * @throws ApiError
     */
    public static getTradeDataBoardUsingGet(): CancelablePromise<CommonResponse_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/trade/trade-checking-data',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 查询营收支出数据
     * @param userTradeType 类型
     * @returns CommonResponse_ OK
     * @throws ApiError
     */
    public static getTradeDataBoardUsingGet1(
        userTradeType?: number,
    ): CancelablePromise<CommonResponse_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/trade/trade-data',
            query: {
                'userTradeType': userTradeType,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 获取验证码信息
     * @param phone 手机号
     * @returns CommonResponse_boolean_ OK
     * @throws ApiError
     */
    public static updateUserInfoUsingGet(
        phone?: string,
    ): CancelablePromise<CommonResponse_boolean_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/get-verification-code',
            query: {
                'phone': phone,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 获取当前用户信息
     * @returns CommonResponse_vo_ OK
     * @throws ApiError
     */
    public static updateUserInfoUsingGet1(): CancelablePromise<CommonResponse_vo_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/info/me',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 登录接口
     * @param loginReqVo 登录入参实体
     * @returns CommonResponse_vo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static loginUsingPost(
        loginReqVo?: any,
    ): CancelablePromise<CommonResponse_vo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/login',
            body: loginReqVo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 登出接口
     * @returns CommonResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static logoutUsingPost(): CancelablePromise<CommonResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/logout',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 给自己的账户充值金额
     * @param reqVo 账户充值入参
     * @returns CommonResponse_vo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doRechargeUsingPost(
        reqVo?: any,
    ): CancelablePromise<CommonResponse_vo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/recharge/do-recharge-amount',
            body: reqVo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 提现
     * @param reqVo 提现请求入参body
     * @returns CommonResponse_vo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doWithdrawUsingPost(
        reqVo?: any,
    ): CancelablePromise<CommonResponse_vo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/recharge/withdraw',
            body: reqVo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 注册接口
     * @param loginReqVo 注册入参实体
     * @returns CommonResponse_vo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static registerUsingPost(
        loginReqVo?: any,
    ): CancelablePromise<CommonResponse_vo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/register',
            body: loginReqVo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 修改账户信息接口
     * @param userVo 修改账户入参实体
     * @returns CommonResponse_vo_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUserInfoUsingPost(
        userVo?: vo,
    ): CancelablePromise<CommonResponse_vo_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/update/my-info',
            body: userVo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 修改密码
     * @param loginReqVo 修改密码入参实体
     * @returns CommonResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updatePasswordUsingPost(
        loginReqVo?: any,
    ): CancelablePromise<CommonResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/update/password',
            body: loginReqVo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
