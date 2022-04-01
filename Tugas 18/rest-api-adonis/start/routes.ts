/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

Route.group(() => {
  Route.resource("/venue", "v1/VenuesController")
    .apiOnly()
    .middleware({ "*": ["auth", "owner", "verify"] });
  Route.resource("/venue.fields", "v1/FieldsController")
    .apiOnly()
    .middleware({ "*": ["auth", "owner", "verify"] });
  Route.resource("/fields.booking", "v1/BookingsController")
    .apiOnly()
    .middleware({ "*": ["auth", "owner", "verify"] });

  Route.group(() => {
    Route.post("/register", "v1/AuthController.register").as("auth.register");
    Route.post("/login", "v1/AuthController.login").as("auth.login");
  });

  Route.group(() => {
    Route.post("/fields/:id/bookings", "v1/BookingsController.addBooking")
      .as("booking.add")
      .middleware(["auth", "user", "verify"]);
    Route.get("/fields/:id", "v1/FieldsController.showBooking")
      .as("field.show(id)")
      .middleware(["auth", "owner", "verify"]);
    Route.get("/bookings/:id", "v1/BookingsController.showBookingDetail")
      .as("booking.get")
      .middleware(["auth", "owner", "verify"]);
    Route.put("/bookings/:id", "v1/BookingsController.join")
      .as("booking.join")
      .middleware(["auth", "user", "verify"]);
    Route.post("/otp-verification", "v1/AuthController.otp_verification").as(
      "auth.verify"
    );
  }).as("tugas17");
}).prefix("api/v1");