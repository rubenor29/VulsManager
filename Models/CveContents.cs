using System.Text.Json.Serialization;

namespace VulsManager.Models;

using CveContentType = string;
using References = List<Reference>;

public class CveContent
{
    [JsonPropertyName("type")]
    public CveContentType Type { get; set; } = string.Empty;

    [JsonPropertyName("cveID")]
    public string CveId { get; set; } = string.Empty;

    [JsonPropertyName("title")]
    public string Title { get; set; } = string.Empty;

    [JsonPropertyName("summary")]
    public string Summary { get; set; } = string.Empty;

    [JsonPropertyName("cvss2Score")]
    public double Cvss2Score { get; set; }

    [JsonPropertyName("cvss2Vector")]
    public string Cvss2Vector { get; set; } = string.Empty;

    [JsonPropertyName("cvss2Severity")]
    public string Cvss2Severity { get; set; } = string.Empty;

    [JsonPropertyName("cvss3Score")]
    public double Cvss3Score { get; set; }

    [JsonPropertyName("cvss3Vector")]
    public string Cvss3Vector { get; set; } = string.Empty;

    [JsonPropertyName("cvss3Severity")]
    public string Cvss3Severity { get; set; } = string.Empty;

    [JsonPropertyName("cvss40Score")]
    public double Cvss40Score { get; set; }

    [JsonPropertyName("cvss40Vector")]
    public string Cvss40Vector { get; set; } = string.Empty;

    [JsonPropertyName("cvss40Severity")]
    public string Cvss40Severity { get; set; } = string.Empty;

    [JsonPropertyName("ssvc")]
    public Ssvc? Ssvc { get; set; }

    [JsonPropertyName("sourceLink")]
    public string SourceLink { get; set; } = string.Empty;

    [JsonPropertyName("cpes")]
    public List<Cpe>? Cpes { get; set; }

    [JsonPropertyName("references")]
    public References? References { get; set; }

    [JsonPropertyName("cweIDs")]
    public List<string>? CweIds { get; set; }

    [JsonPropertyName("published")]
    public DateTimeOffset Published { get; set; }

    [JsonPropertyName("lastModified")]
    public DateTimeOffset LastModified { get; set; }

    [JsonPropertyName("optional")]
    public Dictionary<string, string>? Optional { get; set; }
}

public class Ssvc
{
    [JsonPropertyName("exploitation")]
    public string? Exploitation { get; set; }

    [JsonPropertyName("automatable")]
    public string? Automatable { get; set; }

    [JsonPropertyName("technical_impact")]
    public string? TechnicalImpact { get; set; }
}

public class Cpe
{
    [JsonPropertyName("uri")]
    public string Uri { get; set; } = string.Empty;

    [JsonPropertyName("formattedString")]
    public string FormattedString { get; set; } = string.Empty;
}

public class Reference
{
    [JsonPropertyName("link")]
    public string? Link { get; set; }

    [JsonPropertyName("source")]
    public string? Source { get; set; }

    [JsonPropertyName("refID")]
    public string? RefId { get; set; }

    [JsonPropertyName("tags")]
    public List<string>? Tags { get; set; }
}
