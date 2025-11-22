import { signupStore } from "../context/SignupContext";

export const getSignupToken = async () => {
  try {
    const state = signupStore.getState();
    return state?.signupData?.accessToken || null;
  } catch (e) {
    console.log("tokenHelper Error:", e);
    return null;
  }
};
