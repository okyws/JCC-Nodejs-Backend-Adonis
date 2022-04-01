import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import BookingCreateValidator from "App/Validators/v1/BookingCreateValidator";
import Booking from "App/Models/Booking";
import Field from "App/Models/Field";
import Database from "@ioc:Adonis/Lucid/Database";

export default class BookingsController {
  public async index({ response, params }: HttpContextContract) {
    try {
      let id = params.field_id;
      let field = await Field.findByOrFail("id", id);

      if (field) {
        const booking = await Booking.query()
          .where("field_id", id)
          .withCount("players")
          .preload("fields", (fieldQuery) => {
            fieldQuery.preload("venues");
          })
          .preload("players", (userQuery) => {
            userQuery.select("*");
          });
        response.status(200).json({
          message: "Berhasil mengambil semua data booking",
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

  public async store({ request, response, params, auth }: HttpContextContract) {
    let payload = await request.validate(BookingCreateValidator);
    try {
      let id: number = parseInt(params.field_id);
      let field = await Field.findByOrFail("id", id);
      let user = auth.user!;
      if (field) {
        let booking = new Booking();
        booking.fieldId = request.input("field_id", id);
        booking.userId = request.input("user_id", user.id);
        booking.playDateStart = payload.play_date_start;
        booking.playDateEnd = payload.play_date_end;

        user.related("players").save(booking);

        response.created({
          message: "berhasil menambahkan data booking baru",
          data: booking,
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

      let field = await Field.findByOrFail("id", id);

      if (field) {
        const booking = await Booking.query()
          .where("id", params.id)
          .andWhere("field_id", field_id)
          .withCount("players")
          .preload("players", (userQuery) => {
            userQuery.select(["name", "email", "id"]);
          })
          .firstOrFail();

        response.ok({ status: "success", data: booking });
      }
    } catch (error) {
      response.notFound({
        erorrs: error.message,
        message: "Booking tidak ditemukan!",
      });
    }
  }

  public async update({
    request,
    response,
    params,
    auth,
  }: HttpContextContract) {
    await request.validate(BookingCreateValidator);
    try {
      let id = params.id;
      let field_id = params.field_id;

      let booking = await Booking.query()
        .where("id", id)
        .andWhere("field_id", field_id)
        .select("*")
        .preload("players", (userQuery) => {
          userQuery.select(["name", "email", "id"]).withCount("players");
        })
        .firstOrFail();

      await booking
        .merge({
          fieldId: request.input("field_id", parseInt(params.field_id)),
          userId: request.input("user_id", auth.user?.id),
          playDateStart: request.input("play_date_start"),
          playDateEnd: request.input("play_date_end"),
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

  public async join({ response, auth, params }: HttpContextContract) {
    try {
      const booking = await Booking.findOrFail(params.id);
      let user = auth.user!;

      const checkJoin = await Database.from("schedules")
        .where("booking_id", params.id)
        .where("user_id", user.id)
        .first();
      if (!checkJoin) {
        await booking.related("players").attach([user.id]);
        return response.ok({ message: "berhasil join booking" });
      } else {
        await booking.related("players").detach([user.id]);
      }
      response.ok({ message: "berhasil unjoin booking" });
    } catch (error) {
      response.notFound({
        erorrs: error.message,
        message: "data tidak ditemukan!",
      });
    }
  }

  public async showBookingDetail({ response, params }: HttpContextContract) {
    try {
      const booking = await Booking.query()
        .where("id", params.id)
        .withCount("players")
        .preload("players", (userQuery) => {
          userQuery.select(["name", "email", "id"]);
        });

      return response.ok({ status: "success", data: booking });
    } catch (error) {
      response.notFound({
        erorrs: error.message,
        message: "Booking tidak ditemukan!",
      });
    }
  }

  public async addBooking({ request, response, params, auth }: HttpContextContract) {
    let payload = await request.validate(BookingCreateValidator);
    try {
      let user = auth.user!;
        let booking = new Booking();
        booking.fieldId = request.input("field_id", params.id);
        booking.userId = request.input("user_id", user.id);
        booking.playDateStart = payload.play_date_start;
        booking.playDateEnd = payload.play_date_end;

        user.related("players").save(booking);

        response.created({
          message: "berhasil menambahkan data booking baru",
          data: booking,
        });
    } catch (error) {
      response.notFound({
        erorrs: error.message,
        message: "gagal membuat Booking!",
      });
    }
  }
}
