"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/store";
import { getTemplateById } from "@/data/templates";
import { formatDate, formatTime } from "@/lib/utils";
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Share2,
  MessageCircle,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function WeddingPage() {
  const params = useParams();
  const slug = params.slug as string;
  const site = db.sites.get(slug);
  const [linkCopied, setLinkCopied] = useState(false);

  if (!site) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8 sm:p-12">
            <Heart className="w-12 h-12 text-olive-300 mx-auto mb-4" />
            <h1 className="font-serif text-2xl font-bold text-olive-800 mb-2">
              Wedding website not found
            </h1>
            <p className="text-charcoal-500 mb-6">
              This wedding website doesn&apos;t exist yet or has been removed.
            </p>
            <Link href="/">
              <Button variant="default">Create Yours</Button>
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

  const copyLink = () => {
    navigator.clipboard.writeText(`https://invitasyon.com/${slug}`);
    setLinkCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = `Join us in celebrating the wedding of ${site.coupleName1} & ${site.coupleName2}! View our wedding website: https://invitasyon.com/${slug}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=https://invitasyon.com/${slug}`,
      "_blank"
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero / Header */}
      <section
        className="relative px-4 py-20 sm:py-28 text-center overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${palette.secondary} 0%, ${palette.primary}08 100%)`,
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-10"
            style={{ backgroundColor: palette.accent }}
          />
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full opacity-10"
            style={{ backgroundColor: palette.primary }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-5"
            style={{ backgroundColor: palette.accent }}
          />
        </div>

        <div className="relative">
          <Heart
            className="w-10 h-10 mx-auto mb-6"
            style={{ color: palette.primary, opacity: 0.6 }}
          />
          <div
            className="w-16 h-0.5 mx-auto mb-6"
            style={{ backgroundColor: palette.accent }}
          />
          <h1
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            style={{
              fontFamily: template?.fontFamily || "Playfair Display",
              color: palette.primary,
            }}
          >
            {site.coupleName1}
            <span className="block text-2xl sm:text-3xl my-3" style={{ color: palette.accent }}>
              &
            </span>
            {site.coupleName2}
          </h1>
          <div
            className="w-16 h-0.5 mx-auto mb-6"
            style={{ backgroundColor: palette.accent }}
          />
          <p className="text-lg sm:text-xl" style={{ color: palette.primary, opacity: 0.8 }}>
            Together with their families
          </p>
          <p className="text-base mt-2" style={{ color: palette.primary, opacity: 0.6 }}>
            Request the honor of your presence
          </p>
        </div>
      </section>

      {/* Wedding Details */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl space-y-8">
          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="text-center">
              <CardContent className="p-6">
                <Calendar
                  className="w-6 h-6 mx-auto mb-3"
                  style={{ color: palette.primary }}
                />
                <p className="text-sm text-charcoal-500 mb-1">Date</p>
                <p className="font-semibold text-olive-800">
                  {formatDate(site.weddingDate)}
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock
                  className="w-6 h-6 mx-auto mb-3"
                  style={{ color: palette.primary }}
                />
                <p className="text-sm text-charcoal-500 mb-1">Time</p>
                <p className="font-semibold text-olive-800">
                  {formatTime(site.weddingTime)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Venue */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <MapPin
                  className="w-6 h-6 mt-1 shrink-0"
                  style={{ color: palette.primary }}
                />
                <div>
                  <p className="font-semibold text-olive-800 text-lg">
                    {site.venueName}
                  </p>
                  {site.venueAddress && (
                    <p className="text-charcoal-500 mt-1">{site.venueAddress}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Message */}
          {site.notes && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Heart
                    className="w-6 h-6 mt-1 shrink-0"
                    style={{ color: palette.primary }}
                  />
                  <div>
                    <p className="font-semibold text-olive-800 mb-1">
                      A message from the couple
                    </p>
                    <p className="text-charcoal-600 italic">{site.notes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* RSVP Button */}
          <div className="text-center pt-4">
            <Link href={`/${slug}/rsvp`}>
              <Button
                variant="default"
                size="xl"
                className="shadow-lg"
                style={{
                  backgroundColor: palette.primary,
                  borderColor: palette.primary,
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                RSVP Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Sharing */}
      <section
        className="px-4 py-12 text-center"
        style={{ backgroundColor: palette.secondary }}
      >
        <div className="mx-auto max-w-md">
          <h3 className="font-semibold text-olive-800 mb-4">Share this invitation</h3>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={shareWhatsApp}
              className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors shadow-sm"
              aria-label="Share on WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </button>
            <button
              onClick={shareFacebook}
              className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm"
              aria-label="Share on Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button
              onClick={copyLink}
              className="w-12 h-12 rounded-full bg-olive-700 text-white flex items-center justify-center hover:bg-olive-800 transition-colors shadow-sm"
              aria-label="Copy link"
            >
              {linkCopied ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="px-4 py-8 text-center">
        <p className="text-sm text-charcoal-400">
          Created with{" "}
          <Heart className="w-3 h-3 inline" style={{ color: palette.primary }} />{" "}
          at{" "}
          <Link href="/" className="underline hover:text-olive-700 transition-colors">
            Invitasyon
          </Link>
        </p>
      </section>

      {/* Floating share button (mobile) */}
      <div className="fixed bottom-6 right-6 sm:hidden">
        <button
          onClick={shareWhatsApp}
          className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
          aria-label="Share"
        >
          <Share2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
