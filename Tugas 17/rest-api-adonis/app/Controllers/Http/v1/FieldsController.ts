import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import FieldCreateValidator from "App/Validators/v1/FieldCreateValidator";
/**import for query builder
 import Database from "@ioc:Adonis/Lucid/Database";
 */

// import model for ORM
import Field from "App/Models/Field";
import Venue from "App/Models/Venue";

export default class FieldsController {
  public async index({ response, params }: HttpContextContract) {
    /** use query builder
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
     */

    // use ORM
    try {
      // let field = await Field.all();
      // if (field) {
      //   response.status(200).json({
      //     message: "Berhasil mengambil semua data Arena",
      //     data: field,
      //   });
      //   // menggunakan request.qs() untuk filter berdasarkan nama
      //   if (request.qs().name) {
      //     let name = request.qs().name;

      //     let venueFiltered = await Venue.findBy("name", name);
      //     response.status(200).json({
      //       message: "filter data venue berdasarkan nama",
      //       data: venueFiltered,
      //     });
      //   }
      // }

      let venue_id = params.venue_id;
      let venue = await Venue.findBy("id", venue_id);
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

        // bugs only find first data and get from other id venue
        /** 
        if (request.qs().type) {
          let type = request.qs().type;
  
          let venueFiltered = await Field.findBy("type", type);
          // let data = await Field.all() 
          response.status(200).json({
            message: "filter data venue berdasarkan nama",
            data: venueFiltered,
          });
        }
        */
      }
    } catch (error) {
      response.badRequest({
        // erorrs: error.message,
        message: "gagal memuat data Arena!",
      });
    }
  }

  public async store({ request, response, params }: HttpContextContract) {
    /** use query builder
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
     */

    // use ORM
    await request.validate(FieldCreateValidator);
    try {
      let venue_id = params.venue_id;
      let field = await Field.findByOrFail("venue_id", venue_id);
      if (field) {
        let field = new Field();
        field.name = request.input("name");
        field.type = request.input("type");
        field.venue_id = request.input("venue_id");

        let newField = await field.save();
        response.created({
          message: "berhasil menambahkan data field baru",
          data: newField,
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
    // try {
    //   let field = await Database.from("fields")
    //     .where("id", params.id)
    //     .andWhere("venue_id", params.venue_id)
    //     .select("id", "name", "type", "venue_id")
    //     .firstOrFail();
    //   response.ok({
    //     message: "Berhasil ambil data Arena berdasarkan id!",
    //     data: field,
    //   });
    // } catch (error) {
    //   response.notFound({
    //     erorrs: error.message,
    //     message: "Arena tidak ditemukan!",
    //   });
    // }

    // use ORM
    try {
      // let id = params.id;
      // let venue_id = params.venue_id;
      // const fields = await Field.query()
      //   .where("fields.id", id)
      //   .andWhere("venue_id", venue_id)
      //   .select("*")
      //   .firstOrFail();
      // return response.status(200).json({
      //   message: "Berhasil ambil data Arena berdasarkan id!",
      //   data: fields,
      // });

      // cara 2 (tampilkan venuenya juga)
      let id = params.id;
      let venue_id = params.venue_id;

      const field = await Field.query()
        .preload("venues")
        .where("id", id)
        .andWhere("venue_id", venue_id)
        .select("id", "name", "type", "venue_id")
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

  public async update({ request, response, params }: HttpContextContract) {
    /** Use Query Builder
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
    */

    // use ORM
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
          venue_id: request.input("venue_id"),
        })
        .save();
      response.ok({ message: "Arena berhasil di update!", data: field });
    } catch (error) {
      response.notFound({ message: "data tidak ditemukan!" });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    /** use query builder 
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
    */

    // use ORM
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
}
