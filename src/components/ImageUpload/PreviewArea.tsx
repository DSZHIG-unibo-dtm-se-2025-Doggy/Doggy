import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PreviewAreaProps {
  preview: string;
  isAnalyzing: boolean;
  onClear: () => void;
}

export const PreviewArea = ({ preview, isAnalyzing, onClear }: PreviewAreaProps) => {
  return (
    <div className="space-y-6">
      <div className="relative rounded-3xl overflow-hidden shadow-float">
        <img
          src={preview}
          alt="Dog preview"
          className="w-full h-auto max-h-[500px] object-contain bg-gradient-to-br from-muted to-background"
        />
        {!isAnalyzing && (
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-6 right-6 rounded-full hover:scale-110 transition-all duration-200 shadow-lg w-12 h-12"
            onClick={onClear}
          >
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>
      {isAnalyzing && (
        <div className="text-center py-6">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-primary/10 rounded-full">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              <div className="w-3 h-3 bg-primary-glow rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="font-bold text-primary text-lg">Analyzing your dog's breed...</span>
          </div>
        </div>
      )}
    </div>
  );
};