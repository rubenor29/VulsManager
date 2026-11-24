namespace VulsManager.Models;

using System.Text.Json.Serialization;

public class DependencyGraphManifest
{
    [JsonPropertyName("blobPath")]
    public string BlobPath { get; set; } = string.Empty;

    [JsonPropertyName("filename")]
    public string Filename { get; set; } = string.Empty;

    [JsonPropertyName("repository")]
    public string Repository { get; set; } = string.Empty;

    [JsonPropertyName("dependencies")]
    public List<Dependency> Dependencies { get; set; } = [];
}

public class Dependency
{
    [JsonPropertyName("packageName")]
    public string PackageName { get; set; } = string.Empty;

    [JsonPropertyName("requirements")]
    public string Requirements { get; set; } = string.Empty;

    [JsonPropertyName("purl")]
    public string Purl { get; set; } = string.Empty;
}
