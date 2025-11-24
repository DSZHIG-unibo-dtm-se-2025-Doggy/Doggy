import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useBreedIdentification = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const identifyBreed = async (file: File, preview: string) => {
    console.log('Image selected:', file.name);
    toast({
      title: "Image uploaded",
      description: "AI analysis is currently disabled",
    });
  };

  return {
    isAnalyzing,
    identifyBreed
  };
};