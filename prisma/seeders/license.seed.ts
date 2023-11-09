import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  const prom1 = await prisma.licenseStatus.upsert({
    where: { name: 'active' },
    create: {
      name: 'active',
    },
    update: {
      name: 'active',
    },
  });
  const prom2 = await prisma.licenseStatus.upsert({
    where: { name: 'suspended' },
    create: {
      name: 'suspended',
    },
    update: {
      name: 'suspended',
    },
  });

  return Promise.all([prom1, prom2]);
}

export default seed();
