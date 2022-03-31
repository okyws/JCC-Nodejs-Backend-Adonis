import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import BookingCreateValidator from "App/Validators/v1/BookingCreateValidator";
import Booking from "App/Models/Booking";
import Field from "App/Models/Field";

export default class BookingsController {
  public async index({ response, params }: HttpContextContract) {
    try {
      let id = params.field_id;
      let field = await Field.findByOrFail("id", id);

      if (field) {
        const booking = await Booking.query()
          .preload("fields")
          // .preload("bookings")
          .where("field_id", id)
          .select("*");
        // .firstOrFail();
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

        // let newBooking = await booking.save();
        // booking.related("fields").associate(field)
        // booking.related("users").associate(user)
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
      // let id = params.id;
      // let field_id = params.field_id;

      // const booking = await Booking.query()
      //   // .preload("fields")
      //   // .preload("users")
      //   // .preload("bookings")
      //   .where("id", id)
      //   /**
      //    * route fields/:id/booking/:id
      //    * pakai ini
      //    * .andWhere("field_id", field_id)
      //    *
      //    * route booking/:id
      //    * hapus ini
      //    * .andWhere("field_id", field_id)
      //    * */
      //   .andWhere("field_id", field_id)
      //   .select("*")
      //   .firstOrFail();
      // return response.status(200).json({
      //   message: "Berhasil ambil data Booking berdasarkan id!",
      //   data: booking,
      // });

      const booking = await Booking.query()
        .where("id", params.id)
        .preload("players", (userQuery) => {
          userQuery
            .select(["name", "email", "id"])
            .withCount("players")
            // .firstOrFail();
        });

        return response.ok({ status: 'success', data: booking})
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
      let field_id: number = params.field_id;

      let booking = await Booking.query()
        .where("id", id)
        .andWhere("field_id", field_id)
        .select("*")
        .firstOrFail();

      await booking
        .merge({
          fieldId: request.input("field_id", field_id),
          userId: request.input("user_id"),
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
      const booking = await Booking.findByOrFail("id", params.id);
      let user = auth.user!;

      let data = await booking?.related("players").sync([user.id]);

      response.ok({ message: "berhasil join booking", data: data });
    } catch (error) {
      response.notFound({
        erorrs: error.message,
        message: "data tidak ditemukan!",
      });
    }
  }
}
