using System.Configuration;
using System.Data;
using AuthServe.Models;
using Dapper;
using Nancy;
using Nancy.Extensions;

namespace AuthServe.Modules
{
    public abstract partial class MainModule : NancyModule
    {
        private Nancy.Response Registration(Request contextRequest, Database db)
        {
            var body = contextRequest.Body.AsString();

            User user = Newtonsoft.Json.JsonConvert.DeserializeObject<User>(body);

            string dynamicSalt = ConfigurationManager.AppSettings["salt"];
            int passwordCost = 13;
   
            string salt =  "$2a$" + passwordCost + "$/" + dynamicSalt + user.login;

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(user.password, salt);

            user.password = passwordHash;

            using (var connection = db.Db)
            using (var transaction = connection.BeginTransaction(IsolationLevel.RepeatableRead))
            {
                int? id = connection.Insert(user, transaction);

                transaction.Commit();
                return id;
            }
        }
    }
}
