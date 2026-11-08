import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-github2";
import { config } from "dotenv";

config({ path: "apps/github-login/src/.env" });

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

const clientID = getRequiredEnv("GITHUB_CLIENT_ID");
const clientSecret = getRequiredEnv("GITHUB_CLIENT_SECRET");

export class AuthStrategy extends PassportStrategy(Strategy, "github") {
  constructor() {
    super({
      clientID,
      clientSecret,
      callbackURL: "http://localhost:3000/callback",
      scope: ["read:user"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return profile;
  }
}
