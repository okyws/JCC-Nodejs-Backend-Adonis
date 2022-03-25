import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import VenueCreateValidator from "App/Validators/v1/VenueCreateValidator";
import Database from "@ioc:Adonis/Lucid/Database";

export default class VenuesController {
  public async index({ response }: HttpContextContract) {
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
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(VenueCreateValidator);
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
  }

  public async show({ response, params }: HttpContextContract) {
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
  }

  public async update({ request, response, params }: HttpContextContract) {
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
      response.ok({ message: "data berhasil di update!", data: venue });
    } catch (error) {
      response.badRequest({ message: "gagal update data!" });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      let id = params.id;
      await Database.from("venues").where("id", id).delete();
      response.ok({ message: "data berhasil di hapus!" });
    } catch (error) {
      response.badRequest({
        erorrs: error.messages,
        message: "gagal hapus data!",
      });
    }
  }

  // Sample Filter data by name
  // public async filterByName({ request, response }: HttpContextContract) {
  //   try {
  //     if (request.qs()) {
  //       let name = request.qs().name;
  //       let dataFiltered = await Database.from("venues")
  //         .select("id", "name", "address", "phone")
  //         .where("name", name);
  //       return response
  //         .status(200)
  //         .json({ message: "success filtered data", dataFiltered });
  //     }
  //   } catch (error) {
  //     response.badRequest({ erorrs: error.messages });
  //   }
  // }
}
