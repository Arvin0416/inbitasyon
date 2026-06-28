import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TemplateCard } from "@/components/TemplateCard";
import { templates } from "@/data/templates";
import { PRICING } from "@/lib/types";
import { Logo, LogoWordmark } from "@/components/Logo";
import {
  Heart,
  Sparkles,
  Share2,
  CheckCircle2,
  ArrowRight,
  Palette,
  Globe,
  MessageCircle,
  ScrollText,
  ChevronDown,
  Star,
  Users,
  Clock,
} from "lucide-react";

const steps = [
  {
    icon: Palette,
    title: "Choose Your Design",
    description: "Pick from our curated collection of elegant wedding invitation templates.",
    color: "text-olive-600",
    bg: "bg-olive-100",
  },
  {
    icon: Heart,
    title: "Add Your Story",
    description: "Fill in your wedding details, photos, and personal touches that make your love story unique.",
    color: "text-gold-500",
    bg: "bg-gold-100",
  },
  {
    icon: Share2,
    title: "Share with Loved Ones",
    description: "Get a personal URL like invitasyon.com/your-names and share it with all your guests.",
    color: "text-olive-600",
    bg: "bg-olive-100",
  },
];

const features = [
  {
    icon: Globe,
    title: "Personal Wedding URL",
    description: "Your own unique wedding website at invitasyon.com/your-names — easy to remember and share.",
    color: "text-olive-600",
  },
  {
    icon: MessageCircle,
    title: "RSVP Management",
    description: "Guests can RSVP with just a click. You see who's coming and their plus-ones in real time.",
    color: "text-gold-500",
  },
  {
    icon: Palette,
    title: "Elegant Designs",
    description: "Beautiful, mobile-friendly templates crafted to match your wedding aesthetic.",
    color: "text-olive-600",
  },
  {
    icon: Heart,
    title: "Instant Setup",
    description: "No design skills needed. Your stunning wedding website is ready in minutes, not hours.",
    color: "text-gold-500",
  },
];

const stats = [
  { icon: Users, value: "2,500+", label: "Happy Couples" },
  { icon: Star, value: "4.9/5", label: "Average Rating" },
  { icon: Clock, value: "5 min", label: "Setup Time" },
];

