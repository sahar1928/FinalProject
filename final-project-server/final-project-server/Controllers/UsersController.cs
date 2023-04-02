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
    public class UsersController : ApiController
    {
        private readonly string _connectionString;

        public UsersController()
        {
            _connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;
        }

        [HttpGet]
        [Route("api/users/{username}/{password}")]
        public IHttpActionResult Authenticate(string username, string password)
        {
            User user = null;
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var query = "SELECT * FROM Users WHERE Username = @Username AND Password = @Password";
                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Username", username);
                    command.Parameters.AddWithValue("@Password", password);

                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            user = new User
                            {
                                UserId = reader.GetInt32(0),
                                Username = reader.GetString(1),
                                Email = reader.GetString(2),
                                Password = reader.GetString(3),
                                FirstName = reader.GetString(4),
                                LastName = reader.GetString(5), 
                                Image = reader.GetString(6),
                                DateJoined = reader.GetDateTime(7),
                                UserBalance = new UserBalance (),
                                EnrolledCourses = new List<Course>()
                            };
                        }
                        else
                        {
                            return Unauthorized();
                        }
                    }
                }

                // Get user's balance
                query = "SELECT Balance FROM UserBalance WHERE UserId = @UserId";
                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@UserId", user.UserId);
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            user.UserBalance.Balance = reader.GetDecimal(0);
                            user.UserBalance.UserId = user.UserId;
                        }
                        else
                        {                    
                            user.UserBalance = new UserBalance { UserId = user.UserId, Balance = 0 };
                        }
                    }
                }

                // Get courses the user is enrolled in
                query = "SELECT c.CourseId, c.CategoryId, c.CourseName, c.Price, c.TotalTimeInHours FROM Enrollment e JOIN Courses c ON e.CourseId = c.CourseId WHERE e.UserId = @UserId";
                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@UserId", user.UserId);
                    using (var reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var course = new Course
                            {
                                CourseId = reader.GetInt32(0),
                                CategoryId = reader.GetInt32(1),
                                CourseName = reader.GetString(2),
                                Price = reader.GetDecimal(3),
                                TotalTimeInHours = reader.GetInt32(4),
                                EnrolledUsers = new List<User>()
                            };
                            user.EnrolledCourses.Add(course);
                        }
                    }
                }
            }

            return Ok(user);
        }

        [HttpPost]
        public IHttpActionResult Register(User user)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                // Check if username already exists
                var query = "SELECT COUNT(*) FROM Users WHERE Username = @Username";
                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Username", user.Username);
                    var count = (int)command.ExecuteScalar();
                    if (count > 0)
                    {
                        return Conflict();
                    }
                }

                // Insert new user
                query = "INSERT INTO Users (Username, Email, Password, FirstName, LastName, Image, DateJoined) VALUES (@Username, @Email, @Password, @FirstName, @LastName, @Image, @DateJoined); SELECT CAST(SCOPE_IDENTITY() AS INT)";
                int newUserId;
                SqlDataReader myReader;

                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Username", user.Username);
                    command.Parameters.AddWithValue("@Email", user.Email);
                    command.Parameters.AddWithValue("@Password", user.Password);
                    command.Parameters.AddWithValue("@FirstName", user.FirstName);
                    command.Parameters.AddWithValue("@LastName", user.LastName);
                    command.Parameters.AddWithValue("@Image", user.Image);
                    command.Parameters.AddWithValue("@DateJoined", user.DateJoined);
                    myReader = command.ExecuteReader();
                    myReader.Close();
                }

                query = @" SELECT MAX(UserId) FROM dbo.Users";
                SqlCommand myCommand = new SqlCommand(query, connection);
                newUserId = Convert.ToInt32(myCommand.ExecuteScalar());

                // Retrieve new user from database
                query = "SELECT * FROM Users WHERE UserId = @UserId";
                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@UserId", newUserId);
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            var newUser = new User
                            {
                                UserId = reader.GetInt32(0),
                                Username = reader.GetString(1),
                                Email = reader.GetString(2),
                                Password = reader.GetString(3),
                                FirstName = reader.GetString(4),
                                LastName = reader.GetString(5), 
                                Image = reader.GetString(6),
                                DateJoined = reader.GetDateTime(7),
                                UserBalance = new UserBalance { UserId = newUserId, Balance = 0 },
                                EnrolledCourses = new List<Course>()
                            };
                            return Ok(newUser);
                        }
                    }
                }
            }

            return InternalServerError();
        }

        [HttpGet]
        public IHttpActionResult GetUserBalance(int id)
        {
            int balance = 0;
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var query = "SELECT Balance FROM UserBalance WHERE UserId = @UserId";
                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@UserId", id);
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            balance = reader.GetInt32(0);
                        }
                        else
                        {
                            return NotFound();
                        }
                    }
                }
            }
            return Ok(balance);
        }

        [HttpPost]
        [Route("api/users/addFunds")]
        public IHttpActionResult AddFundsToUser(UserBalance user )
        {
            decimal amount = user.Balance;

            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var query = "IF EXISTS (SELECT 1 FROM UserBalance WHERE UserId = @UserId)" +
                            "  UPDATE UserBalance SET Balance = Balance + @Amount WHERE UserId = @UserId" +
                            " ELSE" +
                            "  INSERT INTO UserBalance (UserId, Balance) VALUES (@UserId, @Amount)";
                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@UserId", user.UserId);
                    command.Parameters.AddWithValue("@Amount", amount);
                    command.ExecuteNonQuery();
                }
            }
            return Ok(amount);
        }

        [HttpPut]
        [Route("api/users/{userId}")]
        public IHttpActionResult UpdateUser(int userId, [FromBody] User user)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                var query = "UPDATE Users SET FirstName = @FirstName, LastName = @LastName, Email = @Email WHERE UserId = @UserId";
                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@UserId", userId);
                    command.Parameters.AddWithValue("@FirstName", user.FirstName);
                    command.Parameters.AddWithValue("@LastName", user.LastName);
                    command.Parameters.AddWithValue("@Email", user.Email);
                    command.ExecuteNonQuery();
                }
            }
            return Ok();
        }



        [HttpPost]
        [Route("api/users/checkout")]
        public IHttpActionResult Purchace([FromBody] Checkout checkout)
        {
            decimal balance = 0;
            decimal price = 0;
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                // Check if user is already enrolled in the course
                var enrollmentQuery = "SELECT EnrollmentId FROM Enrollment WHERE UserId = @UserId AND CourseId = @CourseId";
                using (var enrollmentCommand = new SqlCommand(enrollmentQuery, connection))
                {
                    enrollmentCommand.Parameters.AddWithValue("@UserId", checkout.UserId);
                    enrollmentCommand.Parameters.AddWithValue("@CourseId", checkout.CourseId);
                    using (var enrollmentReader = enrollmentCommand.ExecuteReader())
                    {
                        if (enrollmentReader.Read())
                        {
                            return BadRequest("User is already enrolled in this course");
                        }
                    }
                }

                // Check user balance
                var balanceQuery = "SELECT Balance FROM UserBalance WHERE UserId = @UserId";
                using (var balanceCommand = new SqlCommand(balanceQuery, connection))
                {
                    balanceCommand.Parameters.AddWithValue("@UserId", checkout.UserId);
                    using (var balanceReader = balanceCommand.ExecuteReader())
                    {
                        if (balanceReader.Read())
                        {
                            balance = balanceReader.GetDecimal(0);
                        }
                        else
                        {
                            return BadRequest("User not found");
                        }
                    }
                }

                var priceQuery = "SELECT Price FROM Courses WHERE CourseId = @CourseId";
                using (var priceCommand = new SqlCommand(priceQuery, connection))
                {
                    priceCommand.Parameters.AddWithValue("@CourseId", checkout.CourseId);
                    using (var priceReader = priceCommand.ExecuteReader())
                    {
                        if (priceReader.Read())
                        {
                            price = priceReader.GetDecimal(0);
                        }
                        else
                        {
                            return NotFound();
                        }
                    }
                }

                if (balance < price)
                {
                    return BadRequest("Insufficient balance");
                }

                var updateQuery = "UPDATE UserBalance SET Balance = Balance - @Price WHERE UserId = @UserId";
                using (var updateCommand = new SqlCommand(updateQuery, connection))
                {
                    updateCommand.Parameters.AddWithValue("@UserId", checkout.UserId);
                    updateCommand.Parameters.AddWithValue("@Price", price);
                    updateCommand.ExecuteNonQuery();
                }

                var insertQuery = "INSERT INTO Enrollment (UserId, CourseId) VALUES (@UserId, @CourseId)";
                using (var insertCommand = new SqlCommand(insertQuery, connection))
                {
                    insertCommand.Parameters.AddWithValue("@UserId", checkout.UserId);
                    insertCommand.Parameters.AddWithValue("@CourseId", checkout.CourseId);
                    insertCommand.ExecuteNonQuery();
                }
            }

            return Ok("Payment successful");
        }


        [HttpGet]
        [Route("api/users/{userId}/courses")]
        public IEnumerable<Course> GetEnrolledCourses(int userId)
        {
            var courses = new List<Course>();

            using (var connection = new SqlConnection(_connectionString))
            using (var command = new SqlCommand(@"SELECT c.CourseId, c.CourseName, c.Price, c.TotalTimeInHours, e.EnrollmentDate, COUNT(e.CourseId) AS EnrolledCount, c.CategoryId
                                            FROM Courses c
                                            INNER JOIN Enrollment e ON c.CourseId = e.CourseId
                                            WHERE e.UserId = @userId
                                            GROUP BY c.CourseId, c.CourseName, c.Price, c.TotalTimeInHours, e.EnrollmentDate, c.CategoryId", connection))
            {
                command.Parameters.AddWithValue("userId", userId);

                connection.Open();

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var courseId = reader.GetInt32(0);
                        var courseName = reader.GetString(1);
                        var price = reader.GetDecimal(2);
                        var totalTimeInHours = reader.GetInt32(3);
                        var enrollmentDate = reader.GetDateTime(4);
                        var enrolledCount = reader.GetInt32(5);
                        var categoryId = reader.GetInt32(6);

                        var course = new Course
                        {
                            CourseId = courseId,
                            CategoryId = categoryId,
                            CourseName = courseName,
                            Price = price,
                            TotalTimeInHours = totalTimeInHours,
                            EnrolledUsers = new List<User>(),
                        };
                        course.EnrolledCount = enrolledCount;
                        course.EnrollmentDate = enrollmentDate;

                        if (DateTime.UtcNow.Subtract(enrollmentDate).TotalHours <= 1)
                        {
                            course.IsCancelable = true;
                        }
                        else
                        {
                            course.IsCancelable = false;
                        }

                        courses.Add(course);
                    }
                }
            }

            return courses;
        }



    }
}



