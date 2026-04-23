import { test, expect } from '../../core/fixtures/api.fixture';
import { createBookingPayload } from './booking.data';

test('Get all bookings', async ({ bookingService }) => {
    const response = await bookingService.getAllBookings();
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.length).toBeGreaterThan(0);
});

test('Create booking', async ({ bookingService }) => {
    const payload = createBookingPayload();

    const response = await bookingService.createBooking(payload);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.booking).toMatchObject(payload);
});

test('Update booking', async ({ bookingService }) => {
    const all = await bookingService.getAllBookings();
    const list = await all.json();

    const id = list[0].bookingid;

    const payload = createBookingPayload({ firstname: 'Updated' });

    const response = await bookingService.updateBooking(id, payload);
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body).toMatchObject(payload);
});