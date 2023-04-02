using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace final_project_server.Models
{
    public class CourseTeacher
    {

        private int teacherId;
        private int courseId;
        private string teacherName;


        public CourseTeacher(int teacherId, int courseId, string teacherName)
        {
            this.teacherId = teacherId;
            this.courseId = courseId;
            this.teacherName = teacherName;

        }

        public int TeacherId { get => teacherId; set => teacherId = value; }
        public int CourseId { get => courseId; set => courseId = value; }
        public string TeacherName { get => teacherName; set => teacherName = value; }
    }
}