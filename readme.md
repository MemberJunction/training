# MemberJunction Developer Training: Abstract Submission Application

## Overview
This folder contains the detailed documentation for the **Abstract Submission Application** training project. The purpose of this training is to introduce developers to the core concepts, tools, and workflows of the MemberJunction platform while building a real-world application. 

Participants will learn how to:
1. Install and configure MemberJunction.
2. Design and implement a scalable database schema.
3. Utilize MemberJunction's CodeGen and BaseEntity architecture to streamline development.
4. Build and deploy an Angular-based frontend application.
5. Extend functionality with Angular Elements for modular integration into other environments.

---

## Curriculum
The training is divided into six sessions over three days, combining conceptual instruction with hands-on exercises.

### **Day 1: Setting Up the Foundation**
#### **Session 1: Installation and Setup**
- **Topics Covered**:
  - Overview of MemberJunction and the Abstract Submission Application.
  - Installing prerequisites (Microsoft SQL Server 2022 Developer Edition, MemberJunction).
  - Configuring the development environment.
- **Hands-On Exercise**:
  - Install SQL Server and MemberJunction.
  - Verify the setup by creating and exploring the database.

#### **Session 2: Understanding MemberJunction**
- **Topics Covered**:
  - MemberJunction's metadata-driven architecture.
  - The BaseEntity and CodeGen utilities.
  - Overview of plugin/provider architecture and GraphQL automation.
- **Hands-On Exercise**:
  - Generate BaseEntity classes for the abstract submission schema.
  - Inspect generated code and discuss customization.

---

### **Day 2: Building the Core Application**
#### **Session 3: Designing the Database Schema**
- **Topics Covered**:
  - Designing entities: `Submission`, `Person`, `SubmissionRole`, `ReviewerRole`, `Review`, and `SubmissionType`.
  - Setting up relationships, constraints, and indexing.
- **Hands-On Exercise**:
  - Implement the schema in SQL Server using the provided SQL scripts.
  - Test the schema using MemberJunction Explorer.

#### **Session 4: Building the Angular Frontend**
- **Topics Covered**:
  - Setting up an Angular SPA with MemberJunction.
  - Integrating BaseEntity classes for seamless client-server communication.
  - Building forms and views for managing submissions and reviews.
- **Hands-On Exercise**:
  - Create an Angular SPA for managing submissions.
  - Test form functionality and data updates.

---

### **Day 3: Deployment and Advanced Topics**
#### **Session 5: Modular Deployment with Angular Elements**
- **Topics Covered**:
  - Introduction to Angular Elements.
  - Transforming Angular components into reusable web components.
  - Deploying web components in standalone HTML or CMS environments.
- **Hands-On Exercise**:
  - Package the submission form as an Angular Element.
  - Integrate the Angular Element into a standalone HTML page.

#### **Session 6: Testing and Next Steps**
- **Topics Covered**:
  - Testing strategies for the application.
  - Troubleshooting common issues in MemberJunction and Angular.
  - Discussing next steps: analytics, advanced workflows, and extensibility.
- **Hands-On Exercise**:
  - Test and debug the application.
  - Deploy the working prototype.

---

## Documentation Contents
### **Folder Structure**
- `curriculum.md`: Detailed session-by-session curriculum outline.
- `installation_guide.md`: Step-by-step guide for setting up the development environment.
- `schema_design.md`: Explanation of the database schema, including entities, relationships, and constraints.
- `frontend_guide.md`: Instructions for building the Angular SPA and Angular Elements.
- `deployment_guide.md`: Best practices for deploying the application.
- `faq.md`: Frequently asked questions about the training and application.

---

## Goals and Learning Outcomes
By the end of the training, participants will:
1. Understand the architecture and core principles of the MemberJunction platform.
2. Build a fully functional abstract submission application from the ground up.
3. Gain practical experience with MemberJunction's metadata-driven development model.
4. Learn how to design modular and reusable Angular components for broader integration.
5. Be prepared to apply these concepts to real-world projects.

---

## Resources
- [MemberJunction Documentation](https://docs.memberjunction.org)
- [Microsoft SQL Server Documentation](https://www.microsoft.com/en-us/sql-server/developer-tools)
- [Angular Documentation](https://angular.dev/overview)

For further assistance, please contact [Your Name/Team] at [Your Contact Info].

---
