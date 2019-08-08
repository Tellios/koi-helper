import { Module } from "../ioc";
import { ConnectionService, TransactionService } from "./orm";
import { PondService } from "./PondService";
import { TreatmentService } from "./TreatmentService";
import { DiseaseService } from "./DiseaseService";
import { VarietyService } from "./VarietyService";
import { FishService } from "./FishService";
import { MeasurementService } from "./MeasurementService";

@Module({
  services: [
    ConnectionService,
    TransactionService,
    PondService,
    MeasurementService,
    TreatmentService,
    DiseaseService,
    VarietyService,
    FishService
  ]
})
export class StorageModule {}
