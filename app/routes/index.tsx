import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { eq } from "drizzle-orm";
import { user } from "~/db/schema";
import { db } from "~/service/db.server";
import * as schema from "../db/schema";
import { Form } from "@remix-run/react";
import { authenticator, requireUser } from "~/service/auth.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: ActionArgs) {
  return await authenticator.authenticate("google", request, {
    successRedirect: "/",
    failureRedirect: "/",
  });
}

export async function loader({ params, request }: LoaderArgs) {
  const user = await requireUser(request);
  return {};
}

export default function Index() {
  return (
    <div>
      <h1 className="font-extrabold text-8xl">hi</h1>
      <Form method="post">
        <button type="submit">Login</button>
      </Form>
    </div>
  );
}
