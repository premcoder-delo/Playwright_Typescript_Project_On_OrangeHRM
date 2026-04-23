import { APIRequestContext } from '@playwright/test';

export class BaseAPI {
    protected request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    protected async get(url: string, headers = {}) {
        return this.request.get(url, { headers });
    }

    protected async post(url: string, data: any, headers = {}) {
        return this.request.post(url, { data, headers });
    }

    protected async put(url: string, data: any, headers = {}) {
        return this.request.put(url, { data, headers });
    }

    protected async patch(url: string, data: any, headers = {}) {
        return this.request.patch(url, { data, headers });
    }

    protected async delete(url: string, headers = {}) {
        return this.request.delete(url, { headers });
    }
}