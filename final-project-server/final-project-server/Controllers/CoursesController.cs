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
    public class CoursesController : ApiController
    {
        private readonly string _connectionString;
        public CoursesController()
        {
            _connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
        }

        [HttpGet]
        [Route("api/courses/{categoryId}")]
        public IEnumerable<Course> GetCoursesByCategoryId(int categoryId)
        {
            var courses = new List<Course>();
            var sql = "SELECT CourseId, CategoryId, CourseName, Price, TotalTimeInHours FROM Courses WHERE CategoryId = @CategoryId";
            using (var conn = new SqlConnection(_connectionString))
            {
                using (var cmd = new SqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("@CategoryId", categoryId);
                    conn.Open();
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            courses.Add(new Course
                            {
                                CourseId = (int)reader["CourseId"],
                                CategoryId = (int)reader["CategoryId"],
                                CourseName = reader["CourseName"].ToString(),
                                Price = (decimal)reader["Price"],
                                TotalTimeInHours = (int)reader["TotalTimeInHours"],
                                EnrolledUsers = new List<User>()
                            });
                        }
                    }
                }
            }
            return courses;
        }

        [HttpGet]
        [Route("api/courses")]
        public IEnumerable<Course> GetCourses()
        {
            var courses = new List<Course>();
            var sql = "SELECT CourseId, CategoryId, CourseName, Price, TotalTimeInHours FROM Courses ";
            using (var conn = new SqlConnection(_connectionString))
            {
                using (var cmd = new SqlCommand(sql, conn))
                {
                    conn.Open();
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            courses.Add(new Course
                            {
                                CourseId = (int)reader["CourseId"],
                                CategoryId = (int)reader["CategoryId"],
                                CourseName = reader["CourseName"].ToString(),
                                Price = (decimal)reader["Price"],
                                TotalTimeInHours = (int)reader["TotalTimeInHours"],
                                EnrolledUsers = new List<User>()
                            });
                        }
                    }
                }
            }
            return courses;
        }

    }
}