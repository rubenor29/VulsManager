using System.Text.Json;
using System.Text.Json.Serialization;
using VulsManager.Models; // Asegúrate de que este using esté presente

// Registra el tipo raíz y todas sus dependencias directas que el generador necesite conocer.
[JsonSerializable(typeof(ScanResult))]
[JsonSerializable(typeof(List<ScanResult>))] // Útil si también manejas listas
[JsonSourceGenerationOptions(
    PropertyNameCaseInsensitive = false,
    AllowTrailingCommas = true,
    ReadCommentHandling = JsonCommentHandling.Skip,
    NumberHandling = JsonNumberHandling.AllowReadingFromString,
    UnmappedMemberHandling = JsonUnmappedMemberHandling.Disallow, // <-- Tu opción estricta
    WriteIndented = true,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
)]
internal partial class ScanResultJsonContext : JsonSerializerContext { }
