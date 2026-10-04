"use client";

import React, { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  CheckCircle2,
  PlusCircle,
  Heart,
  X,
} from "lucide-react";
import { showSuccess, showError } from "~/components/toast/sonner";
import { addContributor, ContributorSubmission } from "~/lib/contributors-store";
import { DynamicFooter } from "../_components/footer/dynamic-footer";
import { ContributionRoadmap } from "./_components/ContributionRoadmap";

export default function ContributorsPage() {
  const [fullName, setFullName] = useState("");
  const [zeduUsername, setZeduUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedUsername = zeduUsername.trim().replace(/^@/, "");
    const trimmedEmail = emailAddress.trim();

    if (!trimmedName) {
      showError("Please enter your Full Names");
      return;
    }
    if (!trimmedUsername) {
      showError("Please enter your Zedu Username");
      return;
    }
    if (!trimmedEmail) {
      showError("Please enter your Zedu Email Address");
      return;
    }

    setIsSubmitting(true);

    try {
      addContributor({
        fullName: trimmedName,
        zeduUsername: trimmedUsername,
        emailAddress: trimmedEmail,
      });

      // Clear input fields
      setFullName("");
      setZeduUsername("");
      setEmailAddress("");

      // Trigger the pop-up modal immediately
      setShowModal(true);
      showSuccess("Thank you for submitting your contributions");
    } catch {
      showError("Failed to submit contributor details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative space-y-16 sm:space-y-20 mt-6 pb-12">
      {/* Hero Section */}
      <section className="relative isolate flex w-full flex-col items-center gap-6 overflow-hidden px-4 pt-10 pb-6 text-center sm:gap-8 sm:px-8 sm:pt-16 lg:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-gradient-to-b from-[#7141F8]/10 via-blue-50/20 to-transparent blur-2xl"
        />

        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#7141F8]">
          <Heart className="h-4 w-4 fill-[#7141F8]/20" />
          <span>Zedu Contributor Portal</span>
          <span aria-hidden="true">·</span>
          <span>Community Registry</span>
        </div>

        <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl text-center leading-[1.15]">
          Join the Builders Behind <span className="text-primary-500">Zedu</span>
        </h1>

        <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base md:text-lg">
          Register your contribution interests and efforts in the form below.
        </p>
      </section>

      {/* Main Contributor Submission Form Section */}
      <section className="w-full px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl rounded-2xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-sm">
          <div className="mb-8 border-b border-neutral-100 pb-5">
            <div className="flex items-center gap-2.5 text-[#7141F8] mb-1">
              <PlusCircle className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Contributor Enrollment
              </span>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Submit Contributor Details
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Please enter your Full Names, Zedu Username, and Zedu Email Address below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Field 1: Full Names */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-700">
                  Full Names <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. Timothy Mayor"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-12 text-sm bg-neutral-50/50 border-neutral-300 focus:bg-white focus:border-[#7141F8]"
                />
              </div>

              {/* Field 2: Zedu Username */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-700">
                  Zedu Username <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. timothymayor"
                  value={zeduUsername}
                  onChange={(e) => setZeduUsername(e.target.value)}
                  className="w-full h-12 text-sm bg-neutral-50/50 border-neutral-300 focus:bg-white focus:border-[#7141F8]"
                />
              </div>

              {/* Field 3: Zedu Email Address */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-700">
                  Zedu Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  required
                  placeholder="e.g. timothy@zedu.chat"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="w-full h-12 text-sm bg-neutral-50/50 border-neutral-300 focus:bg-white focus:border-[#7141F8]"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-100">
              <span className="text-xs text-neutral-500">
                All contributions are automatically registered and saved.
              </span>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white font-semibold h-12 px-8 rounded-xl shadow-sm text-sm transition-all cursor-pointer"
              >
                {isSubmitting ? "Submitting..." : "Submit Contribution"}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* 4-Step Contribution Roadmap */}
      <ContributionRoadmap />

      {/* Dynamic CTA Footer */}
      <DynamicFooter
        text="Ready to Build the Future of Learning?"
        description="Join our global community of contributors and submit your details to be a part of the Zedu journey."
      />

      {/* Success Pop-up Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 text-center shadow-2xl border border-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h3 className="text-2xl font-bold text-neutral-900 mb-2">
              Successfully
            </h3>

            <p className="text-sm text-neutral-600 leading-relaxed mb-6">
              Thank you for submitting your contributions
            </p>

            <Button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold h-11 rounded-xl shadow-sm text-sm cursor-pointer"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
