import { CurrentView, useCurrentView } from "@/contexts";
import type { ScanResult } from "@/models";
import { useState } from "react";

type ReportState = {
    NoFileSelected: "no-file",
    FileSelected: { path: string, report: ScanResult }
}

export function ReportView() {
    const { setView } = useCurrentView();
    const [filePath, setFilePath] = useState<string | null>(null);
    const [report, setReport] = useState<ScanResult | null>(null);

    const changeView = () => setView(CurrentView.TestView);

    const selectFile = async () => {
        try {
            const path = await window.__ryn.invoke("dialog.openFile", {
                title: "Selecciona un archivo"
            }) as string | null;

            setFilePath(path ?? "No se seleccionó un archivo");
        } catch (error) {
            console.error("No se pudo abrir el selector:", error);
        }
    }

    return (<>
        <nav>
            <button className='btn btn-secondary btn-medium' onClick={changeView}>
                Volver
            </button>
        </nav>
        <section>
            <button className="btn btn-primary" onClick={selectFile}>
                <span aria-hidden="true">📁</span>
                Elegir archivo
            </button>
        </section>
        {
            report && <article>
            </article>
        }

    </>)
}
