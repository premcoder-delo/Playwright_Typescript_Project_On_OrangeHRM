import cryptoJs from 'crypto-js';

export default class CommonUtils {
    private secretKey: string;

    constructor() {
        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY is missing in environment variables");
        }
        this.secretKey = process.env.SECRET_KEY;
    }

    encryptData(data: string): string {
        return cryptoJs.AES.encrypt(data, this.secretKey).toString();
    }

    decryptData(encdata: string): string {
        return cryptoJs.AES.decrypt(encdata, this.secretKey)
            .toString(cryptoJs.enc.Utf8);
    }
}