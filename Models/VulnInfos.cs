using System.Text.Json.Serialization;

namespace VulsManager.Models;

using CveContentType = string;
using DetectionMethod = string;
using DiffStatus = string;
using ExploitType = string;
using KevType = string;
using Confidences = List<Confidence>;
using CveContents = Dictionary<string, List<CveContent>>;
using DistroAdvisories = List<DistroAdvisory>;
using Exploits = List<Exploit>;
using GitHubSecurityAlerts = List<GitHubSecurityAlert>;
using LibraryFixedIns = List<LibraryFixedIn>;
using Mitigations = List<Mitigation>;
using PackageFixStatuses = List<PackageFixStatus>;
using WpPackageFixStats = List<WpPackageFixStatus>;

public class VulnInfo
{
    [JsonPropertyName("cveID")]
    public string? CveId { get; set; }

    [JsonPropertyName("confidences")]
    public Confidences? Confidences { get; set; } // Pendiente: tipo Confidences

    [JsonPropertyName("affectedPackages")]
    public PackageFixStatuses? AffectedPackages { get; set; } // Pendiente: tipo PackageFixStatuses

    [JsonPropertyName("distroAdvisories")]
    public DistroAdvisories? DistroAdvisories { get; set; } // Pendiente: tipo DistroAdvisories

    [JsonPropertyName("cveContents")]
    public CveContents? CveContents { get; set; } // Pendiente: tipo CveContents

    [JsonPropertyName("exploits")]
    public Exploits? Exploits { get; set; } // Pendiente: tipo Exploits

    [JsonPropertyName("metasploits")]
    public List<Metasploit>? Metasploits { get; set; } // Pendiente: tipo Metasploit

    [JsonPropertyName("mitigations")]
    public Mitigations? Mitigations { get; set; } // Pendiente: tipo Mitigations

    [JsonPropertyName("kevs")]
    public List<Kev>? Kevs { get; set; } // Pendiente: tipo Kev

    [JsonPropertyName("ctis")]
    public List<string>? Ctis { get; set; }

    [JsonPropertyName("alertDict")]
    public AlertDict? AlertDict { get; set; } // Pendiente: tipo AlertDict

    [JsonPropertyName("cpeURIs")]
    public List<string>? CpeUris { get; set; }

    [JsonPropertyName("gitHubSecurityAlerts")]
    public GitHubSecurityAlerts? GitHubSecurityAlerts { get; set; } // Pendiente: tipo GitHubSecurityAlerts

    [JsonPropertyName("wpPackageFixStats")]
    public WpPackageFixStats? WpPackageFixStats { get; set; } // Pendiente: tipo WpPackageFixStats

    [JsonPropertyName("libraryFixedIns")]
    public LibraryFixedIns? LibraryFixedIns { get; set; } // Pendiente: tipo LibraryFixedIns

    [JsonPropertyName("windowsKBFixedIns")]
    public List<string>? WindowsKbFixedIns { get; set; }

    [JsonPropertyName("vulnType")]
    public string? VulnType { get; set; }

    [JsonPropertyName("diffStatus")]
    public DiffStatus? DiffStatus { get; set; } // Pendiente: tipo DiffStatus
}

public class Confidence
{
    [JsonPropertyName("score")]
    public int Score { get; set; }

    [JsonPropertyName("detectionMethod")]
    public DetectionMethod DetectionMethod { get; set; } = string.Empty;
}

public class PackageFixStatus
{
    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("notFixedYet")]
    public bool? NotFixedYet { get; set; }

    [JsonPropertyName("fixState")]
    public string? FixState { get; set; }

    [JsonPropertyName("fixedIn")]
    public string? FixedIn { get; set; }
}

public class DistroAdvisory
{
    [JsonPropertyName("advisoryID")]
    public string AdvisoryId { get; set; } = string.Empty;

    [JsonPropertyName("severity")]
    public string Severity { get; set; } = string.Empty;

    [JsonPropertyName("issued")]
    public DateTimeOffset Issued { get; set; }

    [JsonPropertyName("updated")]
    public DateTimeOffset Updated { get; set; }

    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;
}

public class Exploit
{
    [JsonPropertyName("exploitType")]
    public ExploitType ExploitType { get; set; } = string.Empty;

    [JsonPropertyName("id")]
    public string Id { get; set; } = string.Empty;

    [JsonPropertyName("url")]
    public string Url { get; set; } = string.Empty;

    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;

    [JsonPropertyName("verified")]
    public bool? Verified { get; set; }

    [JsonPropertyName("documentURL")]
    public string? DocumentUrl { get; set; }

    [JsonPropertyName("shellCodeURL")]
    public string? ShellCodeUrl { get; set; }

    [JsonPropertyName("binaryURL")]
    public string? BinaryUrl { get; set; }

    [JsonPropertyName("paperURL")]
    public string? PaperUrl { get; set; }

    [JsonPropertyName("ghdbURL")]
    public string? GhdbUrl { get; set; }
}

public class Metasploit
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("title")]
    public string Title { get; set; } = string.Empty;

    [JsonPropertyName("description")]
    public string? Description { get; set; }

    [JsonPropertyName("URLs")]
    public List<string>? Urls { get; set; }
}

