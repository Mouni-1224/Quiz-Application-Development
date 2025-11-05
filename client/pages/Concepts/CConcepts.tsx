import { conceptsData } from "@/data/concepts";
import ConceptPageTemplate from "./ConceptPageTemplate";

export default function CConcepts() {
  return (
    <ConceptPageTemplate
      subject={conceptsData.C}
      subjectId="c"
    />
  );
}
