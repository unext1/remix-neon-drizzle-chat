import { type ActionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/service/auth.server";

export const loader = () => {
  return redirect("/app");
};

export async function action({ request }: ActionArgs) {
  return await authenticator.authenticate("google", request, {
    successRedirect: "/",
    failureRedirect: "/",
  });
}
