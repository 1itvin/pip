import { PrismaClient } from '@prisma/client';
import LicenseSeed from './license.seed';
import RankSeed from './rank.seed';
import RoleSeed from './role.seed';
const prisma = new PrismaClient();

async function main() {
  await Promise.all([LicenseSeed, RankSeed, RoleSeed]);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
