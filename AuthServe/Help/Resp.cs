using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nancy;
using Newtonsoft.Json;

namespace AuthServe.Help
{
    internal static class Resp
    {
        /// <summary>
        ///    Возвращает ответ с HttpStatusCode.OK
        /// </summary>
        public static Nancy.Response OK()
        {
            return new Nancy.Response()
            {
                StatusCode = HttpStatusCode.OK
            };
        }

        /// <summary>
        ///    Возвращает ответ с указанным кодом ошибки
        /// </summary>
        public static Nancy.Response SendResponse(HttpStatusCode statusCode)
        {
            return new Nancy.Response()
            {
                StatusCode = statusCode
            };
        }

        /// <summary>
        ///    Возвращает ответ с HttpStatusCode.OK, типа application/json, в качестве тела запроса принимается массив байт
        /// </summary>
        public static Nancy.Response SendResponse<T>(T obj)
        {
            var myJson = JsonConvert.SerializeObject(obj);
            var jsonBytes = Encoding.UTF8.GetBytes(myJson);

            return new Nancy.Response()
            {
                StatusCode = HttpStatusCode.OK,
                ContentType = "application/json",
                Contents = s => s.Write(jsonBytes, 0, jsonBytes.Length)
            };
        }
    }
}
