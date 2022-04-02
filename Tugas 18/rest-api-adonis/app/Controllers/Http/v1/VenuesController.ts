import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import VenueCreateValidator from "App/Validators/v1/VenueCreateValidator";

import Venue from "App/Models/Venue";
import Field from "App/Models/Field";

export default class VenuesController {
  public async index({ request, response }: HttpContextContract) {
    try {
      let venue = await Venue.all();
      if (venue) {
        response.status(200).json({
          message: "Berhasil mengambil semua data venue",
          data: venue,
        });

        if (request.qs().name) {
          let name = request.qs().name;

          let venueFiltered = await Venue.findBy("name", name);
          response.status(200).json({
            message: "filter data venue berdasarkan nama",
            data: venueFiltered,
          });
        }
      }
    } catch (error) {
      response.badRequest({
        message: "Gagal memuat data Venue",
        erorrs: error.message,
      });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(VenueCreateValidator);
    try {
      const newVenue = await Venue.create({
        name: payload.name,
        address: payload.address,
        phone: payload.phone,
      });

      response.created({
        message: "Venue berhasil dibuat!",
        data: newVenue,
      });
    } catch (error) {
      response.badRequest({
        erorrs: error.messages,
        message: "gagal membuat Venue!",
      });
    }
  }

  public async show({ response, params, request }: HttpContextContract) {
    try {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

      const venue = await Venue.findByOrFail("id", params.id);

      const field = await Field.query()
        .where("venue_id", params.id)
        .preload("bookings", (qBooking) => {
          qBooking
            .where("date_booking", date)
            // .preload("players")
            .withCount("players");
        });

      response.status(200).json({
        status: "success",
        message: "berhasil get data venue by id",
        data: venue,
        detail: field,
      });

      if (request.qs().type) {
        const type = request.qs().type;
      
        const venue = await Venue.findByOrFail("id", params.id);
        const field = await Field.query()
          .where("venue_id", params.id)
          .andWhere("type", type)
          .preload("bookings", (qBooking) => {
            qBooking
              .where("date_booking", date)
              // .preload("players")
              .withCount("players");
          });

        response.status(200).json({
          message: "filter data berdasarkan type",
          data: venue, filter: field
        });
      }
    } catch (error) {
      response.notFound({
        status: "success",
        message: "data tidak ditemukan!",
        error: error.message,
      });
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    await request.validate(VenueCreateValidator);
    try {
      let id = params.id;
      let update = await Venue.findByOrFail("id", id);

      await update
        .merge({
          name: request.input("name"),
          address: request.input("address"),
          phone: request.input("phone"),
        })
        .save();

      response.ok({ message: "data berhasil di update!", data: update });
    } catch (error) {
      response.notFound({ message: "data tidak ditemukan!" });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      let id = params.id;
      let venue = await Venue.findByOrFail("id", id);
      await venue.delete();
      response.ok({ message: "data Venue berhasil di hapus!" });
    } catch (error) {
      response.notFound({
        erorrs: error.message,
        message: "data tidak ditemukan!",
      });
    }
  }
}
