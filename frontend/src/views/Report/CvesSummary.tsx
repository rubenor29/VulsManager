import type { SortedCves } from "@/modules/cveModules";

/** Tarjeta de conteo del resumen. Solo presentación. */
function StatBlock({
    tone,
    label,
    value,
    icon,
}: {
    tone: "error" | "warning" | "ghost";
    label: string;
    value: number;
    icon: string;
}) {
    const toneClasses = {
        error: "border-error/40 bg-error/10 text-error",
        warning: "border-warning/40 bg-warning/10 text-warning",
        ghost: "border-base-300 bg-base-200/60 text-base-content",
    }[tone];

    return (
        <div className={`cves-stat-card rounded-box border ${toneClasses} p-3 sm:p-4`}>
            <div className="flex items-center justify-between gap-2">
                <span className="text-[0.7rem] sm:text-xs font-semibold uppercase tracking-wider">
                    {label}
                </span>
                <span aria-hidden="true" className="text-sm sm:text-base">
                    {icon}
                </span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold tabular-nums mt-1">{value}</div>
        </div>
    );
}

export function CvesSummary({ cves }: { cves: SortedCves }) {
    const cvesCount = {
        critical: cves.categorized.filter(c => c.severity === "CRITICAL").length,
        high: cves.categorized.filter(c => c.severity === "HIGH").length,
        medium: cves.categorized.filter(c => c.severity === "MEDIUM").length,
        low: cves.categorized.filter(c => c.severity === "LOW").length,
    };

    const nonCritical = cves.categorized.length - cvesCount.critical;
    const uncategorized = cves.uncategorized.length;
    const total = cves.categorized.length + uncategorized;

    return (
        <section aria-label="Resumen de vulnerabilidades" className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <StatBlock tone="error" label="Críticas" value={cvesCount.critical} icon="🔴" />
                <StatBlock tone="warning" label="No críticas" value={nonCritical} icon="🟡" />
                <StatBlock tone="ghost" label="Sin clasificar" value={uncategorized} icon="⚪" />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-base-content/60">
                    Total: <strong className="tabular-nums">{total}</strong>
                </span>
                <span className="badge badge-warning badge-sm">Altas: {cvesCount.high}</span>
                <span className="badge badge-info badge-sm">Medias: {cvesCount.medium}</span>
                <span className="badge badge-success badge-sm">Bajas: {cvesCount.low}</span>
            </div>
        </section>
    );
}
