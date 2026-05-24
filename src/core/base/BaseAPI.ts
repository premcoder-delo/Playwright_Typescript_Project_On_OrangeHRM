import { APIRequestContext, APIResponse } from '@playwright/test';
import { getLogger } from '../logger/logger';

export class BaseAPI {
    protected request: APIRequestContext;
    protected logger;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.logger = getLogger('api');
    }

    protected async get(
        url: string,
        headers = {}
    ): Promise<APIResponse> {
        return this.send('GET', url, undefined, headers);
    }

    protected async post(
        url: string,
        data: unknown,
        headers = {}
    ): Promise<APIResponse> {
        return this.send('POST', url, data, headers);
    }

    protected async put(
        url: string,
        data: unknown,
        headers = {}
    ): Promise<APIResponse> {
        return this.send('PUT', url, data, headers);
    }

    protected async patch(
        url: string,
        data: unknown,
        headers = {}
    ): Promise<APIResponse> {
        return this.send('PATCH', url, data, headers);
    }

    protected async delete(
        url: string,
        headers = {}
    ): Promise<APIResponse> {
        return this.send('DELETE', url, undefined, headers);
    }

    private async send(
        method: string,
        url: string,
        data?: unknown,
        headers = {}
    ): Promise<APIResponse> {

        const start = Date.now();

        this.logger.info(`${method} ${url}`);

        const response = await this.request.fetch(url, {
            method,
            headers,
            data
        });

        const duration = Date.now() - start;

        this.logger.info(
            `${method} ${url} -> ${response.status()} (${duration}ms)`
        );

        return response;
    }

    protected async getJson<T>(response: APIResponse): Promise<T> {
        return await response.json();
    }
}