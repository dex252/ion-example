using Microsoft.Owin.Hosting;
using System;
using System.Configuration;

namespace AuthServe
{
    class Program
    {
        static void Main(string[] args)
        {
            string url = ConfigurationManager.ConnectionStrings["AuthServer.Properties.Settings.hostConnectionString"].ConnectionString;

            using (WebApp.Start<Startup>(url))
            {
                Console.WriteLine($"Running on {url}");
                Console.ReadKey();
            }
        }
    }
}
