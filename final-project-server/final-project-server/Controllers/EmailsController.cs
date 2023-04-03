using System.Net;
using System.Net.Mail;
using System.Web.Http;
using final_project_server.Models;

namespace final_project_server.Controllers
{
    public class EmailsController : ApiController
    {
        [HttpPost]
        [Route("api/emails/send-email")]
        public IHttpActionResult SendEmail(FormData formData)
        {
            var fromAddress = new MailAddress("xxsaharx@gmail.com", "Sahar");
            var toAddress = new MailAddress("sahar093@gmail.com", "Lidor");
             string fromPassword = "pqqimhtodatkdjmk";
             string subject = "New message from your website";
             string body = $"Name: {formData.Name}\nEmail: {formData.Email}\nMessage: {formData.Message}";

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };
            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                smtp.Send(message);
            }

            return Ok("Email sent successfully");
        }
    }
}