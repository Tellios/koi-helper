import { Module } from "../ioc";
import { ConnectionService, TransactionService } from "./orm";
import { PondService } from "./PondService";
import { TreatmentService } from "./TreatmentService";
import { DiseaseService } from "./DiseaseService";
import { VarietyService } from "./VarietyService";

@Module({
  services: [
    ConnectionService,
    TransactionService,
    PondService,
    TreatmentService,
    DiseaseService,
    VarietyService
  ]
})
export class StorageModule {}
