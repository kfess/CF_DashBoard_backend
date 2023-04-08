import { Classification } from "@/entities/sharedTypes";

export const getClassification = (contestName: string): Classification => {
  const classifications: Classification[] = [
    "Div. 1 + Div. 2",
    "Div. 1",
    "Div. 2",
    "Div. 3",
    "Div. 4",
    "ICPC",
    "Kotlin Heros",
    "Global",
    "Educational",
    "Others",
  ];

  const foundClassification = classifications.find((classification) =>
    contestName.includes(classification)
  );
  return foundClassification || "Others";
};
