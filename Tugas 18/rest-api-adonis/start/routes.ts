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

// cara group route
// http://127.0.0.1:3333/api/v1/{endpoint disini}

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
    /** tidak pakai cukup 1 metode saja di v1/BookingsController.join
    Route.put("/bookings/:id/unjoin", "v1/BookingsController.unjoin")
      .as("booking.unjoin")
      .middleware(["auth"]);
      */
    Route.post("/otp-verification", "v1/AuthController.otp_verification").as(
      "auth.verify"
    );
  }).as("tugas17");
}).prefix("api/v1");

// cara simpel untuk route
// Route.resource("/venue", "v1/VenuesController")
//   .apiOnly()
//   .middleware({ "*": ["auth"] });
// Route.resource("/venue.fields", "v1/FieldsController")
//   .apiOnly()
//   .middleware({ "*": ["auth"] });
// Route.resource("/fields.booking", "v1/BookingsController")
//   .apiOnly()
//   .middleware({ "*": ["auth"] });

// Route.post("/register", "v1/AuthController.register").as("auth.register");
// Route.post("/login", "v1/AuthController.login").as("auth.login");
// Route.post("/fields/:id/bookings", "v1/BookingsController.addBooking")
//   .as("add Booking")
//   .middleware("auth");
// Route.get("/fields/:id", "v1/FieldsController.getFields")
//   .as("Fields by Id")
//   .middleware("auth");
// Route.get("/bookings/:id", "v1/BookingsController.getBook")
//   .as("get Booking")
//   .middleware("auth");
// Route.post("/bookings/:id", "v1/BookingsController.addBook")
//   .as("post Booking")
//   .middleware("auth");
/**jika route 1 per 1
Route.post('/venue', 'v1/VenuesController.store').as('venue.store');
Route.get('/venue', 'v1/VenuesController.index').as('venue.index');
Route.get('/venue/:id', 'v1/VenuesController.show').as('venue.show');
Route.put('/venue/:id', 'v1/VenuesController.update').as('venue.update');
Route.delete('/venue/:id', 'v1/VenuesController.delete').as('venue.delete');
*/

// memasang middleware
/** 
//  pasang ke semua Route
 Route.resource("/venue", "v1/VenuesController").apiOnly().middleware({'*':['auth']})

//  pasang ke route tertentu yang ada di dalam route resource
 Route.resource("/venue", "v1/VenuesController").apiOnly().middleware({
  create: ['auth'],
  store: ['auth'],
  destroy: ['auth'],
 })
*/
