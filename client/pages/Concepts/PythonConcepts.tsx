import { conceptsData } from "@/data/concepts";
import ConceptPageTemplate from "./ConceptPageTemplate";

export default function PythonConcepts() {
  return (
    <ConceptPageTemplate
      subject={conceptsData.Python}
      subjectId="python"
    />
  );
}
