using Microsoft.Extensions.DependencyInjection;
using Ryn.Core;
using Ryn.Ipc;
using VulsManager.Commands;
using VulsManager.Serialization;

namespace VulsManager;

public static class Program
{
    [STAThread]
    public static void Main(string[] args)
    {
        var app = RynApplication
            .CreateBuilder()
            .ConfigureOptions(opts =>
            {
                if (args.Contains("--vite"))
                    opts.Url = new Uri("http://localhost:5173");
                else
                    opts.ContentDirectory = Path.Combine(AppContext.BaseDirectory, "wwwroot");
            })
            .ConfigureServices(services =>
            {
                services.AddSingleton<ScanResultSerializer>();

                services.AddRynCommands();
                services.AddExampleCommands();
            })
            .Build();

        app.Run();
    }
}
