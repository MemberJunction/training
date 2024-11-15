# Frequently Asked Questions (FAQ)

## General Questions

### **What is the purpose of this training?**
This training is designed to introduce developers to the MemberJunction platform while building a practical, real-world application: an abstract submission system. Participants will learn key concepts, including metadata-driven schema design, BaseEntity classes, and integrating MemberJunction with Angular.

---

### **Who is this training for?**
This training is for developers familiar with basic programming concepts and relational databases who want to learn how to build scalable applications using the MemberJunction platform.

---

### **What is the Abstract Submission Application?**
The Abstract Submission Application is a sample project designed to handle the submission and review process for professional associations, conferences, or publications. It showcases MemberJunction's ability to simplify and streamline development.

---

## Installation and Setup

### **What are the prerequisites for this training?**
- A PC with administrator privileges.
- [Microsoft SQL Server 2022 Developer Edition](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) installed.
- The latest release of MemberJunction downloaded and installed from [MemberJunction.org](https://docs.memberjunction.org).

---

### **What do I need to install to follow the training?**
You will need to install:
1. Microsoft SQL Server 2022 Developer Edition.
2. MemberJunction platform.
3. Node.js and npm for the Angular frontend.
4. An IDE or text editor, such as Visual Studio Code, for editing code.

---

### **What if I encounter issues during installation?**
Common installation issues and their solutions are documented in the [installation_guide.md](installation_guide.md) file. If problems persist, reach out to the training facilitator for support.

---

## MemberJunction Platform

### **What is MemberJunction?**
MemberJunction is a metadata-driven Common Data Platform (CDP) that simplifies the development of applications by automating many aspects of the data layer and API generation. It supports relational data management and integrates seamlessly with modern frameworks like Angular.

---

### **What is a BaseEntity in MemberJunction?**
A BaseEntity is a core concept in MemberJunction that represents strongly typed classes generated from your schema. These classes simplify CRUD operations, handle metadata, and abstract complexities such as GraphQL queries.

---

### **Do I need to know GraphQL for this training?**
No. MemberJunction automates GraphQL query and mutation generation through the BaseEntity architecture. While you’ll gain a high-level understanding of GraphQL's role in MemberJunction, you won’t need to write GraphQL directly.

---

## Abstract Submission Application

### **What entities are included in the Abstract Submission Application?**
The key entities are:
- **Submission**: Represents an abstract or submission.
- **Person**: Represents individuals linked to submissions or reviews.
- **SubmissionType**: Categorizes submissions (e.g., Event, Publication).
- **SubmissionRole**: Defines roles for submitters (e.g., Author, Speaker).
- **ReviewerRole**: Defines roles for reviewers (e.g., Primary Reviewer).
- **Review**: Tracks scores and comments from reviewers.

---

### **How can I extend this application after the training?**
The Abstract Submission Application is designed to be extensible. Future enhancements could include:
- Adding analytics dashboards.
- Integrating external systems for scheduling or publication.
- Implementing user-specific workflows or advanced metadata.

---

## Angular Frontend

### **What version of Angular are we using?**
We are using the latest stable release of Angular at the time of the training. Please ensure you have Node.js and npm installed to set up the Angular environment.

---

### **What are Angular Elements?**
Angular Elements allow you to package Angular components as web components. These can be embedded in any HTML or CMS platform, enabling modular and reusable designs.

---

### **How do we test the Angular frontend?**
The Angular frontend can be tested using:
1. Unit tests for individual components and services.
2. Manual testing through the development server (e.g., `ng serve`).
3. Integration tests using tools like Cypress or Protractor (not covered in this training).

---

## Deployment and Testing

### **Where will we deploy the application?**
For this training, the application will be deployed locally or on a test server. Deployment to production systems is beyond the scope of this session but follows similar principles.

---

### **What testing strategies will we use?**
We’ll focus on functional and integration testing during the training, ensuring that both the frontend and backend components work as expected.

---

### **What should I do if I encounter bugs?**
- Check for error messages in the browser console or server logs.
- Refer to the [troubleshooting section](troubleshooting.md) of the documentation.
- Reach out to the training facilitator if you need further assistance.

---

## Additional Questions

### **Can I use this application as a base for other projects?**
Yes! The Abstract Submission Application is an excellent starting point for building other submission or review systems. You can extend the schema, frontend, and workflows as needed.

---

### **Where can I find additional resources?**
- [MemberJunction Documentation](https://docs.memberjunction.org)
- [Microsoft SQL Server Documentation](https://docs.microsoft.com/en-us/sql/sql-server/)
- [Angular Documentation](https://angular.io/docs)

If you have further questions, feel free to contact [Your Name/Team] at [Your Contact Info].
