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

  
  
  export interface DoctorData {
    doctorId: string;
    name: string;
    patientsIds?: string[];
  }

  @post<DoctorClass>("save", function (doc) {
    if (doc) {
      doc.id = doc._id.toString();
      doc._id = doc.id;
    }
  })
  @post<DoctorClass[]>(/^find/, function (docs) {
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
      collection: "doctors",
    },
    options: {
      allowMixed: Severity.ALLOW,
    },
  })
  @index({ title: 1 })
  class DoctorClass {
    @prop({required: true})
    doctorId: string;

    @prop({required: true})
    name: string;

    @prop()
    patientsIds?: string[];

    _id: mongoose.Types.ObjectId | string;
  
    id: string;
  }
 
  var Doctor: ReturnModelType<typeof DoctorClass, BeAnObject>;

  if (mongoose.models.DoctorClass) {
    
    Doctor = mongoose.model('DoctorClass') as unknown as ReturnModelType<typeof DoctorClass, BeAnObject>;
  } else {
    
    Doctor = getModelForClass(DoctorClass)
  }

export { Doctor, DoctorClass };
  
//TODO Fix Doctor error with type ReturnModelType