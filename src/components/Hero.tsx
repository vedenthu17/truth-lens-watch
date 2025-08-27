import { Button } from "@/components/ui/button";
import { CheckCircle, Eye, Shield } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-background to-secondary py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent border border-accent/20 rounded-full px-4 py-2 mb-6">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Powered by AI & Real-time Analysis</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Stop Fake News
            <br />
            <span className="text-primary">Before It Spreads</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            NeutralMirror uses advanced AI to verify news articles, images, and videos in real-time. 
            Get instant credibility scores and protect yourself from misinformation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4">
              <Shield className="h-5 w-5 mr-2" />
              Verify Content Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              <Eye className="h-5 w-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-accent/10 rounded-full p-4 mb-4">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">98.7%</h3>
              <p className="text-muted-foreground">Accuracy Rate</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 rounded-full p-4 mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">2M+</h3>
              <p className="text-muted-foreground">Articles Verified</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-accent/10 rounded-full p-4 mb-4">
                <Eye className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">&lt;2s</h3>
              <p className="text-muted-foreground">Verification Time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;