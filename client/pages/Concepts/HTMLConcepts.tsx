import { conceptsData } from "@/data/concepts";
import ConceptPageTemplate from "./ConceptPageTemplate";

export default function HTMLConcepts() {
  return (
    <ConceptPageTemplate
      subject={conceptsData.HTML}
      subjectId="html"
    />
  );
}
