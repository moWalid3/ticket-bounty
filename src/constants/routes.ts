export const Routes = {
  home: "/",
  tickets: "/tickets",
  ticket: (ticketId: string) => `/tickets/${ticketId}`,
  ticketEdit: (ticketId: string) => `/tickets/${ticketId}/edit`,
  signUp: "/sign-up",
  signIn: "/sign-in",
  profile: "/account/profile",
  password: "/account/password",
};
