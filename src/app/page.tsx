"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TemplateCard } from "@/components/TemplateCard";
import { templates } from "@/data/templates";
import { PRICING } from "@/lib/types";
import {
  Heart,
  Sparkles,
  Share2,
  CheckCircle2,
  ArrowRight,
  Palette,
  Globe,
  MessageCircle,
} from "lucide-react";

const steps = [
  {
    icon: Palette,
    title: "Pick a Design",
    description: "Choose from our collection of romantic wedding templates.",
    color: "text-rosegold-500",
    bg: "bg-rosegold-50",
  },
  {
    icon: Heart,
    title: "Add Your Details",
    description: "Fill in your wedding info, photos, and personal touches.",
    color: "text-mauve-500",
    bg: "bg-mauve-50",
  },
  {
    icon: Share2,
    title: "Share Your Link",
    description:
      "Get a personal URL like invitasyon.com/your-names and share it with guests.",
    color: "text-sage-500",
    bg: "bg-sage-50",
  },
];

const features = [
  {
    icon: Globe,
    title: "Personal URL",
    description:
      "Your own unique wedding website at invitasyon.com/your-names",
    color: "text-rosegold-500",
  },
  {
    icon: MessageCircle,
    title: "RSVP Management",
    description:
      "Guests can RSVP online — you see who's coming at a glance.",
    color: "text-mauve-500",
  },
  {
    icon: Palette,
    title: "Romantic Designs",
    description:
      "Elegant, mobile-friendly templates that match your wedding style.",
    color: "text-sage-500",
  },
  {
    icon: Heart,
    title: "Easy Setup",
    description:
      "No design skills needed. Your beautiful site is ready in minutes.",
    color: "text-gold-500",
  },
];

const displayedTemplates = templates.slice(0, 3);

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero px-4 py-20 sm:py-28 lg:py-36">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-rosegold-200/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-sage-200/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold-200/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <Badge variant="default" className="mb-6 px-4 py-1.5 text-sm">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Wedding websites made simple
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-navy-800 text-balance leading-tight">
            Beautiful wedding websites
            <span className="block text-rosegold-500">in minutes</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-warm-600 max-w-2xl mx-auto text-balance leading-relaxed">
            Choose a romantic design, add your wedding details, and get a
            personal invitation website with RSVP — no design skills needed.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/gallery">
              <Button variant="default" size="xl" className="w-full sm:w-auto">
                Browse Designs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/#how-it-works">
              <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                See How It Works
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-warm-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sage-500" />
              No monthly fees
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sage-500" />
              Mobile-friendly
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-sage-500" />
              Instant setup
            </span>
          </div>
        </div>
      </section>

      {/* Featured Templates */}
      <section className="px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              Choose your design
            </h2>
            <p className="text-warm-500 max-w-xl mx-auto">
              Each template is crafted with love and fully customizable to match your wedding vision.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/gallery">
              <Button variant="outline" size="lg">
                View All Designs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="px-4 py-20 sm:py-28 bg-gradient-romantic"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              How it works
            </h2>
            <p className="text-warm-500 max-w-lg mx-auto">
              Three simple steps to your beautiful wedding website.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center group">
                <div className="relative inline-flex mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center transition-transform group-hover:scale-110`}
                  >
                    <step.icon className={`w-7 h-7 ${step.color}`} />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-rosegold-200 to-sage-200 -z-10" />
                  )}
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-navy-700 text-white text-sm font-medium mb-4">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold text-navy-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-warm-500 max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              Everything you need
            </h2>
            <p className="text-warm-500 max-w-lg mx-auto">
              Elegant wedding websites without the complexity.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-warm-50 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-navy-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-warm-500">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-4 py-20 sm:py-28 bg-gradient-romantic">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              Simple pricing
            </h2>
            <p className="text-warm-500 max-w-lg mx-auto">
              One-time payment. No subscriptions. No hidden fees.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {(Object.entries(PRICING) as [keyof typeof PRICING, typeof PRICING[keyof typeof PRICING]][]).map(
              ([key, tier]) => (
                <Card
                  key={key}
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    key === "self-serve"
                      ? "border-rosegold-200 ring-1 ring-rosegold-200"
                      : "border-warm-200"
                  }`}
                >
                  {key === "self-serve" && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-rosegold-500 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                        Popular
                      </div>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-navy-800 mb-2">
                      {tier.label}
                    </h3>
                    <p className="text-sm text-warm-500 mb-6">
                      {tier.description}
                    </p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-navy-800">
                        ${tier.price}
                      </span>
                      <span className="text-warm-500 ml-1">one-time</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {[
                        "Beautiful wedding website",
                        "RSVP management",
                        "Personal URL",
                        "Mobile-optimized design",
                        ...(key === "custom"
                          ? [
                              "Custom color palette",
                              "Custom fonts",
                              "Priority support",
                            ]
                          : []),
                      ].map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-warm-600"
                        >
                          <CheckCircle2 className="w-4 h-4 text-sage-500 mt-0.5 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href={`/order?tier=${key}`}>
                      <Button
                        variant={key === "self-serve" ? "default" : "secondary"}
                        size="lg"
                        className="w-full"
                      >
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="bg-gradient-to-br from-navy-700 to-navy-900 rounded-3xl p-12 sm:p-16 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-rosegold-500/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-gold-500/10 blur-3xl" />
            </div>
            <div className="relative">
              <Heart className="w-12 h-12 text-rosegold-300 mx-auto mb-6" />
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to create your wedding website?
              </h2>
              <p className="text-warm-200 max-w-lg mx-auto mb-8 text-lg">
                Join couples who trust Invitasyon for their special day.
              </p>
              <Link href="/gallery">
                <Button
                  variant="gold"
                  size="xl"
                  className="shadow-lg shadow-gold-500/25"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
