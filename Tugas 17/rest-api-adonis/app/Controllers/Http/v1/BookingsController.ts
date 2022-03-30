import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import BookingCreateValidator from "App/Validators/v1/BookingCreateValidator";
import Booking from "App/Models/Booking";
import Field from "App/Models/Field";

export default class BookingsController {
  public async index({ request, response, params }: HttpContextContract) {
    try {
      let id = params.field_id;
      let Book = await Booking.findByOrFail("field_id", id);

      if (Book) {
        const booking = await Booking.query()
          // .preload("fields")
          // .preload("bookings")
          .where("field_id", id)
          .select("*");
        // .firstOrFail();
        response.status(200).json({
          message: "Berhasil mengambil semua data booking",
          data: booking,
        });
      }
      if (request.qs().players_count) {
        let id = request.qs().players_count;
        let idField = params.field_id;

        const booking = await Booking.query()
          .where("players_count", id)
          .andWhere("field_id", idField)
          .select("*");
        // .firstOrFail();

        response.status(200).json({
          message: "filter data booking berdasarkan id",
          data: booking,
        });
      }
    } catch (error) {
      response.badRequest({
        message: "Gagal memuat data Booking",
        erorrs: error.message,
      });
    }
  }

  public async store({ request, response, params }: HttpContextContract) {
    await request.validate(BookingCreateValidator);
    try {
      let id = params.field_id;
      let bookings = await Field.findByOrFail("id", id);
      if (bookings) {
        let booking = new Booking();
        booking.field_id = request.input("field_id");
        booking.booking_user_id = request.input("booking_user_id");
        booking.players_count = request.input("players_count");
        booking.play_date_start = request.input("play_date_end");
        booking.play_date_end = request.input("play_date_end");

        let newBooking = await booking.save();
        response.created({
          message: "berhasil menambahkan data booking baru",
          data: newBooking,
        });
      }
    } catch (error) {
      response.notFound({
        erorrs: error.message,
        message: "gagal membuat Booking!",
      });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      let id = params.id;
      let field_id = params.field_id;

      const booking = await Booking.query()
        // .preload("fields")
        // .preload("users")
        // .preload("bookings")
        .where("id", id)
        /**
         * route fields/:id/booking/:id
         * pakai ini
         * .andWhere("field_id", field_id)
         *
         * route booking/:id
         * hapus ini
         * .andWhere("field_id", field_id)
         * */
        .andWhere("field_id", field_id)
        .select("*")
        .firstOrFail();
      return response.status(200).json({
        message: "Berhasil ambil data Booking berdasarkan id!",
        data: booking,
      });
    } catch (error) {
      response.notFound({
        erorrs: error.message,
        message: "Booking tidak ditemukan!",
      });
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    await request.validate(BookingCreateValidator);
    try {
      let id = params.id;
      let field_id = params.field_id;

      let booking = await Booking.query()
        .where("id", id)
        .andWhere("field_id", field_id)
        .select("*")
        .firstOrFail();

      await booking
        .merge({
          field_id: request.input("field_id"),
          booking_user_id: request.input("booking_user_id"),
          players_count: request.input("players_count"),
          play_date_start: request.input("play_date_end"),
          play_date_end: request.input("play_date_end"),
        })
        .save();
      response.ok({
        message: "data booking berhasil di update!",
        data: booking,
      });
    } catch (error) {
      response.notFound({ message: "data tidak ditemukan!" });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      let id = params.id;
      let field_id = params.field_id;

      let booking = await Booking.query()
        .where("id", id)
        .andWhere("field_id", field_id)
        .firstOrFail();

      await booking.delete();
      response.status(200).json({ message: "Booking berhasil di hapus!" });
    } catch (error) {
      response.notFound({
        erorrs: error.message,
        message: "data tidak ditemukan!",
      });
    }
  }

  public async addBooking({ request, response, params, auth }: HttpContextContract) {
    await request.validate(BookingCreateValidator);
    try {
      let idField: number = params.id;
      let bookings = await Field.findByOrFail("id", idField);
      if (bookings) {
        let booking = new Booking();
        booking.field_id = request.input("field_id", idField);
        booking.booking_user_id = request.input("booking_user_id", auth.user?.id);
        booking.players_count = request.input("players_count");
        booking.play_date_start = request.input("play_date_end");
        booking.play_date_end = request.input("play_date_end");

        let newBooking = await booking.save();
        response.created({
          message: "berhasil booking",
          data: newBooking,
        });
      }
    } catch (error) {
      response.unprocessableEntity({
        message: "gagal mem-booking Arena!",
        errors: error.message,
      });
    }
  }
}
