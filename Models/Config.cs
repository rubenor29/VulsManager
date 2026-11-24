using System.Text.Json;
using System.Text.Json.Serialization;

namespace VulsManager.Models;

public class Config : LogOpts
{
    [JsonPropertyName("httpProxy")]
    public string? HttpProxy { get; set; }

    [JsonPropertyName("resultsDir")]
    public string? ResultsDir { get; set; }

    [JsonPropertyName("pipe")]
    public bool? Pipe { get; set; }

    [JsonPropertyName("default")]
    public ServerInfo Default { get; set; } = null!;

    [JsonPropertyName("servers")]
    public Dictionary<string, ServerInfo>? Servers { get; set; }

    [JsonPropertyName("vuls2")]
    public Vuls2Conf Vuls2 { get; set; } = null!;

    // logLevel, si lo querés mapear, va SOLO acá (LogOpts no lo tiene en Go)
    [JsonPropertyName("logLevel")]
    public string? LogLevel { get; set; }

    [JsonExtensionData]
    public Dictionary<string, JsonElement>? Extra { get; set; }
}

public class ServerInfo
{
    [JsonPropertyName("serverName")]
    public string? ServerName { get; set; }

    [JsonPropertyName("user")]
    public string? User { get; set; }

    [JsonPropertyName("host")]
    public string? Host { get; set; }

    [JsonPropertyName("ignoreIPAddresses")]
    public List<string>? IgnoreIpAddresses { get; set; }

    [JsonPropertyName("jumpServer")]
    public List<string>? JumpServer { get; set; }

    [JsonPropertyName("port")]
    public string? Port { get; set; }

    [JsonPropertyName("sshConfigPath")]
    public string? SshConfigPath { get; set; }

    [JsonPropertyName("keyPath")]
    public string? KeyPath { get; set; }

    [JsonPropertyName("cpeNames")]
    public List<string>? CpeNames { get; set; }

    [JsonPropertyName("scanMode")]
    public List<string>? ScanMode { get; set; }

    [JsonPropertyName("scanModules")]
    public List<string>? ScanModules { get; set; }

    [JsonPropertyName("owaspDCXMLPath")]
    public string? OwaspDcxmlPath { get; set; }

    [JsonPropertyName("containersOnly")]
    public bool? ContainersOnly { get; set; }

    [JsonPropertyName("containersIncluded")]
    public List<string>? ContainersIncluded { get; set; }

    [JsonPropertyName("containersExcluded")]
    public List<string>? ContainersExcluded { get; set; }

    [JsonPropertyName("containerType")]
    public string? ContainerType { get; set; }

    [JsonPropertyName("containers")]
    public Dictionary<string, ContainerSetting>? Containers { get; set; }

    [JsonPropertyName("ignoreCves")]
    public List<string>? IgnoreCves { get; set; }

    [JsonPropertyName("ignorePkgsRegexp")]
    public List<string>? IgnorePkgsRegexp { get; set; }

    [JsonPropertyName("uuids")]
    public Dictionary<string, string>? Uuids { get; set; }

    [JsonPropertyName("memo")]
    public string? Memo { get; set; }

    [JsonPropertyName("enablerepo")]
    public List<string>? Enablerepo { get; set; }

    [JsonPropertyName("disablerepo")]
    public List<string>? Disablerepo { get; set; }

    [JsonPropertyName("optional")]
    public Dictionary<string, object?>? Optional { get; set; }

    [JsonPropertyName("lockfiles")]
    public List<string>? Lockfiles { get; set; }

    [JsonPropertyName("findLock")]
    public bool? FindLock { get; set; }

    [JsonPropertyName("findLockDirs")]
    public List<string>? FindLockDirs { get; set; }

    [JsonPropertyName("type")]
    public string? Type { get; set; }

    [JsonPropertyName("ignoredJSONKeys")]
    public List<string>? IgnoredJsonKeys { get; set; }

    [JsonPropertyName("wordpress")]
    public WordPressConf? WordPress { get; set; }

    [JsonPropertyName("portscan")]
    public PortScanConf? PortScan { get; set; }

    [JsonPropertyName("windows")]
    public WindowsConf? Windows { get; set; }

    [JsonPropertyName("ipv4Addrs")]
    public List<string>? Ipv4Addrs { get; set; }

    [JsonPropertyName("ipv6Addrs")]
    public List<string>? Ipv6Addrs { get; set; }

    [JsonPropertyName("ipsIdentifiers")]
    public Dictionary<string, string>? IpsIdentifiers { get; set; }
}

public class Vuls2Conf
{
    [JsonPropertyName("Repository")]
    public string Repository { get; set; } = string.Empty;

    [JsonPropertyName("Digest")]
    public string? Digest { get; set; }

    [JsonPropertyName("Path")]
    public string Path { get; set; } = string.Empty;

    [JsonPropertyName("SkipUpdate")]
    public bool SkipUpdate { get; set; }
}

public class ContainerSetting
{
    [JsonPropertyName("cpes")]
    public List<string>? Cpes { get; set; }

    [JsonPropertyName("owaspDCXMLPath")]
    public string? OwaspDcxmlPath { get; set; }

    [JsonPropertyName("ignorePkgsRegexp")]
    public List<string>? IgnorePkgsRegexp { get; set; }

    [JsonPropertyName("ignoreCves")]
    public List<string>? IgnoreCves { get; set; }
}

public class WordPressConf
{
    [JsonPropertyName("osUser")]
    public string? OsUser { get; set; }

    [JsonPropertyName("docRoot")]
    public string? DocRoot { get; set; }

    [JsonPropertyName("cmdPath")]
    public string? CmdPath { get; set; }

    [JsonPropertyName("noSudo")]
    public bool? NoSudo { get; set; }
}

public class PortScanConf
{
    [JsonPropertyName("scannerBinPath")]
    public string? ScannerBinPath { get; set; }

    [JsonPropertyName("hasPrivileged")]
    public bool? HasPrivileged { get; set; }

    [JsonPropertyName("scanTechniques")]
    public List<string>? ScanTechniques { get; set; }

    [JsonPropertyName("sourcePort")]
    public string? SourcePort { get; set; }
}

public class WindowsConf
{
    [JsonPropertyName("serverSelection")]
    public int? ServerSelection { get; set; }

    [JsonPropertyName("cabPath")]
    public string? CabPath { get; set; }
}
