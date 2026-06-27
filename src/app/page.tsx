"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
  ScrollText,
  ChevronDown,
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

const displayedTemplates = templates.slice(0, 3);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

function FadeInSection({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section — Wedding Invitation Style */}
      <section className="relative overflow-hidden bg-gradient-hero px-4 py-24 sm:py-32 lg:py-44">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-olive-200/20 blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-gold-200/15 blur-3xl" />
          <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-olive-100/10 blur-3xl" />
          {/* Decorative dotted pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #283618 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Scroll-triggered badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge variant="olive" className="mb-8 px-5 py-2 text-sm tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              Wedding Invitations, Reimagined
            </Badge>
          </motion.div>

          {/* Main heading with decorative elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-olive-300" />
              <ScrollText className="w-6 h-6 text-olive-500" />
              <div className="h-px w-12 bg-olive-300" />
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-olive-800 text-balance leading-[1.1]">
              Your Love Story
              <span className="block text-gold-500 mt-2">Designed & Shared</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 text-lg sm:text-xl text-charcoal-500 max-w-2xl mx-auto text-balance leading-relaxed"
          >
            Create a breathtaking wedding invitation website in minutes.
            Choose a beautiful design, add your personal touches, and share
            your unique link with everyone you love.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/gallery">
              <Button variant="default" size="xl" className="w-full sm:w-auto shadow-lg shadow-olive-600/20">
                Browse Designs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/#how-it-works">
              <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                See How It Works
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-14 flex items-center justify-center gap-8 text-sm text-charcoal-500"
          >
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
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-16 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 text-olive-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Templates */}
      <FadeInSection>
        <section className="px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-center mb-16"
            >
              <motion.div variants={itemVariants}>
                <Badge variant="cream" className="mb-4 px-4 py-1.5">Curated Collection</Badge>
              </motion.div>
              <motion.h2 variants={itemVariants} className="font-serif text-4xl sm:text-5xl font-bold text-olive-800 mb-4">
                Choose your design
              </motion.h2>
              <motion.p variants={itemVariants} className="text-charcoal-500 max-w-xl mx-auto text-lg">
                Each template is thoughtfully crafted and fully customizable to reflect your unique love story.
              </motion.p>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {displayedTemplates.map((template) => (
                <motion.div key={template.id} variants={scaleVariants}>
                  <TemplateCard template={template} />
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-center mt-12"
            >
              <Link href="/gallery">
                <Button variant="outline" size="lg">
                  View All Designs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </FadeInSection>

      {/* How It Works */}
      <FadeInSection>
        <section
          id="how-it-works"
          className="px-4 py-24 sm:py-32 bg-gradient-romantic relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #283618 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="mx-auto max-w-7xl relative">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-center mb-20"
            >
              <motion.div variants={itemVariants}>
                <Badge variant="cream" className="mb-4 px-4 py-1.5">Simple Process</Badge>
              </motion.div>
              <motion.h2 variants={itemVariants} className="font-serif text-4xl sm:text-5xl font-bold text-olive-800 mb-4">
                Three simple steps
              </motion.h2>
              <motion.p variants={itemVariants} className="text-charcoal-500 max-w-lg mx-auto text-lg">
                From template to shared — your wedding website in minutes.
              </motion.p>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
            >
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  variants={scaleVariants}
                  className="text-center group relative"
                >
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-full h-px bg-gradient-to-r from-olive-300 to-gold-300" />
                  )}
                  <div className="relative inline-flex mb-8">
                    <div className={`w-20 h-20 rounded-2xl ${step.bg} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                      <step.icon className={`w-8 h-8 ${step.color}`} />
                    </div>
                    {/* Step number */}
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
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </FadeInSection>

      {/* Features */}
      <FadeInSection>
        <section className="px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-center mb-16"
            >
              <motion.div variants={itemVariants}>
                <Badge variant="cream" className="mb-4 px-4 py-1.5">Everything Included</Badge>
              </motion.div>
              <motion.h2 variants={itemVariants} className="font-serif text-4xl sm:text-5xl font-bold text-olive-800 mb-4">
                Everything you need
              </motion.h2>
              <motion.p variants={itemVariants} className="text-charcoal-500 max-w-lg mx-auto text-lg">
                Elegant wedding websites without the complexity or cost.
              </motion.p>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {features.map((feature) => (
                <motion.div key={feature.title} variants={itemVariants}>
                  <Card className="text-center h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-olive-100/80">
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
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </FadeInSection>

      {/* Pricing */}
      <FadeInSection>
        <section id="pricing" className="px-4 py-24 sm:py-32 bg-gradient-romantic relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #283618 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="mx-auto max-w-5xl relative">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-center mb-16"
            >
              <motion.div variants={itemVariants}>
                <Badge variant="cream" className="mb-4 px-4 py-1.5">Simple Pricing</Badge>
              </motion.div>
              <motion.h2 variants={itemVariants} className="font-serif text-4xl sm:text-5xl font-bold text-olive-800 mb-4">
                One-time payment
              </motion.h2>
              <motion.p variants={itemVariants} className="text-charcoal-500 max-w-lg mx-auto text-lg">
                No subscriptions. No hidden fees. Just a beautiful wedding website.
              </motion.p>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto"
            >
              {(Object.entries(PRICING) as [keyof typeof PRICING, typeof PRICING[keyof typeof PRICING]][]).map(
                ([key, tier]) => (
                  <motion.div key={key} variants={scaleVariants}>
                    <Card
                      className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full ${
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
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              )}
            </motion.div>
          </div>
        </section>
      </FadeInSection>

      {/* CTA */}
      <FadeInSection>
        <section className="px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-gradient-to-br from-olive-800 via-olive-700 to-olive-900 rounded-3xl p-12 sm:p-16 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gold-400/10 blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-olive-400/10 blur-3xl" />
                  <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                </div>
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Heart className="w-14 h-14 text-gold-400 mx-auto mb-6" />
                  </motion.div>
                  <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
                    Ready to share your love story?
                  </h2>
                  <p className="text-cream-200/80 max-w-lg mx-auto mb-10 text-lg leading-relaxed">
                    Join the couples who trust Invitasyon to create beautiful wedding experiences for their guests.
                  </p>
                  <Link href="/gallery">
                    <Button
                      variant="gold"
                      size="xl"
                      className="shadow-lg shadow-gold-500/25"
                    >
                      Create Your Wedding Website
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </FadeInSection>
    </div>
  );
}
