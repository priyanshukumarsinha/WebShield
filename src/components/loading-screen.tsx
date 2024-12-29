import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollBy(0, screen.availHeight); // Scroll down

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(oldProgress + Math.random() * 10, 100);
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4">
      <Progress value={progress} className="w-[60%] max-w-md" />
      <p className="text-sm text-muted-foreground">
        Loading... {Math.round(progress)}%
      </p>
    </div>
  );
}
