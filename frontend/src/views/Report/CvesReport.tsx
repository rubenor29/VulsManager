import type { VulnInfo } from "@/models";
import { sortVulnsBySeverity } from "@/modules";

function formatString(value: string | null | undefined) {
    return value === null || value === undefined || value.trim() === "" ? "N/A" : value;
}

function formatBoolean(value: boolean | null, negate: boolean = false) {
    if (value === null) return "N/A";
    if (negate)
        return !value ? "Si" : "No";
    else
        return value ? "Si" : "No";
}

export function CveReport({ scannedCves }: { scannedCves: Record<string, VulnInfo> }) {
    const cves = sortVulnsBySeverity(scannedCves);
    const hasCves = cves.uncategorized.length + cves.categorized.length;

    return (
        <section>
            <h2>CVEs Encontrados</h2>
            {!hasCves && <p>No se encontraron CVEs en este equipo</p>}
            {hasCves &&
                <article>
                    {cves.categorized.map(c => <article key={c.id}>
                        <h3 className="semi-bold">{c.id}</h3>
                        <ul>
                            <li>Score: {c.score}</li>
                            <li>Severidad: {c.severity}</li>
                            <li>Fuente: {c.source}</li>
                            <li>Version de CVSS: {c.cvssVersion}</li>
                        </ul>
                        {c.vuln.affectedPackages !== null &&
                            <table className="table">
                                <caption>Paquetes afectados</caption>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Nombre</th>
                                        <th>Parcheado</th>
                                        <th>Estado del parche</th>
                                        <th>Arreglado en</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {c.vuln.affectedPackages.map((pkg, idx) =>
                                        <tr key={idx}>
                                            <th>{idx + 1}</th>
                                            <td>{formatString(pkg.name)}</td>
                                            <td>{formatBoolean(pkg.notFixedYet, true)}</td>
                                            <td>{formatString(pkg.fixState)}</td>
                                            <td>{formatString(pkg.fixedIn)}</td>
                                        </tr>
                                    )
                                    }
                                </tbody>
                            </table>
                        }
                    </article>)

                    }
                </article>
            }
        </section >
    )
}
