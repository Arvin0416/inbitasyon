"use client";

import { useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { templates } from "@/data/templates";
import { COLOR_PALETTES, PRICING, GeneratedSite } from "@/lib/types";
import { generateSlug } from "@/lib/utils";
import { saveSite, db } from "@/lib/store";
import { toast } from "sonner";
import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  Lock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const STEPS = ["Your Details", "Wedding Info", "Design & Style", "Payment"];

function OrderFormContent() {
  const searchParams = useSearchParams();
  const initialTemplate = searchParams.get("template") || "";
  const initialTier = (searchParams.get("tier") as "self-serve" | "custom") || "self-serve";

  const [step, setStep] = useState(0);
  const [tier, setTier] = useState<"self-serve" | "custom">(initialTier);
  const [formData, setFormData] = useState<{
    coupleName1: string;
    coupleName2: string;
    email: string;
    weddingDate: string;
    weddingTime: string;
    venueName: string;
    venueAddress: string;
    photoUrl: string;
    colorPalette: string;
    notes: string;
    slug: string;
    templateId: string;
  }>({
    coupleName1: "",
    coupleName2: "",
    email: "",
    weddingDate: "",
    weddingTime: "",
    venueName: "",
    venueAddress: "",
    photoUrl: "",
    colorPalette: COLOR_PALETTES[0].name,
    notes: "",
    slug: "",
    templateId: initialTemplate,
  });

  const [slugEdited, setSlugEdited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [generatedSlug, setGeneratedSlug] = useState("");

  const updateField = useCallback(
    (field: string, value: string) => {
      setFormData((prev) => {
        const next = { ...prev, [field]: value };
        if (
          (field === "coupleName1" || field === "coupleName2") &&
          !slugEdited
        ) {
          const combined = `${next.coupleName1} ${next.coupleName2}`.trim();
          if (combined.includes(" ")) {
            next.slug = generateSlug(combined);
          }
        }
        return next;
      });
    },
    [slugEdited]
  );

  const handleSlugChange = (value: string) => {
    setSlugEdited(true);
    setFormData((prev) => ({
      ...prev,
      slug: generateSlug(value),
    }));
  };

  const isStepValid = () => {
    switch (step) {
      case 0:
        return (
          formData.coupleName1.trim() &&
          formData.coupleName2.trim() &&
          formData.email.trim() &&
          formData.email.includes("@")
        );
      case 1:
        return formData.weddingDate && formData.weddingTime && formData.venueName;
      case 2:
        return formData.colorPalette && formData.slug.length >= 3;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const slug = formData.slug || generateSlug(`${formData.coupleName1} ${formData.coupleName2}`);

    // Save the new site (in-memory + Supabase if configured)
    const newSite: GeneratedSite = {
      id: `site-${Date.now()}`,
      slug,
      coupleName1: formData.coupleName1,
      coupleName2: formData.coupleName2,
      email: formData.email,
      weddingDate: formData.weddingDate,
      weddingTime: formData.weddingTime,
      venueName: formData.venueName,
      venueAddress: formData.venueAddress,
      photoUrl: formData.photoUrl,
      colorPalette: formData.colorPalette,
      notes: formData.notes,
      templateId: formData.templateId || templates[0].id,
      tier,
      status: "active",
      createdAt: new Date().toISOString(),
    };
    await saveSite(newSite);

    setGeneratedSlug(slug);
    setCompleted(true);
    setIsSubmitting(false);
    toast.success("Your wedding website has been created!");
  };

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16">
        <Card className="max-w-lg w-full text-center">
          <CardContent className="p-8 sm:p-12">
            <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-sage-600" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-navy-800 mb-2">
              Your wedding website is ready!
            </h2>
            <p className="text-warm-500 mb-6">
              Share this link with your guests:
            </p>
            <div className="bg-warm-50 rounded-xl p-4 mb-6">
              <p className="text-lg font-medium text-navy-800 break-all">
                invitasyon.com/{generatedSlug}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="default"
                size="lg"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://invitasyon.com/${generatedSlug}`
                  );
                  toast.success("Link copied!");
                }}
              >
                Copy Link
              </Button>
              <Link href={`/${generatedSlug}`}>
                <Button variant="secondary" size="lg">
                  View Your Website
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <section className="px-4 py-8 bg-gradient-hero">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1 text-sm text-warm-500 hover:text-rosegold-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Gallery
          </Link>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-800 mb-2">
            Create your wedding website
          </h1>
          <p className="text-warm-500">
            Fill in your details and get your personal invitation website.
          </p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-3xl">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-10">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      i <= step
                        ? "bg-rosegold-500 text-white shadow-md shadow-rosegold-200"
                        : "bg-warm-100 text-warm-400"
                    }`}
                  >
                    {i < step ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                  </div>
                  <span
                    className={`text-xs mt-1.5 hidden sm:block ${
                      i <= step ? "text-rosegold-600 font-medium" : "text-warm-400"
                    }`}
                  >
                    {s}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`w-12 sm:w-20 h-0.5 mx-2 ${
                      i < step ? "bg-rosegold-300" : "bg-warm-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <Card>
            <CardContent className="p-6 sm:p-8">
              {/* Step 0: Couple Details */}
              {step === 0 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Heart className="w-8 h-8 text-rosegold-500 mx-auto mb-2" />
                    <h2 className="text-xl font-semibold text-navy-800">
                      Tell us about yourselves
                    </h2>
                    <p className="text-sm text-warm-500">
                      Who&apos;s tying the knot?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="coupleName1">First partner&apos;s name</Label>
                      <Input
                        id="coupleName1"
                        placeholder="e.g. Arvin"
                        value={formData.coupleName1}
                        onChange={(e) => updateField("coupleName1", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="coupleName2">Second partner&apos;s name</Label>
                      <Input
                        id="coupleName2"
                        placeholder="e.g. Angel"
                        value={formData.coupleName2}
                        onChange={(e) => updateField("coupleName2", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="couple@email.com"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 1: Wedding Info */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-navy-800">
                      Wedding details
                    </h2>
                    <p className="text-sm text-warm-500">
                      When and where is the big day?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weddingDate">Wedding date</Label>
                      <Input
                        id="weddingDate"
                        type="date"
                        value={formData.weddingDate}
                        onChange={(e) => updateField("weddingDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weddingTime">Wedding time</Label>
                      <Input
                        id="weddingTime"
                        type="time"
                        value={formData.weddingTime}
                        onChange={(e) => updateField("weddingTime", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venueName">Venue name</Label>
                    <Input
                      id="venueName"
                      placeholder="e.g. The Grand Garden Pavilion"
                      value={formData.venueName}
                      onChange={(e) => updateField("venueName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venueAddress">Venue address</Label>
                    <Textarea
                      id="venueAddress"
                      placeholder="123 Love Street, Manila, Philippines"
                      value={formData.venueAddress}
                      onChange={(e) => updateField("venueAddress", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Design & Style */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-semibold text-navy-800">
                      Design & style
                    </h2>
                    <p className="text-sm text-warm-500">
                      Choose your template and colors
                    </p>
                  </div>

                  {!formData.templateId && (
                    <div className="space-y-2">
                      <Label>Select a template</Label>
                      <Select
                        value={formData.templateId}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            templateId: e.target.value,
                          }))
                        }
                        options={[
                          { value: "", label: "Choose a template..." },
                          ...templates.map((t) => ({
                            value: t.id,
                            label: t.name,
                          })),
                        ]}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Color palette</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {COLOR_PALETTES.map((palette) => (
                        <button
                          key={palette.name}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              colorPalette: palette.name,
                            }))
                          }
                          className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 ${
                            formData.colorPalette === palette.name
                              ? "border-rosegold-400 bg-rosegold-50"
                              : "border-warm-200 hover:border-warm-300"
                          }`}
                        >
                          <div className="flex -space-x-2">
                            <div
                              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: palette.primary }}
                            />
                            <div
                              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: palette.secondary }}
                            />
                            <div
                              className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: palette.accent }}
                            />
                          </div>
                          <span className="text-sm font-medium text-navy-700">
                            {palette.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Personal message (optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="A special message for your guests..."
                      value={formData.notes}
                      onChange={(e) => updateField("notes", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Your wedding URL</Label>
                    <div className="flex items-center gap-2 p-3 bg-warm-50 rounded-xl">
                      <span className="text-sm text-warm-500 shrink-0">
                        invitasyon.com/
                      </span>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => handleSlugChange(e.target.value)}
                        placeholder="arvin-angel"
                        className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-navy-800 placeholder:text-warm-300"
                      />
                    </div>
                    <p className="text-xs text-warm-400">
                      Use lowercase letters, numbers, and hyphens only.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Lock className="w-8 h-8 text-sage-500 mx-auto mb-2" />
                    <h2 className="text-xl font-semibold text-navy-800">
                      Choose your plan
                    </h2>
                    <p className="text-sm text-warm-500">
                      One-time payment. Your website stays live forever.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(Object.entries(PRICING) as [keyof typeof PRICING, typeof PRICING[keyof typeof PRICING]][]).map(
                      ([key, plan]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setTier(key)}
                          className={`relative p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                            tier === key
                              ? "border-rosegold-400 bg-rosegold-50 ring-1 ring-rosegold-300"
                              : "border-warm-200 hover:border-warm-300"
                          }`}
                        >
                          {key === "self-serve" && (
                            <span className="absolute top-3 right-3 text-[10px] font-medium text-rosegold-600 bg-rosegold-100 px-2 py-0.5 rounded-full">
                              Popular
                            </span>
                          )}
                          <h3 className="font-semibold text-navy-800">
                            {plan.label}
                          </h3>
                          <p className="text-2xl font-bold text-navy-800 mt-2">
                            ${plan.price}
                            <span className="text-sm font-normal text-warm-500 ml-1">
                              one-time
                            </span>
                          </p>
                          <p className="text-sm text-warm-500 mt-2">
                            {plan.description}
                          </p>
                        </button>
                      )
                    )}
                  </div>

                  <div className="bg-warm-50 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-warm-600">Subtotal</span>
                      <span className="font-medium text-navy-800">
                        ${tier === "self-serve" ? "29" : "79"}
                      </span>
                    </div>
                    <div className="border-t border-warm-200 pt-2 flex justify-between text-sm">
                      <span className="font-medium text-navy-800">Total</span>
                      <span className="font-bold text-navy-800 text-lg">
                        ${tier === "self-serve" ? "29" : "79"}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-warm-400 text-center">
                    Your payment is processed securely. You can manage your
                    website from your dashboard.
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-warm-200">
                {step > 0 ? (
                  <Button
                    variant="ghost"
                    onClick={() => setStep(step - 1)}
                    disabled={isSubmitting}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                {step < STEPS.length - 1 ? (
                  <Button
                    variant="default"
                    onClick={() => setStep(step + 1)}
                    disabled={!isStepValid()}
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isStepValid()}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Pay ${tier === "self-serve" ? "29" : "79"} & Create
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-rosegold-200 border-t-rosegold-500 rounded-full animate-spin" />
      </div>
    }>
      <OrderFormContent />
    </Suspense>
  );
}
