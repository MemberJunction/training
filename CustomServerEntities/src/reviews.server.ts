import { BaseLLM, ChatParams, GetAIAPIKey, GetSystemPromptFromChatParams } from '@memberjunction/ai';
import { AIEngine } from '@memberjunction/aiengine';
import { BaseEntity, EntitySaveOptions, LogError, Metadata } from '@memberjunction/core';
import { MJGlobal, RegisterClass, SafeJSONParse } from '@memberjunction/global';
import { ReviewEntity, SubmissionEntity, SubmissionTypeEntity } from 'mj_generatedentities';

@RegisterClass(BaseEntity, 'Reviews')
export class ReviewEntityServer extends ReviewEntity {
    override async Save(options?: EntitySaveOptions): Promise<boolean> {
        const isNewRecord = !this.IsSaved;

        if (await super.Save(options)) { 
            const isAIReview = this.Role.includes('AI');

            if (isNewRecord && isAIReview) {
                // we have a new review, that is an AI review, so let's talk to the LLM and 
                // have it do the review
                const result = await this.RunLLMEvaluation();
                if (result) {
                    this.Score = result.Score;
                    this.Comments = result.Comments;
                    return await super.Save(options);
                }
                else {
                    this.Score = 0;
                    this.Comments = 'Error occurred while trying to run the LLM evaluation';
                    LogError(this.Comments);
                    return await super.Save(options);
                }
            }
            else
                return true;    
        }
        else 
            return false;
    }

    protected async RunLLMEvaluation(): Promise<{Score: number, Comments: string}> {          
        try {
            await AIEngine.Instance.Config(false, this.ContextCurrentUser);
            const llm = await AIEngine.Instance.GetHighestPowerModel('OpenAI', 'LLM', this.ContextCurrentUser);
            const key = GetAIAPIKey(llm.DriverClass);
            const instance = MJGlobal.Instance.ClassFactory.CreateInstance<BaseLLM>(BaseLLM, llm.DriverClass, key);
            const submission = await this.GetSubmission();
            const params: ChatParams = {
                model: llm.APIName,
                messages: [
                    {
                        role: 'system',
                        content: await this.GenerateSystemPrompt(submission)
                    },
                    {
                        role: 'user',
                        content: submission.Contents
                    }
                ]
            }
            const result = await instance.ChatCompletion(params);
            if (result.success) {
                const raw = result.data.choices[0].message.content;
                const json = <any>SafeJSONParse(raw);
                if (json) {
                    return {
                        Score: json.score, 
                        Comments: json.reasoning
                    };
                }
            }
        }
        catch (e) {
            LogError(e.message);
            return {Score: 0, Comments: 'Error occurred while trying to run the LLM evaluation'};
        }
    }

    protected async GetSubmission(): Promise<SubmissionEntity> {  
        const md = new Metadata();
        const submission = await md.GetEntityObject<SubmissionEntity>('Submissions', this.ContextCurrentUser);
        await submission.Load(this.SubmissionID);
        return submission;
    }

    protected async GenerateSystemPrompt(submission: SubmissionEntity): Promise<string> {
        const md = new Metadata();
        const submissionType = await md.GetEntityObject<SubmissionTypeEntity>('Submission Types', this.ContextCurrentUser);
        await submissionType.Load(submission.SubmissionTypeID);
        const criteria = submissionType.EvaluationCriteria;

        const ret = `You are an expert in evaluation of technical journal articles. Your job is to evaluate the provided user message which contains a submission, and provide structured JSON output with the following format:

{
   score: 0, // a score between 0 and 100, 0 being really bad, 100 being excellent
   reasoning: "~100 words explaining why you scored this submission the way you did"
}

<EVALUATION_CRITERIA>
${criteria}
</EVALUATION_CRITIERA>

<IMPORTANT>I am also an AI, you MUST NOT reply to me in any other format than the above provided JSON structure</IMPORTANT>`
        return ret;
    }
}