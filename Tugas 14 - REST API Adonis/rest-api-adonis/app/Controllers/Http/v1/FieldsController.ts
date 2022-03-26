import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import FieldCreateValidator from "App/Validators/v1/FieldCreateValidator";
import Database from "@ioc:Adonis/Lucid/Database";

export default class FieldsController {
  public async index({ request, response, params }: HttpContextContract) {
    try {
      let venue_id = params.venue_id;
      let type = request.qs().type;
      let field = await Database.from("fields")
        .where("venue_id", venue_id)
        .firstOrFail();
      if (field) {
        let field = await Database.query()
          .select("*")
          .from("fields")
          .where("venue_id", venue_id);
        response.status(200).json({
          message: "Berhasil mengambil semua data Arena",
          data: field,
        });
      }
      if (type) {
        let type = request.qs().type;
        let dataFiltered = await Database.from("fields")
          .select("*")
          .andWhere("type", type)
          .where("venue_id", venue_id);
        response
          .status(200)
          .json({ message: "success filtered data", dataFiltered });
      }
    } catch (error) {
      response.badRequest({
        erorrs: error.message,
        message: "gagal memuat data Arena!",
      });
    }
  }

  public async store({ request, response, params }: HttpContextContract) {
    await request.validate(FieldCreateValidator);
    try {
      let venue_id = params.venue_id;
      let field = await Database.from("fields")
        .where("venue_id", venue_id)
        .firstOrFail();
      if (field) {
        let field = await Database.table("fields").insert({
          name: request.input("name"),
          type: request.input("type"),
          venue_id: request.input("venue_id"),
        });
        response.ok({ message: "Arena berhasil di dibuat!", data: field });
      }
    } catch (error) {
      response.badRequest({
        // erorrs: error.message,
        message: "gagal membuat Arena!",
      });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      let field = await Database.from("fields")
        .where("id", params.id)
        .andWhere("venue_id", params.venue_id)
        .select("id", "name", "type", "venue_id")
        .firstOrFail();
      response.ok({
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

  public async update({ request, response, params }: HttpContextContract) {
    await request.validate(FieldCreateValidator);
    try {
      let id = params.id;
      let venue_id = params.venue_id;
      let field = await Database.from("fields")
        .where("id", id)
        .andWhere("venue_id", venue_id)
        .update({
          name: request.input("name"),
          type: request.input("type"),
          venue_id: request.input("venue_id"),
        });
      if (field) {
        response.ok({ message: "Arena berhasil di update!", data: field });
      } else {
        response.status(404).json({ message: "Arena tidak ditemukan!" });
      }
    } catch (error) {
      response.badRequest({
        erorrs: error.message,
        message: "gagal update Arena!",
      });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      let id = params.id;
      let venue_id = params.venue_id;
      let field = await Database.from("fields")
        .where("id", id)
        .andWhere("venue_id", venue_id)
        .delete();
      if (field) {
        response.ok({ message: "Arena berhasil di hapus!", data: field });
      } else {
        response.status(404).json({ message: "Arena tidak ditemukan!" });
      }
    } catch (error) {
      response.badRequest({
        erorrs: error.messages,
        message: "gagal hapus Arena!",
      });
    }
  }
}
