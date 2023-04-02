using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace final_project_server.Models
{
    public class Category
    {
        private int categoryId;
        private string categoryName;
        private int coursesCount;

        public Category(int categoryId, string categoryName)
        {
            this.CategoryId = categoryId;
            this.CategoryName = categoryName;
        }

        public int CategoryId { get => categoryId; set => categoryId = value; }
        public string CategoryName { get => categoryName; set => categoryName = value; }
        public int CoursesCount { get => coursesCount; set => coursesCount = value; }
    }
}