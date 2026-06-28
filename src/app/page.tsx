import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TemplateCard } from "@/components/TemplateCard";
import { templates } from "@/data/templates";
import { PRICING } from "@/lib/types";
import { ScrollVideoSection } from "@/components/ScrollVideoSection";
import { ParallaxSection } from "@/components/ParallaxSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  Heart,
  Share2,
  CheckCircle2,
  ArrowRight,
  Palette,
  Globe,
  MessageCircle,
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
      {/* Hero: Scroll-Driven Video Section */}
      <ScrollVideoSection />

      {/* Stats Bar */}
      <ScrollReveal>
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
      </ScrollReveal>

      {/* Featured Templates */}
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge variant="cream" className="mb-4 px-4 py-1.5">Curated Collection</Badge>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-olive-800 mb-4">
                Choose your design
              </h2>
              <p className="text-charcoal-500 max-w-xl mx-auto text-lg">
                Each template is thoughtfully crafted and fully customizable to reflect your unique love story.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedTemplates.map((template, i) => (
              <ScrollReveal key={template.id} delay={i * 150}>
                <div className="magnetic-hover">
                  <TemplateCard template={template} />
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={450}>
            <div className="text-center mt-12">
              <Link href="/gallery">
                <Button variant="outline" size="lg">
                  View All Designs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* How It Works — with parallax background */}
      <ParallaxSection
        id="how-it-works"
        className="px-4 py-24 sm:py-32 relative overflow-hidden"
        speed={0.25}
        bgClassName="bg-gradient-romantic"
      >
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #283618 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="mx-auto max-w-7xl relative">
          <ScrollReveal>
            <div className="text-center mb-20">
              <Badge variant="cream" className="mb-4 px-4 py-1.5">Simple Process</Badge>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-olive-800 mb-4">
                Three simple steps
              </h2>
              <p className="text-charcoal-500 max-w-lg mx-auto text-lg">
                From template to shared — your wedding website in minutes.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 200}>
                <div className="text-center group relative">
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
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Features */}
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge variant="cream" className="mb-4 px-4 py-1.5">Everything Included</Badge>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-olive-800 mb-4">
                Everything you need
              </h2>
              <p className="text-charcoal-500 max-w-lg mx-auto text-lg">
                Elegant wedding websites without the complexity or cost.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 120}>
                <Card className="text-center h-full magnetic-hover border-olive-100/80 group">
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
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-4 py-24 sm:py-32 bg-gradient-romantic relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #283618 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="mx-auto max-w-5xl relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge variant="cream" className="mb-4 px-4 py-1.5">Simple Pricing</Badge>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-olive-800 mb-4">
                One-time payment
              </h2>
              <p className="text-charcoal-500 max-w-lg mx-auto text-lg">
                No subscriptions. No hidden fees. Just a beautiful wedding website.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {(Object.entries(PRICING) as [keyof typeof PRICING, typeof PRICING[keyof typeof PRICING]][]).map(
              ([key, tier], i) => (
                <ScrollReveal key={key} delay={i * 200}>
                  <Card
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
                </ScrollReveal>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
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
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
