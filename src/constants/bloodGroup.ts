export enum BloodGroup {
  A_POS = "A_POS",
  A_NEG = "A_NEG",
  B_POS = "B_POS",
  B_NEG = "B_NEG",
  AB_POS = "AB_POS",
  AB_NEG = "AB_NEG",
  O_POS = "O_POS",
  O_NEG = "O_NEG",
}

export const bloodGroupOptions = [
  { value: BloodGroup.A_POS, label: "A+" },
  { value: BloodGroup.A_NEG, label: "A−" },
  { value: BloodGroup.B_POS, label: "B+" },
  { value: BloodGroup.B_NEG, label: "B−" },
  { value: BloodGroup.AB_POS, label: "AB+" },
  { value: BloodGroup.AB_NEG, label: "AB−" },
  { value: BloodGroup.O_POS, label: "O+" },
  { value: BloodGroup.O_NEG, label: "O−" },
];
