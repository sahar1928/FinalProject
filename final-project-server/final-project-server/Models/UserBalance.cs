using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace final_project_server.Models
{
    public class UserBalance
    {
        private int userId;
        private decimal balance;

        public UserBalance() { }
        public UserBalance(int userId, decimal balance)
        {
            UserId = userId;
            Balance = balance;
        }

        public int UserId { get => userId; set => userId = value; }
        public decimal Balance { get => balance; set => balance = value; }
    }
}