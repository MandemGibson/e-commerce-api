import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(password, salt);
  } catch (error: any) {
    console.error("Error hashing password: ", error.message);
  }
};

export const validatePassword = async (
  password: string,
  hashedPassword: string
) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error: any) {
    console.error("Error validating password: ", error.message);
  }
};
