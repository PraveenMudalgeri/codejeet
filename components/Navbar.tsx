"use client";

import { Button } from "@/components/ui/button";
import { UserButton, SignedIn } from "@clerk/clerk-react";
import Link from "next/link";
import { Menu, Sun, Moon, Laptop } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { AiFillStar } from "react-icons/ai";

const Navbar = () => {
  const [geminiKey, setGeminiKey] = useState("");
  const { preferredLanguage, setPreferredLanguage } = useLanguage();
  const { setTheme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    const savedKey = localStorage.getItem("gemini-key") || "";
    setGeminiKey(savedKey);
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem("gemini-key", geminiKey);
    localStorage.setItem("preferred-language", preferredLanguage);

    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleStarProject = () => {
    window.open("https://github.com/ayush-that/codejeet", "_blank");
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* Left Section - Logo */}
        <div className="font-bold text-2xl flex-1">
          <Link href="/" className="flex items-center">
            <span className="inline bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-transparent bg-clip-text drop-shadow-lg">
              codejeet🏆
            </span>
          </Link>
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleStarProject}>
            <AiFillStar className="mr-1" />
            Star this project
          </Button>
          <SignedIn>
            {/* Settings Dropdown - Only visible after sign in */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-16 mt-2 border dark:border-white">
                <div className="p-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Gemini API Key
                    </label>
                    <Input
                      type="password"
                      value={geminiKey}
                      onChange={(e) => setGeminiKey(e.target.value)}
                      placeholder="Enter your Gemini API key"
                    />
                  </div>

                  <DropdownMenuSeparator />

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Preferred Language
                    </label>
                    <Select
                      value={preferredLanguage}
                      onValueChange={setPreferredLanguage}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cpp">C++</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="c">C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <DropdownMenuSeparator />

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Theme</label>
                    <div className="flex justify-between gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => setTheme("light")}
                      >
                        <Sun className="h-4 w-4 mr-1" /> Light
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => setTheme("dark")}
                      >
                        <Moon className="h-4 w-4 mr-1" /> Dark
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => setTheme("system")}
                      >
                        <Laptop className="h-4 w-4 mr-1" /> System
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full mt-4" onClick={handleSaveSettings}>
                    Save Settings
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
