import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "chenys",
      ignoreExpiration: true,
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.userId,
      username: payload.username,
    };
  }
}
