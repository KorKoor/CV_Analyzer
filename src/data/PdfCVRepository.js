import fs from 'fs/promises';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');
import { CVRepository } from '../core/repositories/CVRepository.js';

export class PdfCVRepository extends CVRepository {
  constructor() {
    super();

    // ===================================================================
    // CATÁLOGO MAESTRO KORWORK — EDICIÓN COMPLETA
    // Cubre: inglés · español · abreviaciones · Jr / Mid / Senior / Lead
    // ===================================================================
    this.skillCatalog = [

      // ─────────────────────────────────────────────
      // ANDROID
      // ─────────────────────────────────────────────
      "Kotlin", "Android", "Android SDK", "Android Studio",
      "Jetpack Compose", "Jetpack", "Compose",
      "Kotlin Multiplatform", "KMP", "KMM",
      "Coroutines", "Flow", "LiveData", "ViewModel",
      "Dagger", "Hilt", "Koin",
      "Retrofit", "OkHttp",
      "Room", "DataStore", "Navigation Component",
      "WorkManager", "View Binding", "Data Binding",
      "CameraX", "Google Maps SDK",
      "MVVM", "MVI", "MVC", "MVP",

      // ─────────────────────────────────────────────
      // iOS / APPLE
      // ─────────────────────────────────────────────
      "Swift", "SwiftUI", "UIKit", "Objective-C", "Objective C", "ObjC",
      "iOS", "Xcode", "Core Data", "CoreData", "Combine",
      "VIPER", "TestFlight", "CocoaPods", "Swift Package Manager", "SPM",
      "watchOS", "tvOS", "macOS",

      // ─────────────────────────────────────────────
      // MOBILE CROSS-PLATFORM
      // ─────────────────────────────────────────────
      "Flutter", "Dart", "React Native", "Expo",
      "Ionic", "Capacitor", "Xamarin", ".NET MAUI", "MAUI",
      "Cross-platform", "Cross platform", "Multiplataforma",

      // ─────────────────────────────────────────────
      // FRONTEND — FRAMEWORKS & LIBRARIES
      // ─────────────────────────────────────────────
      "React", "React.js", "ReactJS",
      "Next.js", "NextJS",
      "Remix", "Gatsby", "Astro", "Qwik",
      "Vue", "Vue.js", "VueJS", "Nuxt", "Nuxt.js",
      "Angular", "AngularJS",
      "Svelte", "SvelteKit",
      "Solid.js", "SolidJS", "Preact",
      "Lit", "Web Components", "Stencil",
      "Alpine.js",

      // ─────────────────────────────────────────────
      // FRONTEND — LENGUAJES & ESTILOS
      // ─────────────────────────────────────────────
      "JavaScript", "JS", "TypeScript", "TS",
      "HTML", "HTML5", "CSS", "CSS3",
      "SASS", "SCSS", "LESS",
      "Tailwind CSS", "Tailwind", "Bootstrap",
      "Material UI", "MUI", "Chakra UI",
      "Ant Design", "Shadcn", "Radix UI",
      "Styled Components", "Emotion",
      "Storybook", "Figma", "Sketch", "Adobe XD",

      // ─────────────────────────────────────────────
      // FRONTEND — STATE, TOOLING & TESTING
      // ─────────────────────────────────────────────
      "Redux", "Zustand", "MobX", "Recoil", "Jotai",
      "Pinia", "Vuex", "RxJS",
      "TanStack Query", "React Query",
      "Apollo Client", "GraphQL",
      "Webpack", "Vite", "Rollup", "Parcel", "Babel",
      "ESLint", "Prettier",
      "Jest", "Vitest", "Cypress", "Playwright",
      "Testing Library", "React Testing Library",
      "PWA", "Progressive Web App",

      // ─────────────────────────────────────────────
      // BACKEND — NODE / JS
      // ─────────────────────────────────────────────
      "Node.js", "NodeJS", "Node",
      "Express", "Express.js",
      "Fastify", "NestJS", "Nest.js",
      "Hono", "Koa", "Bun", "Deno",

      // ─────────────────────────────────────────────
      // BACKEND — PYTHON
      // ─────────────────────────────────────────────
      "Python", "Django", "Flask", "FastAPI",
      "SQLAlchemy", "Celery", "Pydantic",
      "Pandas", "NumPy",

      // ─────────────────────────────────────────────
      // BACKEND — JAVA
      // ─────────────────────────────────────────────
      "Java", "Spring Boot", "Spring", "Spring Cloud",
      "Spring MVC", "Spring Security",
      "Hibernate", "Maven", "Gradle", "JPA", "JUnit",
      "Quarkus", "Micronaut",

      // ─────────────────────────────────────────────
      // BACKEND — .NET / C#
      // ─────────────────────────────────────────────
      "C#", ".NET", "ASP.NET Core", "ASP.NET",
      "Blazor", "Entity Framework", "EF Core",
      "WPF", "WinForms", "LINQ", "NUnit",

      // ─────────────────────────────────────────────
      // BACKEND — PHP
      // ─────────────────────────────────────────────
      "PHP", "Laravel", "Symfony", "CodeIgniter",
      "WordPress", "WooCommerce", "Composer", "Magento",

      // ─────────────────────────────────────────────
      // BACKEND — GO
      // ─────────────────────────────────────────────
      "Go", "Golang", "Gin", "Echo", "Fiber",

      // ─────────────────────────────────────────────
      // BACKEND — RUBY
      // ─────────────────────────────────────────────
      "Ruby", "Ruby on Rails", "Rails", "RoR", "Sinatra", "RSpec",

      // ─────────────────────────────────────────────
      // BACKEND — OTROS LENGUAJES
      // ─────────────────────────────────────────────
      "Rust", "C++", "Elixir", "Phoenix",
      "Scala", "Akka", "Haskell", "Clojure",
      "F#", "Lua", "Perl", "Groovy",

      // ─────────────────────────────────────────────
      // API & INTEGRACIONES
      // ─────────────────────────────────────────────
      "REST", "RESTful", "API REST",
      "GraphQL", "gRPC", "WebSockets", "Socket.io",
      "SOAP", "Webhooks", "OpenAPI", "Swagger",
      "OAuth", "OAuth2", "JWT",
      "Stripe", "Twilio", "SendGrid",
      "Microservices", "Microservicios", "Serverless",

      // ─────────────────────────────────────────────
      // BASES DE DATOS — SQL
      // ─────────────────────────────────────────────
      "SQL", "PostgreSQL", "Postgres", "MySQL", "MariaDB",
      "SQLite", "Oracle", "Oracle DB", "SQL Server", "MSSQL",
      "T-SQL", "TSQL", "PL/SQL",
      "CockroachDB", "Supabase", "PlanetScale",
      "Prisma", "TypeORM", "Sequelize", "Mongoose",

      // ─────────────────────────────────────────────
      // BASES DE DATOS — NoSQL
      // ─────────────────────────────────────────────
      "MongoDB", "Mongo", "NoSQL",
      "Redis", "Memcached", "Cassandra",
      "DynamoDB", "Firebase", "Firestore", "Realtime Database",
      "Elasticsearch", "CouchDB", "Neo4j", "InfluxDB", "Fauna",

      // ─────────────────────────────────────────────
      // CLOUD — AWS
      // ─────────────────────────────────────────────
      "AWS", "Amazon Web Services",
      "Lambda", "EC2", "S3", "RDS", "ECS", "EKS",
      "CloudFormation", "CDK", "SQS", "SNS",
      "API Gateway", "Cognito", "CloudWatch", "Route 53",

      // ─────────────────────────────────────────────
      // CLOUD — GCP
      // ─────────────────────────────────────────────
      "Google Cloud", "GCP",
      "Cloud Run", "Cloud Functions", "BigQuery",
      "Pub/Sub", "GKE", "Vertex AI",

      // ─────────────────────────────────────────────
      // CLOUD — AZURE
      // ─────────────────────────────────────────────
      "Azure", "Microsoft Azure",
      "Azure DevOps", "Azure Functions", "AKS",
      "Azure Blob", "Cosmos DB", "CosmosDB",

      // ─────────────────────────────────────────────
      // CLOUD — OTROS PROVEEDORES
      // ─────────────────────────────────────────────
      "Vercel", "Netlify", "Heroku", "DigitalOcean",
      "Linode", "Cloudflare", "Serverless Framework",
      "Firebase Hosting",

      // ─────────────────────────────────────────────
      // DEVOPS & INFRAESTRUCTURA
      // ─────────────────────────────────────────────
      "Docker", "Kubernetes", "K8s", "Helm",
      "CI/CD", "GitHub Actions", "GitLab CI",
      "Jenkins", "CircleCI", "Travis CI",
      "ArgoCD", "Argo CD",
      "Terraform", "Pulumi", "Ansible", "Chef", "Puppet",
      "Prometheus", "Grafana", "Datadog", "New Relic", "Splunk",
      "ELK Stack", "ELK", "Istio",
      "Nginx", "Apache", "Linux", "Unix", "Bash", "Shell",
      "SRE", "Site Reliability",
      "IaC", "Infrastructure as Code", "Infraestructura como código",

      // ─────────────────────────────────────────────
      // DATA & BI
      // ─────────────────────────────────────────────
      "Power BI", "PowerBI", "Tableau", "Looker", "Metabase",
      "dbt", "Airflow", "Apache Airflow",
      "Spark", "Apache Spark", "Kafka", "Apache Kafka",
      "Flink", "Apache Flink", "Hadoop", "Hive",
      "Databricks", "Snowflake", "dbt Core",
      "ETL", "ELT", "Data Warehouse", "Data Lake", "Data Pipeline",
      "Pipeline de datos",

      // ─────────────────────────────────────────────
      // IA / ML / DATA SCIENCE
      // ─────────────────────────────────────────────
      "Machine Learning", "Deep Learning",
      "TensorFlow", "PyTorch", "Scikit-learn", "Sklearn", "Keras",
      "HuggingFace", "Hugging Face",
      "LangChain", "LlamaIndex", "OpenAI", "GPT", "LLM", "RAG",
      "Computer Vision", "NLP", "Natural Language Processing",
      "Procesamiento de lenguaje", "MLOps",
      "Data Science", "Ciencia de datos", "Data Scientist",
      "Jupyter", "Matplotlib", "Seaborn", "Plotly",
      "Estadística", "Statistics",
      "Prompt Engineering", "Vector DB",
      "Pinecone", "Weaviate", "Chroma", "Embeddings",

      // ─────────────────────────────────────────────
      // ARQUITECTURA & DISEÑO DE SOFTWARE
      // ─────────────────────────────────────────────
      "Clean Architecture", "Arquitectura Limpia",
      "Hexagonal Architecture",
      "DDD", "Domain Driven Design", "Domain-Driven Design",
      "SOLID", "DRY", "KISS",
      "Design Patterns", "Patrones de Diseño",
      "CQRS", "Event Sourcing", "Event-Driven", "Event Driven",
      "Microservices Architecture", "Serverless Architecture",
      "SOA", "Service-Oriented",
      "TDD", "BDD", "Test-Driven",
      "Unit Testing", "Integration Testing", "UI Testing",
      "Pruebas Unitarias", "Pruebas de Integración",
      "API Design", "System Design", "Diseño de sistemas",

      // ─────────────────────────────────────────────
      // TESTING & QA
      // ─────────────────────────────────────────────
      "QA", "Quality Assurance", "Aseguramiento de calidad",
      "Jest", "Vitest", "Cypress", "Playwright",
      "JUnit", "Espresso", "Mockk", "Mockito",
      "Selenium", "Appium",
      "Postman", "Insomnia", "SoapUI",
      "JMeter", "k6", "Gatling", "LoadRunner",
      "TestRail",
      "Manual Testing", "Pruebas manuales",
      "Automation Testing", "Pruebas automatizadas",
      "Performance Testing", "Load Testing", "Security Testing",
      "E2E", "End-to-End",

      // ─────────────────────────────────────────────
      // SEGURIDAD (CYBERSECURITY)
      // ─────────────────────────────────────────────
      "Cybersecurity", "Ciberseguridad", "Seguridad informática",
      "Pentesting", "Penetration Testing",
      "OWASP", "Ethical Hacking", "Hacking ético",
      "SOC", "SIEM", "Vulnerability", "Vulnerabilidades",
      "Burp Suite", "Metasploit", "Wireshark", "Nmap",
      "Zero Trust", "PKI", "CISSP", "CEH",

      // ─────────────────────────────────────────────
      // CONTROL DE VERSIONES & HERRAMIENTAS
      // ─────────────────────────────────────────────
      "Git", "GitHub", "GitLab", "Bitbucket", "SVN", "Subversion",
      "Gitflow", "Trunk-based",
      "Jira", "Trello", "Confluence", "Notion", "Linear", "Asana",
      "Swagger", "Postman", "Insomnia",
      "VS Code", "IntelliJ IDEA", "Android Studio", "Xcode",
      "Canva",

      // ─────────────────────────────────────────────
      // GESTIÓN & LIDERAZGO TÉCNICO
      // ─────────────────────────────────────────────
      "Tech Lead", "Technical Lead", "Technical Leader",
      "Líder técnico", "Liderazgo técnico",
      "Engineering Manager", "CTO", "VP Engineering",
      "Team Lead", "Team Leader",
      "Software Architect", "Arquitecto de software",
      "Solutions Architect", "Arquitecto de soluciones",
      "Principal Engineer", "Staff Engineer",
      "Code Review", "Revisión de código",
      "Mentoring", "Mentor", "Mentoría",
      "Pair programming",

      // ─────────────────────────────────────────────
      // METODOLOGÍAS & GESTIÓN DE PROYECTOS
      // ─────────────────────────────────────────────
      "Agile", "Metodologías ágiles",
      "Scrum", "Scrum Master", "Kanban",
      "SAFe", "XP", "Extreme Programming",
      "Product Owner", "PMP", "PMI",
      "Jira", "Confluence", "Notion", "Trello", "Linear", "Asana",

      // ─────────────────────────────────────────────
      // IDIOMAS
      // ─────────────────────────────────────────────
      "English", "Inglés",
      "Advanced English", "Inglés Avanzado",
      "Inglés fluido", "Fluent English",
      "English B2", "English C1", "English C2",
      "B2", "C1", "C2",
      "IELTS", "TOEFL",
      "Bilingual", "Bilingüe",
      "Portugués", "Portuguese",
      "Francés", "French",

      // ─────────────────────────────────────────────
      // SENIORITY (DETECCIÓN DIRECTA)
      // ─────────────────────────────────────────────
      "Junior Developer", "Junior Engineer",
      "Jr Developer", "Jr. Developer", "Jr Engineer",
      "Junior", "Jr.", "Jr",
      "Mid Developer", "Mid-Level", "Mid Level",
      "Semi Senior", "Semi-Senior", "Ssr", "SSr.",
      "Senior Developer", "Senior Engineer", "Senior Software",
      "Senior", "Sr Developer", "Sr. Developer", "Sr Engineer",
      "Sr.", "Sr",
      "Lead Developer", "Lead Engineer", "Lead Software",
      "Principal Developer",
      "3+ years", "5+ years", "8+ years", "10+ years",
      "3 años", "5 años", "8 años", "10 años",

      // ─────────────────────────────────────────────
      // SOFT SKILLS
      // ─────────────────────────────────────────────
      "Leadership", "Liderazgo",
      "Teamwork", "Trabajo en equipo",
      "Communication", "Comunicación",
      "Problem Solving", "Resolución de problemas",
      "Critical Thinking", "Pensamiento crítico",
      "Adaptability", "Adaptabilidad",
      "Time Management", "Gestión del tiempo",
      "Creativity", "Creatividad",
      "Empathy", "Empatía",

      // ─────────────────────────────────────────────
      // BLOCKCHAIN / WEB3
      // ─────────────────────────────────────────────
      "Blockchain", "Web3", "Solidity", "Ethereum",
      "Smart Contracts", "Contratos inteligentes",
      "NFT", "DeFi", "Hardhat", "Truffle", "IPFS",

      // ─────────────────────────────────────────────
      // EMBEBIDOS / IoT
      // ─────────────────────────────────────────────
      "Arduino", "Raspberry Pi", "Embedded", "Embebido",
      "IoT", "RTOS", "Firmware", "FPGA",
      "Microcontroller", "Microcontrolador",

      // ─────────────────────────────────────────────
      // GAME DEV
      // ─────────────────────────────────────────────
      "Unity", "Unreal Engine", "Unreal", "Godot",
      "Game Development", "Desarrollo de videojuegos",
      "Shader", "HLSL", "GLSL",

      // ─────────────────────────────────────────────
      // CERTIFICACIONES
      // ─────────────────────────────────────────────
      "AWS Certified", "Google Certified",
      "CKA", "CKS", "CKAD",
      "Terraform Associate",
      "AZ-900", "AZ-204", "AZ-400",
      "PCEP", "PCAP",
      "Oracle Certified", "OCA", "OCP",
    ];
  }

