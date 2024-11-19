-- Create schema
CREATE SCHEMA abstracts;
GO
 
-- SubmissionType table
CREATE TABLE abstracts.SubmissionType (
    ID UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    Name NVARCHAR(100) NOT NULL,
    ParentID UNIQUEIDENTIFIER NULL,
    Type NVARCHAR(20) NOT NULL CHECK (Type IN ('Event', 'Publication', 'Other')),
	SubmissionDeadline DATETIME NULL,
    Description NVARCHAR(max) NULL
);

-- Foreign Key Constraint for ParentID
ALTER TABLE abstracts.SubmissionType
ADD CONSTRAINT FK_SubmissionType_ParentID FOREIGN KEY (ParentID)
REFERENCES abstracts.SubmissionType(ID);

-- Extended properties
EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Types of submissions, can be hierarchical using ParentID.', 
    @level0type = N'SCHEMA', @level0name = N'abstracts',
    @level1type = N'TABLE',  @level1name = N'SubmissionType';

EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Name of the submission type.', 
    @level0type = N'SCHEMA', @level0name = N'abstracts',
    @level1type = N'TABLE',  @level1name = N'SubmissionType',
    @level2type = N'COLUMN', @level2name = N'Name';

EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Optional, date a submission is due by', 
    @level0type = N'SCHEMA', @level0name = N'abstracts',
    @level1type = N'TABLE',  @level1name = N'SubmissionType',
    @level2type = N'COLUMN', @level2name = N'SubmissionDeadline';


EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Description of the submission type.', 
    @level0type = N'SCHEMA', @level0name = N'abstracts',
    @level1type = N'TABLE',  @level1name = N'SubmissionType',
    @level2type = N'COLUMN', @level2name = N'Description';

-- Submission table
CREATE TABLE abstracts.Submission (
    ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	SubmittedAt DATETIME NOT NULL DEFAULT (GETDATE()),
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX) NULL,
	Contents NVARCHAR(MAX) NULL,
    SubmissionTypeID UNIQUEIDENTIFIER NOT NULL,
    Status NVARCHAR(50) NOT NULL
);

-- Foreign Key Constraint for SubmissionTypeID
ALTER TABLE abstracts.Submission
ADD CONSTRAINT FK_Submission_SubmissionType FOREIGN KEY (SubmissionTypeID)
REFERENCES abstracts.SubmissionType(ID);

-- Extended properties
EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Table to store submission details.', 
    @level0type = N'SCHEMA', @level0name = N'abstracts',
    @level1type = N'TABLE',  @level1name = N'Submission';

EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Title of the submission.', 
    @level0type = N'SCHEMA', @level0name = N'abstracts',
    @level1type = N'TABLE',  @level1name = N'Submission',
    @level2type = N'COLUMN', @level2name = N'Title';

-- Person table
CREATE TABLE abstracts.Person (
    ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) NOT NULL
);

-- Extended properties
EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Table to store information about individuals.', 
    @level0type = N'SCHEMA', @level0name = N'abstracts',
    @level1type = N'TABLE',  @level1name = N'Person';

-- SubmissionRole table
CREATE TABLE abstracts.SubmissionRole (
    ID UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    Name NVARCHAR(100) NOT NULL,
	SubmissionTypeID UNIQUEIDENTIFIER NULL,
    Description NVARCHAR(255) NULL
);

-- Foreign Key Constraint for SubmissionTypeID
ALTER TABLE abstracts.SubmissionRole
ADD CONSTRAINT FK_SubmissionRole_SubmissionTypeID FOREIGN KEY (SubmissionTypeID)
REFERENCES abstracts.SubmissionType(ID);


-- Extended properties
EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Roles associated with submission-person relationships.', 
    @level0type = N'SCHEMA', @level0name = N'abstracts',
    @level1type = N'TABLE',  @level1name = N'SubmissionRole';

-- SubmissionPerson table
CREATE TABLE abstracts.SubmissionPerson (
    ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    SubmissionID INT NOT NULL,
    PersonID INT NOT NULL,
    RoleID UNIQUEIDENTIFIER NOT NULL
);

-- Foreign Key Constraints for SubmissionPerson
ALTER TABLE abstracts.SubmissionPerson
ADD CONSTRAINT FK_SubmissionPerson_Submission FOREIGN KEY (SubmissionID)
REFERENCES abstracts.Submission(ID);

ALTER TABLE abstracts.SubmissionPerson
ADD CONSTRAINT FK_SubmissionPerson_Person FOREIGN KEY (PersonID)
REFERENCES abstracts.Person(ID);

ALTER TABLE abstracts.SubmissionPerson
ADD CONSTRAINT FK_SubmissionPerson_SubmissionRole FOREIGN KEY (RoleID)
REFERENCES abstracts.SubmissionRole(ID);

-- ReviewerRole table
CREATE TABLE abstracts.ReviewerRole (
    ID UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    Name NVARCHAR(100) NOT NULL,
	SubmissionTypeID UNIQUEIDENTIFIER NULL,
    Description NVARCHAR(255) NULL
);

-- Foreign Key Constraint for SubmissionTypeID
ALTER TABLE abstracts.ReviewerRole
ADD CONSTRAINT FK_ReviewerRole_SubmissionTypeID FOREIGN KEY (SubmissionTypeID)
REFERENCES abstracts.SubmissionType(ID);


-- Extended properties
EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Roles associated with reviewer assignments.', 
    @level0type = N'SCHEMA', @level0name = N'abstracts',
    @level1type = N'TABLE',  @level1name = N'ReviewerRole';

-- Review table
CREATE TABLE abstracts.Review (
    ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	AssignedAt DATETIME NOT NULL DEFAULT (GETDATE()),
    SubmissionID INT NOT NULL,
    ReviewerID INT NOT NULL,
    RoleID UNIQUEIDENTIFIER NOT NULL,
    Score INT NULL  CHECK (Score >= 0 AND Score <= 100),
    Status NVARCHAR(50) NOT NULL CHECK (Status IN ('Pending', 'Approved', 'Rejected', 'Undecided')),
	ReviewedAt DATETIME NULL,
    Comments NVARCHAR(MAX) NULL
);

-- Foreign Key Constraints for Review
ALTER TABLE abstracts.Review
ADD CONSTRAINT FK_Review_Submission FOREIGN KEY (SubmissionID)
REFERENCES abstracts.Submission(ID);

ALTER TABLE abstracts.Review
ADD CONSTRAINT FK_Review_Person FOREIGN KEY (ReviewerID)
REFERENCES abstracts.Person(ID);

ALTER TABLE abstracts.Review
ADD CONSTRAINT FK_Review_ReviewerRole FOREIGN KEY (RoleID)
REFERENCES abstracts.ReviewerRole(ID);

-- Extended properties
EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Table for storing reviews of submissions.', 
    @level0type = N'SCHEMA', @level0name = N'abstracts',
    @level1type = N'TABLE',  @level1name = N'Review';
GO
