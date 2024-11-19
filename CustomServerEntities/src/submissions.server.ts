import { BaseEntity, EntitySaveOptions, Metadata } from '@memberjunction/core';
import { RegisterClass } from '@memberjunction/global';
import { ReviewEntity, SubmissionEntity, SubmissionEntityExtended } from 'mj_generatedentities';

@RegisterClass(BaseEntity, 'Submissions')
export class SubmissionEntityServer extends SubmissionEntityExtended {
    override async Save(options?: EntitySaveOptions): Promise<boolean> {
        const isNewRecord = !this.IsSaved;
        if (await super.Save(options)) {
            if (isNewRecord) {
                // now, we will create a new Review becuase we have a new submission
                const md = new Metadata();
                const review = await md.GetEntityObject<ReviewEntity>("Reviews", this.ContextCurrentUser);
                review.ReviewerID = 1;
                review.SubmissionID = this.ID;
                review.RoleID = '06F3D7D9-7062-4CCB-8AFA-9EEE3E08E56D';
                review.Status = 'Pending';
                if (!await review.Save(options)) {
                    return false;
                }
            }
            return true;
        }
    }
}