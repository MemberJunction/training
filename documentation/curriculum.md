# MemberJunction Developer Training Curriculum

## Overview
This curriculum provides a detailed breakdown of the sessions in the **Abstract Submission Application** training. Each session is designed to build progressively, ensuring participants gain a thorough understanding of MemberJunction and its practical application in building a robust, metadata-driven system.

---

## Day 1: Setting Up the Foundation

### **Session 1: Installation and Setup**
- **Objective**: Equip participants with the tools and environment needed for development.
- **Topics**:
  - Overview of MemberJunction and the Abstract Submission Application.
  - Installation prerequisites:
    - Microsoft SQL Server 2022 Developer Edition.
    - MemberJunction platform.
  - Initial database setup and configuration.
- **Hands-On Exercise**:
  1. Install SQL Server and configure the local environment.
  2. Install MemberJunction and set up the base database.
  3. Verify installations by exploring the database using MemberJunction Explorer.
- **Outcome**: A fully configured development environment.

---

### **Session 2: Understanding MemberJunction**
- **Objective**: Introduce the core concepts of MemberJunction and its automation features.
- **Topics**:
  - MemberJunction architecture:
    - BaseEntity abstraction.
    - Metadata-driven schema design.
    - Plugin/provider architecture.
  - CodeGen utility for generating BaseEntity classes.
  - Overview of GraphQL automation in MemberJunction.
- **Hands-On Exercise**:
  1. Use CodeGen to generate BaseEntity classes for the abstract submission schema.
  2. Inspect generated code and discuss client-server interaction.
  3. Experiment with extending BaseEntity for custom business logic.
- **Outcome**: Participants understand how MemberJunction simplifies development using metadata-driven architecture.

---

## Day 2: Building the Core Application

### **Session 3: Designing the Database Schema**
- **Objective**: Design a scalable schema for the Abstract Submission Application.
- **Topics**:
  - Schema design principles in MemberJunction.
  - Key entities:
    - `Submission`
    - `Person`
    - `SubmissionRole`
    - `ReviewerRole`
    - `Review`
    - `SubmissionType`
  - Relationships, constraints, and indexing.
- **Hands-On Exercise**:
  1. Implement the schema using the provided SQL scripts.
  2. Test the schema by adding sample data in SQL Server.
  3. Explore the schema with MemberJunction Explorer.
- **Outcome**: Participants understand how to design and implement a schema in MemberJunction.

---

### **Session 4: Building the Angular Frontend**
- **Objective**: Develop a frontend application using Angular and MemberJunction.
- **Topics**:
  - Setting up an Angular SPA.
  - Integrating MemberJunction BaseEntity classes with Angular services.
  - Building essential UI components:
    - Submission forms.
    - Submission listing and detail views.
  - Adding validation and workflows.
- **Hands-On Exercise**:
  1. Set up the Angular project.
  2. Build a form for creating and editing submissions.
  3. Implement a listing view for submissions, pulling data from the backend.
  4. Test form submissions and data retrieval.
- **Outcome**: A basic working Angular SPA for managing abstract submissions.

---

## Day 3: Deployment and Advanced Topics

### **Session 5: Modular Deployment with Angular Elements**
- **Objective**: Learn to create modular, reusable components for broader integration.
- **Topics**:
  - Introduction to Angular Elements.
  - Transforming Angular components into web components.
  - Embedding Angular Elements in external systems:
    - CMS platforms.
    - Standalone HTML pages.
- **Hands-On Exercise**:
  1. Convert the submission form into an Angular Element.
  2. Embed the Angular Element into a plain HTML page.
  3. Test the functionality of the embedded component.
- **Outcome**: Participants understand how to create and deploy Angular Elements.

---

### **Session 6: Testing and Next Steps**
- **Objective**: Finalize and deploy the application while discussing future enhancements.
- **Topics**:
  - Testing strategies:
    - Functional testing.
    - Integration testing.
  - Troubleshooting common issues.
  - Extending the application:
    - Adding analytics.
    - Implementing advanced workflows.
  - Deployment strategies:
    - Angular SPA hosting.
    - MemberJunction deployment considerations.
- **Hands-On Exercise**:
  1. Perform functional testing on the Angular SPA and Angular Element.
  2. Deploy the working prototype locally or on a test server.
  3. Discuss future enhancements as a group.
- **Outcome**: A deployed, functional prototype of the Abstract Submission Application.

---

## Learning Objectives
By the end of the training, participants will:
1. Set up and configure MemberJunction for application development.
2. Design and implement scalable database schemas using metadata-driven architecture.
3. Build Angular applications integrated with MemberJunction BaseEntity classes.
4. Develop modular Angular Elements for flexible integration.
5. Deploy, test, and extend applications for real-world use cases.

---

## Resources
- [MemberJunction Documentation](https://docs.memberjunction.org)
- [SQL Server Documentation](https://docs.microsoft.com/en-us/sql/sql-server/)
- [Angular Documentation](https://angular.io/docs)

For additional support, contact [Your Name/Team] at [Your Contact Info].
