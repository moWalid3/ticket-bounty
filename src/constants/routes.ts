export const Routes = {
  home: "/",
  tickets: "/tickets",
  ticket: (ticketId: string) => `/tickets/${ticketId}`,
  signUp: "/sign-up",
  signIn: "/sign-in",
  profile: "/account/profile",
  password: "/account/password",
};
