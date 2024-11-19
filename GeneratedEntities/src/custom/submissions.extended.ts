import { RegisterClass } from "@memberjunction/global";
import { SubmissionEntity } from "../generated/entity_subclasses";
import { BaseEntity, ValidationResult } from "@memberjunction/core";

@RegisterClass(BaseEntity, "Submissions")
export class SubmissionEntityExtended extends SubmissionEntity {
    override Validate(): ValidationResult {
        console.log('fancy validation here')
        return super.Validate();
    }
}