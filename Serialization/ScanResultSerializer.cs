using System.Text.Json;
using System.Text.Json.Serialization.Metadata;
using VulsManager.Models;

namespace VulsManager.Serialization;

public static class ScanResultSerializer
{
    private static readonly JsonTypeInfo<ScanResult> ScanResultTypeInfo = ScanResultJsonContext
        .Default
        .ScanResult;

    public static JsonSerializerOptions Options => ScanResultJsonContext.Default.Options;

    public static ScanResult Deserialize(string json) =>
        JsonSerializer.Deserialize(json, ScanResultTypeInfo)
        ?? throw new InvalidOperationException("Deserialize devolvió null");

    public static string Serialize(ScanResult scan) =>
        JsonSerializer.Serialize(scan, ScanResultTypeInfo);
}
