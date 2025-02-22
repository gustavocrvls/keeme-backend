import { PrismaClient } from '@prisma/client';
import { ProfileSeed } from './seeds/profile.seed';
import { ACCStatusSeed } from './seeds/acc_status.seed';
import { UnityOfMeasurementSeed } from './seeds/unity_of_measurement.seed';
import { UserSeed } from './seeds/user.seed';
import { ACCTypeSeed } from './seeds/acc_type.seed';
import { CourseSeed } from './seeds/course.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding db...');

  console.log('Seeding profile...');
  await prisma.profile.createMany({
    data: ProfileSeed,
  });

  console.log('Seeding acc_status...');
  await prisma.acc_status.createMany({
    data: ACCStatusSeed,
  });

  console.log('Seeding unity_of_measurement...');
  await prisma.unity_of_measurement.createMany({
    data: UnityOfMeasurementSeed,
  });

  console.log('Seeding user...');
  await prisma.user.createMany({
    data: UserSeed,
  });

  console.log('Seeding course...');
  await prisma.course.createMany({
    data: CourseSeed,
  });

  console.log('Seeding acc_type...');
  for (const accType of ACCTypeSeed) {
    await prisma.acc_type.create({
      include: {
        acc_variants: true,
      },
      data: accType,
    });
  }
}

main()
  .then(async () => {
    console.log('Done!');
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    console.log('Error in seeding');
    await prisma.$disconnect();
    process.exit(1);
  });