public class Mitigation
{
    [JsonPropertyName("cveContentType")]
    public CveContentType? CveContentType { get; set; }

    [JsonPropertyName("mitigation")]
    public string? MitigationText { get; set; }

    [JsonPropertyName("url")]
    public string? Url { get; set; }
}

public class Kev
{
    [JsonPropertyName("type")]
    public KevType? Type { get; set; }

    [JsonPropertyName("vendor_project")]
    public string? VendorProject { get; set; }

    [JsonPropertyName("product")]
    public string? Product { get; set; }

    [JsonPropertyName("vulnerability_name")]
    public string? VulnerabilityName { get; set; }

    [JsonPropertyName("short_description")]
    public string? ShortDescription { get; set; }

    [JsonPropertyName("required_action")]
    public string? RequiredAction { get; set; }

    [JsonPropertyName("known_ransomware_campaign_use")]
    public string? KnownRansomwareCampaignUse { get; set; }

    [JsonPropertyName("date_added")]
    public DateTimeOffset? DateAdded { get; set; }

    [JsonPropertyName("due_date")]
    public DateTimeOffset? DueDate { get; set; }

    [JsonPropertyName("cisa")]
    public CisaKev? Cisa { get; set; }

    [JsonPropertyName("vulncheck")]
    public VulnCheckKev? VulnCheck { get; set; }

    [JsonPropertyName("enisa")]
    public EnisaKev? Enisa { get; set; }
}

public class CisaKev
{
    [JsonPropertyName("note")]
    public string? Note { get; set; }
}

public class VulnCheckKev
{
    [JsonPropertyName("xdb")]
    public List<VulnCheckXdb>? Xdb { get; set; }

    [JsonPropertyName("reported_exploitation")]
    public List<VulnCheckReportedExploitation>? ReportedExploitation { get; set; }
}

public class VulnCheckXdb
{
    [JsonPropertyName("xdb_id")]
    public string? XdbId { get; set; }

    [JsonPropertyName("xdb_url")]
    public string? XdbUrl { get; set; }

    [JsonPropertyName("date_added")]
    public DateTimeOffset? DateAdded { get; set; }

    [JsonPropertyName("exploit_type")]
    public string? ExploitType { get; set; }

    [JsonPropertyName("clone_ssh_url")]
    public string? CloneSshUrl { get; set; }
}

public class VulnCheckReportedExploitation
{
    [JsonPropertyName("url")]
    public string? Url { get; set; }

    [JsonPropertyName("date_added")]
    public DateTimeOffset? DateAdded { get; set; }
}

public class EnisaKev
{
    [JsonPropertyName("date_reported")]
    public DateTimeOffset? DateReported { get; set; }

    [JsonPropertyName("patched_since")]
    public string? PatchedSince { get; set; }

    [JsonPropertyName("origin_source")]
    public string? OriginSource { get; set; }

    [JsonPropertyName("exploitation_type")]
    public string? ExploitationType { get; set; }

    [JsonPropertyName("threat_actors_exploiting")]
    public string? ThreatActorsExploiting { get; set; }
}

public class AlertDict
{
    [JsonPropertyName("cisa")]
    public List<Alert> Cisa { get; set; } = [];

    [JsonPropertyName("jpcert")]
    public List<Alert> Jpcert { get; set; } = [];

    [JsonPropertyName("uscert")]
    public List<Alert> Uscert { get; set; } = [];
}

public class Alert
{
    [JsonPropertyName("url")]
    public string? Url { get; set; }

    [JsonPropertyName("title")]
    public string? Title { get; set; }

    [JsonPropertyName("team")]
    public string? Team { get; set; }
}

public class GitHubSecurityAlert
{
    [JsonPropertyName("repository")]
    public string Repository { get; set; } = string.Empty;

    [JsonPropertyName("package")]
    public GsaVulnerablePackage Package { get; set; } = null!;

    [JsonPropertyName("fixedIn")]
    public string FixedIn { get; set; } = string.Empty;

    [JsonPropertyName("affectedRange")]
    public string AffectedRange { get; set; } = string.Empty;

    [JsonPropertyName("dismissed")]
    public bool Dismissed { get; set; }

    [JsonPropertyName("dismissedAt")]
    public DateTimeOffset DismissedAt { get; set; }

    [JsonPropertyName("dismissReason")]
    public string DismissReason { get; set; } = string.Empty;
}

public class GsaVulnerablePackage
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("ecosystem")]
    public string Ecosystem { get; set; } = string.Empty;

    [JsonPropertyName("manifestFilename")]
    public string ManifestFilename { get; set; } = string.Empty;

    [JsonPropertyName("manifestPath")]
    public string ManifestPath { get; set; } = string.Empty;

    [JsonPropertyName("requirements")]
    public string Requirements { get; set; } = string.Empty;
}

public class WpPackageFixStatus
{
    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("fixedIn")]
    public string? FixedIn { get; set; }
}

public class LibraryFixedIn
{
    [JsonPropertyName("key")]
    public string? Key { get; set; }

    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("version")]
    public string? Version { get; set; }

    [JsonPropertyName("fixedIn")]
    public string? FixedIn { get; set; }

    [JsonPropertyName("path")]
    public string? Path { get; set; }
}
