using System.Configuration;
using MySql.Data.MySqlClient;

namespace AuthServe
{
    public class Database
    {

        public readonly MySqlConnection Db = new MySqlConnection(ConfigurationManager
            .ConnectionStrings["AuthServer.Properties.Settings.DatabaseConnectionString"].ConnectionString);

        public void OpenDatabase()
        {
            if (Db.State == System.Data.ConnectionState.Closed)
            {
                Db.Open();
            }

        }

        public void CloseDatabase()
        {
            if (Db.State == System.Data.ConnectionState.Open)
            {
                Db.Close();
            }

        }
    }
}
