'use server';

/**
 * @fileOverview Summarizes patrol footage to highlight key events or anomalies.
 *
 * - summarizePatrolFootage - A function that summarizes patrol footage.
 * - SummarizePatrolFootageInput - The input type for the summarizePatrolFootage function.
 * - SummarizePatrolFootageOutput - The return type for the summarizePatrolFootage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePatrolFootageInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A video of patrol footage, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  routeId: z.string().describe('The ID of the patrol route.'),
  startTime: z.string().describe('The start time of the patrol footage.'),
  endTime: z.string().describe('The end time of the patrol footage.'),
});
export type SummarizePatrolFootageInput = z.infer<typeof SummarizePatrolFootageInputSchema>;

const SummarizePatrolFootageOutputSchema = z.object({
  summary: z.string().describe('A summary of the patrol footage, highlighting key events or anomalies.'),
});
export type SummarizePatrolFootageOutput = z.infer<typeof SummarizePatrolFootageOutputSchema>;

export async function summarizePatrolFootage(input: SummarizePatrolFootageInput): Promise<SummarizePatrolFootageOutput> {
  return summarizePatrolFootageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePatrolFootagePrompt',
  input: {schema: SummarizePatrolFootageInputSchema},
  output: {schema: SummarizePatrolFootageOutputSchema},
  prompt: `You are an AI that summarizes patrol footage from a home surveillance drone.

  The video was recorded between {{startTime}} and {{endTime}} on route {{routeId}}.

  Provide a summary of the video, highlighting any key events or anomalies detected during the patrol. Be concise.

  Video: {{media url=videoDataUri}}`,
});

const summarizePatrolFootageFlow = ai.defineFlow(
  {
    name: 'summarizePatrolFootageFlow',
    inputSchema: SummarizePatrolFootageInputSchema,
    outputSchema: SummarizePatrolFootageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
