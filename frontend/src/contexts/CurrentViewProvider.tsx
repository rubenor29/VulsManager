import { useState, type ReactNode } from "react";
import { CurrentView, CurrentViewContext } from "@/contexts";


export function CurrentViewProvider({ children }: { children: ReactNode }) {
    const [view, setView] = useState<CurrentView>(CurrentView.TestView);
    return (
        <CurrentViewContext value={{ view, setView }}>
            {children}
        </CurrentViewContext>
    );
}
