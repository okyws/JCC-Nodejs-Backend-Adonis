import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import VenueCreateValidator from "App/Validators/v1/VenueCreateValidator";

export default class VenuesController {
  public async saveVenue({ request, response }: HttpContextContract) {
    let { name, address, phone } = await request.validate(VenueCreateValidator);
    let data = { name, address, phone };
    return response.created({
      message: 'Venue berhasil dibuat!',
      data,
    });
  }
}
