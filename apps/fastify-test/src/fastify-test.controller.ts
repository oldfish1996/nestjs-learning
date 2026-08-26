import { Controller, Get, Request, Response } from "@nestjs/common";
import { FastifyTestService } from "./fastify-test.service";
import { FastifyReply, FastifyRequest } from "fastify";

@Controller()
export class FastifyTestController {
  constructor(private readonly fastifyTestService: FastifyTestService) {}

  @Get()
  getHello(
    @Request() request: FastifyRequest,
    @Response() reply: FastifyReply,
  ) {
    reply.header("url", request.url);
    reply.send("FastifyReply: Fastify test!!!");
    // return this.fastifyTestService.getHello();
  }
}
