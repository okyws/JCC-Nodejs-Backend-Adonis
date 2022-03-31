import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UserValidator from "App/Validators/v1/UserValidator";
import User from "App/Models/User";
import { schema } from "@ioc:Adonis/Core/Validator";

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const data = await request.validate(UserValidator);
    try {
      /** cara 1 
      User.create(data);

      return response.created({ message: "Registrasi berhasil!" });
      */

      // cara 2
      const newUser = await User.create({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      response.created({
        message: "Registrasi berhasil!",
        data: newUser,
      });
    } catch (error) {
      response.unprocessableEntity({ messages: error.message });
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
      const loginSchema = schema.create({
        email: schema.string({ trim: true }),
        password: schema.string({ trim: true }),
      });
      const payload =  await request.validate({ schema: loginSchema });
      
      const token = await auth.use("api").attempt(payload.email, payload.password);

      return response.ok({ message: "Login Berhasil", data: token });
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
