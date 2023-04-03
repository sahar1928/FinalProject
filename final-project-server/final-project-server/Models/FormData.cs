using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace final_project_server.Models
{
    public class FormData
    {
        private string name;
        private string email;
        private string message;

        public string Name { get => name; set => name = value; }
        public string Email { get => email; set => email = value; }
        public string Message { get => message; set => message = value; }
    }
}