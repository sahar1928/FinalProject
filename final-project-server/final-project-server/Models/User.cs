using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace final_project_server.Models
{

    public class User
    {

        private int userId;
        private string username;
        private string email;
        private string password;
        private DateTime dateJoined;
        private string image;
        private string firstName;
        private string lastName;
        private UserBalance userBalance;
        private List<Course> enrolledCourses;

        public User() { }

        public User(int userId, string username, string email, string password, DateTime dateJoined, string image, string firstName, string lastName, UserBalance userBalance, List<Course> enrolledCourses)
        {
            this.UserId = userId;
            this.Username = username;
            this.Email = email;
            this.Password = password;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Image = image;
            this.DateJoined = dateJoined;
            this.UserBalance = userBalance;
           this.EnrolledCourses = enrolledCourses;
        }

        public int UserId { get => userId; set => userId = value; }
        public string Username { get => username; set => username = value; }
        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public DateTime DateJoined { get => dateJoined; set => dateJoined = value; }
        public string Image { get => image; set => image = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public UserBalance UserBalance { get => userBalance; set => userBalance = value; }
        public List<Course> EnrolledCourses { get => enrolledCourses; set => enrolledCourses = value; }
    }
}