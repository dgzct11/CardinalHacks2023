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
  
  
  export interface TreatmentData {
    name: string ;
    startDate: Date | null;
    endDate?: Date | null;
    dose?: string;
    comment?: string;
  }
  export interface DiseaseData {
    name: string;
    startDate: Date | null;
    endDate?: Date | null;
    stage: string;
    condition: string;
    comments?: string;
    treatments: TreatmentData[];

  }
  export interface PatientData {
    patientId: string;
    name: string;
    email: string;
    joinDate: Date;
    diseases?: DiseaseData[];
    age?: string;
    sex?: string;
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
    patientId: string

    @prop({required: true})
    name: string

    @prop({required: true})
    email: string

    @prop({required: true})
    joinDate: Date

    @prop()
    diseases: DiseaseData[]

    @prop()
    age: string;

    @prop()
    sex: string;

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