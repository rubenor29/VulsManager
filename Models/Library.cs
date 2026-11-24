namespace VulsManager.Models;

using System.Text.Json.Serialization;
using LangType = string;

public class LibraryScanner
{
    [JsonPropertyName("Type")]
    public LangType Type { get; set; } = string.Empty;

    [JsonPropertyName("Libs")]
    public List<Library> Libs { get; set; } = [];

    [JsonPropertyName("path")]
    public string? LockfilePath { get; set; }
}

public class Library
{
    [JsonPropertyName("Name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("Version")]
    public string Version { get; set; } = string.Empty;

    [JsonPropertyName("PURL")]
    public string Purl { get; set; } = string.Empty;

    [JsonPropertyName("FilePath")]
    public string FilePath { get; set; } = string.Empty;

    [JsonPropertyName("Digest")]
    public string Digest { get; set; } = string.Empty;

    [JsonPropertyName("Dev")]
    public bool Dev { get; set; }

    [JsonPropertyName("ID")]
    public string? Id { get; set; }

    [JsonPropertyName("Relationship")]
    public string? Relationship { get; set; }

    [JsonPropertyName("DependsOn")]
    public List<string>? DependsOn { get; set; }
}
