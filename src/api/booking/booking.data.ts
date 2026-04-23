export const createBookingPayload = (overrides = {}) => ({
    firstname: "John",
    lastname: "Doe",
    totalprice: 100,
    depositpaid: true,
    bookingdates: {
        checkin: "2024-01-01",
        checkout: "2024-01-02"
    },
    additionalneeds: "Breakfast",
    ...overrides
});