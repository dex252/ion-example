using Nancy;

namespace AuthServe.Modules
{
    public abstract partial class MainModule: NancyModule
    {
        protected MainModule()
        {
            Post($"/registration", action =>
            {
                Database db = Context.GetDb();

                return Registration(Context.Request, db);

            }, null, "POST");

            Get($"/token", action =>
            {
                Database db = Context.GetDb();

                return GetToken(Context.Request, db);
                
            }, null, "GET");

            Get($"/check", action =>
            {
                Database db = Context.GetDb();

                return CheckToken(Context.Request, db);

            }, null, "GET");
        }
    }
}
