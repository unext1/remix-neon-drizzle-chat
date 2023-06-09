import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { requireUser } from "~/service/auth.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ params, request }: LoaderArgs) {
  const user = await requireUser(request);
  console.log(user);
  return json({ user });
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1 className="font-extrabold text-6xl">Hi, {user.name}</h1>
      <p className="text-xl">{user.email}</p>
      <Form method="post" action="/auth/login">
        <button type="submit">Login</button>
      </Form>
    </div>
  );
}
