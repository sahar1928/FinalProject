using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace final_project_server.Models
{
    public class Course
    {
        private int courseId;
        private int categoryId;
        private string courseName;
        private decimal price;
        private int totalTimeInHours;
        private List<User> enrolledUsers;
        private int enrolledCount;
        private bool isCancelable;
        private DateTime enrollmentDate;

        public Course() { }

        public Course(int courseId, int categoryId, string courseName, decimal price, int totalTimeInHours, Category category, List<User> enrolledUsers)
        {
            this.CourseId = courseId;
            this.CategoryId = categoryId;
            this.CourseName = courseName;
            this.Price = price;
            this.TotalTimeInHours = totalTimeInHours;
            this.EnrolledUsers = enrolledUsers;
        }

        public int CourseId { get => courseId; set => courseId = value; }
        public int CategoryId { get => categoryId; set => categoryId = value; }
        public string CourseName { get => courseName; set => courseName = value; }
        public decimal Price { get => price; set => price = value; }
        public int TotalTimeInHours { get => totalTimeInHours; set => totalTimeInHours = value; }
        public List<User> EnrolledUsers { get => enrolledUsers; set => enrolledUsers = value; }
        public int EnrolledCount { get => enrolledCount; set => enrolledCount = value; }
        public bool IsCancelable { get => isCancelable; set => isCancelable = value; }
        public DateTime EnrollmentDate { get => enrollmentDate; set => enrollmentDate = value; }
    }
}