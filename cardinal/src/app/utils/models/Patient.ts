import {
    ModelOptions,
    ReturnModelType,
    Severity,
    getModelForClass,
    index,
    post,
    prop,
  } from "@typegoose/typegoose";
import { BeAnObject } from "@typegoose/typegoose/lib/types";
  import mongoose from "mongoose";
  
  export interface MedicationData {
    name: string;
    dosage: string;
    instructions: string;
  }
  export interface PatientData {
    patientId: string;
    name: string;
    age: string;
    gender: string;
    medicationAllergies: string[];
    currentMedications: MedicationData[];
    doctorIds: string[];
  }
  @post<PatientClass>("save", function (doc) {
    if (doc) {
      doc.id = doc._id.toString();
      doc._id = doc.id;
    }
  })
  @post<PatientClass[]>(/^find/, function (docs) {
    // @ts-ignore
    if (this.op === "find") {
      docs.forEach((doc) => {
        doc.id = doc._id.toString();
        doc._id = doc.id;
      });
    }
  })
  @ModelOptions({
    schemaOptions: {
      timestamps: true,
      collection: "patients",
    },
    options: {
      allowMixed: Severity.ALLOW,
    },
  })
  @index({ title: 1 })
  class PatientClass {
    @prop({required: true})
    patientId: string;

    @prop({required: true})
    name: string;

    @prop({required: true})
    age: string;

    @prop({required: true})
    gender: string;

    @prop({required: true})
    medicationAllergies: string[];

    @prop({required: true})
    currentMedications: MedicationData[];

    @prop({required: true})
    doctorIds: string[];

    _id: mongoose.Types.ObjectId | string;
  
    id: string;
  }
 
  var Patient: ReturnModelType<typeof PatientClass, BeAnObject>;

  if (mongoose.models.PatientClass) {
    
    Patient = mongoose.model('PatientClass') as unknown as ReturnModelType<typeof PatientClass, BeAnObject>;
  } else {
    
    Patient = getModelForClass(PatientClass)
  }

export { Patient, PatientClass };
  
//TODO Fix Patient error with type ReturnModelType