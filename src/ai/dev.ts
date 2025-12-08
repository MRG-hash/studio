import { config } from 'dotenv';
config();

import '@/ai/flows/detect-intruder.ts';
import '@/ai/flows/summarize-patrol-footage.ts';
import '@/ai/flows/suggest-patrol-routes.ts';