  async parse(filePath) {
    try {
      await fs.access(filePath);
      const dataBuffer = await fs.readFile(filePath);
      const data = await pdf(dataBuffer);

      // Normalizamos el texto del PDF una sola vez
      const textForAnalysis = this._normalize(data.text);

      // Ordenamos de mayor a menor longitud para que "React Native"
      // se evalúe antes que "React", "Spring Boot" antes que "Spring", etc.
      const sortedCatalog = [...this.skillCatalog].sort((a, b) => b.length - a.length);

      const detected = [];

      for (const skill of sortedCatalog) {
        const normalizedSkill = this._normalize(skill);
        // Lookahead/lookbehind personalizado para que C#, .NET, Node.js hagan match correctamente
        const escaped = normalizedSkill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(?<![\\w.#@])${escaped}(?![\\w.#@])`, 'gi');

        if (regex.test(textForAnalysis)) {
          detected.push(skill);
        }
      }

      return {
        name: this._extractName(data.text),
        skills: detected.length > 0 ? detected : ["Software Development"]
      };

    } catch (error) {
      throw new Error(`Error procesando CV: ${error.message}`);
    }
  }

  _normalize(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Quita acentos
      .replace(/\s+/g, ' ')
      .trim();
  }

  _extractName(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    return lines[0]?.substring(0, 35) || "Candidato";
  }
}