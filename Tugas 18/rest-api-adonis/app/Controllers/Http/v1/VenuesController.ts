import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import VenueCreateValidator from "App/Validators/v1/VenueCreateValidator";

/**import for query builder
  import Database from "@ioc:Adonis/Lucid/Database";
*/

// import model for ORM
import Venue from "App/Models/Venue";
import Field from "App/Models/Field";

export default class VenuesController {
  public async index({ request, response }: HttpContextContract) {
    /** Using query builder
    try {
      // ambil semua data
      let venue = await Database.query().select("*").from("venues");
      // untuk mengambil data tertentu
      // let venues = await Database.query().select('id', 'name', 'address', 'phone').from('venues')
      response
        .status(200)
        .json({ message: "Berhasil mengambil semua data venue", data: venue });
    } catch (error) {
      response.badRequest({ erorrs: error.messages });
    }
     */

    // use ORM
    try {
      // tampilkan semua data
      let venue = await Venue.all();
      if (venue) {
        response.status(200).json({
          message: "Berhasil mengambil semua data venue",
          data: venue,
        });
        // menggunakan request.qs() untuk filter berdasarkan nama
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
    /** use query builder
    await request.validate(VenueCreateValidator);
    try {
      let venue = await Database.table("venues").insert({
        name: request.input("name"),
        address: request.input("address"),
        phone: request.input("phone"),
      });
      return response.created({
        message: "Venue berhasil dibuat!",
        data: venue,
      });
    } catch (error) {
      response.badRequest({
        erorrs: error.messages,
        message: "gagal membuat Venue!",
      });
    }
     */

    // use ORM
    const payload = await request.validate(VenueCreateValidator);
    try {
      /** cara 1 
      let venue = new Venue();
      venue.name = request.input("name");
      venue.address = request.input("address");
      venue.phone = request.input("phone");

      let newVenue = await venue.save();
      
      cek user yang sedang login 
        const userId = auth.user?.id
        console.log("user id: ", userId);
      */

      // cara 2
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
    /** use query builder
    try {
      let venue = await Database.from("venues")
        .where("id", params.id)
        .select("id", "name", "address", "phone")
        .firstOrFail();
      response.ok({
        message: "Berhasil ambil data Venue berdasarkan id!",
        data: venue,
      });
    } catch (error) {
      response.notFound({ message: "data tidak ditemukan!" });
    }
     */

    // use ORM
    try {
      /** Cara 1 
       let venue = await Venue.findOrFail(params.id)
      */

      /** alternative dapatkan semua data field
      let venue = await Venue.query()
      .where("id", params.id)
      .select("id", "name", "address", "phone")
      .orWhereNull("id")
      .preload("fields");
      */

      // let venue = await Venue.findByOrFail("id", params.id);

      // response.ok({
      //   message: "Berhasil ambil data Venue berdasarkan id!",
      //   data: venue,
      // });

      const venue = await Venue.query()
        .where("id", params.id)
        // .andWhere("venue_id", params.venue_id)
        .select("*")
        .preload("fields", (fieldQuery) => {
          fieldQuery.preload("bookings")
        })
        .firstOrFail();
      response.status(200).json({
        message: "berhasil get data venue by id",
        data: venue,
      });

      if (request.qs().type) {
        let type = request.qs().type;

        const venue = await Venue.query()
        .where("id", params.id)
        // .andWhere("venue_id", params.venue_id)
        .select("id", "name", "address", "phone")
        // .preload("fields")
        .firstOrFail();

        let field = await Field.query()
          .where("venue_id", params.id)
          .andWhere("type", type);
        response.status(200).json({
          message: "filter data berdasarkan type",
          data: venue, filter: field,
        });
      }
    } catch (error) {
      response.notFound({ message: "data tidak ditemukan!" });
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    /** Use Query Builder
    await request.validate(VenueCreateValidator);
    try {
      let id = params.id;
      let venue = await Database.from("venues")
        .where("id", id)
        .update({
          name: request.input("name"),
          address: request.input("address"),
          phone: request.input("phone"),
        });
      if (venue) {
        response.ok({ message: "data berhasil di update!", data: venue });
      } else {
        response.status(404).json({ message: "Venue tidak ditemukan!" });
      }
    } catch (error) {
      response.badRequest({ message: "gagal update data!" });
    }
    */

    // Use ORM
    await request.validate(VenueCreateValidator);
    try {
      let id = params.id;
      let update = await Venue.findByOrFail("id", id);
      // /** cara 1
      // venue.name = request.input("name");
      // venue.address = request.input("address");
      // venue.phone = request.input("phone");
      // venue.save();
      // */

      // // cara 2
      await update
        .merge({
          name: request.input("name"),
          address: request.input("address"),
          phone: request.input("phone"),
        })
        .save();

      // // cara dari video
      // const payload = await request.validate(VenueCreateValidator);
      // let update = await Venue.updateOrCreate({ id: params.id }, payload);

      response.ok({ message: "data berhasil di update!", data: update });
    } catch (error) {
      response.notFound({ message: "data tidak ditemukan!" });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    /** use Query builder
    try {
      let id = params.id;
      let venue = await Database.from("venues").where("id", id).delete();
      if (venue) {
        response.ok({ message: "data Venue berhasil di hapus!", data: venue });
      } else {
        response.status(404).json({ message: "Venue tidak ditemukan!" });
      }
    } catch (error) {
      response.badRequest({
        erorrs: error.messages,
        message: "gagal hapus data!",
      });
    }
    */

    // use ORM
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
