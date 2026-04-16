"use client";

import { Link } from "@i18n/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, Search } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="bg-neutral-50 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900">
          Application Submitted Successfully!
        </h1>
        <p className="mt-3 text-neutral-500">
          Your e-Visa application has been received. You will receive a
          confirmation email with your application reference number shortly.
        </p>
        <p className="mt-2 text-sm text-neutral-400">
          Processing typically takes 3 business days.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="secondary">
            <Link href="/status">
              <Search className="h-4 w-4" />
              Track Status
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
