import type { ScanResult } from "@/models";
import { useState } from "react";
import { OSSummary } from "./OSSumary";
import { IPsSummary } from "./IPsSummary";
import { CveReport } from "./CvesReport";

type ViewState =
    | { mode: "idle" }
    | { mode: "path-not-found" }
    | { mode: "loading" }
    | { mode: "error-opening-dialog" }
    | { mode: "error-parsing" }
    | { mode: "file-found"; filePath: string; result: ScanResult };

export function ReportView() {
    const [viewState, setViewState] = useState<ViewState>({ mode: "idle" });

    const selectFile = async () => {
        try {
            const filePath = (await window.__ryn.invoke("dialog.openFile", {
                options: { title: "Selecciona un archivo" },
            })) as string | null;

            if (filePath === null) {
                setViewState({ mode: "path-not-found" });
                return;
            }

            setViewState({ mode: "loading" });
            const result = (await window.__ryn.invoke("report.parseScan", {
                filePath,
            })) as ScanResult | null;
            if (result === null) {
                setViewState({ mode: "error-parsing" });
                return;
            }

            const filename = filePath.split(/[\\/]/).pop() as string;
            setViewState({ mode: "file-found", filePath: filename, result });
        } catch (e) {
            setViewState({ mode: "error-opening-dialog" });
            console.error(e);
        }
    };

    const isLoading = viewState.mode === "loading";
    const buttonClass =
        viewState.mode === "file-found"
            ? "btn btn-outline btn-primary"
            : "btn btn-primary";

    return (
        <div className="report-view min-h-screen bg-base-200 flex flex-col">
            <header className="report-toolbar sticky top-0 z-20 bg-base-100 border-b border-base-300 shadow-sm print:hidden">
                <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-6 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl" aria-hidden="true">📁</span>
                        <div className="min-w-0">
                            <h1 className="text-base font-semibold leading-tight">
                                Visor de reportes
                            </h1>
                            <p className="text-xs text-base-content/60 truncate">
                                Selecciona un archivo de escaneo para visualizar el reporte
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className={buttonClass}
                        onClick={selectFile}
                        aria-busy={isLoading}
                    >
                        {isLoading ? (
                            <span className="loading loading-spinner loading-sm" />
                        ) : (
                            <span aria-hidden="true">📄</span>
                        )}
                        <span className="max-w-[16rem] truncate">
                            {viewState.mode === "idle" && "Elegir archivo"}
                            {viewState.mode === "path-not-found" && "No se pudo seleccionar archivo"}
                            {viewState.mode === "error-parsing" && "Archivo inválido"}
                            {viewState.mode === "error-opening-dialog" && "Reintentar"}
                            {viewState.mode === "loading" && "Cargando…"}
                            {viewState.mode === "file-found" && viewState.filePath}
                        </span>
                    </button>
                    <button className="btn btn-accent" onClick={window.print}>Imprimir</button>
                </div>
            </header>

            <main className="report-content flex-1 max-w-6xl w-full mx-auto px-6 py-8">
                {viewState.mode === "idle" && (
                    <div className="hero py-16 print:hidden">
                        <div className="hero-content text-center">
                            <div className="max-w-md">
                                <div className="text-6xl mb-4" aria-hidden="true">📊</div>
                                <h2 className="text-2xl font-bold">No hay reporte cargado</h2>
                                <p className="py-4 text-base-content/70">
                                    Pulsa <strong>“Elegir archivo”</strong> para cargar un reporte
                                    de escaneo y visualizar el resumen del servidor, las IPs y los
                                    CVE detectados.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {viewState.mode === "error-opening-dialog" && (
                    <div role="alert" className="alert alert-error print:hidden">
                        <span>Error inesperado al abrir el archivo. Intenta nuevamente.</span>
                    </div>
                )}

                {viewState.mode === "path-not-found" && (
                    <div role="alert" className="alert alert-warning print:hidden">
                        <span>No se seleccionó ningún archivo.</span>
                    </div>
                )}

                {viewState.mode === "error-parsing" && (
                    <div role="alert" className="alert alert-error print:hidden">
                        <span>El archivo seleccionado no tiene un formato válido.</span>
                    </div>
                )}

                {isLoading && (
                    <div
                        className="flex flex-col items-center justify-center gap-4 py-24"
                        aria-live="polite"
                    >
                        <span className="loading loading-spinner loading-xl text-primary" />
                        <span className="text-sm text-base-content/60">
                            Procesando archivo…
                        </span>
                    </div>
                )}

                {viewState.mode === "file-found" && (
                    <article className="report-article space-y-8 print:space-y-6">
                        <header className="report-article-header">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="badge badge-primary badge-sm">Reporte</span>
                                <span className="text-xs text-base-content/60 font-mono break-all">
                                    {viewState.filePath}
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold mt-2 break-words">
                                Servidor: {viewState.result.serverName}
                            </h1>
                        </header>

                        <section aria-label="Resumen del sistema operativo">
                            <OSSummary result={viewState.result} />
                        </section>
                        <section aria-label="Resumen de direcciones IP">
                            <IPsSummary result={viewState.result} />
                        </section>
                        <section aria-label="Reporte de CVE">
                            <CveReport scannedCves={viewState.result.scannedCves} />
                        </section>
                    </article>
                )}
            </main>
        </div>
    );
}
