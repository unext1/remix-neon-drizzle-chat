import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
import { sessionStore } from "./session.server";
import { user } from "~/db/schema";
import { db } from "./db.server";
import { unauthorized } from "remix-utils";
import { eq } from "drizzle-orm";

export type UserSession = {
  id: number;
  email: string;
};

export const authenticator = new Authenticator<UserSession>(sessionStore);

export type UserType = Awaited<ReturnType<typeof requireUser>>;

export const requireUser = async (request: Request) => {
  try {
    const sessionUser = await authenticator.isAuthenticated(request);

    if (!sessionUser || !sessionUser.id) {
      throw unauthorized({ messege: "Unauthorized" });
    }

    const [dbUser] = await db
      .select()
      .from(user)
      .where(eq(user.id, sessionUser.id));

    if (dbUser === undefined || !dbUser || !dbUser.id) {
      throw unauthorized({ messege: "Unauthorized" });
    }
    return dbUser;
  } catch (error) {
    await authenticator.logout(request, { redirectTo: "/" });
    throw error;
  }
};

export const createOrUpdateUser = async ({
  email,
  name,
  image,
}: {
  email: string;
  name: string;
  image: string;
}) => {
  const createdUser = await db
    .insert(user)
    .values({
      name,
      email,
      image,
    })
    .returning();
  console.log(createdUser, "created");

  return { id: createdUser[0].id, email };
};

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: `http://localhost:3000/auth/google/callback`,
  },
  async ({ profile }) => {
    const {
      displayName: name,
      _json: { email },
    } = profile;
    const image = profile.photos[0].value;
    return await createOrUpdateUser({ name, email, image });
  }
);

authenticator.use(googleStrategy, "google");
