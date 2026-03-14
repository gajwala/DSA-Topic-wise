# 🤖 AI Engineer 90-Day Roadmap (2026)
> **Profile:** Basic Python background | 1–2 hrs/day | Goal: Job-ready in 3 months  
> **Start Date:** Fill your start date here  
> **Target Date:** 90 days from start  

---

## 📌 How to Use This Roadmap
- Check off `[ ]` boxes as you complete each topic
- Click free video links to watch lessons
- Build every mini project listed — these become your portfolio
- Add your own notes in the `💬 Notes` sections
- Track your GitHub repo links as you create them

---

## 🗓️ PHASE 1: Python & Foundations
**Duration:** Week 1–2 | Days 1–14  
**Goal:** Strengthen Python for AI, learn Git, understand ML basics

---

### ✅ Week 1 (Days 1–7)

#### 📅 Day 1–2 | Python Refresher for AI
- [ ] Functions, loops, list comprehensions
- [ ] File handling — read/write JSON and CSV
- [ ] Virtual environments (`venv`) and `pip`
- [ ] `*args`, `**kwargs`, lambda functions
- [ ] Exception handling (`try/except`)

🎥 **Free Videos:**
- [Python Full Course for Beginners – freeCodeCamp](https://www.youtube.com/watch?v=eWRFdhOhFQA)
- [Python for Everybody – Dr. Chuck (Coursera Free Audit)](https://www.youtube.com/watch?v=8DvywoWv6fI)

📁 **Mini Task:** Write a Python script that reads a CSV file and prints a summary  
💬 *Notes:*

---

#### 📅 Day 3–4 | APIs & HTTP with Python
- [ ] `requests` library — GET and POST requests
- [ ] REST API concepts (endpoints, headers, status codes)
- [ ] Parsing and printing JSON responses
- [ ] Using `.env` files to store API keys securely
- [ ] `python-dotenv` setup

🎥 **Free Videos:**
- [Python Requests Library – Corey Schafer](https://www.youtube.com/watch?v=tb8gHvYlCFs)
- [REST API Crash Course – Traversy Media](https://www.youtube.com/watch?v=SLwpqD8n3d0)

📁 **Mini Task:** Call a free public API (e.g. Open Meteo weather API) and print the result  
🔗 **Free API to practice:** https://open-meteo.com/  
💬 *Notes:*

---

#### 📅 Day 5–6 | Data Handling with Pandas & NumPy
- [ ] Pandas — DataFrames, series, read_csv
- [ ] Filtering, groupby, sorting data
- [ ] NumPy arrays, shape, dtype
- [ ] Basic data cleaning (dropna, fillna)
- [ ] Exporting to CSV/JSON

🎥 **Free Videos:**
- [Pandas Tutorial – Corey Schafer](https://www.youtube.com/watch?v=ZyhVh-qRZPA)
- [NumPy Tutorial – freeCodeCamp](https://www.youtube.com/watch?v=QUT1VHiLmmI)

📁 **Mini Task:** Load a Kaggle dataset, clean it, and export a filtered version  
🔗 **Free Datasets:** https://www.kaggle.com/datasets  
💬 *Notes:*

---

#### 📅 Day 7 | Git & GitHub
- [ ] `git init`, `add`, `commit`, `push`, `pull`
- [ ] Branching and merging basics
- [ ] Writing a good `README.md`
- [ ] GitHub profile setup (bio, profile README)
- [ ] `.gitignore` for Python projects

🎥 **Free Videos:**
- [Git and GitHub for Beginners – freeCodeCamp](https://www.youtube.com/watch?v=RGOj5yH7evk)
- [Git Tutorial for Beginners – Traversy Media](https://www.youtube.com/watch?v=SWYqp7iY_Tc)

📁 **Mini Task:** Push your Day 1–6 code to a new GitHub repo  
🔗 **GitHub:** https://github.com  
💬 *Notes:*

---

### ✅ Week 2 (Days 8–14)

#### 📅 Day 8–9 | ML Concepts (Theory, No Code)
- [ ] What is Machine Learning?
- [ ] Training vs Inference
- [ ] Supervised vs Unsupervised vs Reinforcement learning
- [ ] What is a model, dataset, parameter, weight?
- [ ] Overfitting, underfitting, validation
- [ ] What are LLMs (Large Language Models)?

🎥 **Free Videos:**
- [Machine Learning Intro – Google Developers](https://www.youtube.com/watch?v=HcqpanDadyQ)
- [But what is a neural network? – 3Blue1Brown](https://www.youtube.com/watch?v=aircAruvnKk)
- [How LLMs Work – Andrej Karpathy](https://www.youtube.com/watch?v=zjkBMFhNj_g)

💬 *Notes:*

---

#### 📅 Day 10–11 | OpenAI API
- [ ] Create account at platform.openai.com
- [ ] API key setup and `.env` storage
- [ ] First chat completion API call
- [ ] Understanding `messages` array (system, user, assistant)
- [ ] Tokens, temperature, max_tokens explained
- [ ] Streaming responses

🎥 **Free Videos:**
- [OpenAI API Python Tutorial – freeCodeCamp](https://www.youtube.com/watch?v=c-g6epk3fFE)
- [OpenAI API Crash Course – Nicholas Renotte](https://www.youtube.com/watch?v=UyS_-S7GWks)

🔗 **Docs:** https://platform.openai.com/docs  
📁 **Mini Task:** Build a script that takes user input and returns a GPT response  
💬 *Notes:*

---

#### 📅 Day 12–13 | Anthropic Claude API
- [ ] Create account at console.anthropic.com
- [ ] Claude API key setup
- [ ] Messages API format (different from OpenAI)
- [ ] System prompts in Claude
- [ ] Compare Claude vs GPT responses on same prompt
- [ ] Understanding Claude model tiers (Haiku, Sonnet, Opus)

🎥 **Free Videos:**
- [Claude API Tutorial – Python](https://www.youtube.com/watch?v=QdDoFfkVkcw)
- [Anthropic API Quickstart – Anthropic YouTube](https://www.youtube.com/@anthropic-ai)

🔗 **Docs:** https://docs.anthropic.com  
📁 **Mini Task:** Build a script that queries both OpenAI and Claude and compares outputs  
💬 *Notes:*

---

#### 📅 Day 14 | Week Review + Mini Project
- [ ] Review all Week 1–2 code
- [ ] **PROJECT: Simple CLI Chatbot**
  - [ ] Takes user input in a loop
  - [ ] Sends to OpenAI or Claude API
  - [ ] Prints response
  - [ ] Has a quit command
- [ ] Push project to GitHub with README
- [ ] Write a short reflection on what you learned

🔗 **Reference Project:** https://github.com/topics/chatbot-python  
💬 *Notes:*

---

## 🗓️ PHASE 2: LLM Integration
**Duration:** Week 3–5 | Days 15–35  
**Goal:** Master prompt engineering, Hugging Face, embeddings, vector DBs

---

### ✅ Week 3 (Days 15–21)

#### 📅 Day 15–16 | Prompt Engineering Basics
- [ ] Zero-shot prompting
- [ ] One-shot prompting
- [ ] Few-shot prompting
- [ ] Role prompting ("You are an expert in...")
- [ ] Chain-of-thought prompting ("Think step by step")
- [ ] Negative prompting (what NOT to do)

🎥 **Free Videos:**
- [Prompt Engineering Guide – Andrew Ng (free)](https://www.youtube.com/watch?v=H4YK_7MAckk)
- [ChatGPT Prompt Engineering – freeCodeCamp](https://www.youtube.com/watch?v=bp1bKMxaFEI)

🔗 **Free Course:** https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/  
💬 *Notes:*

---

#### 📅 Day 17–18 | Advanced Prompting
- [ ] System prompt vs user prompt distinction
- [ ] Output formatting — JSON mode
- [ ] Prompt templates with variables
- [ ] Personas and tone control
- [ ] Instruction following vs instruction tuning

🎥 **Free Videos:**
- [Advanced Prompt Engineering – Lilian Weng talk](https://www.youtube.com/watch?v=dOxUroR57xs)
- [Prompt Engineering Full Guide – Fireship](https://www.youtube.com/watch?v=_ZvnD73m40o)

🔗 **Reference:** https://www.anthropic.com/research/prompt-engineering  
💬 *Notes:*

---

#### 📅 Day 19–20 | Prompt Testing & Evaluation
- [ ] Systematic prompt testing across inputs
- [ ] Handling edge cases and jailbreaks
- [ ] Evaluating output quality (manual rubric)
- [ ] A/B testing two prompts
- [ ] Building a simple prompt evaluation script

📁 **Mini Task:** Test 3 different prompts on the same task, score each 1–5, document results  
💬 *Notes:*

---

#### 📅 Day 21 | Project: Prompt Library
- [ ] **PROJECT: Reusable Prompt Library**
  - [ ] 5+ prompt templates for different tasks
  - [ ] Template variables using Python f-strings
  - [ ] Test each template with 3 different inputs
  - [ ] Document results in a markdown file
- [ ] Push to GitHub

🔗 **Inspiration:** https://github.com/f/awesome-chatgpt-prompts  
💬 *Notes:*

---

### ✅ Week 4 (Days 22–28)

#### 📅 Day 22–23 | Hugging Face Intro
- [ ] Create account at huggingface.co
- [ ] Hub overview — models, datasets, spaces
- [ ] Install `transformers` library
- [ ] Understand model cards
- [ ] Download and run a model locally
- [ ] Inference API (no local GPU needed)

🎥 **Free Videos:**
- [Hugging Face Course – Official Free](https://www.youtube.com/watch?v=00GKzGyWFEs)
- [HuggingFace in 15 mins – Nicholas Renotte](https://www.youtube.com/watch?v=QEaBAZQCtwE)

🔗 **Free Course:** https://huggingface.co/learn/nlp-course  
🔗 **Hub:** https://huggingface.co/models  
💬 *Notes:*

---

#### 📅 Day 24–25 | Running Open-Source Models
- [ ] Text generation pipeline with GPT-2
- [ ] Try Mistral-7B via Inference API
- [ ] Local inference with `pipeline()`
- [ ] Understanding model size vs quality tradeoff
- [ ] Quantization basics (why it matters)

🎥 **Free Videos:**
- [Run LLMs Locally – Matt Williams](https://www.youtube.com/watch?v=iAXAkru_moo)
- [Mistral 7B Tutorial – Sam Witteveen](https://www.youtube.com/watch?v=E6b0bC4lUHs)

📁 **Mini Task:** Generate text with 2 different open-source models and compare  
💬 *Notes:*

---

#### 📅 Day 26–27 | Embeddings
- [ ] What are embeddings and why do they matter?
- [ ] Install `sentence-transformers`
- [ ] Generate embeddings for text
- [ ] Cosine similarity — measuring text closeness
- [ ] Semantic search basics
- [ ] OpenAI embeddings API

🎥 **Free Videos:**
- [Word Embeddings – StatQuest](https://www.youtube.com/watch?v=viZrOnJclY0)
- [Sentence Transformers Tutorial](https://www.youtube.com/watch?v=OATCgQtNX2o)

🔗 **Docs:** https://www.sbert.net/  
💬 *Notes:*

---

#### 📅 Day 28 | Project: Semantic Search
- [ ] **PROJECT: Semantic Search Engine**
  - [ ] Embed 50+ sentences from a text file
  - [ ] Accept a search query from user
  - [ ] Return top 3 most similar results
  - [ ] Display similarity scores
- [ ] Push to GitHub with demo screenshot

🔗 **Reference:** https://github.com/UKPLab/sentence-transformers/tree/master/examples  
💬 *Notes:*

---

### ✅ Week 5 (Days 29–35)

#### 📅 Day 29–30 | Vector Databases
- [ ] What is a vector database?
- [ ] Why traditional DBs can't do semantic search
- [ ] Install and setup Chroma (local, free)
- [ ] Create a collection and add documents
- [ ] Query with similarity search
- [ ] Pinecone intro (cloud option)

🎥 **Free Videos:**
- [Vector Databases Explained – Fireship](https://www.youtube.com/watch?v=klTvEwg3oJ4)
- [ChromaDB Tutorial – James Briggs](https://www.youtube.com/watch?v=7Ylx02BEbYg)

🔗 **Chroma Docs:** https://docs.trychroma.com/  
🔗 **Pinecone Free Tier:** https://www.pinecone.io/  
💬 *Notes:*

---

#### 📅 Day 31–32 | Storing & Querying Vectors
- [ ] Insert embeddings with metadata
- [ ] Query by similarity
- [ ] Filter by metadata
- [ ] Update and delete records
- [ ] Persist Chroma to disk

📁 **Mini Task:** Store 100 movie descriptions as embeddings, query by genre/mood  
💬 *Notes:*

---

#### 📅 Day 33–34 | OpenAI Function Calling / Tool Use
- [ ] What is function calling?
- [ ] Defining tool schemas in JSON
- [ ] Parsing function call results
- [ ] Multi-turn function calling
- [ ] Claude tool use (same concept, different syntax)

🎥 **Free Videos:**
- [OpenAI Function Calling Tutorial](https://www.youtube.com/watch?v=0-khEOYRhUU)
- [Claude Tool Use – Anthropic](https://www.youtube.com/watch?v=8q_9vCgEWbs)

🔗 **Docs:** https://platform.openai.com/docs/guides/function-calling  
💬 *Notes:*

---

#### 📅 Day 35 | Review + Portfolio Update
- [ ] Refactor all Week 3–5 projects
- [ ] Add proper READMEs to all repos
- [ ] Write a LinkedIn post about what you learned
- [ ] Update your GitHub profile README

💬 *Notes:*

---

## 🗓️ PHASE 3: Production Systems
**Duration:** Week 6–9 | Days 36–63  
**Goal:** LangChain, RAG systems, AI Agents, MCP, deployment

---

### ✅ Week 6 (Days 36–42)

#### 📅 Day 36–37 | LangChain Basics
- [ ] What is LangChain and why use it?
- [ ] Install LangChain and LangChain-OpenAI
- [ ] `PromptTemplate` — dynamic prompts
- [ ] `LLMChain` — simplest chain
- [ ] ChatModels setup (OpenAI, Anthropic)
- [ ] LCEL — LangChain Expression Language basics

🎥 **Free Videos:**
- [LangChain Crash Course – freeCodeCamp](https://www.youtube.com/watch?v=lG7Uxts9SXs)
- [LangChain for Beginners – James Briggs](https://www.youtube.com/watch?v=nAmC7SoVLd8)

🔗 **Docs:** https://python.langchain.com/docs/  
💬 *Notes:*

---

#### 📅 Day 38–39 | LangChain Chains
- [ ] Sequential chains (chain outputs as inputs)
- [ ] Router chains (route to different chains by topic)
- [ ] SimpleSequentialChain vs SequentialChain
- [ ] Passing variables between chains
- [ ] Debugging chains with verbose mode

📁 **Mini Task:** Build a chain that summarizes text, then translates the summary  
💬 *Notes:*

---

#### 📅 Day 40–41 | LangChain Memory
- [ ] `ConversationBufferMemory` — full history
- [ ] `ConversationSummaryMemory` — summarized history
- [ ] `ConversationBufferWindowMemory` — last N messages
- [ ] Adding memory to a chain
- [ ] Persisting memory to a JSON file

🎥 **Free Videos:**
- [LangChain Memory Types – Sam Witteveen](https://www.youtube.com/watch?v=70lqvTFh_Cc)

💬 *Notes:*

---

#### 📅 Day 42 | Project: Chatbot with Memory
- [ ] **PROJECT: Multi-Turn Chatbot**
  - [ ] Accepts conversation history
  - [ ] Uses ConversationSummaryMemory
  - [ ] Saves conversation to a file on exit
  - [ ] Clean CLI interface
- [ ] Push to GitHub

🔗 **Reference:** https://github.com/langchain-ai/langchain/tree/master/cookbook  
💬 *Notes:*

---

### ✅ Week 7 (Days 43–49)

#### 📅 Day 43–44 | RAG — Concepts & Setup
- [ ] What is Retrieval-Augmented Generation?
- [ ] RAG vs fine-tuning — when to use which
- [ ] RAG pipeline: Load → Chunk → Embed → Store → Retrieve → Generate
- [ ] Why RAG reduces hallucinations
- [ ] LangChain RAG components overview

🎥 **Free Videos:**
- [RAG from Scratch – LangChain YouTube](https://www.youtube.com/watch?v=sVcwVQRHIc8)
- [RAG Explained Simply – IBM Technology](https://www.youtube.com/watch?v=T-D1OfcDW1M)

💬 *Notes:*

---

#### 📅 Day 45–46 | RAG — Document Loading & Chunking
- [ ] LangChain document loaders (PDF, TXT, CSV, web)
- [ ] `PyPDFLoader`, `TextLoader`, `WebBaseLoader`
- [ ] Text splitters — `RecursiveCharacterTextSplitter`
- [ ] Chunk size and overlap strategies
- [ ] Why chunking matters for retrieval quality

🎥 **Free Videos:**
- [LangChain Document Loaders Tutorial](https://www.youtube.com/watch?v=erUfLIi9OFo)

📁 **Mini Task:** Load a PDF, chunk it into 200-token pieces, print the first 5 chunks  
💬 *Notes:*

---

#### 📅 Day 47–48 | RAG — Full Pipeline
- [ ] Embed chunks into Chroma vector DB
- [ ] Build a RetrievalQA chain
- [ ] Prompt augmentation with retrieved context
- [ ] Improve retrieval with MMR (Maximal Marginal Relevance)
- [ ] Return source documents with answers

📁 **Mini Task:** Ask 10 questions to your RAG system, evaluate quality of answers  
💬 *Notes:*

---

#### 📅 Day 49 | Project: Custom Knowledge Bot
- [ ] **PROJECT: PDF Q&A Bot**
  - [ ] Load any PDF the user provides
  - [ ] Chunk and embed into Chroma
  - [ ] Answer questions from the PDF
  - [ ] Show which page/chunk the answer came from
- [ ] Push to GitHub with sample PDF

🔗 **Reference:** https://github.com/alejandro-ao/ask-multiple-pdfs  
🔗 **Live Demo Inspiration:** https://huggingface.co/spaces  
💬 *Notes:*

---

### ✅ Week 8 (Days 50–56)

#### 📅 Day 50–51 | AI Agents — Concepts
- [ ] What is an AI Agent?
- [ ] ReAct framework (Reason + Act loop)
- [ ] Tools vs chains vs agents
- [ ] Planning, memory, and tool use in agents
- [ ] When to use an agent vs a chain

🎥 **Free Videos:**
- [AI Agents Explained – IBM Technology](https://www.youtube.com/watch?v=F8NKVhkZZWI)
- [ReAct Agent from Scratch – LangChain](https://www.youtube.com/watch?v=Eug2clsLtFs)

💬 *Notes:*

---

#### 📅 Day 52–53 | LangChain Agents
- [ ] Built-in tools: DuckDuckGo Search, Calculator, Wikipedia
- [ ] Creating custom tools with `@tool` decorator
- [ ] `AgentExecutor` setup
- [ ] `create_openai_tools_agent`
- [ ] Debugging agent thought process

🎥 **Free Videos:**
- [LangChain Agents Tutorial – James Briggs](https://www.youtube.com/watch?v=DWUdGFCpvDI)

📁 **Mini Task:** Build an agent that can search the web AND do math calculations  
💬 *Notes:*

---

#### 📅 Day 54–55 | MCP — Model Context Protocol
- [ ] What is MCP and why does it matter?
- [ ] MCP architecture — hosts, clients, servers
- [ ] MCP vs function calling vs plugins
- [ ] Setting up a local MCP server
- [ ] Connecting Claude Desktop to an MCP server
- [ ] Real-world MCP use cases (file system, databases, APIs)

🎥 **Free Videos:**
- [MCP Explained – Anthropic](https://www.youtube.com/watch?v=kQmXtrmQ5Zg)
- [Build MCP Servers – Fireship](https://www.youtube.com/watch?v=7j_NE6Pjv-E)

🔗 **Docs:** https://modelcontextprotocol.io/  
🔗 **MCP Servers List:** https://github.com/modelcontextprotocol/servers  
💬 *Notes:*

---

#### 📅 Day 56 | Project: Research Agent
- [ ] **PROJECT: AI Research Agent**
  - [ ] Accepts a research topic from user
  - [ ] Searches the web for recent info
  - [ ] Summarizes findings
  - [ ] Saves report to a markdown file
  - [ ] Uses at least 2 tools
- [ ] Push to GitHub

🔗 **Reference:** https://github.com/langchain-ai/langgraph/tree/main/examples  
💬 *Notes:*

---

### ✅ Week 9 (Days 57–63)

#### 📅 Day 57–58 | Deployment Basics with FastAPI
- [ ] What is FastAPI?
- [ ] Create a simple AI endpoint (`POST /chat`)
- [ ] Request/response models with Pydantic
- [ ] Environment variables with `python-dotenv`
- [ ] Testing with Swagger UI (`/docs`)
- [ ] Basic Dockerfile for Python apps

🎥 **Free Videos:**
- [FastAPI Tutorial – Traversy Media](https://www.youtube.com/watch?v=0sOvCWFmrtA)
- [Docker for Beginners – freeCodeCamp](https://www.youtube.com/watch?v=fqMOX6JJhGo)

🔗 **Docs:** https://fastapi.tiangolo.com/  
💬 *Notes:*

---

#### 📅 Day 59–60 | Cloud Deployment
- [ ] Deploy FastAPI app to Render (free tier)
- [ ] Or deploy to Railway (free tier)
- [ ] Deploy Gradio/Streamlit app to HuggingFace Spaces (free)
- [ ] Set environment variables in cloud
- [ ] Test live deployed endpoint

🎥 **Free Videos:**
- [Deploy FastAPI to Render – Full Tutorial](https://www.youtube.com/watch?v=zLhFOkDMEiA)
- [HuggingFace Spaces Tutorial](https://www.youtube.com/watch?v=3bSVKNKb_PY)

🔗 **Free Hosting:** https://render.com | https://railway.app | https://huggingface.co/spaces  
💬 *Notes:*

---

#### 📅 Day 61–62 | Monitoring & Logging
- [ ] Logging LLM inputs and outputs to a file
- [ ] Tracking token usage and API costs
- [ ] Basic error handling and retries
- [ ] LangSmith for LangChain tracing (free tier)
- [ ] Rate limiting your API

🔗 **LangSmith:** https://smith.langchain.com/  
💬 *Notes:*

---

#### 📅 Day 63 | Capstone Project Planning
- [ ] Choose your capstone project (see Phase 4)
- [ ] Draw an architecture diagram
- [ ] Create a new GitHub repo
- [ ] Write the project README outline
- [ ] List all tools/APIs you will use

💬 *Notes:*

---

## 🗓️ PHASE 4: Portfolio & Job Prep
**Duration:** Week 10–13 | Days 64–90  
**Goal:** Build portfolio, apply for jobs, ace interviews

---

### ✅ Week 10–11 (Days 64–77)

#### 📅 Day 64–70 | Capstone Project Build

**Pick ONE of these project ideas:**

**Option A: Decision Support System**
- [ ] User inputs a business problem
- [ ] App pulls relevant data via RAG
- [ ] AI gives structured recommendation with pros/cons
- [ ] Export report as PDF

**Option B: NL Analytics Tool**
- [ ] User uploads a CSV dataset
- [ ] Ask questions in plain English
- [ ] AI generates and runs Pandas code
- [ ] Visualizes results

**Option C: AI-Powered SaaS Mini App**
- [ ] Pick a niche (legal, medical, finance, HR)
- [ ] RAG over domain documents
- [ ] Simple Streamlit or Gradio frontend
- [ ] Deployed live on HuggingFace Spaces

🔗 **Streamlit Docs:** https://docs.streamlit.io/  
🔗 **Gradio Docs:** https://www.gradio.app/  
🔗 **Project Inspiration:** https://huggingface.co/spaces  
💬 *Notes:*

---

#### 📅 Day 71–77 | Portfolio Polish
- [ ] Finalize capstone project
- [ ] Ensure 3 total GitHub projects are polished:
  - [ ] Project 1 (from Phase 1–2): _______________
  - [ ] Project 2 (from Phase 3 RAG/Agent): _______________
  - [ ] Capstone Project: _______________
- [ ] Each repo must have:
  - [ ] Descriptive README with screenshots
  - [ ] Demo GIF or video (record with Loom — free)
  - [ ] Live deployed link
  - [ ] Tech stack badges
  - [ ] How-to-run instructions
- [ ] Write 1 blog post about a project (Dev.to or Hashnode — free)

🔗 **Free Screen Recording:** https://www.loom.com/  
🔗 **Dev.to:** https://dev.to/  
🔗 **Hashnode:** https://hashnode.com/  
🔗 **README badges:** https://shields.io/  
💬 *Notes:*

---

### ✅ Week 12 (Days 78–84)

#### 📅 Day 78–79 | Resume & LinkedIn
- [ ] Use an ATS-friendly resume template
- [ ] Summary section — "AI Engineer building LLM-powered apps"
- [ ] List tech stack: Python, LangChain, OpenAI API, Claude API, RAG, FastAPI, etc.
- [ ] Add each GitHub project as experience
- [ ] LinkedIn: Update headline, about section, featured projects
- [ ] Add skills: Prompt Engineering, LLMs, RAG, LangChain, Agents, MCP

🔗 **Free Resume Templates:** https://rxresu.me/ (open source, free)  
🔗 **ATS Checker:** https://www.jobscan.co/  
💬 *Notes:*

---

#### 📅 Day 80–81 | Technical Interview Prep
- [ ] Explain RAG architecture end-to-end
- [ ] Explain what embeddings are and why they matter
- [ ] Explain trade-offs: RAG vs fine-tuning
- [ ] Walk through LangChain agent execution flow
- [ ] How do you reduce LLM hallucinations?
- [ ] What is temperature and when do you change it?
- [ ] Explain function calling / tool use
- [ ] What is MCP and how does it differ from plugins?
- [ ] How do you handle context window limits?
- [ ] How would you evaluate an LLM application?

🎥 **Free Videos:**
- [AI Engineer Interview Questions – TechLead](https://www.youtube.com/watch?v=5C_-HLD21hA)

💬 *Notes:*

---

#### 📅 Day 82–83 | Behavioral Interview Prep
- [ ] STAR method: Situation, Task, Action, Result
- [ ] "Why do you want to be an AI Engineer?"
- [ ] "Walk me through a project you built"
- [ ] "What challenge did you face and how did you solve it?"
- [ ] "Where do you see AI going in 2–3 years?"
- [ ] "How do you stay updated with AI developments?"

💬 *Notes:*

---

#### 📅 Day 84 | Mock Interviews
- [ ] Record yourself answering 5 technical questions
- [ ] Record yourself answering 3 behavioral questions
- [ ] Review recordings — note areas to improve
- [ ] Ask Claude/ChatGPT to mock interview you
- [ ] Get feedback from a peer or mentor

💬 *Notes:*

---

### ✅ Week 13 (Days 85–90)

#### 📅 Day 85–86 | Job Applications
- [ ] List 20+ target companies
- [ ] Apply on LinkedIn Jobs
- [ ] Apply on Wellfound (AngelList) — great for startups
- [ ] Apply on Otta
- [ ] Apply on Remotive (remote jobs)
- [ ] Track all applications in a spreadsheet

🔗 **Job Boards:**
- https://www.linkedin.com/jobs/
- https://wellfound.com/
- https://otta.com/
- https://remotive.com/
- https://aijobs.net/

💬 *Notes:*

---

#### 📅 Day 87–88 | Networking
- [ ] Connect with 10 AI Engineers on LinkedIn per day
- [ ] Comment meaningfully on AI posts (not just "Great post!")
- [ ] Join AI Discord communities:
  - [ ] Hugging Face Discord
  - [ ] LangChain Discord
  - [ ] Latent Space Discord
  - [ ] AI Engineer Foundation Discord
- [ ] Attend 1 virtual AI meetup or webinar this week

🔗 **Communities:**
- https://discord.gg/hugging-face
- https://discord.gg/langchain
- https://www.latent.space/
- https://discord.gg/aiengineer

💬 *Notes:*

---

#### 📅 Day 89–90 | Final Review & What's Next
- [ ] Review all 4 phases — what was hardest?
- [ ] Identify top 2 skill gaps
- [ ] Set a 30-day post-roadmap plan:
  - [ ] One new technology to learn (e.g. LangGraph, CrewAI, fine-tuning)
  - [ ] One more project to build
  - [ ] Keep applying — aim for 10 apps/week

---

## 🛠️ Full Tech Stack You Will Know After 90 Days

| Category | Tools |
|---|---|
| Language | Python 3.10+ |
| Version Control | Git, GitHub |
| AI APIs | OpenAI, Anthropic Claude |
| Open Source Models | Hugging Face, Mistral, GPT-2 |
| Prompt Engineering | Few-shot, CoT, JSON mode |
| Embeddings | sentence-transformers, OpenAI embeddings |
| Vector DBs | Chroma, FAISS, Pinecone |
| LLM Framework | LangChain, LCEL |
| RAG | RetrievalQA, document loaders, chunking |
| Agents | ReAct, LangChain AgentExecutor |
| Agent Protocol | MCP (Model Context Protocol) |
| Backend | FastAPI |
| Frontend | Streamlit, Gradio |
| Deployment | Render, Railway, HuggingFace Spaces |
| Monitoring | LangSmith, custom logging |

---

## 📚 Master Resource List

| Topic | Free Resource | Link |
|---|---|---|
| Python | Automate the Boring Stuff | https://automatetheboringstuff.com/ |
| ML Concepts | Google ML Crash Course | https://developers.google.com/machine-learning/crash-course |
| Prompt Engineering | DeepLearning.AI Short Course | https://www.deeplearning.ai/short-courses/ |
| Hugging Face | Official NLP Course | https://huggingface.co/learn/nlp-course |
| LangChain | Official Docs + Cookbook | https://python.langchain.com/docs/ |
| RAG | LangChain RAG From Scratch | https://www.youtube.com/watch?v=sVcwVQRHIc8 |
| Agents | LangGraph Tutorials | https://langchain-ai.github.io/langgraph/ |
| MCP | Official MCP Docs | https://modelcontextprotocol.io/ |
| FastAPI | Official Tutorial | https://fastapi.tiangolo.com/tutorial/ |
| Deployment | Render Free Tier | https://render.com/ |
| LLM Evals | RAGAS Framework | https://docs.ragas.io/ |
| AI News | The Rundown AI | https://www.therundown.ai/ |

---

## 🏁 Progress Tracker

| Phase | Days | Status |
|---|---|---|
| Phase 1: Foundations | Days 1–14 | [ ] Not Started / [ ] In Progress / [ ] Done |
| Phase 2: LLM Integration | Days 15–35 | [ ] Not Started / [ ] In Progress / [ ] Done |
| Phase 3: Production Systems | Days 36–63 | [ ] Not Started / [ ] In Progress / [ ] Done |
| Phase 4: Portfolio & Jobs | Days 64–90 | [ ] Not Started / [ ] In Progress / [ ] Done |

---

*Built for: AI Engineer aspirants in 2026 | 1–2 hrs/day | Basic Python background*  
*Good luck! The best time to start was yesterday. The second best time is today. 🚀*
