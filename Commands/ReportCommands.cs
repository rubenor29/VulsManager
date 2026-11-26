using Ryn.Ipc;
using VulsManager.Models;
using VulsManager.Serialization;

namespace VulsManager.Commands;

[RynJsonContext(typeof(ScanResultJsonContext))]
public static class ReportCommands
{
    [RynCommand("report.parseScan")]
    public static ScanResult? ParseScan(string filePath)
    {
        Console.WriteLine(filePath);

        try
        {
            var json = File.ReadAllText(filePath);
            if (json is null)
                return null;

            return ScanResultSerializer.Deserialize(json);
        }
        catch (Exception e)
        {
            Console.Error.WriteLine(e.ToString());
        }

        return null;
    }
}
