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

        [HttpPost]
        [Route("api/courses/delete")]
        public IHttpActionResult GetRefund(Course course)
        {
            User newUser = course.EnrolledUsers[0];
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                if (DateTime.UtcNow.Subtract(course.EnrollmentDate).TotalHours > 1)
                {
                    return BadRequest("time passed");
                }

                var insertQuery = "DELETE FROM  Enrollment WHERE UserId = @UserId AND CourseId = @CourseId";
                using (var insertCommand = new SqlCommand(insertQuery, conn))
                {
                    insertCommand.Parameters.AddWithValue("@UserId", newUser.UserId);
                    insertCommand.Parameters.AddWithValue("@CourseId", course.CourseId);
                    insertCommand.ExecuteNonQuery();
                }

                var updateQuery = "UPDATE UserBalance SET Balance = Balance + @Price WHERE UserId = @UserId";
                using (var updateCommand = new SqlCommand(updateQuery, conn))
                {
                    updateCommand.Parameters.AddWithValue("@UserId", course.EnrolledUsers[0].UserId);
                    updateCommand.Parameters.AddWithValue("@Price", course.Price);
                    updateCommand.ExecuteNonQuery();
                }
                return Ok(course.Price);
            }
        }
    }
}