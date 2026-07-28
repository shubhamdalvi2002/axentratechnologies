import { DomainTrack, TaskItem, CertificateData, TaskSubmission } from '../types';

export const INITIAL_DOMAINS: DomainTrack[] = [
  {
    id: 'react-web-dev',
    title: 'React.js Web Development',
    icon: '⚛️',
    desc: 'Build modern responsive SPA web apps with React.js, Hooks, state management, and API integrations.',
    longDesc: 'Master modern React.js client development, component design patterns, Redux/Zustand state management, and REST API integration.',
    tags: ['React.js', 'JavaScript', 'Hooks', 'Web'],
    totalTasks: 5,
    category: 'Software',
    popular: true,
  },
  {
    id: 'mern-stack-dev',
    title: 'MERN Stack Web Development',
    icon: '⚡',
    desc: 'Full-stack web application development using MongoDB, Express.js, React.js, and Node.js.',
    longDesc: 'Build scalable modern web applications with full authentication, state management, REST APIs, and MongoDB database pipelines.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    totalTasks: 5,
    category: 'Software',
    popular: true,
  },
  {
    id: 'dotnet-web-dev',
    title: '.NET Web Development',
    icon: '🔷',
    desc: 'Enterprise web development with C#, ASP.NET Core MVC, Web API, and SQL Server.',
    longDesc: 'Learn C# enterprise architectures, ASP.NET Core API routing, Entity Framework Core ORM, and database optimizations.',
    tags: ['.NET Core', 'C#', 'ASP.NET', 'Web API'],
    totalTasks: 5,
    category: 'Software',
  },
  {
    id: 'figma-web-dev',
    title: 'Figma Web Development',
    icon: '🎨',
    desc: 'Translate Figma web designs, design systems, and responsive layouts into clean production web code.',
    longDesc: 'Bridge design and web development by crafting pixel-perfect web interfaces directly from Figma component design specifications.',
    tags: ['Figma', 'Web Design', 'UI/UX', 'Responsive'],
    totalTasks: 4,
    category: 'Design & Cloud',
  },
  {
    id: 'figma-app-dev',
    title: 'Figma App Development',
    icon: '📱',
    desc: 'Design mobile app UI/UX workflows, interactive prototypes, and design handoff specs in Figma.',
    longDesc: 'Create mobile application user journeys, micro-interactions, component libraries, and interactive mobile prototypes in Figma.',
    tags: ['Figma', 'App Design', 'Mobile UI', 'UX Research'],
    totalTasks: 4,
    category: 'Design & Cloud',
  },
  {
    id: 'fullstack-web-dev',
    title: 'Full Stack Web Development',
    icon: '💻',
    desc: 'End-to-end full stack web engineering covering frontend, backend, databases, and deployment.',
    longDesc: 'Develop complete full-stack web platforms connecting client interfaces, server middleware, REST/GraphQL APIs, and relational databases.',
    tags: ['Frontend', 'Backend', 'Database', 'APIs'],
    totalTasks: 5,
    category: 'Software',
    popular: true,
  },
  {
    id: 'frontend-web-dev',
    title: 'Frontend Web Development',
    icon: '🌐',
    desc: 'Craft responsive, high-performance web user interfaces using HTML5, CSS3, JavaScript, and modern frameworks.',
    longDesc: 'Focus on client-side web interfaces, DOM manipulation, responsive CSS layouts, web accessibility (a11y), and frontend state.',
    tags: ['HTML/CSS', 'JavaScript', 'Tailwind', 'Frontend'],
    totalTasks: 4,
    category: 'Software',
  },
  {
    id: 'backend-web-dev',
    title: 'Backend Web Development',
    icon: '⚙️',
    desc: 'Construct robust server-side APIs, database schemas, authentication systems, and microservices.',
    longDesc: 'Build high-concurrency server applications, RESTful endpoints, database queries, ORM models, and secure authorization gates.',
    tags: ['Node.js', 'REST API', 'Database', 'Backend'],
    totalTasks: 5,
    category: 'Software',
  },
  {
    id: 'c-cpp-programming',
    title: 'C, C++ Programming',
    icon: '🧩',
    desc: 'Systems programming, memory management, pointers, and object-oriented architecture in C & C++.',
    longDesc: 'Deep dive into low-level memory allocation, pointer manipulation, STL containers, dynamic structures, and C++ OOP concepts.',
    tags: ['C', 'C++', 'Pointers', 'OOP'],
    totalTasks: 5,
    category: 'Core',
    popular: true,
  },
  {
    id: 'software-dev',
    title: 'Software Development',
    icon: '🚀',
    desc: 'Core software engineering principles, version control, system design, and software lifecycle.',
    longDesc: 'Master fundamental software development workflows, Git branching strategies, unit testing, clean code patterns, and CI build setups.',
    tags: ['Software Eng', 'Git', 'Agile', 'System Design'],
    totalTasks: 5,
    category: 'Software',
  },
  {
    id: 'embedded-systems',
    title: 'Embedded Systems',
    icon: '📟',
    desc: 'Firmware programming, microcontrollers, IoT hardware protocols, and RTOS fundamentals.',
    longDesc: 'Work with microcontroller hardware (ARM/ESP32/Arduino), GPIO peripherals, UART/I2C/SPI protocols, and embedded C code.',
    tags: ['Embedded C', 'Microcontrollers', 'IoT', 'Hardware'],
    totalTasks: 4,
    category: 'Core',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    icon: '📣',
    desc: 'SEO optimization, Google Analytics, content strategy, social media campaigns, and lead conversion.',
    longDesc: 'Execute data-driven marketing strategies including search engine optimization (SEO), performance ads, analytics tracking, and growth marketing.',
    tags: ['SEO', 'Google Analytics', 'Content', 'Growth'],
    totalTasks: 4,
    category: 'Design & Cloud',
  },
  {
    id: 'app-development',
    title: 'App Development',
    icon: '📲',
    desc: 'Cross-platform native mobile application development using Flutter or React Native.',
    longDesc: 'Build performant iOS and Android mobile applications with native device capabilities, local storage, and cloud backend integrations.',
    tags: ['Flutter', 'React Native', 'Android', 'iOS'],
    totalTasks: 5,
    category: 'Software',
  },
  {
    id: 'java-programming',
    title: 'Java Programming',
    icon: '☕',
    desc: 'Core Java 17+, Object-Oriented Programming (OOP), Collections framework, and Multithreading.',
    longDesc: 'Master core Java fundamentals, object-oriented software design, exception handling, collections, streams API, and concurrent execution.',
    tags: ['Java 17+', 'OOP', 'Collections', 'Multithreading'],
    totalTasks: 5,
    category: 'Core',
    popular: true,
  },
  {
    id: 'python-programming',
    title: 'Python Programming',
    icon: '🐍',
    desc: 'Python programming syntax, automation scripting, data structures, and web scraping utilities.',
    longDesc: 'Develop Python automation tools, file parsing utilities, web scrapers, REST client modules, and clean modular Python packages.',
    tags: ['Python 3', 'Scripting', 'Automation', 'OOP'],
    totalTasks: 5,
    category: 'Core',
    popular: true,
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    icon: '📈',
    desc: 'Data wrangling, SQL analytics queries, executive dashboards, and statistical reporting.',
    longDesc: 'Transform raw enterprise business data into decision-ready executive dashboards using advanced SQL, Power BI, Excel, and Tableau.',
    tags: ['SQL', 'Excel', 'Tableau', 'Data Analysis'],
    totalTasks: 4,
    category: 'Data',
    popular: true,
  },
  {
    id: 'sql-intern',
    title: 'SQL',
    icon: '🗄️',
    desc: 'Relational database query design, joins, subqueries, indexing, and schema normalization.',
    longDesc: 'Write optimized SQL queries across MySQL and PostgreSQL, build stored procedures, create indexes, and normalize relational databases.',
    tags: ['SQL', 'MySQL', 'PostgreSQL', 'Database Query'],
    totalTasks: 4,
    category: 'Data',
  },
  {
    id: 'devops-intern',
    title: 'DevOps',
    icon: '♾️',
    desc: 'CI/CD pipeline configuration, Docker containerization, Linux sysadmin, and cloud automation.',
    longDesc: 'Build automated continuous integration and deployment pipelines using GitHub Actions, Docker containers, Nginx, and cloud infrastructure.',
    tags: ['Docker', 'CI/CD', 'Linux', 'GitOps'],
    totalTasks: 4,
    category: 'Design & Cloud',
  },
  {
    id: 'power-bi',
    title: 'Power BI',
    icon: '📊',
    desc: 'Interactive business intelligence dashboards, DAX formulas, and data modeling in Power BI.',
    longDesc: 'Connect diverse enterprise data sources into Power BI models, author custom DAX measures, and produce interactive executive visual reports.',
    tags: ['Power BI', 'DAX', 'BI Dashboards', 'Data Modeling'],
    totalTasks: 4,
    category: 'Data',
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing',
    icon: '☁️',
    desc: 'Cloud infrastructure deployment, AWS/GCP services, serverless computing, and security.',
    longDesc: 'Provision and configure scalable cloud resources including EC2/S3, IAM permissions, serverless functions, and load balancers on AWS and GCP.',
    tags: ['AWS', 'GCP', 'Cloud Infra', 'Serverless'],
    totalTasks: 4,
    category: 'Design & Cloud',
  },
  {
    id: 'blockchain-tech',
    title: 'Blockchain Technology',
    icon: '🔗',
    desc: 'Smart contract development with Solidity, Web3.js, Ethereum ecosystem, and decentralized apps.',
    longDesc: 'Write and audit smart contracts in Solidity, compile with Hardhat/Truffle, and connect frontend web interfaces using Web3.js or Ethers.js.',
    tags: ['Solidity', 'Smart Contracts', 'Ethereum', 'Web3'],
    totalTasks: 4,
    category: 'Core',
  },
  {
    id: 'software-testing',
    title: 'Software Testing',
    icon: '🧪',
    desc: 'Manual software testing, test planning, bug tracking, edge case analysis, and QA reporting.',
    longDesc: 'Execute rigorous QA software validation cycles, write comprehensive test cases, perform regression testing, and report defects in Jira.',
    tags: ['Manual Testing', 'QA', 'Test Cases', 'Bug Tracking'],
    totalTasks: 4,
    category: 'Software',
  },
  {
    id: 'automation-testing',
    title: 'Automation Testing',
    icon: '🤖',
    desc: 'Automated E2E web testing scripts using Selenium, Cypress, Playwright, and test frameworks.',
    longDesc: 'Write automated browser testing suites using Selenium/Cypress, build CI test integration gates, and validate API endpoints automatically.',
    tags: ['Selenium', 'Cypress', 'Playwright', 'Test Automation'],
    totalTasks: 4,
    category: 'Software',
  },
  {
    id: 'big-data',
    title: 'Big Data',
    icon: '🛢️',
    desc: 'Large-scale distributed data processing using Apache Hadoop, PySpark, and Kafka streaming.',
    longDesc: 'Process petabyte-scale datasets using PySpark dataframes, configure MapReduce jobs, and build real-time streaming data pipelines with Kafka.',
    tags: ['Hadoop', 'PySpark', 'Kafka', 'Big Data'],
    totalTasks: 4,
    category: 'Data',
  },
  {
    id: 'dotnet-intern',
    title: '.NET',
    icon: '🎯',
    desc: 'C# programming, .NET Framework / .NET Core application development, and LINQ queries.',
    longDesc: 'Master object-oriented C# development, LINQ database queries, Windows / Web service builds, and .NET runtime execution.',
    tags: ['C#', '.NET', 'LINQ', 'OOP'],
    totalTasks: 4,
    category: 'Software',
  },
  {
    id: 'data-science',
    title: 'Data Science',
    icon: '🔬',
    desc: 'Statistical analysis, machine learning algorithms, Pandas, Scikit-Learn, and data modeling.',
    longDesc: 'Build predictive machine learning models using Python, clean datasets, train regression/classification models, and evaluate ML metrics.',
    tags: ['Python', 'Pandas', 'Scikit-Learn', 'ML'],
    totalTasks: 5,
    category: 'Data',
    popular: true,
  },
  {
    id: 'uiux-intern',
    title: 'UI/UX',
    icon: '✒️',
    desc: 'User interface design, user experience research, wireframing, prototyping, and accessibility.',
    longDesc: 'Conduct user research, design wireframes, build high-fidelity interactive user interface prototypes, and conduct usability tests.',
    tags: ['UI/UX', 'Figma', 'Wireframing', 'Prototyping'],
    totalTasks: 4,
    category: 'Design & Cloud',
  },
  {
    id: 'ml-ai-iot',
    title: 'ML, AI & IoT',
    icon: '🧠',
    desc: 'Machine learning models, Artificial Intelligence integrations, and IoT sensor hardware networks.',
    longDesc: 'Combine machine learning algorithms with smart IoT sensor devices, computer vision models, and edge AI processing pipelines.',
    tags: ['Machine Learning', 'AI', 'IoT', 'Deep Learning'],
    totalTasks: 4,
    category: 'Data',
    popular: true,
  },
  {
    id: 'vlsi-intern',
    title: 'VLSI',
    icon: '⚡',
    desc: 'Digital circuit design, Verilog/VHDL hardware description languages, and ASIC/FPGA design.',
    longDesc: 'Design and simulate digital logic circuits using Verilog or VHDL, synthesize FPGA netlists, and verify timing and logic performance.',
    tags: ['VLSI', 'Verilog', 'VHDL', 'FPGA'],
    totalTasks: 4,
    category: 'Core',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Ethical Hacking',
    icon: '🛡️',
    desc: 'Ethical hacking, web vulnerability assessments, OWASP Top 10, penetration testing, and security auditing.',
    longDesc: 'Conduct ethical security audits, identify web application vulnerabilities (SQLi, XSS), analyze network traffic with Wireshark, and harden systems.',
    tags: ['Ethical Hacking', 'OWASP', 'Penetration Testing', 'Security'],
    totalTasks: 5,
    category: 'Core',
    popular: true,
  },
];

