import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import FieldCreateValidator from "App/Validators/v1/FieldCreateValidator";

import Field from "App/Models/Field";
import Venue from "App/Models/Venue";

export default class FieldsController {
  public async index({ response, params }: HttpContextContract) {
    try {
      let venue_id = params.venue_id;
      let venue = await Venue.findByOrFail("id", venue_id);
      if (venue) {
        const field = await Venue.query()
          .preload("fields")
          .where("id", venue_id)
          .select("id", "name", "address", "phone")
          .firstOrFail();
        response.status(200).json({
          message: "Berhasil mengambil semua data Arena",
          data: field,
        });
      }
    } catch (error) {
      response.badRequest({
        erorrs: error.message,
        message: "gagal memuat data Arena, Arena tidak ditemukan!",
      });
    }
  }

  public async store({ request, response, params }: HttpContextContract) {
    await request.validate(FieldCreateValidator);
    try {
      let id = params.venue_id;
      let venue = await Venue.findByOrFail("id", id);
      if (venue) {
        let field = new Field();
        field.name = request.input("name");
        field.type = request.input("type");
        field.venue_id = request.input("venue_id", id);
        await field.related("venues").associate(venue);

        response.created({
          message: "berhasil menambahkan data field baru",
          data: field,
        });
      }
    } catch (error) {
      response.notFound({
        erorrs: error.message,
        message: "gagal membuat Arena!",
      });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      let id = params.id;
      let venue = await Venue.findByOrFail("id", params.venue_id);
      if (venue) {
        const field = await Field.query()
          .where("id", id)
          .andWhere("venue_id", params.venue_id)
          .select(["id", "name", "type", "venue_id"])
          .preload("venues", (venueQuery) => {
            venueQuery.select(["name", "address", "phone"]);
          })
          .preload("bookings", (bookingQuery) => {
            bookingQuery.select([
              "id",
              "field_id",
              "play_date_start",
              "play_date_end",
              "user_id",
            ]);
          })
          .firstOrFail();
        field.$extras.players_count;
        return response.status(200).json({
          message: "Berhasil ambil data Arena berdasarkan id!",
          data: field,
        });
      }
    } catch (error) {
      response.notFound({
        erorrs: error.message,
        message: "Arena tidak ditemukan!",
      });
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    await request.validate(FieldCreateValidator);
    try {
      let id = params.id;
      let venue_id = params.venue_id;

      let field = await Field.query()
        .where("id", id)
        .andWhere("venue_id", venue_id)
        .select("*")
        .firstOrFail();

      await field
        .merge({
          name: request.input("name"),
          type: request.input("type"),
          venue_id: request.input("venue_id", venue_id),
        })
        .save();
      response.ok({ message: "Arena berhasil di update!", data: field });
    } catch (error) {
      response.notFound({ message: "data tidak ditemukan!" });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      let id = params.id;
      let venue_id = params.venue_id;

      let field = await Field.query()
        .where("id", id)
        .andWhere("venue_id", venue_id)
        .firstOrFail();

      await field.delete();
      response.status(200).json({ message: "Arena berhasil di hapus!" });
    } catch (error) {
      response.notFound({
        erorrs: error.message,
        message: "data tidak ditemukan!",
      });
    }
  }

  public async showBooking({ response, params }: HttpContextContract) {
    try {
      let id = params.id;
      const field = await Field.query()
        .where("id", id)
        .select(["id", "name", "type", "venue_id"])
        .preload("venues", (venueQuery) => {
          venueQuery.select(["name", "address", "phone"]);
        })
        .preload("bookings", (bookingQuery) => {
          bookingQuery.select([
            "id",
            "field_id",
            "play_date_start",
            "play_date_end",
            "user_id",
          ]);
          bookingQuery.withCount("players").preload("players");
        })
        .firstOrFail();
      return response.status(200).json({
        message: "Berhasil ambil data Arena berdasarkan id!",
        data: field,
      });
    } catch (error) {
      response.notFound({
        erorrs: error.message,
        message: "Arena tidak ditemukan!",
      });
    }
  }
}
