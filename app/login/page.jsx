import { permanentRedirect as redirect } from "next/navigation";
import { Login } from "@/_pages/login/login-data";
import { getAccountURL } from "@/_redirect-handlers";
import { getLoggedInStatus } from "@/_functions";
import { cookies } from "next/headers";

const AcountLogin = async () => {
  let url = getAccountURL(null, "nalog");
  let all_cookies = cookies();
  let customer_token = all_cookies?.get("customer_token")?.value;
  let is_logged_in = await getLoggedInStatus(customer_token);

  switch (true) {
    case !is_logged_in:
      return <Login />;
    default:
      redirect(`${url}`);
  }
};

export default AcountLogin;

export const metadata = {
  title: "Login | Fashion Template",
  description: "Fashion Template",
  robots: {
    index: false,
    follow: false,
  },
};
