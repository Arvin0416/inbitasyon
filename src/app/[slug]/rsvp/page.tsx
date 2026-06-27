"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/store";
import { getTemplateById } from "@/data/templates";
import { formatDate, formatTime } from "@/lib/utils";
import { RSVPResponse } from "@/lib/types";
import { useState } from "react";
import { toast } from "sonner";
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
// Simple ID generator
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export default function RSVPPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const site = db.sites.get(slug);

  const [guestName, setGuestName] = useState("");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!site) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8 sm:p-12">
            <Heart className="w-12 h-12 text-rosegold-300 mx-auto mb-4" />
            <h1 className="font-serif text-2xl font-bold text-navy-800 mb-2">
              Wedding website not found
            </h1>
            <p className="text-warm-500 mb-6">
              This wedding website doesn&apos;t exist yet.
            </p>
            <Link href="/">
              <Button variant="default">Go Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const template = getTemplateById(site.templateId);
  const palette = template
    ? {
        primary: template.primaryColor,
        secondary: template.secondaryColor,
        accent: template.accentColor,
      }
    : { primary: "#B76E79", secondary: "#FFF5EE", accent: "#D4AF37" };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim() || attending === null) {
      toast.error("Please fill in your name and RSVP status.");
      return;
    }

    const newRsvp: RSVPResponse = {
      id: generateId(),
      siteId: slug,
      guestName: guestName.trim(),
      attending,
      guestCount: attending ? guestCount : 0,
      message: message.trim(),
      email: email.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    // Save to store
    const existing = db.rsvps.get(slug) || [];
    existing.push(newRsvp);
    db.rsvps.set(slug, existing);

    setSubmitted(true);
    toast.success("Your RSVP has been submitted!");
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16">
        <Card className="max-w-lg w-full text-center">
          <CardContent className="p-8 sm:p-12">
            <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-sage-600" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-navy-800 mb-2">
              Thank you!
            </h2>
            <p className="text-warm-500 mb-6">
              Your RSVP has been submitted successfully.
            </p>
            <Link href={`/${slug}`}>
              <Button variant="default">
                Back to Wedding Website
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <section
        className="px-4 py-12 sm:py-16 text-center"
        style={{
          background: `linear-gradient(180deg, ${palette.secondary} 0%, ${palette.primary}08 100%)`,
        }}
      >
        <Link
          href={`/${slug}`}
          className="inline-flex items-center gap-1 text-sm mb-6"
          style={{ color: palette.primary, opacity: 0.7 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to invitation
        </Link>
        <Heart
          className="w-8 h-8 mx-auto mb-4"
          style={{ color: palette.primary, opacity: 0.5 }}
        />
        <h1
          className="font-serif text-3xl sm:text-4xl font-bold"
          style={{
            fontFamily: template?.fontFamily || "Playfair Display",
            color: palette.primary,
          }}
        >
          {site.coupleName1} & {site.coupleName2}
        </h1>
        <p className="text-sm mt-2" style={{ color: palette.primary, opacity: 0.7 }}>
          Please RSVP for our wedding
        </p>
      </section>

      {/* Wedding Info Mini Card */}
      <div className="px-4 -mt-4">
        <Card className="max-w-lg mx-auto shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-1.5 text-warm-500">
                <Calendar className="w-4 h-4" style={{ color: palette.primary }} />
                {formatDate(site.weddingDate)}
              </div>
              <div className="flex items-center gap-1.5 text-warm-500">
                <Clock className="w-4 h-4" style={{ color: palette.primary }} />
                {formatTime(site.weddingTime)}
              </div>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-sm text-warm-500 mt-2">
              <MapPin className="w-4 h-4" style={{ color: palette.primary }} />
              {site.venueName}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RSVP Form */}
      <section className="px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-lg">
          <Card>
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="guestName">Your name *</Label>
                  <Input
                    id="guestName"
                    placeholder="Enter your full name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Will you be attending? *</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setAttending(true);
                        setGuestCount(1);
                      }}
                      className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                        attending === true
                          ? "border-sage-400 bg-sage-50"
                          : "border-warm-200 hover:border-warm-300"
                      }`}
                    >
                      <CheckCircle2
                        className={`w-6 h-6 mx-auto mb-1 ${
                          attending === true
                            ? "text-sage-500"
                            : "text-warm-300"
                        }`}
                      />
                      <span className="text-sm font-medium text-navy-700">
                        Yes, I&apos;ll be there
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAttending(false);
                        setGuestCount(0);
                      }}
                      className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                        attending === false
                          ? "border-rosegold-400 bg-rosegold-50"
                          : "border-warm-200 hover:border-warm-300"
                      }`}
                    >
                      <span className="text-sm font-medium text-navy-700 block mt-2">
                        Sorry, can&apos;t make it
                      </span>
                    </button>
                  </div>
                </div>

                {attending === true && (
                  <div className="space-y-2">
                    <Label htmlFor="guestCount">Number of guests (including you)</Label>
                    <Input
                      id="guestCount"
                      type="number"
                      min={1}
                      max={10}
                      value={guestCount}
                      onChange={(e) =>
                        setGuestCount(Math.max(1, parseInt(e.target.value) || 1))
                      }
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message for the couple (optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Write a warm message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full"
                  style={{
                    backgroundColor: palette.primary,
                    borderColor: palette.primary,
                  }}
                  disabled={!guestName.trim() || attending === null}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Submit RSVP
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
