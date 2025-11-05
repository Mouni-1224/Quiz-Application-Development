import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SpeakerButton } from "@/components/SpeakerButton";
import { SubjectConcepts } from "@/data/concepts";
import {
  Code2,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

interface ConceptPageProps {
  subject: SubjectConcepts;
  subjectId: string;
}

export default function ConceptPageTemplate({
  subject,
  subjectId,
}: ConceptPageProps) {
  const allContent = `${subject.name} Concepts. ${subject.introduction} ${subject.concepts
    .map((c) => `${c.title}: ${c.description}`)
    .join(" ")}`;

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <Code2 className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                  {subject.name} Concepts
                </h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Master the fundamentals of {subject.name}
              </p>
            </div>
            <SpeakerButton text={allContent} size="lg" />
          </div>

          {/* Introduction */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/20 mb-8">
            <p className="text-lg text-foreground leading-relaxed">
              {subject.introduction}
            </p>
          </div>
        </div>

        {/* Concepts */}
        <div className="space-y-6 mb-12">
          {subject.concepts.map((concept, index) => (
            <div
              key={concept.id}
              className="bg-white rounded-xl shadow-md border border-border/50 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-8">
                {/* Concept Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                        {concept.title}
                      </h2>
                      <SpeakerButton text={concept.description} size="sm" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-foreground mb-6 leading-relaxed ml-14">
                  {concept.description}
                </p>

                {/* Code Example */}
                <div className="ml-14">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                    Example:
                  </h3>
                  <pre className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed font-mono">
                    <code>{concept.example}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 mb-12">
          <div className="flex items-center justify-between flex-col md:flex-row gap-8">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                Ready to test your knowledge?
              </h2>
              <p className="text-lg opacity-90">
                Take the {subject.name} quiz and see how much you've learned!
              </p>
            </div>
            <Link to={`/quiz/${subjectId}`} className="flex-shrink-0">
              <Button
                size="lg"
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 font-semibold group"
              >
                Take Quiz <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full h-11">
              Back to Home
            </Button>
          </Link>
          <Link to={`/quiz/${subjectId}`} className="flex-1">
            <Button className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white">
              Start {subject.name} Quiz
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
