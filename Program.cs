using Ryn.Core;
using Ryn.Ipc;
using Ryn.Plugins.Dialog;
using Ryn.Plugins.FileSystem;
using VulsManager.Commands;

namespace VulsManager;

public static class Program
{
    [STAThread]
    public static void Main(string[] args)
    {
        var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);

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
                services.AddRynCommands();
                services.AddExampleCommands();
                services.AddReportCommands();
                services.AddRynDialog();
                services.AddRynFileSystem(fs => fs.AllowedPaths.Add(homeDir));
            })
            .Build();

        app.Run();
    }
}
