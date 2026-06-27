"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple demo auth — replace with proper auth in production
    await new Promise((r) => setTimeout(r, 800));

    if (email === "admin@invitasyon.com" && password === "admin123") {
      toast.success("Welcome back, Admin!");
      router.push("/admin");
    } else {
      toast.error("Invalid credentials. Try admin@invitasyon.com / admin123");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 bg-gradient-romantic">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <Shield className="w-10 h-10 text-navy-700 mx-auto mb-2" />
          <CardTitle className="text-xl">Admin Login</CardTitle>
          <p className="text-sm text-warm-500 mt-1">
            Sign in to manage Invitasyon
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@invitasyon.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-400 hover:text-warm-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              variant="navy"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <p className="text-xs text-warm-400 text-center mt-4">
            Demo: admin@invitasyon.com / admin123
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
