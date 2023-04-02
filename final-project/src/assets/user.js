export function User(userId, username, email, password, dateJoined, image, firstName, lastName, userBalance, enrolledCourses) {
    this.UserId = userId;
    this.Username = username;
    this.Email = email;
    this.Password = password;
    this.DateJoined = dateJoined;
    this.Image = image;
    this.FirstName = firstName;
    this.LastName = lastName;
    this.UserBalance = userBalance;
    this.EnrolledCourses = enrolledCourses;
}

/*
example for user

var user1 = new User(1, 'john_doe', 'john_doe@example.com', 'password123', new Date(), 'avatar.jpg', 'John', 'Doe', { UserId: 1, Balance: 100 }, []);
var user2 = new User(2, 'jane_doe', 'jane_doe@example.com', 'password456', new Date(), 'avatar.jpg', 'Jane', 'Doe', { UserId: 2, Balance: 50 }, []);

*/