export const INITIAL_TASKS: TaskItem[] = [
  // Java Full Stack Tasks
  {
    id: 'task-jfs-01',
    domainId: 'java-fullstack',
    taskNumber: 'TASK-JFS-01',
    title: 'Build RESTful User Authentication Microservice',
    description: 'Implement secure signup, login, and JWT token issuance using Spring Security and MySQL.',
    requirements: [
      'Create User entity with encrypted password field using BCrypt',
      'Implement POST /api/auth/register and POST /api/auth/login endpoints',
      'Generate JWT tokens with 24-hour expiration on successful authentication',
      'Write unit tests for authentication service using JUnit 5 and Mockito'
    ],
    starterCode: `// Spring Boot AuthController Starter
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        // TODO: Implement authentication logic and return JWT response
        return ResponseEntity.ok().build();
    }
}`,
    difficulty: 'Intermediate',
    dueDays: 3,
    status: 'in_progress',
    points: 150,
  },
  {
    id: 'task-jfs-02',
    domainId: 'java-fullstack',
    taskNumber: 'TASK-JFS-02',
    title: 'Design Spring Data JPA Relational Schema',
    description: 'Create multi-table entities for Order, Product, and Customer with JPA relationships (@OneToMany, @ManyToOne).',
    requirements: [
      'Define Customer, Order, and OrderItem JPA models with proper audit fields',
      'Configure cascading operations and fetch types efficiently to avoid N+1 query problems',
      'Write custom JPQL queries for retrieving order analytics by customer date ranges'
    ],
    starterCode: `@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // TODO: Add relationships and fields
}`,
    difficulty: 'Intermediate',
    dueDays: 5,
    status: 'todo',
    points: 200,
  },
  {
    id: 'task-jfs-03',
    domainId: 'java-fullstack',
    taskNumber: 'TASK-JFS-03',
    title: 'React Dashboard Integration with Spring API',
    description: 'Connect a React dashboard component to fetch paginated Spring Boot API data with loading & error boundaries.',
    requirements: [
      'Use Axios or fetch with Bearer token header interceptor',
      'Implement client-side pagination and field filtering controls',
      'Add skeleton loading states and toast notifications on API errors'
    ],
    starterCode: `import React, { useEffect, useState } from 'react';

export function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // TODO: Implement fetch with authorization header
  return <div>Order Table</div>;
}`,
    difficulty: 'Beginner',
    dueDays: 2,
    status: 'completed',
    points: 100,
    submission: {
      id: 'sub-01',
      taskId: 'task-jfs-03',
      submittedAt: '2026-07-20T14:22:00Z',
      codeOrContent: `// Complete Axios connection with custom Bearer token
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/orders?page=0&size=10', {
      headers: { Authorization: \`Bearer \${token}\` }
    }).then(res => {
      setOrders(res.data.content);
      setLoading(false);
    });
  }, []);

  return <div>{loading ? 'Loading...' : JSON.stringify(orders)}</div>;
}`,
      aiReview: {
        score: 95,
        feedback: 'Excellent integration of Axios with Bearer token header and pagination params!',
        strengths: ['Proper Authorization header usage', 'State management for loading', 'Pagination query params included'],
        improvements: ['Add error handling catch block for network failures'],
        passed: true,
      }
    },
    mentorFeedback: {
      id: 'mf-01',
      taskId: 'task-jfs-03',
      mentorName: 'Vikram Sharma (Lead Java Architect)',
      status: 'approved',
      grade: 'A+',
      comments: 'Great work! Clean API consumption. Approved to proceed to next task.',
      reviewedAt: '2026-07-21T09:15:00Z',
    }
  },

  // MERN Stack Tasks
  {
    id: 'task-mern-01',
    domainId: 'mern-stack',
    taskNumber: 'TASK-MERN-01',
    title: 'Build Express & MongoDB E-Commerce REST API',
    description: 'Create CRUD operations for product inventory with Mongoose schemas, pagination, and sorting.',
    requirements: [
      'Create Mongoose schema with field validation, index on category and price',
      'Implement search query filter with regex matching and range queries',
      'Add central express error handler middleware'
    ],
    starterCode: `const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products
router.get('/', async (req, res) => {
  // TODO: Implement pagination, category filter, and sorting
});`,
    difficulty: 'Intermediate',
    dueDays: 4,
    status: 'in_progress',
    points: 150,
  },
  {
    id: 'task-mern-02',
    domainId: 'mern-stack',
    taskNumber: 'TASK-MERN-02',
    title: 'Implement JWT Auth & Cookie Session Management',
    description: 'Build secure authentication using HTTP-only cookies, refresh tokens, and password hashing with Argon2/BCrypt.',
    requirements: [
      'Issue access token (15m expiration) and refresh token (7d expiration)',
      'Store refresh token securely in httpOnly samesite cookie',
      'Create middleware to guard protected API routes'
    ],
    difficulty: 'Advanced',
    dueDays: 6,
    status: 'todo',
    points: 250,
  },

  // Data Science Tasks
  {
    id: 'task-ds-01',
    domainId: 'data-science',
    taskNumber: 'TASK-DS-01',
    title: 'Exploratory Data Analysis & Feature Engineering',
    description: 'Clean raw customer churn dataset, handle missing values, and engineer predictive features.',
    requirements: [
      'Load CSV data using Pandas and perform distribution analysis',
      'Impute missing values using median/mode stratifying by demographic',
      'Apply One-Hot Encoding for categorical attributes and MinMax scaling'
    ],
    starterCode: `import pandas as pd
import numpy as np

def clean_and_engineer(csv_path):
    df = pd.read_csv(csv_path)
    # TODO: Perform missing value imputation & feature encoding
    return df`,
    difficulty: 'Beginner',
    dueDays: 3,
    status: 'todo',
    points: 120,
  },

  // DSA Tasks
  {
    id: 'task-dsa-01',
    domainId: 'dsa',
    taskNumber: 'TASK-DSA-01',
    title: 'Optimal LRU Cache Implementation',
    description: 'Implement a Least Recently Used (LRU) Cache with O(1) time complexity for both get and put operations using Hash Map + Doubly Linked List.',
    requirements: [
      'Achieve O(1) lookup using hash table',
      'Achieve O(1) insertion & deletion ordering using custom Doubly Linked List',
      'Handle edge cases: capacity = 1, duplicate keys, cache overflow'
    ],
    starterCode: `class LRUCache {
private:
    int capacity;
    // TODO: Declare doubly linked list and hashmap structures
public:
    LRUCache(int cap) : capacity(cap) {}
    
    int get(int key) {
        return -1;
    }
    
    void put(int key, int value) {
    }
};`,
    difficulty: 'Advanced',
    dueDays: 2,
    status: 'in_progress',
    points: 200,
  },

  // AI Engineering Tasks
  {
    id: 'task-ai-01',
    domainId: 'ai-engineering',
    taskNumber: 'TASK-AI-01',
    title: 'Build a RAG Search Pipeline with Vector Embeddings',
    description: 'Construct a Retrieval-Augmented Generation system using text embeddings, vector similarity search, and Gemini API.',
    requirements: [
      'Chunk document corpus into 500-token windows with 50-token overlap',
      'Generate embeddings for chunks and store in vector index',
      'Perform cosine similarity lookup on user query and augment prompt context for Gemini'
    ],
    starterCode: `import { GoogleGenAI } from "@google/genai";

async function queryRAGPipeline(userQuery: string, documentChunks: string[]) {
  // TODO: Embed query, calculate vector similarity, and synthesize response
}`,
    difficulty: 'Advanced',
    dueDays: 4,
    status: 'todo',
    points: 220,
  }
];

export const INITIAL_CERTIFICATES: CertificateData[] = [
  {
    id: 'cert-01',
    studentName: 'Shubham Dalvi',
    studentEmail: 'shubhamdalvi7218@gmail.com',
    domainId: 'java-fullstack',
    domainTitle: 'Java Full Stack Internship',
    issuedAt: '2026-07-15',
    tasksCompleted: 14,
    verificationCode: 'AXT-2026-JFS-0142',
    grade: 'Distinction (A+)',
    mentorSignature: 'Dr. Rajesh Nair, VP Engineering',
  }
];
