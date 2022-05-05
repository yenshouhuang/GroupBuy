# Project Title
## GROUP BŬY - group-buying portal for multi-category products

### Project Summary:
It is inconvenient that people will encounter problems when shopping for a large number of items but they don’t actually need that amount. For example, when shopping at wholesale, the item usually includes the amount for a family to use for weeks or months. However, a student or a DINK family usually only needs half or one-third of the amount for the items. We are creating an application that can help people find the items they would like to buy and share with other families or students, to save more money and make shopping more accessible.

### Description of an application of your choice.
We would like to design a group buying application to help people buy groceries/online merchandise together. When people are buying groceries or anything that has a lot of amounts, people tend to waste it or don’t know how to deal with the extra items that they don’t need. Our application can help people find the item that they need and share it with others who have the same need.

### Usefulness. Explain as clearly as possible why your chosen application is useful.
We believe that our application is useful because many students might encounter several concerns when purchasing various items. For example, some students have budget limitations or the amount of grocery items is too large. Sometimes, there will also be some promotions from the online stores that encourage customers to buy more. Thus, we think our application will benefit students and make their purchasing process easier and their buying experience better.

Pinduoduo, an E-commerce platform with group buying in China, is a similar website out there.

PTT forum - Buy together,  The information of the user who initiates the purchase on the PTT forum platform is not transparent. The other users can not directly enter the group without sending private messages to the group leader. And our application allows users to join the group immediately.

### Realness.  Describe what your data is and where you will get it.

The data is from users’ information and their input.

### Description of the functionality that your website offers.

The data is from users’ information and their input. And the data in the database as described below.

```bash
1.	User
a.	UserId INT;
b.	UserName VARCHAR (255);
c.	Account VARCHAR
d.	Password VARCHAR
e.	Email VARCHAR
f.	PhoneNumber REAL

2.	Product
a.	ProductId INT
b.	ProductName VARCHAR
c.	Price INT
d.	Link VARCHAR
e.	Category VARCHAR

3.	Purchase
a.	PurchaseId INT
b.	UserId INT
c.	ProductId INT

4.	Group
a.	GroupId INT
b.	UserId INT
c.	GroupDescription VARCHAR
d.	ProductId INT
e.	Leader BOOLEAN
```

### What are the basic functions of your web application?

•	Simple:\
Users can post an item and ask people to buy it together\
Then people in the group could split the bill

•	Complex:\
Use Twilio/google login API to generate an Account String Identifier\
Users cannot see the phone number of leaders unless they are in the group

### What would be a good creative component (function) that can improve the functionality of your application?
•	Add more account details.\
•	Have a way for users to upload product images.\
•	Develop a mobile app\
•	Send OTP to change password\
•	Show top 5 popular items\
•	Recommendation system (Machine Learning)\

### A low fidelity UI mockup:

![image](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team005-MRKT/blob/main/image/img1.jpg "img1")

![image](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team005-MRKT/blob/main/image/img2.jpg "img2")

![image](https://github-dev.cs.illinois.edu/sp22-cs411/sp22-cs411-team005-MRKT/blob/main/image/img3.jpg "img3")

### Project work distribution: Who would be responsible for each of the tasks or subtasks?
•	Database: Meg Wu(ccwu3)\
•	Backend: Ken Wu (shwu2), Thomas (yenshuo2)\
•	Frontend: Ray Chang (jtchang2), Ken Wu (shwu2)
