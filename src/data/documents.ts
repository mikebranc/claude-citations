export interface Document {
  id: string;
  title: string;
  content: string;
}

export const documents: Document[] = [
  {
    id: "doc1",
    title: "Early Computing and AI",
    content: "The development of computing and artificial intelligence has been intertwined since the 1950s. Alan Turing's groundbreaking work laid the foundation for both modern computers and AI. His famous Turing Test, proposed in 1950, suggested that a machine could be considered intelligent if it could convince a human it was also human through conversation. Early AI researchers like John McCarthy and Marvin Minsky were optimistic about creating machines that could truly think and learn.",
  },
  {
    id: "doc2",
    title: "Modern AI Applications",
    content: "Today's AI systems have achieved remarkable breakthroughs in various fields. Language models can engage in human-like conversation, assist with coding, and even generate creative content. Computer vision systems can detect diseases in medical images with accuracy rivaling human experts. These advances are powered by deep learning and neural networks, processing vast amounts of data to learn patterns and make predictions. However, challenges remain in areas like ethical AI development and ensuring AI systems are transparent and accountable.",
  },
  {
    id: "doc3",
    title: "Future of Technology",
    content: "The convergence of AI, quantum computing, and biotechnology is expected to revolutionize society in the coming decades. Quantum computers may solve complex problems that are impossible for traditional computers, while AI could help discover new materials and drugs. Some experts predict that by 2050, we might achieve artificial general intelligence (AGI) - machines that can understand or learn any intellectual task that a human being can. However, this raises important questions about the future relationship between humans and machines.",
  },
]; 