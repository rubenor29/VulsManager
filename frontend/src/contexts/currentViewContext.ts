import { createContext, useContext } from "react";

export const CurrentView = {
  ReportView: "report-view",
} as const;

export type CurrentView = (typeof CurrentView)[keyof typeof CurrentView];

export type CurrentViewContextValue = {
  view: CurrentView;
  setView: (view: CurrentView) => void;
};

export const CurrentViewContext = createContext<CurrentViewContextValue | null>(
  null,
);

export function useCurrentView() {
  const ctx = useContext(CurrentViewContext);
  if (!ctx) {
    throw new Error(
      "useCurrentView debe usarse dentro de <CurrentViewProvider>",
    );
  }
  return ctx;
}