const displayedTemplates = templates.slice(0, 3);

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-44">
        {/* Animated gradient background */}
        <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-cream-50 via-olive-50 to-gold-50" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-olive-200/20 blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-gold-200/15 blur-3xl" />
          <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-olive-100/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #283618 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <Logo className="w-32 sm:w-40 mx-auto mb-4" />
            <LogoWordmark className="mt-2" />
          </div>

          <div className="mb-8">
            <Badge variant="olive" className="px-5 py-2 text-sm tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Wedding Invitations, Reimagined
            </Badge>
          </div>

          <div>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-olive-300" />
              <ScrollText className="w-6 h-6 text-olive-500" />
              <div className="h-px w-12 bg-olive-300" />
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-olive-800 text-balance leading-[1.1]">
              Your Love Story
              <span className="block text-gold-500 mt-2">Designed & Shared</span>
            </h1>
          </div>

          <p className="mt-8 text-lg sm:text-xl text-charcoal-500 max-w-2xl mx-auto text-balance leading-relaxed">
            Create a breathtaking wedding invitation website in minutes.
            Choose a beautiful design, add your personal touches, and share
            your unique link with everyone you love.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/gallery">
              <Button variant="default" size="xl" className="w-full sm:w-auto shadow-lg shadow-olive-600/20 glow-pulse">
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

          <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm text-charcoal-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-olive-600" />
              No monthly fees
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-olive-600" />
              Mobile-friendly
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-olive-600" />
              Instant setup
            </span>
          </div>

          <div className="mt-16 flex justify-center">
            <div className="animate-bounce">
              <ChevronDown className="w-6 h-6 text-olive-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-4 py-12 bg-olive-800">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-center gap-3">
                <stat.icon className="w-8 h-8 text-gold-400" />
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-olive-200">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Templates */}
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Badge variant="cream" className="mb-4 px-4 py-1.5">Curated Collection</Badge>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-olive-800 mb-4">
              Choose your design
            </h2>
            <p className="text-charcoal-500 max-w-xl mx-auto text-lg">
              Each template is thoughtfully crafted and fully customizable to reflect your unique love story.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedTemplates.map((template) => (
              <div key={template.id} className="magnetic-hover">
                <TemplateCard template={template} />
              </div>
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
      <section id="how-it-works" className="px-4 py-24 sm:py-32 bg-gradient-romantic relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #283618 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="mx-auto max-w-7xl relative">
          <div className="text-center mb-20">
            <Badge variant="cream" className="mb-4 px-4 py-1.5">Simple Process</Badge>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-olive-800 mb-4">
              Three simple steps
            </h2>
            <p className="text-charcoal-500 max-w-lg mx-auto text-lg">
              From template to shared — your wedding website in minutes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center group relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-full h-px bg-gradient-to-r from-olive-300 to-gold-300" />
                )}
                <div className="relative inline-flex mb-8">
                  <div className={`w-20 h-20 rounded-2xl ${step.bg} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                    <step.icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-olive-800 text-white text-xs font-bold flex items-center justify-center shadow-md">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-olive-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-charcoal-500 max-w-xs mx-auto leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Badge variant="cream" className="mb-4 px-4 py-1.5">Everything Included</Badge>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-olive-800 mb-4">
              Everything you need
            </h2>
            <p className="text-charcoal-500 max-w-lg mx-auto text-lg">
              Elegant wedding websites without the complexity or cost.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center h-full magnetic-hover border-olive-100/80 group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-olive-50 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-olive-800 mb-3 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-charcoal-500 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-4 py-24 sm:py-32 bg-gradient-romantic relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #283618 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="mx-auto max-w-5xl relative">
          <div className="text-center mb-16">
            <Badge variant="cream" className="mb-4 px-4 py-1.5">Simple Pricing</Badge>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-olive-800 mb-4">
              One-time payment
            </h2>
            <p className="text-charcoal-500 max-w-lg mx-auto text-lg">
              No subscriptions. No hidden fees. Just a beautiful wedding website.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {(Object.entries(PRICING) as [keyof typeof PRICING, typeof PRICING[keyof typeof PRICING]][]).map(
              ([key, tier]) => (
                <Card
                  key={key}
                  className={`relative overflow-hidden magnetic-hover h-full ${
                    key === "self-serve"
                      ? "border-olive-400 ring-1 ring-olive-400/50"
                      : "border-olive-200"
                  }`}
                >
                  {key === "self-serve" && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-olive-600 text-white text-xs font-medium px-4 py-1.5 rounded-bl-xl">
                        Popular
                      </div>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-olive-800 mb-2">
                      {tier.label}
                    </h3>
                    <p className="text-sm text-charcoal-500 mb-6">
                      {tier.description}
                    </p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-olive-800">
                        ${tier.price}
                      </span>
                      <span className="text-charcoal-500 ml-1.5">one-time</span>
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
                          className="flex items-start gap-2 text-sm text-charcoal-600"
                        >
                          <CheckCircle2 className="w-4 h-4 text-olive-600 mt-0.5 shrink-0" />
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
                        <ArrowRight className="ml-2 h-4 h-4" />
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
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="bg-gradient-to-br from-olive-800 via-olive-700 to-olive-900 rounded-3xl p-12 sm:p-16 relative overflow-hidden shimmer-overlay">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gold-400/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-olive-400/10 blur-3xl" />
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
            </div>
            <div className="relative">
              <Heart className="w-14 h-14 text-gold-400 mx-auto mb-6" />
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
                Ready to share your love story?
              </h2>
              <p className="text-cream-200/80 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
                Join the couples who trust Imbitasyon to create beautiful wedding experiences for their guests.
              </p>
              <Link href="/gallery">
                <Button
                  variant="gold"
                  size="xl"
                  className="shadow-lg shadow-gold-500/25 glow-pulse"
                >
                  Create Your Wedding Website
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
