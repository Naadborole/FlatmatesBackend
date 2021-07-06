class Post {
    constructor(firstname, lastname, gender, vacancy, city, addressline1, profession, ImgUrl = [], description, rent, uid, pid)
    {
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.vacancy = vacancy;
        this.city = city;
        this.addressline1 = addressline1;
        this.profession = profession;
        this.description = description;
        this.rent = rent;
        this.uid = uid;
        this.pid = pid;
        this.ImgUrl = ImgUrl;
    }
    // constructor(id, firstName, lastName, fatherName, classEnrolled,
    //     age, phoneNumber, subject, year, semester, status ) {
    //         this.id = id;
    //         this.firstName = firstName;
    //         this.lastName = lastName;
    //         this.fatherName = fatherName;
    //         this.classEnrolled = classEnrolled;
    //         this.age = age;
    //         this.phoneNumber = phoneNumber;
    //         this.subject = subject;
    //         this.year = year;
    //         this.semester = semester;
    //         this.status = status;
    // }
}

module.exports = Post;