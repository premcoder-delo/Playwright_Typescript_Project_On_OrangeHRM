import { APIRequestContext } from "@playwright/test";
import CommonUtils from "../../core/utils/CommonUtils";

export class AuthService {
    constructor(private request: APIRequestContext) { }

    async createToken(): Promise<string> {
        const utils = new CommonUtils();

        const username = utils.decryptData(process.env.API_USERNAME!);
        const password = utils.decryptData(process.env.API_PASSWORD!);

        const response = await this.request.post('/auth', {
            data: { username, password }
        });

        const body = await response.json();
        return body.token;
    }
}