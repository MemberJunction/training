# Abstract Submission Application

## Overview
The **Abstract Submission Application** is a sample project developed during a MemberJunction developer training session. It demonstrates how to build a sophisticated yet flexible application using the MemberJunction platform, with a focus on creating scalable, metadata-driven systems.

This application is designed to handle abstract submissions for professional associations, conferences, and publications. It supports multiple submitters, complex review processes, and extensible metadata structures, making it a powerful foundation for real-world use cases.

---

## Features
- **Submission Management**: Track abstracts submitted for events, publications, or other purposes.
- **Flexible Submission Types**: Supports a hierarchical structure for submission types (e.g., papers, talks, posters).
- **Multi-Submitter Support**: Link multiple individuals to a single submission with distinct roles (e.g., Principal Investigator, Co-Author).
- **Sophisticated Review Process**: Assign multiple reviewers to submissions, with defined roles and scoring capabilities.
- **Scalable Schema**: Built using the MemberJunction platform, leveraging metadata and strongly typed entities for easy extensibility.

---

## Application Architecture
### **Core Entities**
1. **Submission**: Represents an abstract or other submission. Linked to submission types for flexible categorization.
2. **Person**: Represents individuals associated with submissions or reviews.
3. **SubmissionRole**: Defines roles for individuals linked to a submission (e.g., Speaker, Author).
4. **Review**: Tracks individual reviews, including scores, comments, and reviewer roles.
5. **ReviewerRole**: Defines roles for individuals in the review process (e.g., Primary Reviewer, Secondary Reviewer).
6. **SubmissionType**: Categorizes submissions (e.g., Event, Publication) with support for hierarchical relationships.

### **MemberJunction Integration**
This project uses the MemberJunction platform to:
- Automate CRUD operations via BaseEntity classes.
- Leverage metadata-driven architecture for schema flexibility.
- Simplify client-server communication through strongly typed APIs and provider architecture.

---

## Technology Stack
- **Database**: Microsoft SQL Server 2022 (Developer Edition)
- **Backend**: MemberJunction platform (with MJAPI for API layer)
- **Frontend**: Angular (latest release, SPA and Angular Elements for reusable components)

---

## Installation Instructions
### Prerequisites
1. Install [Microsoft SQL Server 2022 Developer Edition](https://www.microsoft.com/en-us/sql-server/sql-server-downloads).
2. Install the latest MemberJunction release from [MemberJunction.org](https://docs.memberjunction.org).
3. Clone this repository to your local machine.

### Steps
1. Set up the database schema:
   ```bash
   Run the SQL scripts in the `database` folder to create the necessary tables and constraints.
