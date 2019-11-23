# Plan.G server

## Purpose

This project meant for 204321 and 204361 class.

## What it's about

This project is for CS students to track their grade and immediatly contact adisor when they (feel like they) about to got retired.

## Member

- Juthaporn Simmalee 600510537 Documentation
- Patteera Thisri 600510566 Documentation
- Phumdol Lookthipnapha 600510569 Full-stack
- Poomrapee Chaiprasop 600510570 Frontend

## Tech Stack

<https://stackshare.io/beam41/y3-project>

## How to start the server

1. (First time only) Type `npm install` in bash or cmd to install node module used in project

2. if .env not exits create it included these setting

   ```
   PORT = [any port you like]
   SECRET = [Secret use by JWT to generate their token]
   TIMEOUT = [JWT token timeout]
   DB = [Name of db file]
   REGURL = [The url to reg api server]
   ```

3. Start the server with `npm start`

4. If main.db not exist it will auto generate

   4.1 to populate the database with **dummy** api start dummy server first with `npm run start:dummy` then in `.env` use `http://localhost:9999/` in `REGURL`

   4.2 To populate the database with **real** api just type api path in `REGURL` the api should have HTTP method `GET` and

   ```
   '/users' path should send body like this:
      [
         {
            "type": string ("adv" or "std"),
            "ID": string,
            "name": string,
            "surname": string,
            "password": string,
         }
      ]
   '/plans' path should send body like this:
      [
         {
            ID: string (student ID),
            plans: [
               {
                  CourseID: string,
                  Year: number,
                  Term: number (1 2 or 3),
                  Grade: string (uppercase like "B+"),
               }
            ]
         }
      ]
   '/courses' path should send body like this:
      [
         {
            "CourseID": string,
            "CourseName": string,
            "CourseCredit": number
         }
      ]
   ```

   4.3 open something that can fire HTTP request like [Postman](https://www.getpostman.com/) and fire `POST` method to

   ```
   {server} = server url

   {server}/request/courses

   {server}/request/users

   {server}/request/plans
   ```

5. The server is now ready to use at the `PORT` you choose

### Note

_This file is for distribution and not included source code_

For the source code please visit [here](https://github.com/beam41/204321-204361-Project-Server).

For the front end source code please visit [here](https://github.com/khunpoom/204321-204361-Project-Client)
