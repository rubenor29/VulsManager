import type { ScanResult } from "@/models";

export function OSSummary({ result }: { result: ScanResult }) {
    const kernel = result.runningKernel;
    const platform = result.platform.name;

    return (
        <section aria-label="Resumen del sistema operativo">
            <div className="card bg-base-100 border border-base-300 shadow-sm print:shadow-none">
                <div className="card-body gap-4">
                    <h2 className="card-title text-lg">Sistema operativo</h2>

                    <article>
                        <dl className="divide-y divide-base-200">
                            <div className="flex items-start justify-between gap-4 py-2">
                                <dt className="flex items-center gap-2 text-sm text-base-content/70">
                                    <span aria-hidden="true">🖥️</span>
                                    <span>Familia</span>
                                </dt>
                                <dd className="text-sm font-medium text-right wrap-break-words">
                                    <span className="font-mono">{result.family}</span>
                                    <span className="text-base-content/50 mx-1">·</span>
                                    <span>{result.release}</span>
                                </dd>
                            </div>

                            <div className="flex items-start justify-between gap-4 py-2">
                                <dt className="flex items-center gap-2 text-sm text-base-content/70">
                                    <span aria-hidden="true">⚙️</span>
                                    <span>Kernel</span>
                                </dt>
                                <dd className="text-sm font-medium text-right wrap-break-words">
                                    <span className="font-mono">{kernel.release}</span>
                                </dd>
                            </div>

                            <div className="flex items-start justify-between gap-4 py-2">
                                <dt className="flex items-center gap-2 text-sm text-base-content/70">
                                    <span aria-hidden="true">☁️</span>
                                    <span>Plataforma en nube</span>
                                </dt>
                                <dd className="text-sm font-medium text-right">
                                    {platform === "other" ? (
                                        <span className="badge badge-ghost badge-sm">No</span>
                                    ) : (
                                        <span className="badge badge-info badge-sm">
                                            {platform.toUpperCase()}
                                        </span>
                                    )}
                                </dd>
                            </div>
                        </dl>
                    </article>

                    {kernel.rebootRequired && (
                        <div role="alert" className="alert alert-warning alert-soft print:alert-warning">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                            <span>El kernel necesita reinicio</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
