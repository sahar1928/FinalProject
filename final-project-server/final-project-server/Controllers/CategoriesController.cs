using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using final_project_server.Models;

namespace final_project_server.Controllers
{
    public class CategoriesController : ApiController
    {
        private readonly string _connectionString;
        public CategoriesController()
        {
            _connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
        }

        [HttpGet]
        [Route("api/categories")]
        public IEnumerable<Category> GetCategories()
        {
            var categories = new List<Category>();

            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand(@"SELECT c.CategoryId, c.CategoryName, COUNT(*) AS CoursesCount
                                            FROM Categories c
                                            INNER JOIN Courses cr ON c.CategoryId = cr.CategoryId
                                            GROUP BY c.CategoryId, c.CategoryName", connection))
            {
                connection.Open();

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var categoryId = reader.GetInt32(0);
                        var categoryName = reader.GetString(1);
                        var coursesCount = reader.GetInt32(2);

                        var category = new Category(categoryId, categoryName)
                        {
                            CategoryId = categoryId,
                            CategoryName = categoryName,
                        };
                        category.CoursesCount = coursesCount;

                        categories.Add(category);
                    }
                }
            }

            return categories;
        }

    }
}