import type { ScanResult } from "@/models";
import { useState } from "react";
import { OSSummary } from "./OSSumary";
import { IPsSummary } from "./IPsSummary";
import { CveReport } from "./CvesReport";

type ViewState =
    { mode: "idle" } |
    { mode: "path-not-found" } |
    { mode: "loading" } |
    { mode: "error-opening-dialog" } |
    { mode: "error-parsing" } |
    { mode: "file-found", filePath: string, result: ScanResult };

export function ReportView() {
    const [viewState, setViewState] = useState<ViewState>({ mode: "idle" });

    const selectFile = async () => {
        try {
            const filePath = await window.__ryn.invoke("dialog.openFile", {
                options: {
                    title: "Selecciona un archivo"
                }
            }) as string | null;

            if (filePath === null) {
                setViewState({ mode: "path-not-found" })
                return;
            }

            setViewState({ mode: "loading" })
            const result = await window.__ryn.invoke("report.parseScan", { filePath }) as ScanResult | null;
            if (result === null) {
                setViewState({ mode: "error-parsing" });
                return;
            }

            const filename = filePath.split(/[\\/]/).pop() as string;
            setViewState({ mode: "file-found", filePath: filename, result });

        } catch (e) {
            setViewState({ mode: "error-opening-dialog" })
            console.error(e)
        }


    }

    return (<>
        <section>
            <button className="btn btn-primary" onClick={selectFile}>
                <span aria-hidden="true">📁</span>
                {viewState.mode === "idle" && "Elegir archivo"}
                {viewState.mode === "path-not-found" && "No se pudo seleccionar archivo"}
                {viewState.mode === "error-parsing" && "Archivo inválido"}
                {viewState.mode === "file-found" && viewState.filePath}
            </button>
        </section>
        <article>
            {viewState.mode === "error-opening-dialog" && <span>Error inesperado</span>}
            {viewState.mode === "loading" && <span className="loading loading-spinner loading-xl"></span>}
            {
                viewState.mode === "file-found" && (
                    <>
                        <h1 className="text-xl bold">{`Servidor: ${viewState.result.serverName}`}</h1>
                        <OSSummary result={viewState.result} />
                        <IPsSummary result={viewState.result} />
                        <CveReport scannedCves={viewState.result.scannedCves} />
                    </>
                )}
        </article>

    </>)
}
