import LoginPage from "@/components/form/form-elements/sign_form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignIn Page",
  description: "Signin Page",
};

export default function SignIn() {
  return <LoginPage />;
}
