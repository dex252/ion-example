using Owin;

namespace AuthServe
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app
                .UseNancy();
        }
    }
}
