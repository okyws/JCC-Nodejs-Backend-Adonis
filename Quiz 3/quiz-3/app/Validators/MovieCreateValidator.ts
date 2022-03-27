import { rules, schema } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class MovieCreateValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    title: schema.string({}, [rules.maxLength(30)]),
    resume: schema.string({}, [rules.maxLength(200)]),
    release_date: schema.date({
      format: "yyyy-MM-dd",
    }),
    genre_id: schema.number([rules.unsigned()]),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    "title.required": "Title harus diisi!",
    "title.maxLength": "Title tidak boleh lebih dari 30 huruf",
    "resume.required": "Resume harus diisi!",
    "resume.maxLength": "Resume tidak boleh lebih dari 200 huruf",
    "release_date.required": "Tanggal rilis harus diisi! (yyyy-MM-dd)",
    "release_date.format": "Tanggal harus sesuai format <yyyy-MM-dd>",
    "genre_id.required": "Genre harus di isi!",
    "genre_id.number": "Genre id harus angka",
    "genre_id.unsigned": "Genre id harus bilangan positif",
  };
}
