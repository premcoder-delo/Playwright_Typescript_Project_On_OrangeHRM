import { APIRequestContext } from "@playwright/test";
import { AuthService } from "../common/auth.service";

export class BookingService {
    private authService: AuthService;

    constructor(private request: APIRequestContext) {
        this.authService = new AuthService(request);
    }

    async getAllBookings() {
        return this.request.get('/booking');
    }

    async getBookingById(id: number) {
        return this.request.get(`/booking/${id}`);
    }

    async createBooking(payload: any) {
        return this.request.post('/booking', { data: payload });
    }

    async updateBooking(id: number, payload: any) {
        const token = await this.authService.createToken();

        return this.request.put(`/booking/${id}`, {
            headers: { Cookie: `token=${token}` },
            data: payload
        });
    }

    async partialUpdateBooking(id: number, payload: any) {
        const token = await this.authService.createToken();

        return this.request.patch(`/booking/${id}`, {
            headers: { Cookie: `token=${token}` },
            data: payload
        });
    }

    async deleteBooking(id: number) {
        const token = await this.authService.createToken();

        return this.request.delete(`/booking/${id}`, {
            headers: { Cookie: `token=${token}` }
        });
    }
}