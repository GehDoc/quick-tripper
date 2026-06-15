export interface Trip {
  id: string;
  prompt: string; // Original user input
  title: string; // AI-generated clean title
  start?: string; // Extracted start point
  stop?: string; // Extracted end point
  content: string; // Markdown content
  createdAt: string;
}
