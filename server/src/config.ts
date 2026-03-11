if (!process.env.JWT_SECRET) {
  throw new Error("JWT SECRET not defined");
}

const config = {
  jwtToken: process.env.JWT_SECRET,
  PORT: process.env.PORT || 3000,
};

export default config;
