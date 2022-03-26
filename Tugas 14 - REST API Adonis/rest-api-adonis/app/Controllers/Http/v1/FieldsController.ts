import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import FieldCreateValidator from "App/Validators/v1/FieldCreateValidator";
import Database from "@ioc:Adonis/Lucid/Database";

export default class FieldsController {
  public async index({ response, params }: HttpContextContract) {
    try {
      // ambil semua data
      let field = await Database.query()
        .select("*")
        .from("fields")
        .where("venue_id", params.venue_id);
      // untuk mengambil data tertentu
      // let venues = await Database.query().select('id', 'name', 'address', 'phone').from('venues')
      response
        .status(200)
        .json({ message: "Berhasil mengambil semua data Arena", data: field });
    } catch (error) {
      response.badRequest({
        erorrs: error.messages,
        message: "gagal memuat data Arena!",
      });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(FieldCreateValidator);
      let field = await Database.table("fields").insert({
        name: request.input("name"),
        type: request.input("type"),
        venue_id: request.input("venue_id"),
      });
      response.created({
        message: "Arena berhasil dibuat!",
        data: field,
      });
    } catch (error) {
      response.badRequest({
        erorrs: error.messages,
        message: "gagal membuat Arena!",
      });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      let field = await Database.from("fields")
        .where("venue_id", params.venue_id)
        .select("id", "name", "type", "venue_id")
        .where("id", params.id)
        .firstOrFail();
      response.ok({
        message: "Berhasil ambil data Arena berdasarkan id!",
        data: field,
      });
    } catch (error) {
      response.notFound({
        erorrs: error.messages,
        message: "Arena tidak ditemukan!",
      });
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    await request.validate(FieldCreateValidator);
    try {
      let id = params.id;
      let field = await Database.from("fields")
        .where("id", id)
        .update({
          name: request.input("name"),
          type: request.input("type"),
          venue_id: request.input("venue_id"),
        });
      response.ok({ message: "Arena berhasil di update!", data: field });
    } catch (error) {
      response.badRequest({
        erorrs: error.messages,
        message: "gagal update Arena!",
      });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      let id = params.id;
      await Database.from("fields").where("id", id).delete();
      response.ok({ message: "Arena berhasil di hapus!" });
    } catch (error) {
      response.badRequest({
        erorrs: error.messages,
        message: "gagal hapus Arena!",
      });
    }
  }
}
