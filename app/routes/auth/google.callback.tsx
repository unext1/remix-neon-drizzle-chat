import type { LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/service/auth.server";

export function loader({ request }: LoaderArgs) {
  console.log("hi");
  return authenticator.authenticate("google", request, {
    failureRedirect: "/",
    successRedirect: "/",
  });
}
