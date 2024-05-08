import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import z from "zod";
import { PromptTemplate } from "@langchain/core/prompts";
import { Document } from "langchain/document";
import { loadQARefineChain } from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

// generating structured output from openai promt
const schema = z.object({
  sentimentScore: z.number().describe("Sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive."),
  mood: z
    .string()
    .describe("The mood of the person who wrote the journal entry."),
  summary: z.string().describe("Quick summary of the entire entry."),
  subject: z.string().describe("The subject of the journal entry."),
  negative: z
    .boolean()
    .describe(
      "Is the journal entry negative? (i.e. does it contain negative emotions?).",
    ),
  color: z
    .string()
    .describe(
      'A hexadecimal color code that represents the mood of the entry. Example: "#0101fe" for blue representing happiness.',
    ),
});

const parser = StructuredOutputParser.fromZodSchema(schema);

const getPrompt = async (content: string) => {
  const formatInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template: `Analyze the following journal entry. Follow the instructions 
    and format your response to match the format instructions, no matter what! \n
    {formatInstructions}\n{entry}`,
    inputVariables: ["entry"],
    partialVariables: { formatInstructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  return input;
};

export const analyze = async (content: string) => {
  const input = await getPrompt(content);

  // temperature - randomness of outputs
  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  const result = await model.invoke(input);

  try {
    return parser.parse(result);
  } catch (e) {
    console.log(e);
  }
};

export const qa = async (
  question: string,
  entries: { id: string; createdAt: Date; content: string }[],
) => {
  const docs = entries.map(
    (entry) =>
      new Document({
        pageContent: entry.content,
        metadata: {
          id: entry.id,
          createdAt: entry.createdAt,
        },
      }),
  );

  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  const chain = loadQARefineChain(model);
  const embeddings = new OpenAIEmbeddings(); // embeddings - group of vectors
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings); // our in-memory vector database
  const relevantDocs = await store.similaritySearch(question);

  const res = await chain.invoke({
    input_documents: relevantDocs,
    question,
  });

  console.log(res);

  return res.output_text;
};
