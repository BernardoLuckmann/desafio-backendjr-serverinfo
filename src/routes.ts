import {FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply} from "fastify";

import { CreateUserController } from "./controllers/userControllers/CreateUserController"
import { ListUsersController } from "./controllers/userControllers/ListUsersController";
import { DeleteUserController } from "./controllers/userControllers/DeleteUserController"
import { UpdateUserController } from "./controllers/userControllers/UpdateUserController"

import { CreatePlaylistController } from "./controllers/playlistControllers/CreatePlaylistController"
import { ListPlaylistController } from "./controllers/playlistControllers/ListPlaylistController";
import { DeletePlaylistController } from "./controllers/playlistControllers/DeletePlaylistController"
import { UpdatePlaylistController } from "./controllers/playlistControllers/UpdatePlaylistController"
import { RegisterUserController } from "./controllers/userControllers/RegisterUserController";
import { LoginUserController } from "./controllers/userControllers/LoginUserController";


export async function adminRoutes(fastify: FastifyInstance, options: FastifyPluginOptions,) {

    fastify.addHook("preHandler", async function hook (request: FastifyRequest, reply: FastifyReply) {
      if (request.headers['role'] !== 'ADMIN'){
        reply.code(403).send("Usuário sem permissão.");
      }
    })

    //CRUD para o usuário.
    fastify.post("/user", async(request: FastifyRequest, reply: FastifyReply) => {
      return new CreateUserController().handle(request, reply);
    })

    fastify.get("/users", async(request: FastifyRequest, reply: FastifyReply) => {
      return new ListUsersController().handle(request, reply);
    })

    fastify.put("/user", async(request: FastifyRequest, reply: FastifyReply) => {
      return new UpdateUserController().handle(request, reply);
    })

    fastify.delete("/user", async(request: FastifyRequest, reply: FastifyReply) => {
      return new DeleteUserController().handle(request, reply);
    })

}

export async function userRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {

  //Verifica se o usuário ja é cadastrado para ter acesso as funcionalidades de playlists.
  fastify.addHook("preHandler", async function hook (request: FastifyRequest, reply: FastifyReply) {
    if (request.headers['role'] !== 'USER'){
      reply.code(403).send("Usuário sem permissão.");
    }
  })

  //CRUD para a playlist.
  fastify.post("/playlist", async(request: FastifyRequest, reply: FastifyReply) => {
    return new CreatePlaylistController().handle(request, reply);
  })

  fastify.get("/playlists", async(request: FastifyRequest, reply: FastifyReply) => {
    return new ListPlaylistController().handle(request, reply);
  })

  fastify.delete("/playlist", async(request: FastifyRequest, reply: FastifyReply) => {
    return new DeletePlaylistController().handle(request, reply);
  })

  fastify.put("/playlists", async(request: FastifyRequest, reply: FastifyReply) => {
    return new UpdatePlaylistController().handle(request, reply);
  })

}

export async function publicRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {

  //Teste para verificar se o servidor está rodando.
  fastify.get("/healthcheck", async(request: FastifyRequest, reply: FastifyReply) => {
    return 'healthy'
  })

  //Comandos de acesso público.
  fastify.post("/register", async(request: FastifyRequest, reply: FastifyReply) => {
    return new RegisterUserController().handle(request, reply);
  })

  fastify.post("/login", async(request: FastifyRequest, reply: FastifyReply) => {
    return new LoginUserController().handle(request, reply);
  })

}