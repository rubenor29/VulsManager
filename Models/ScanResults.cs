using System.Text.Json.Serialization;

namespace VulsManager.Models;

using AttackDict = Dictionary<string, AttackDictEntry>;
using CapecDict = Dictionary<string, CapecDictEntry>;
using CweDict = Dictionary<string, CweDictEntry>;
using DependencyGraphManifests = Dictionary<string, DependencyGraphManifest>;
using LibraryScanners = List<LibraryScanner>;
using Packages = Dictionary<string, Package>;
using SrcPackages = Dictionary<string, SrcPackage>;
using VulnInfos = Dictionary<string, VulnInfo>;
using WordPressPackages = List<WpPackage>;

public class ScanResult
{
    [JsonPropertyName("jsonVersion")]
    public int JsonVersion { get; set; }

    [JsonPropertyName("lang")]
    public string Lang { get; set; } = string.Empty;

    [JsonPropertyName("serverUUID")]
    public string ServerUuid { get; set; } = string.Empty;

    [JsonPropertyName("serverName")]
    public string ServerName { get; set; } = string.Empty;

    [JsonPropertyName("family")]
    public string Family { get; set; } = string.Empty;

    [JsonPropertyName("release")]
    public string Release { get; set; } = string.Empty;

    [JsonPropertyName("container")]
    public Container Container { get; set; } = null!; // Pendiente: tipo Container

    [JsonPropertyName("platform")]
    public Platform Platform { get; set; } = null!; // Pendiente: tipo Platform

    [JsonPropertyName("ipv4Addrs")]
    public List<string>? Ipv4Addrs { get; set; }

    [JsonPropertyName("ipv6Addrs")]
    public List<string>? Ipv6Addrs { get; set; }

    [JsonPropertyName("ipsIdentifiers")]
    public Dictionary<string, string>? IpsIdentifiers { get; set; }

    [JsonPropertyName("scannedAt")]
    public DateTimeOffset ScannedAt { get; set; }

    [JsonPropertyName("scanMode")]
    public string ScanMode { get; set; } = string.Empty;

    [JsonPropertyName("scannedVersion")]
    public string ScannedVersion { get; set; } = string.Empty;

    [JsonPropertyName("scannedRevision")]
    public string ScannedRevision { get; set; } = string.Empty;

    [JsonPropertyName("scannedBy")]
    public string ScannedBy { get; set; } = string.Empty;

    [JsonPropertyName("scannedVia")]
    public string ScannedVia { get; set; } = string.Empty;

    [JsonPropertyName("scannedIpv4Addrs")]
    public List<string>? ScannedIpv4Addrs { get; set; }

    [JsonPropertyName("scannedIpv6Addrs")]
    public List<string>? ScannedIpv6Addrs { get; set; }

    [JsonPropertyName("reportedAt")]
    public DateTimeOffset ReportedAt { get; set; }

    [JsonPropertyName("reportedVersion")]
    public string ReportedVersion { get; set; } = string.Empty;

    [JsonPropertyName("reportedRevision")]
    public string ReportedRevision { get; set; } = string.Empty;

    [JsonPropertyName("reportedBy")]
    public string ReportedBy { get; set; } = string.Empty;

    [JsonPropertyName("errors")]
    public List<string> Errors { get; set; } = [];

    [JsonPropertyName("warnings")]
    public List<string> Warnings { get; set; } = [];

    [JsonPropertyName("scannedCves")]
    public VulnInfos ScannedCves { get; set; } = null!; // Pendiente: tipo VulnInfos

    [JsonPropertyName("runningKernel")]
    public Kernel RunningKernel { get; set; } = null!; // Pendiente: tipo Kernel

    [JsonPropertyName("packages")]
    public Packages Packages { get; set; } = null!; // Pendiente: tipo Packages

    [JsonPropertyName("SrcPackages")]
    public SrcPackages SrcPackages { get; set; } = null!; // Pendiente: tipo SrcPackages

    [JsonPropertyName("enabledDnfModules")]
    public List<string>? EnabledDnfModules { get; set; }

    [JsonPropertyName("WordPressPackages")]
    public WordPressPackages WordPressPackages { get; set; } = null!; // Pendiente: tipo WordPressPackages

    [JsonPropertyName("gitHubManifests")]
    public DependencyGraphManifests GitHubManifests { get; set; } = null!; // Pendiente: tipo DependencyGraphManifests

    [JsonPropertyName("libraries")]
    public LibraryScanners LibraryScanners { get; set; } = null!; // Pendiente: tipo LibraryScanners

    [JsonPropertyName("windowsKB")]
    public WindowsKB? WindowsKB { get; set; } // Pendiente: tipo WindowsKB

    [JsonPropertyName("cweDict")]
    public CweDict CweDict { get; set; } = null!; // Pendiente: tipo CweDict

    [JsonPropertyName("capecDict")]
    public CapecDict CapecDict { get; set; } = null!; // Pendiente: tipo CapecDict

    [JsonPropertyName("attackDict")]
    public AttackDict AttackDict { get; set; } = null!; // Pendiente: tipo AttackDict

    [JsonPropertyName("Optional")]
    public Dictionary<string, object?>? Optional { get; set; }

    [JsonPropertyName("config")]
    public ScanResultConfig Config { get; set; } = null!;
}

public class ScanResultConfig
{
    [JsonPropertyName("scan")]
    public Config Scan { get; set; } = null!; // Pendiente: tipo config.Config

    [JsonPropertyName("report")]
    public Config Report { get; set; } = null!; // Pendiente: tipo config.Config
}

public class Container
{
    [JsonPropertyName("containerID")]
    public string ContainerId { get; set; } = string.Empty;

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("image")]
    public string Image { get; set; } = string.Empty;

    [JsonPropertyName("type")]
    public string Type { get; set; } = string.Empty;

    [JsonPropertyName("uuid")]
    public string Uuid { get; set; } = string.Empty;
}

public class Platform
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty; // aws or azure or gcp or other...

    [JsonPropertyName("instanceID")]
    public string InstanceId { get; set; } = string.Empty;
}

// Kernel has the Release, version and whether need restart
public class Kernel
{
    [JsonPropertyName("release")]
    public string Release { get; set; } = string.Empty;

    [JsonPropertyName("version")]
    public string Version { get; set; } = string.Empty;

    [JsonPropertyName("rebootRequired")]
    public bool RebootRequired { get; set; }
}

// WindowsKB has applied and unapplied KBs
public class WindowsKB
{
    [JsonPropertyName("applied")]
    public List<string>? Applied { get; set; }

    [JsonPropertyName("unapplied")]
    public List<string>? Unapplied { get; set; }
}

public class CweDictEntry
{
    [JsonPropertyName("en")]
    public Cwe? En { get; set; }

    [JsonPropertyName("ja")]
    public Cwe? Ja { get; set; }

    [JsonPropertyName("owaspTopTens")]
    public Dictionary<string, string> OwaspTopTens { get; set; } = [];

    [JsonPropertyName("cweTopTwentyfives")]
    public Dictionary<string, string> CweTopTwentyfives { get; set; } = [];

    [JsonPropertyName("sansTopTwentyfives")]
    public Dictionary<string, string> SansTopTwentyfives { get; set; } = [];
}

public class CapecDictEntry
{
    [JsonPropertyName("capecID")]
    public string CapecId { get; set; } = string.Empty;

    [JsonPropertyName("name")]
    public string? Name { get; set; }
}

public class AttackDictEntry
{
    [JsonPropertyName("attackID")]
    public string AttackId { get; set; } = string.Empty;

    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("platforms")]
    public List<string>? Platforms { get; set; }
}
