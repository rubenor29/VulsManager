import type { ScanResult } from "@/models";

type IPs = { found: false } | { found: true; ips: string[] };

function parseIps(data: string[] | null): IPs {
    return Array.isArray(data) && data.length > 0
        ? { found: true, ips: data }
        : { found: false };
}

export function IPsSummary({ result }: { result: ScanResult }) {
    const ipv4 = parseIps(result.ipv4Addrs);
    const ipv6 = parseIps(result.ipv6Addrs);

    return (
        <section aria-label="Direcciones IP">
            <div className="card bg-base-100 border border-base-300 shadow-sm print:shadow-none">
                <div className="card-body gap-6">
                    <h2 className="card-title text-lg">Direcciones IP</h2>

                    {/* IPv4 */}
                    <section aria-label="Direcciones IPv4">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/60 mb-2">
                            IPv4
                        </h3>

                        {ipv4.found ? (
                            <div className="overflow-x-auto rounded-box border border-base-200">
                                <table className="table table-sm table-zebra">
                                    <caption className="sr-only">
                                        Direcciones IPv4 detectadas
                                    </caption>
                                    <thead>
                                        <tr>
                                            <th scope="col" className="w-12 text-right">N.º</th>
                                            <th scope="col">Dirección</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ipv4.ips.map((ip, idx) => (
                                            <tr key={ip}>
                                                <td className="text-right text-base-content/50 tabular-nums">
                                                    {idx}
                                                </td>
                                                <td className="font-mono break-all">{ip}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-sm italic text-base-content/60">
                                No se encontraron direcciones IP
                            </p>
                        )}
                    </section>

                    {/* IPv6 */}
                    <section aria-label="Direcciones IPv6">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/60 mb-2">
                            IPv6
                        </h3>

                        {ipv6.found ? (
                            <div className="overflow-x-auto rounded-box border border-base-200">
                                <table className="table table-sm table-zebra">
                                    <caption className="sr-only">
                                        Direcciones IPv6 detectadas
                                    </caption>
                                    <thead>
                                        <tr>
                                            <th scope="col" className="w-12 text-right">N.º</th>
                                            <th scope="col">Dirección</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ipv6.ips.map((ip, idx) => (
                                            <tr key={ip}>
                                                <td className="text-right text-base-content/50 tabular-nums">
                                                    {idx}
                                                </td>
                                                <td className="font-mono break-all">{ip}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-sm italic text-base-content/60">
                                No se encontraron direcciones IP
                            </p>
                        )}
                    </section>
                </div>
            </div>
        </section>
    );
}
