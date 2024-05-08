import { JournalEntry, Analysis } from "@prisma/client";

export interface JournalEntryWithAnalysis extends JournalEntry {
  analysis: Analysis | null;
}
