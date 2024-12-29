import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import { useState } from "react";

export default function Header() {
  const [link, setLink] = useState("");
  return (
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
              onClick={() => console.log(link)}
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
  );
}
