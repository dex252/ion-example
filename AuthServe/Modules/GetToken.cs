using System;
using System.Configuration;
using AuthServe.Help;
using AuthServe.Models;
using Dapper;
using JWT.Algorithms;
using JWT.Builder;
using Nancy;

namespace AuthServe.Modules
{
    public abstract partial class MainModule : NancyModule
    {
        private Nancy.Response GetToken(Request contextRequest, Database db)
        {
            string login = contextRequest.Query["login"];
            string password = contextRequest.Query["password"];

            User user = Verify(login, password, db);

            if (user != null)
            {
                #pragma warning disable 612
                string token = JsonTokenResponse(user, db);
                #pragma warning restore 612

                return Resp.SendResponse(token);
            }

            return Resp.SendResponse(HttpStatusCode.BadRequest);
        }

        private User Verify(string login, string password, Database db)
        {
            string sql = "SELECT * FROM Users WHERE login = @login;";
            User response = db.Db.QuerySingle<User>(sql, new { login });

            if (BCrypt.Net.BCrypt.Verify(password, response.password))
            {
                return response;
            }

            return null;
        }

        [Obsolete]
        public string JsonTokenResponse(User user, Database db)
        {
            var jwt = new JwtBuilder()
                .WithAlgorithm(new HMACSHA512Algorithm())
                .WithSecret(ConfigurationManager.AppSettings["JwtSecret"])
                .AddClaim("exp", DateTimeOffset.UtcNow.AddDays(1).ToUnixTimeSeconds()) //срок использования токена
                .AddClaim("i", user.id) //id пользователя
                .AddClaim("iss", @"SOTA SOFT DV") //подпись
                .Build();

            RewriteToken(user.id, jwt, db);

            return jwt;
        }

        private void RewriteToken(int id, string token, Database db)
        {
            string sql;
            try
            {
                sql = "INSERT TokenList (id, token, time) VALUES (@id, @token, @time);";
                DateTime time = DateTime.Now;
                db.Db.Execute(sql, new { id, token, time });
            }
            catch (Exception)
            {
                sql = "UPDATE TokenList SET token = @token, time = @time WHERE id = @id; ";
                DateTime time = DateTime.Now;
                db.Db.Execute(sql, new { id, token, time });
            }
        }
    }
}
