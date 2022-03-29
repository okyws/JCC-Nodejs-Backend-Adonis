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

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
});

// cara simpel untuk route
Route.resource('/venue', 'v1/VenuesController').apiOnly();
Route.resource('/venue.fields', 'v1/FieldsController').apiOnly();

// jika route 1 per 1
Route.post('/booking', 'v1/BookingsController.saveBooking').as('add Booking');
// Route.post('/venue', 'v1/VenuesController.store').as('venue.store');
// Route.get('/venue', 'v1/VenuesController.index').as('venue.index');
// Route.get('/venue/:id', 'v1/VenuesController.show').as('venue.show');
// Route.put('/venue/:id', 'v1/VenuesController.update').as('venue.update');
// Route.delete('/venue/:id', 'v1/VenuesController.delete').as('venue.delete');