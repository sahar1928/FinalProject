using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace final_project_server.Models
{
	public class Enrollment
	{

        private int enrollmentId;
        private int userId;
        private int courseId;
        private Course course;
        private DateTime enrollmentDate;

        public Enrollment() { }

        public Enrollment(int enrollmentId, int userId, int courseId, Course course, DateTime enrollmentDate)
        {
            this.enrollmentId = enrollmentId;
            this.userId = userId;
            this.courseId = courseId;
            this.course = course;
            this.enrollmentDate = enrollmentDate;
        }

        public int EnrollmentId { get => enrollmentId; set => enrollmentId = value; }
        public int UserId { get => userId; set => userId = value; }
        public int CourseId { get => courseId; set => courseId = value; }
        public Course Course { get => course; set => course = value; }
        public DateTime EnrollmentDate { get => enrollmentDate; set => enrollmentDate = value; }
    }
}