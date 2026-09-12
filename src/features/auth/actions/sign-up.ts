"use server";

import { SignUpValuesType } from "../validation/sign-up-validation";

export async function signUp(data: SignUpValuesType) {
  await new Promise((res) => setTimeout(res, 1000));

  console.log(data);
}
