import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import MovieCreateValidator from "App/Validators/MovieCreateValidator";
import Database from "@ioc:Adonis/Lucid/Database";

export default class MoviesController {
  public async index({ response }: HttpContextContract) {
    try {
      let movie = await Database.query().select("*").from("movies");
      response
        .status(200)
        .json({ message: "Berhasil mengambil semua data Movie", data: movie });
    } catch (error) {
      response.badRequest({ erorrs: error.message });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(MovieCreateValidator);
    try {
      let movie = await Database.table("movies").insert({
        title: request.input("title"),
        resume: request.input("resume"),
        release_date: request.input("release_date"),
        genre_id: request.input("genre_id"),
      });
      return response.created({
        message: "Movie berhasil dibuat!",
        data: movie,
      });
    } catch (error) {
      response.badRequest({
        // erorrs: error.message,
        message: "gagal membuat Movie genre_id tidak tersedia!",
      });
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      let movie = await Database.from("movies")
        .where("id", params.id)
        .select("id", "title", "resume", "release_date", "genre_id")
        .firstOrFail();
      response.ok({
        message: "Berhasil ambil data Movie berdasarkan id!",
        data: movie,
      });
    } catch (error) {
      response.notFound({
        message: "Movie tidak ditemukan!",
        erorrs: error.message,
      });
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    await request.validate(MovieCreateValidator);
    try {
      let id = params.id;
      let movie = await Database.from("movies")
        .where("id", id)
        .update({
          title: request.input("title"),
          resume: request.input("resume"),
          release_date: request.input("release_date"),
          genre_id: request.input("genre_id"),
        });
      if (movie) {
        response.ok({ message: "data berhasil di update!", data: movie });
      } else {
        response.status(404).json({ message: "Movie tidak ditemukan!" });
      }
    } catch (error) {
      response.badRequest({ message: "gagal update data!" });
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      let id = params.id;
      let movie = await Database.from("movies").where("id", id).delete();
      if (movie) {
        response.ok({ message: "data Movie berhasil di hapus!", data: movie });
      } else {
        response.status(404).json({ message: "Movie tidak ditemukan!" });
      }
    } catch (error) {
      response.badRequest({
        erorrs: error.messages,
        message: "gagal hapus data!",
      });
    }
  }
}
