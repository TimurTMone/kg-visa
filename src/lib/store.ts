/**
 * In-memory store for demo purposes.
 * In production, replace with a real database (PostgreSQL, etc.).
 */

import type { ApplicationStatus, VisaType, VisaPurpose } from "@/types/visa";

export interface StoredApplication {
  id: string;
  email: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  personal: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    email: string;
    phone: string;
  };
  passport: {
    number: string;
    issueDate: string;
    expiryDate: string;
    issuingCountry: string;
  };
  travel: {
    entryDate: string;
    exitDate: string;
    purpose: VisaPurpose;
    accommodation: string;
    visaType: VisaType;
  };
}

export interface StoredTransfer {
  id: string;
  visaNumber: string;
  oldPassport: string;
  newPassport: string;
  newPassportExpiry: string;
  email: string;
  reason: string;
  status: "pending" | "processing" | "completed";
  createdAt: string;
}

// In-memory collections
const applications = new Map<string, StoredApplication>();
const transfers = new Map<string, StoredTransfer>();

function generateAppId(): string {
  const year = new Date().getFullYear();
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let suffix = "";
  for (let i = 0; i < 5; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `KG-${year}-${suffix}`;
}

function generateTransferId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "TR-";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

export const db = {
  applications: {
    create(data: Omit<StoredApplication, "id" | "status" | "createdAt" | "updatedAt">): StoredApplication {
      const app: StoredApplication = {
        ...data,
        id: generateAppId(),
        status: "submitted",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      applications.set(app.id, app);
      return app;
    },

    findById(id: string): StoredApplication | undefined {
      return applications.get(id);
    },

    findByIdAndEmail(id: string, email: string): StoredApplication | undefined {
      const app = applications.get(id);
      if (app && app.email.toLowerCase() === email.toLowerCase()) {
        return app;
      }
      return undefined;
    },

    findByEmail(email: string): StoredApplication | undefined {
      for (const app of applications.values()) {
        if (app.email.toLowerCase() === email.toLowerCase()) {
          return app;
        }
      }
      return undefined;
    },
  },

  transfers: {
    create(data: Omit<StoredTransfer, "id" | "status" | "createdAt">): StoredTransfer {
      const transfer: StoredTransfer = {
        ...data,
        id: generateTransferId(),
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      transfers.set(transfer.id, transfer);
      return transfer;
    },

    findById(id: string): StoredTransfer | undefined {
      return transfers.get(id);
    },
  },
};
