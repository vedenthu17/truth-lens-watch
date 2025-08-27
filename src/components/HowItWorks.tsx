import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Brain, Shield, Users } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Submit Content",
    description: "Upload text, images, videos, or use our camera/microphone to capture content in real-time.",
    color: "text-primary"
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our advanced AI algorithms analyze the content using pattern recognition, source verification, and fact-checking databases.",
    color: "text-accent"
  },
  {
    icon: Shield,
    title: "Cross-Reference",
    description: "Content is cross-referenced against millions of verified sources and fact-checking organizations worldwide.",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Get Results",
    description: "Receive instant credibility scores, source verification, and detailed analysis reports with confidence ratings.",
    color: "text-accent"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How NeutralMirror Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our sophisticated AI system combines multiple verification techniques to provide 
            accurate and reliable content authenticity assessment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="relative">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className={`h-8 w-8 ${step.color}`} />
                  </div>
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">Real-time</div>
              <p className="text-muted-foreground">
                Get instant verification results as you browse or capture content
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent mb-2">Multi-modal</div>
              <p className="text-muted-foreground">
                Verify text, images, videos, and audio content using the same platform
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">Trusted</div>
              <p className="text-muted-foreground">
                Backed by partnerships with leading fact-checking organizations
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;