import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import ContentVerifier from "@/components/ContentVerifier";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <ContentVerifier />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
