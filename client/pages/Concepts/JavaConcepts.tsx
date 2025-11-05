import { conceptsData } from "@/data/concepts";
import ConceptPageTemplate from "./ConceptPageTemplate";

export default function JavaConcepts() {
  return (
    <ConceptPageTemplate
      subject={conceptsData.Java}
      subjectId="java"
    />
  );
}
