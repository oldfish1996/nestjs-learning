import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { config } from "dotenv";

config({ path: "apps/google-login/src/.env" });

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

const clientID = getRequiredEnv("GOOGLE_CLIENT_ID");
const clientSecret = getRequiredEnv("GOOGLE_CLIENT_SECRET");

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID,
      clientSecret,
      callbackURL: "http://localhost:3000/callback/google",
      scope: ["profile", "email"],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any, done: any) {
    const { photos, emails, name } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    return user;
  }
}
