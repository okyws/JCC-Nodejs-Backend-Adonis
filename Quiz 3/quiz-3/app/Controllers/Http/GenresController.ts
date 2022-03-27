import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import GenreCreateValidator from "App/Validators/GenreCreateValidator";
import Database from "@ioc:Adonis/Lucid/Database";

export default class GenresController {
  public async index({ response }: HttpContextContract) {
    try {
      let genre = await Database.query().select("id", "name").from("genres");
      response
        .status(200)
        .json({ message: "Berhasil mengambil semua data Genres", data: genre });
    } catch (error) {
      response.badRequest({ erorrs: error.messages });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(GenreCreateValidator);
    try {
      let genre = await Database.table("genres").insert({
        name: request.input("name"),
      });
      return response.created({
        message: "Genre berhasil dibuat!",
        data: genre,
      });
    } catch (error) {
      response.badRequest({
        erorrs: error.messages,
        message: "gagal membuat Genre!",
      });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      let id = params.id;
      const genre = await Database.query()
        .select("*")
        .from("genres")
        .where("id", id);
      const movie = await Database.query()
        .select("id", "title", "release_date", "resume")
        .from("movies")
        .where("genre_id", id);
      return response.status(200).json({
        id: genre[0].id,
        name: genre[0].name,
        movies: movie,
      });
    } catch (error) {
      response.notFound({ message: "Genre tidak ditemukan!" });
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    await request.validate(GenreCreateValidator);
    try {
      let id = params.id;
      let genre = await Database.from("genres")
        .where("id", id)
        .update({
          name: request.input("name"),
        });
      if (genre) {
        response.ok({ message: "data berhasil di update!", data: genre });
      } else {
        response.status(404).json({ message: "Genre tidak ditemukan!" });
      }
    } catch (error) {
      response.badRequest({ message: "gagal update data!" });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      let id = params.id;
      let genre = await Database.from("genres").where("id", id).delete();
      if (genre) {
        response.ok({ message: "data Genre berhasil di hapus!", data: genre });
      } else {
        response.status(404).json({ message: "Genre tidak ditemukan!" });
      }
    } catch (error) {
      response.badRequest({
        erorrs: error.messages,
        message: "gagal hapus data!",
      });
    }
  }
}
