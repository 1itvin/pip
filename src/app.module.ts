import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfig, DatabaseConfig } from './config';
import { EmployeesModule } from './employees/employees.module';
import { LicenseStatusesModule } from './license-statuses/license-statuses.module';
import { EmployeeRanksModule } from './employee-ranks/employee-ranks.module';
import { OffensesModule } from './offenses/offense.module';
import { CarsModule } from './cars/car.module';
import { CarOwnersModule } from './car-owners/car-owners.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { EmployeeOffensesModule } from './employee-offenses/employee-offenses.module';

@Module({
  imports: [
    CarsModule,
    CarOwnersModule,
    LicenseStatusesModule,
    EmployeeRanksModule,
    EmployeesModule,
    OffensesModule,
    UsersModule,
    RolesModule,
    EmployeeOffensesModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [AppConfig, DatabaseConfig],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
