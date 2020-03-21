using Dapper;

namespace AuthServe.Models
{
    [Table("Users")]
    public class User
    {
        public int id { get; set; }
        public string login { get; set; }
        public string password { get; set; }
        public string name { get; set; }

    }
}
