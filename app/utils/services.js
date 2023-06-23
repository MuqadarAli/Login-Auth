import bcrypt from 'bcryptjs'
const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

export async function userEmailExist(userEmail) {
  try {
    const userExist = await db.users.findFirst({
      where: {
        email: userEmail,
      },
    });

    return userExist;
  } catch (err) {
    return err;
  }
}

export async function userRegistration(userData) {
    const hashPassword = await bcrypt.hash(userData.password, 10)
  const userExist = await userEmailExist(userData.email);
  if (userExist === null) {
    await db.users.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashPassword,
      },
    });
  }
}

export async function userLoginAuth(loginData) {
  try {
    const loginAuth = await db.users.findFirst({
      where: {
        email: loginData.email,
        password: loginData.password,
      },
    });
    return loginAuth;
  } catch (err) {
    return err;
  }
}
