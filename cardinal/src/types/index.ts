import { MouseEventHandler } from "react";

export interface CustomButtonProps{
    title: string;
    containerStyles?: string;
    handleClick?: 
    MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
}

export interface PatientDataProps{
    name: string;
    age: number;
    gender: string;
    pastDiseases?: string;
    pastSurgicalProcedures?: string;
    currentMedication?: string;
    knownFamilyRisk?: string;
}

// export interface SearchManufacturerProps{
//     manufacturer: string;
//     setManufacturer: (manufacturer: string) => void;
    
// }