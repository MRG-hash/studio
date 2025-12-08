'use server';
/**
 * @fileOverview A patrol route suggestion AI agent.
 *
 * - suggestPatrolRoutes - A function that suggests patrol routes based on a description of the area.
 * - SuggestPatrolRoutesInput - The input type for the suggestPatrolRoutes function.
 * - SuggestPatrolRoutesOutput - The return type for the suggestPatrolRoutes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPatrolRoutesInputSchema = z.object({
  areaDescription: z
    .string()
    .describe('The description of the area to be patrolled.'),
});
export type SuggestPatrolRoutesInput = z.infer<typeof SuggestPatrolRoutesInputSchema>;

const SuggestPatrolRoutesOutputSchema = z.object({
  routes: z.array(
    z.object({
      name: z.string().describe('The name of the patrol route.'),
      points: z.array(
        z.object({
          x: z.number().describe('The x coordinate of the point.'),
          y: z.number().describe('The y coordinate of the point.'),
          z: z.number().describe('The z coordinate of the point.'),
        })
      ).describe('The list of GPS coordinates for the patrol route.'),
    })
  ).describe('The list of suggested patrol routes.'),
});
export type SuggestPatrolRoutesOutput = z.infer<typeof SuggestPatrolRoutesOutputSchema>;

export async function suggestPatrolRoutes(input: SuggestPatrolRoutesInput): Promise<SuggestPatrolRoutesOutput> {
  return suggestPatrolRoutesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPatrolRoutesPrompt',
  input: {schema: SuggestPatrolRoutesInputSchema},
  output: {schema: SuggestPatrolRoutesOutputSchema},
  prompt: `You are an expert in generating patrol routes for drones based on a description of the area to be patrolled.

You will generate a list of patrol routes, each with a name and a list of GPS coordinates.

Area Description: {{{areaDescription}}}

Consider any possible points of interest or areas that would be beneficial to patrol when creating the routes.

Return multiple possible routes.

Make sure that the routes are named.
`,
});

const suggestPatrolRoutesFlow = ai.defineFlow(
  {
    name: 'suggestPatrolRoutesFlow',
    inputSchema: SuggestPatrolRoutesInputSchema,
    outputSchema: SuggestPatrolRoutesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
