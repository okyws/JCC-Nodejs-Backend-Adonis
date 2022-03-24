import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BookingCreateValidator from 'App/Validators/v1/BookingCreateValidator';

export default class BookingsController {
  public async saveBooking({ request, response }: HttpContextContract) {
    let { name, nameVenue, playDate } = await request.validate(BookingCreateValidator);
    let data = { name, nameVenue, playDate };
    return response.created({
      message: 'Data booking tersimpan!',
      data,
    });
  }
}
