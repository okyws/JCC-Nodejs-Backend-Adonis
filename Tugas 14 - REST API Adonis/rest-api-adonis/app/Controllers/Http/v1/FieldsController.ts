import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import FieldCreateValidator from "App/Validators/v1/FieldCreateValidator";
import Database from "@ioc:Adonis/Lucid/Database";

export default class FieldsController {
  public async index({ response }: HttpContextContract) {
    try {
      // ambil semua data
      let venues = await Database.query().select("*").from("fields");
      // untuk mengambil data tertentu
      // let venues = await Database.query().select('id', 'name', 'address', 'phone').from('venues')
      response
        .status(200)
        .json({ message: "Berhasil mengambil semua data Arena", data: venues });
    } catch (error) {
      response.badRequest({ erorrs: error.messages });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(FieldCreateValidator);
      let newVenue = await Database.table("fields").insert({
        name: request.input("name"),
        type: request.input("type"),
        venue_id: request.input("venue_id"),
      });
      response.created({
        message: "Arena berhasil dibuat!",
        newId: newVenue,
      });
    } catch (error) {
      response.badRequest({ erorrs: error.messages, message: "gagal membuat Arena!" });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      let venue = await Database.from("fields")
        .where("id", params.id)
        .select("id", "name", "type", "venue_id")
        // .firstOrFail();
      response.created({
        message: "Berhasil ambil data Arena berdasarkan id!",
        data: venue,
      });
    } catch (error) {
      response.notFound({ message: "Arena tidak ditemukan!" });
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    await request.validate(FieldCreateValidator);
    try {
      let id = params.id;
      await Database.from("fields")
        .where("id", id)
        .update({
          name: request.input("name"),
          type: request.input("type"),
          venue_id: request.input("venue_id"),
        });
      response.ok({ message: "Arena berhasil di update!" });
    } catch (error) {
      response.badRequest({ message: "gagal update Arena!" });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      let id = params.id;
      await Database.from("venues").where("id", id).delete();
      response.ok({ message: "Arena berhasil di hapus!" });
    } catch (error) {
      response.notFound({ message: "gagal hapus Arena!" });
    }
  }
}
