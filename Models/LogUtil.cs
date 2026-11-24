using System.Text.Json.Serialization;

namespace VulsManager.Models;

public class LogOpts
{
    [JsonPropertyName("debug")]
    public bool? Debug { get; set; }

    [JsonPropertyName("debugSQL")]
    public bool? DebugSql { get; set; }

    [JsonPropertyName("logToFile")]
    public bool? LogToFile { get; set; }

    [JsonPropertyName("logDir")]
    public string? LogDir { get; set; }

    [JsonPropertyName("logJSON")]
    public bool LogJson { get; set; }

    [JsonPropertyName("quiet")]
    public bool? Quiet { get; set; }
}
