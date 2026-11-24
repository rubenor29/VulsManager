using System.Text.Json.Serialization;

namespace VulsManager.Models;

public class WpPackage
{
    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("status")]
    public string? Status { get; set; }

    [JsonPropertyName("update")]
    public string? Update { get; set; }

    [JsonPropertyName("version")]
    public string? Version { get; set; }

    [JsonPropertyName("type")]
    public string? Type { get; set; }
}
