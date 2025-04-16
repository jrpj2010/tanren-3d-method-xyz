// src/lib/vertexConfig.ts
import { VertexAI } from '@google-cloud/vertexai';

const vertexAI = new VertexAI({
  project: 'your-project-id',
  location: 'us-central1'
});

export const businessCardPredictor = vertexAI.getGenerativeModel({
  model: 'gemini-1.5-flash'
});
