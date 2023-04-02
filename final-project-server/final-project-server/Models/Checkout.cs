using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace final_project_server.Models
{
    public class Checkout
    {
        private int userId;
        private int courseId;

        public Checkout(int userId, int courseId)
        {
            this.UserId = userId;
            this.CourseId = courseId;
        }

        public int UserId { get => userId; set => userId = value; }
        public int CourseId { get => courseId; set => courseId = value; }
    }
}