import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import HeroComponent from "./HeroComponent";
import { LoadingScreen } from "./loading-screen";

export default function Header() {
  const [link, setLink] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Test API Integration by fetching / returning Hello World
  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.text())
      .then((data) => console.log(data));
  }, []);

  const scrollMaadi = () => {
    // Start loading
    setIsLoading(true);
    // Simulate a delay for loading
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 3000); // Adjust time as needed
  };

  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center justify-center p-4 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-center text-primary">
            WebShield
          </h1>
          <div className="w-full max-w-md space-y-4">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter domain name"
                className="flex-grow min-w-0"
                value={link}
                onChange={(e) => setLink(e.currentTarget.value)}
              />
              <Button
                type="submit"
                onClick={() => scrollMaadi()}
                className="whitespace-nowrap"
              >
                Search
              </Button>
            </div>
            <p className="text-sm md:text-base text-center text-muted-foreground">
              Tracing the real source of Suspicious Websites
            </p>
          </div>
        </main>
      </div>
      {isLoading && <LoadingScreen />}
      {showResults && <HeroComponent link={link}/>}
    </>
  );
}
