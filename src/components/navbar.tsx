import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export default function Navbar() {
  return (
    <nav className="w-full bg-background border-b">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <img
                src={logo}
                alt="WebShield Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-lg font-semibold">WebShield</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1"></div>
          </div>
          <Button variant="outline" size="sm">
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
}
