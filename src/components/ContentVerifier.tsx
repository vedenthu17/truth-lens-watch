import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Camera, Mic, Upload, Link2, AlertTriangle, CheckCircle, XCircle, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type VerificationResult = {
  score: number;
  status: 'verified' | 'suspicious' | 'fake';
  confidence: number;
  sources: string[];
  analysis: string;
};

const ContentVerifier = () => {
  const [content, setContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: false 
      });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      toast({
        title: "Camera activated",
        description: "Point your camera at any document or screen to verify content",
      });
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please enable camera permissions to use this feature",
        variant: "destructive"
      });
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: false 
      });
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak clearly to verify audio content",
      });
      
      // Simulate recording for demo
      setTimeout(() => {
        setIsRecording(false);
        stream.getTracks().forEach(track => track.stop());
        toast({
          title: "Recording completed",
          description: "Audio content is being analyzed",
        });
      }, 5000);
    } catch (error) {
      toast({
        title: "Microphone access denied",
        description: "Please enable microphone permissions to use this feature",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
  };

  const analyzeContent = async () => {
    if (!content.trim()) {
      toast({
        title: "No content to analyze",
        description: "Please enter some content or use camera/microphone features",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResult: VerificationResult = {
        score: Math.floor(Math.random() * 100),
        status: Math.random() > 0.5 ? 'verified' : Math.random() > 0.3 ? 'suspicious' : 'fake',
        confidence: Math.floor(Math.random() * 30) + 70,
        sources: [
          "Reuters Fact Check",
          "Associated Press",
          "BBC Verify",
          "Snopes.com"
        ],
        analysis: "This content has been cross-referenced against multiple verified sources. The information appears to be consistent with factual reporting from credible news organizations."
      };
      
      setResult(mockResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete",
        description: `Content verification: ${mockResult.status}`,
      });
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5 text-accent" />;
      case 'suspicious':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'fake':
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-accent text-accent-foreground';
      case 'suspicious':
        return 'bg-yellow-500 text-white';
      case 'fake':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section id="verify" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Verify Content Instantly
          </h2>
          <p className="text-xl text-muted-foreground">
            Use our AI-powered tools to check text, images, or audio content
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Content Input</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Text Input */}
              <div>
                <Textarea
                  placeholder="Paste text, URL, or describe the content you want to verify..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-32"
                />
              </div>

              {/* Media Controls */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={mediaStream ? stopCamera : startCamera}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <Camera className="h-5 w-5 mb-1" />
                  <span className="text-xs">
                    {mediaStream ? 'Stop' : 'Camera'}
                  </span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={startRecording}
                  disabled={isRecording}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <Mic className={`h-5 w-5 mb-1 ${isRecording ? 'text-destructive animate-pulse' : ''}`} />
                  <span className="text-xs">
                    {isRecording ? 'Recording' : 'Audio'}
                  </span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <Upload className="h-5 w-5 mb-1" />
                  <span className="text-xs">Upload</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <Link2 className="h-5 w-5 mb-1" />
                  <span className="text-xs">URL</span>
                </Button>
              </div>

              {/* Camera Feed */}
              {mediaStream && (
                <div className="border rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              {/* Analyze Button */}
              <Button
                onClick={analyzeContent}
                disabled={isAnalyzing}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
              >
                {isAnalyzing ? "Analyzing..." : "Verify Content"}
              </Button>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Verification Results</CardTitle>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Analyzing content...</p>
                  </div>
                  <Progress value={33} className="w-full" />
                  <p className="text-sm text-muted-foreground text-center">
                    Cross-referencing with trusted sources
                  </p>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  {/* Status Badge */}
                  <div className="flex items-center justify-center">
                    <Badge className={`text-lg px-6 py-2 ${getStatusColor(result.status)}`}>
                      {getStatusIcon(result.status)}
                      <span className="ml-2 capitalize">{result.status}</span>
                    </Badge>
                  </div>

                  {/* Score */}
                  <div className="text-center">
                    <div className="text-4xl font-bold text-foreground mb-2">
                      {result.score}/100
                    </div>
                    <p className="text-muted-foreground">Credibility Score</p>
                    <Progress value={result.score} className="w-full mt-2" />
                  </div>

                  {/* Confidence */}
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Confidence: {result.confidence}%
                    </p>
                  </div>

                  {/* Analysis */}
                  <div>
                    <h4 className="font-semibold mb-2">Analysis</h4>
                    <p className="text-sm text-muted-foreground">
                      {result.analysis}
                    </p>
                  </div>

                  {/* Sources */}
                  <div>
                    <h4 className="font-semibold mb-2">Verified Sources</h4>
                    <div className="space-y-1">
                      {result.sources.map((source, index) => (
                        <Badge key={index} variant="outline" className="mr-2 mb-1">
                          {source}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  <Shield className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Enter content above and click "Verify Content" to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*,video/*,audio/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setContent(`Analyzing uploaded file: ${file.name}`);
              toast({
                title: "File uploaded",
                description: `${file.name} ready for analysis`,
              });
            }
          }}
        />
      </div>
    </section>
  );
};

export default ContentVerifier;