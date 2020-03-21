using AuthServe.Help;
using Dapper;
using Nancy;
using System.Configuration;
using JWT;
using JWT.Serializers;

namespace AuthServe.Modules
{
    public abstract partial class MainModule : NancyModule
    {
        private Nancy.Response CheckToken(Request contextRequest, Database db)
        {
            string token = contextRequest.Headers.Authorization;

            if (token != null)
            {
                string sql = "SELECT * FROM Tokenlist WHERE Token = @token;";

                var response = db.Db.QuerySingle(sql, new { token });

                if (VerifyToken(token))
                {
                    return Resp.OK();
                }

                return Resp.SendResponse(HttpStatusCode.Unauthorized);
            }

            return Resp.SendResponse(HttpStatusCode.Unauthorized);
        }

        private bool VerifyToken(string token)
        {
            string secret = ConfigurationManager.AppSettings["JwtSecret"];

            try
            {
                IJsonSerializer serializer = new JsonNetSerializer();
                IDateTimeProvider provider = new UtcDateTimeProvider();
                IJwtValidator validator = new JwtValidator(serializer, provider);
                IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
                IJwtDecoder decoder = new JwtDecoder(serializer, validator, urlEncoder);

                var json = decoder.Decode(token, secret, verify: true);

                return true;
            }
            catch (TokenExpiredException)
            {
                //Время жизни токена истекло
                return false;
            }
            catch (SignatureVerificationException)
            {
                //Недопустимая подпись токена
                return false;
            }
        }
    }
}
