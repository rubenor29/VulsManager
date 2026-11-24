using System.Text.Json.Serialization;

namespace VulsManager.Models;

using DetectionMethod = string;

public class Package
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("version")]
    public string Version { get; set; } = string.Empty;

    [JsonPropertyName("release")]
    public string Release { get; set; } = string.Empty;

    [JsonPropertyName("newVersion")]
    public string NewVersion { get; set; } = string.Empty;

    [JsonPropertyName("newRelease")]
    public string NewRelease { get; set; } = string.Empty;

    [JsonPropertyName("arch")]
    public string Arch { get; set; } = string.Empty;

    [JsonPropertyName("repository")]
    public string Repository { get; set; } = string.Empty;

    [JsonPropertyName("vendor")]
    public string? Vendor { get; set; }

    [JsonPropertyName("modularitylabel")]
    public string ModularityLabel { get; set; } = string.Empty;

    [JsonPropertyName("changelog")]
    public Changelog? Changelog { get; set; }

    [JsonPropertyName("AffectedProcs")]
    public List<AffectedProcess>? AffectedProcs { get; set; }

    [JsonPropertyName("NeedRestartProcs")]
    public List<NeedRestartProcess>? NeedRestartProcs { get; set; }

    [JsonPropertyName("repositoryClass")]
    public string? RepositoryClass { get; set; }
}

public class Changelog
{
    [JsonPropertyName("contents")]
    public string Contents { get; set; } = string.Empty;

    [JsonPropertyName("method")]
    public DetectionMethod Method { get; set; } = string.Empty;
}

public class AffectedProcess
{
    [JsonPropertyName("pid")]
    public string? Pid { get; set; }

    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("listenPorts")]
    public List<string>? ListenPorts { get; set; }

    [JsonPropertyName("listenPortStats")]
    public List<PortStat>? ListenPortStats { get; set; }
}

public class PortStat
{
    [JsonPropertyName("bindAddress")]
    public string BindAddress { get; set; } = string.Empty;

    [JsonPropertyName("port")]
    public string Port { get; set; } = string.Empty;

    [JsonPropertyName("portReachableTo")]
    public List<string> PortReachableTo { get; set; } = [];
}

public class NeedRestartProcess
{
    [JsonPropertyName("pid")]
    public string Pid { get; set; } = string.Empty;

    [JsonPropertyName("path")]
    public string Path { get; set; } = string.Empty;

    [JsonPropertyName("serviceName")]
    public string ServiceName { get; set; } = string.Empty;

    [JsonPropertyName("initSystem")]
    public string InitSystem { get; set; } = string.Empty;
}

public class SrcPackage
{
    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("version")]
    public string Version { get; set; } = string.Empty;

    [JsonPropertyName("arch")]
    public string Arch { get; set; } = string.Empty;

    [JsonPropertyName("binaryNames")]
    public List<string> BinaryNames { get; set; } = [];
}
