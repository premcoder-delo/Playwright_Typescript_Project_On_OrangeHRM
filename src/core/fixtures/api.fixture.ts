import { test as base } from '@playwright/test';
import { BookingService } from '../../api/booking/booking.service';

type APIFixtures = {
    bookingService: BookingService;
};

export const test = base.extend<APIFixtures>({
    bookingService: async ({ request }, use) => {
        await use(new BookingService(request));
    }
});

export { expect } from '@playwright/test';