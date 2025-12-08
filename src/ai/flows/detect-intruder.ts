'use server';

/**
 * @fileOverview This flow detects intruders in a camera feed.
 *
 * - detectIntruder - A function that initiates the intruder detection process.
 * - DetectIntruderInput - The input type for the detectIntruder function.
 * - DetectIntruderOutput - The return type for the detectIntruder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectIntruderInputSchema = z.object({
  cameraFeedDataUri: z
    .string()
    .describe(
      'A camera feed, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'      
    ),
  alarmSensitivity: z
    .enum(['low', 'medium', 'high'])
    .describe('The sensitivity of the alarm.'),
});
export type DetectIntruderInput = z.infer<typeof DetectIntruderInputSchema>;

const DetectIntruderOutputSchema = z.object({
  intruderDetected: z
    .boolean()
    .describe('Whether or not an intruder was detected.'),
  confidence: z
    .number()
    .describe('The confidence level of the intruder detection.'),
  reason: z.string().describe('The reason for the intruder detection.'),
});
export type DetectIntruderOutput = z.infer<typeof DetectIntruderOutputSchema>;

export async function detectIntruder(input: DetectIntruderInput): Promise<DetectIntruderOutput> {
  return detectIntruderFlow(input);
}

const detectIntruderPrompt = ai.definePrompt({
  name: 'detectIntruderPrompt',
  input: {schema: DetectIntruderInputSchema},
  output: {schema: DetectIntruderOutputSchema},
  prompt: `You are a security system designed to detect intruders in a camera feed.

  Based on the camera feed and the alarm sensitivity, determine if there is an intruder.

  Camera Feed: {{media url=cameraFeedDataUri}}
  Alarm Sensitivity: {{alarmSensitivity}}

  Intruder Detected: {{intruderDetected}}
  Confidence: {{confidence}}
  Reason: {{reason}}`,
});

const detectIntruderFlow = ai.defineFlow(
  {
    name: 'detectIntruderFlow',
    inputSchema: DetectIntruderInputSchema,
    outputSchema: DetectIntruderOutputSchema,
  },
  async input => {
    const {output} = await detectIntruderPrompt(input);
    return output!;
  }
);
