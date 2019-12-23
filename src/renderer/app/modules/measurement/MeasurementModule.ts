import { Module } from "app/ioc";
import {
  addMeasurement,
  deleteMeasurement,
  updateMeasurement,
  getMeasurements
} from "./actions";

export interface IMeasurementActions {
  addMeasurement: typeof addMeasurement;
  deleteMeasurement: typeof deleteMeasurement;
  updateMeasurement: typeof updateMeasurement;
  getMeasurements: typeof getMeasurements;
}

@Module({
  name: "measurement",
  actions: [
    { name: "addMeasurement", action: addMeasurement },
    { name: "deleteMeasurement", action: deleteMeasurement },
    { name: "updateMeasurement", action: updateMeasurement },
    { name: "getMeasurements", action: getMeasurements }
  ]
})
export class MeasurementModule {}
