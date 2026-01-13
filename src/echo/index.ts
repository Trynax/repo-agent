import Echo from "@merit-systems/echo-next-sdk";

export const { handlers, isSignedIn, getUser, openai, anthropic } = Echo({
  appId: process.env.ECHO_APP_ID || "00000000-0000-4000-8000-000000000000",
});
