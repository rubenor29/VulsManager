import type { ScanResult } from "@/models";

type IPs = { found: false } | { found: true, ips: string[] };

function parseIps(data: string[] | null): IPs {
    return Array.isArray(data) && data.length > 0
        ? { found: true, ips: data }
        : { found: false };
}

export function IPsSummary({ result }: { result: ScanResult }) {
    const ipv4 = parseIps(result.ipv4Addrs);
    const ipv6 = parseIps(result.ipv6Addrs);

    return (
        <section>
            <h2>Direcciones IPv4</h2>
            {
                ipv4.found &&
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>IP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ipv4.ips.map((ip, idx) => (
                            <tr key={ip}>
                                <th>{idx}</th>
                                <td>{ip}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            {!ipv4.found && <p>No se encontraron direcciones IP</p>}
            <h2>Direcciones IPv6</h2>
            {
                ipv6.found &&
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>IP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ipv6.ips.map((ip, idx) => (
                            <tr key={ip}>
                                <th>{idx}</th>
                                <td>{ip}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            {!ipv6.found && <p>No se encontraron direcciones IP</p>}
        </section>
    )
}
