import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UserValidator from "App/Validators/v1/UserValidator";
import User from "App/Models/User";
import { schema } from "@ioc:Adonis/Core/Validator";

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(UserValidator);
      User.create(data);

      return response.created({ message: "Registrasi berhasil!" });
    } catch (error) {
      return response.unprocessableEntity({ messages: error.message });
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    /** Cara 1 validasi dan error message 
    const usersSchema = schema.create({
      email: schema.string(),
      password: schema.string(),
    })
    const payload = await request.validate({schema: usersSchema})
    try {
      const email = request.input("email");
      const password = request.input("password");

      const token = await auth.use("api").attempt(email, password);

      return response.ok({ message: "Login Berhasil", token });
    } catch (error) {
      return response.unprocessableEntity({ messages: 'Login gagal!', error: error.message });
    }
    */

    // Cara 2
    try {
      const usersSchema = schema.create({
        email: schema.string(),
        password: schema.string(),
      });
      await request.validate({ schema: usersSchema });
      const email = request.input("email");
      const password = request.input("password");

      const token = await auth.use("api").attempt(email, password);

      return response.ok({ message: "Login Berhasil", token });
    } catch (error) {
      if (error.guard) {
        return response.unprocessableEntity({
          messages: "Login gagal!",
          error: error.message,
        });
      } else {
        return response.unprocessableEntity({
          messages: "Login gagal!",
          error: error.messages,
        });
      }
    }
  }
}
