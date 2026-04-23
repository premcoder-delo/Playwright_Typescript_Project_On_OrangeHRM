import { APIRequestContext } from "@playwright/test";
import { AuthService } from "../common/auth.service";
import { BaseAPI } from "../../core/base/BaseAPI";

export class BookingService extends BaseAPI {
    private authService: AuthService;

    constructor(request: APIRequestContext) {
        super(request);
        this.authService = new AuthService(request);
    }

    async getAllBookings() {
        return this.get('/booking');
    }

    async getBookingById(id: number) {
        return this.get(`/booking/${id}`);
    }

    async createBooking(payload: any) {
        return this.post('/booking', payload);
    }

    async updateBooking(id: number, payload: any) {
        const headers = await this.getAuthHeader();
        return this.put(`/booking/${id}`, payload, headers);
    }

    async partialUpdateBooking(id: number, payload: any) {
        const headers = await this.getAuthHeader();
        return this.patch(`/booking/${id}`, payload, headers);
    }

    async deleteBooking(id: number) {
        const headers = await this.getAuthHeader();
        return this.delete(`/booking/${id}`, headers);
    }

    private async getAuthHeader() {
        const token = await this.authService.createToken();
        return {
            Cookie: `token=${token}`
        };
    }
}