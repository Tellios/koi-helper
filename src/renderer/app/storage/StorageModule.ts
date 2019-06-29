import { Module } from "../ioc";
import { ConnectionService, TransactionService } from "./orm";
import { PondService } from "./PondService";
import { TreatmentService } from "./TreatmentService";
import { DiseaseService } from "./DiseaseService";

@Module({
  services: [
    ConnectionService,
    TransactionService,
    PondService,
    TreatmentService,
    DiseaseService
  ]
})
export class StorageModule {}
