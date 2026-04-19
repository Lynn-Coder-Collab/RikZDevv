export {};

// Type definitions will go here
export interface User {
  uid: string;
  name: string;
  role: "user" | "admin";
  streak: number;
  score: number;
  studyTime: number; // in seconds
  createdAt: number;
}
