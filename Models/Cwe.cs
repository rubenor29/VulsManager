using System.Text.Json.Serialization;

namespace VulsManager.Models;

public class Cwe
{
    [JsonPropertyName("cweID")]
    public string CweId { get; set; } = string.Empty;

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;

    [JsonPropertyName("extendedDescription")]
    public string ExtendedDescription { get; set; } = string.Empty;
}
