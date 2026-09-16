import prisma from '../config/database';

export const add = async (name: string, email: string, passwordHash: string) => {
    return prisma.user.create({
        data: {
            name: name,
            email: email,
            passwordHash: passwordHash,
        }
    })
}

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const findUserByEmailAndPassword = async (email: string,passwordHash: string) => {
  return prisma.user.findFirst({
    where: {
      email,
      passwordHash
    },
  });
};

export const findUserById = async (id: number) => {
    return prisma.user.findUnique({
        where: {
            id
        }
    })
}