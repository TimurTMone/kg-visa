"use client";

import { useTranslations } from "next-intl";
import { useWizard } from "./wizard-provider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Upload, X, Image, FileText } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label: string;
  description: string;
  accept: string;
  value: File | null;
  onChange: (file: File | null) => void;
  icon: React.ReactNode;
}

function FileUpload({ label, description, accept, value, onChange, icon }: FileUploadProps) {
  const t = useTranslations("apply.documents");
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) onChange(file);
    },
    [onChange]
  );

  return (
    <div className="space-y-2">
      <Label>{label} *</Label>
      <p className="text-xs text-neutral-500">{description}</p>

      {value ? (
        <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-neutral-900">
              {value.name}
            </p>
            <p className="text-xs text-neutral-500">
              {(value.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors cursor-pointer",
            dragOver
              ? "border-gov-400 bg-gov-50"
              : "border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50"
          )}
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = accept;
            input.onchange = (e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) onChange(file);
            };
            input.click();
          }}
        >
          <Upload className="mb-2 h-8 w-8 text-neutral-400" />
          <p className="text-sm text-neutral-500">{t("dragDrop")}</p>
        </div>
      )}
    </div>
  );
}

export function StepDocuments() {
  const t = useTranslations("apply.documents");
  const tApply = useTranslations("apply");
  const { state, dispatch, nextStep, prevStep } = useWizard();
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!state.documents.photo || !state.documents.passportScan) {
      setError("Please upload both your passport photo and passport scan.");
      return;
    }
    setError("");
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">{t("title")}</h2>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <FileUpload
          label={t("photo")}
          description={t("photoDesc")}
          accept="image/jpeg,image/png"
          value={state.documents.photo}
          onChange={(file) =>
            dispatch({ type: "SET_DOCUMENTS", data: { photo: file } })
          }
          icon={<Image className="h-5 w-5 text-green-600" />}
        />

        <FileUpload
          label={t("passportScan")}
          description={t("passportScanDesc")}
          accept="image/jpeg,image/png"
          value={state.documents.passportScan}
          onChange={(file) =>
            dispatch({ type: "SET_DOCUMENTS", data: { passportScan: file } })
          }
          icon={<FileText className="h-5 w-5 text-green-600" />}
        />

        <FileUpload
          label={t("invitation")}
          description={t("invitationDesc")}
          accept="application/pdf"
          value={state.documents.invitation}
          onChange={(file) =>
            dispatch({ type: "SET_DOCUMENTS", data: { invitation: file } })
          }
          icon={<FileText className="h-5 w-5 text-green-600" />}
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="ghost" size="lg" onClick={prevStep}>
          <ArrowLeft className="h-4 w-4" />
          {tApply("back")}
        </Button>
        <Button type="button" size="lg" onClick={handleNext}>
          {tApply("next")}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
