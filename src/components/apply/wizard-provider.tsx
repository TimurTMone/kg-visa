"use client";

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { PersonalInfo, PassportInfo, TravelInfo } from "@/types/visa";

export type WizardStep = 1 | 2 | 3 | 4 | 5 | 6;

interface WizardState {
  currentStep: WizardStep;
  personal: Partial<PersonalInfo>;
  passport: Partial<PassportInfo>;
  travel: Partial<TravelInfo>;
  documents: {
    photo: File | null;
    passportScan: File | null;
    invitation: File | null;
  };
}

type WizardAction =
  | { type: "SET_STEP"; step: WizardStep }
  | { type: "SET_PERSONAL"; data: Partial<PersonalInfo> }
  | { type: "SET_PASSPORT"; data: Partial<PassportInfo> }
  | { type: "SET_TRAVEL"; data: Partial<TravelInfo> }
  | { type: "SET_DOCUMENTS"; data: Partial<WizardState["documents"]> }
  | { type: "RESET" };

const initialState: WizardState = {
  currentStep: 1,
  personal: {},
  passport: {},
  travel: {},
  documents: { photo: null, passportScan: null, invitation: null },
};

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.step };
    case "SET_PERSONAL":
      return { ...state, personal: { ...state.personal, ...action.data } };
    case "SET_PASSPORT":
      return { ...state, passport: { ...state.passport, ...action.data } };
    case "SET_TRAVEL":
      return { ...state, travel: { ...state.travel, ...action.data } };
    case "SET_DOCUMENTS":
      return {
        ...state,
        documents: { ...state.documents, ...action.data },
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

interface WizardContextValue {
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: WizardStep) => void;
}

const WizardContext = createContext<WizardContextValue | null>(null);

const STORAGE_KEY = "kg-visa-wizard";

function loadState(): WizardState {
  if (typeof window === "undefined") return initialState;
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Don't restore file references from storage
      return { ...parsed, documents: initialState.documents };
    }
  } catch {
    // ignore parse errors
  }
  return initialState;
}

export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wizardReducer, initialState, loadState);

  // Auto-save to sessionStorage
  useEffect(() => {
    try {
      const toSave = {
        ...state,
        documents: { photo: null, passportScan: null, invitation: null },
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // ignore storage errors
    }
  }, [state]);

  const nextStep = () => {
    if (state.currentStep < 6) {
      dispatch({ type: "SET_STEP", step: (state.currentStep + 1) as WizardStep });
    }
  };

  const prevStep = () => {
    if (state.currentStep > 1) {
      dispatch({ type: "SET_STEP", step: (state.currentStep - 1) as WizardStep });
    }
  };

  const goToStep = (step: WizardStep) => {
    dispatch({ type: "SET_STEP", step });
  };

  return (
    <WizardContext.Provider value={{ state, dispatch, nextStep, prevStep, goToStep }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used within WizardProvider");
  return ctx;
}
