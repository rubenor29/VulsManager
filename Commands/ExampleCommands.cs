using System.Globalization;
using Ryn.Ipc;

namespace VulsManager.Commands;

public static class ExampleCommands
{
    [RynCommand("app.greet")]
    public static string Greet(string name) => $"Hello, {name}!";

    [RynCommand("app.add")]
    public static int Add(int a, int b) => a + b;

    [RynCommand("app.getTime")]
    public static string GetTime() => DateTime.Now.ToString("HH:mm:ss", CultureInfo.InvariantCulture);
}
