import { CVRepository } from '../core/repositories/CVRepository.js';

export class WebPdfRepository extends CVRepository {
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
      { id: "Kotlin",               title: "Android Developer" },
      { id: "Android SDK",          title: "Android Developer" },
      { id: "Android Studio",       title: "Android Developer" },
      { id: "Android",              title: "Android Developer" },
      { id: "Jetpack Compose",      title: "Mobile UI Engineer" },
      { id: "Jetpack",              title: "Android Developer" },
      { id: "Room",                 title: "Android Developer" },
      { id: "WorkManager",          title: "Android Developer" },
      { id: "Hilt",                 title: "Android Developer" },
      { id: "Dagger",               title: "Android Developer" },
      { id: "Retrofit",             title: "Android Developer" },
      { id: "OkHttp",               title: "Android Developer" },
      { id: "Coroutines",           title: "Android Developer" },
      { id: "LiveData",             title: "Android Developer" },
      { id: "ViewModel",            title: "Android Developer" },
      { id: "MVVM",                 title: "Android Developer" },
      { id: "MVI",                  title: "Android Developer" },
      { id: "KMP",                  title: "Kotlin Multiplatform Engineer" },
      { id: "Kotlin Multiplatform", title: "Kotlin Multiplatform Engineer" },
      { id: "KMM",                  title: "Kotlin Multiplatform Engineer" },

      // ─────────────────────────────────────────────
      // iOS / APPLE
      // ─────────────────────────────────────────────
      { id: "Swift",                title: "iOS Developer" },
      { id: "SwiftUI",              title: "iOS Developer" },
      { id: "Objective-C",          title: "iOS Developer" },
      { id: "Objective C",          title: "iOS Developer" },
      { id: "ObjC",                 title: "iOS Developer" },
      { id: "iOS",                  title: "iOS Developer" },
      { id: "Xcode",                title: "iOS Developer" },
      { id: "UIKit",                title: "iOS Developer" },
      { id: "CoreData",             title: "iOS Developer" },
      { id: "Core Data",            title: "iOS Developer" },
      { id: "Combine",              title: "iOS Developer" },
      { id: "VIPER",                title: "iOS Developer" },
      { id: "TestFlight",           title: "iOS Developer" },
      { id: "CocoaPods",            title: "iOS Developer" },
      { id: "SPM",                  title: "iOS Developer" },
      { id: "Swift Package Manager",title: "iOS Developer" },
      { id: "watchOS",              title: "iOS Developer" },
      { id: "tvOS",                 title: "iOS Developer" },
      { id: "macOS",                title: "macOS Developer" },

      // ─────────────────────────────────────────────
      // MOBILE CROSS-PLATFORM
      // ─────────────────────────────────────────────
      { id: "React Native",         title: "Mobile App Developer" },
      { id: "Flutter",              title: "Mobile App Developer" },
      { id: "Dart",                 title: "Mobile App Developer" },
      { id: "Ionic",                title: "Mobile App Developer" },
      { id: "Capacitor",            title: "Mobile App Developer" },
      { id: "Expo",                 title: "Mobile App Developer" },
      { id: "Xamarin",              title: "Mobile App Developer" },
      { id: "MAUI",                 title: "Mobile App Developer" },
      { id: ".NET MAUI",            title: "Mobile App Developer" },
      { id: "Cross-platform",       title: "Mobile App Developer" },
      { id: "Cross platform",       title: "Mobile App Developer" },
      { id: "Multiplataforma",      title: "Mobile App Developer" },

      // ─────────────────────────────────────────────
      // FRONTEND — FRAMEWORKS & LIBRARIES
      // ─────────────────────────────────────────────
      { id: "React",                title: "Frontend Developer" },
      { id: "React.js",             title: "Frontend Developer" },
      { id: "ReactJS",              title: "Frontend Developer" },
      { id: "Next.js",              title: "Frontend Developer" },
      { id: "NextJS",               title: "Frontend Developer" },
      { id: "Remix",                title: "Frontend Developer" },
      { id: "Gatsby",               title: "Frontend Developer" },
      { id: "Vue",                  title: "Frontend Developer" },
      { id: "Vue.js",               title: "Frontend Developer" },
      { id: "VueJS",                title: "Frontend Developer" },
      { id: "Nuxt",                 title: "Frontend Developer" },
      { id: "Nuxt.js",              title: "Frontend Developer" },
      { id: "Angular",              title: "Frontend Developer" },
      { id: "AngularJS",            title: "Frontend Developer" },
      { id: "Svelte",               title: "Frontend Developer" },
      { id: "SvelteKit",            title: "Frontend Developer" },
      { id: "Astro",                title: "Frontend Developer" },
      { id: "Qwik",                 title: "Frontend Developer" },
      { id: "Solid.js",             title: "Frontend Developer" },
      { id: "SolidJS",              title: "Frontend Developer" },
      { id: "Lit",                  title: "Frontend Developer" },
      { id: "Web Components",       title: "Frontend Developer" },
      { id: "Stencil",              title: "Frontend Developer" },
      { id: "Preact",               title: "Frontend Developer" },
      { id: "Alpine.js",            title: "Frontend Developer" },

      // ─────────────────────────────────────────────
      // FRONTEND — LENGUAJES & ESTILOS
      // ─────────────────────────────────────────────
      { id: "JavaScript",           title: "Web Developer" },
      { id: "JS",                   title: "Web Developer" },
      { id: "TypeScript",           title: "Frontend Engineer" },
      { id: "TS",                   title: "Frontend Engineer" },
      { id: "HTML",                 title: "Web Developer" },
      { id: "HTML5",                title: "Web Developer" },
      { id: "CSS",                  title: "Web UI Developer" },
      { id: "CSS3",                 title: "Web UI Developer" },
      { id: "SASS",                 title: "Web UI Developer" },
      { id: "SCSS",                 title: "Web UI Developer" },
      { id: "LESS",                 title: "Web UI Developer" },
      { id: "Tailwind",             title: "UI/UX Developer" },
      { id: "Tailwind CSS",         title: "UI/UX Developer" },
      { id: "Bootstrap",            title: "Web UI Developer" },
      { id: "Material UI",          title: "UI/UX Developer" },
      { id: "MUI",                  title: "UI/UX Developer" },
      { id: "Chakra UI",            title: "UI/UX Developer" },
      { id: "Ant Design",           title: "UI/UX Developer" },
      { id: "Shadcn",               title: "UI/UX Developer" },
      { id: "Radix UI",             title: "UI/UX Developer" },
      { id: "Styled Components",    title: "UI/UX Developer" },
      { id: "Emotion",              title: "UI/UX Developer" },
      { id: "Storybook",            title: "Frontend Engineer" },
      { id: "Figma",                title: "UI/UX Developer" },
      { id: "Sketch",               title: "UI/UX Developer" },
      { id: "Adobe XD",             title: "UI/UX Developer" },

      // ─────────────────────────────────────────────
      // FRONTEND — STATE & TOOLING
      // ─────────────────────────────────────────────
      { id: "Redux",                title: "Frontend Engineer" },
      { id: "Zustand",              title: "Frontend Engineer" },
      { id: "MobX",                 title: "Frontend Engineer" },
      { id: "Recoil",               title: "Frontend Engineer" },
      { id: "Jotai",                title: "Frontend Engineer" },
      { id: "Pinia",                title: "Frontend Engineer" },
      { id: "Vuex",                 title: "Frontend Engineer" },
      { id: "RxJS",                 title: "Frontend Engineer" },
      { id: "GraphQL",              title: "Frontend Engineer" },
      { id: "Apollo Client",        title: "Frontend Engineer" },
      { id: "Webpack",              title: "Frontend Engineer" },
      { id: "Vite",                 title: "Frontend Engineer" },
      { id: "Rollup",               title: "Frontend Engineer" },
      { id: "Parcel",               title: "Frontend Engineer" },
      { id: "Babel",                title: "Frontend Engineer" },
      { id: "ESLint",               title: "Frontend Engineer" },
      { id: "Prettier",             title: "Frontend Engineer" },
      { id: "Jest",                 title: "Frontend Engineer" },
      { id: "Vitest",               title: "Frontend Engineer" },
      { id: "Cypress",              title: "Frontend Engineer" },
      { id: "Playwright",           title: "Frontend Engineer" },
      { id: "Testing Library",      title: "Frontend Engineer" },
      { id: "PWA",                  title: "Frontend Engineer" },
      { id: "Progressive Web App",  title: "Frontend Engineer" },

      // ─────────────────────────────────────────────
      // BACKEND — NODE / JS
      // ─────────────────────────────────────────────
      { id: "Node.js",              title: "Backend Developer" },
      { id: "NodeJS",               title: "Backend Developer" },
      { id: "Node",                 title: "Backend Developer" },
      { id: "Express",              title: "Backend Developer" },
      { id: "Express.js",           title: "Backend Developer" },
      { id: "Fastify",              title: "Backend Developer" },
      { id: "NestJS",               title: "Backend Developer" },
      { id: "Nest.js",              title: "Backend Developer" },
      { id: "Hono",                 title: "Backend Developer" },
      { id: "Koa",                  title: "Backend Developer" },
      { id: "Bun",                  title: "Backend Developer" },
      { id: "Deno",                 title: "Backend Developer" },

      // ─────────────────────────────────────────────
      // BACKEND — PYTHON
      // ─────────────────────────────────────────────
      { id: "Python",               title: "Python Developer" },
      { id: "Django",               title: "Python Developer" },
      { id: "Flask",                title: "Python Developer" },
      { id: "FastAPI",              title: "Python Developer" },
      { id: "SQLAlchemy",           title: "Python Developer" },
      { id: "Celery",               title: "Python Developer" },
      { id: "Pandas",               title: "Data Engineer" },
      { id: "NumPy",                title: "Data Engineer" },
      { id: "Pydantic",             title: "Python Developer" },

      // ─────────────────────────────────────────────
      // BACKEND — JAVA
      // ─────────────────────────────────────────────
      { id: "Java",                 title: "Java Backend Engineer" },
      { id: "Spring Boot",          title: "Java Backend Engineer" },
      { id: "Spring",               title: "Java Backend Engineer" },
      { id: "Spring MVC",           title: "Java Backend Engineer" },
      { id: "Spring Security",      title: "Java Backend Engineer" },
      { id: "Hibernate",            title: "Java Backend Engineer" },
      { id: "Maven",                title: "Java Backend Engineer" },
      { id: "Gradle",               title: "Java Backend Engineer" },
      { id: "JPA",                  title: "Java Backend Engineer" },
      { id: "JUnit",                title: "Java Backend Engineer" },
      { id: "Quarkus",              title: "Java Backend Engineer" },
      { id: "Micronaut",            title: "Java Backend Engineer" },

      // ─────────────────────────────────────────────
      // BACKEND — .NET / C#
      // ─────────────────────────────────────────────
      { id: "C#",                   title: ".NET Developer" },
      { id: ".NET",                 title: ".NET Developer" },
      { id: "ASP.NET",              title: ".NET Developer" },
      { id: "ASP.NET Core",         title: ".NET Developer" },
      { id: "Blazor",               title: ".NET Developer" },
      { id: "Entity Framework",     title: ".NET Developer" },
      { id: "EF Core",              title: ".NET Developer" },
      { id: "WPF",                  title: ".NET Developer" },
      { id: "WinForms",             title: ".NET Developer" },
      { id: "LINQ",                 title: ".NET Developer" },
      { id: "NUnit",                title: ".NET Developer" },

      // ─────────────────────────────────────────────
      // BACKEND — PHP
      // ─────────────────────────────────────────────
      { id: "PHP",                  title: "PHP Developer" },
      { id: "Laravel",              title: "PHP Developer" },
      { id: "Symfony",              title: "PHP Developer" },
      { id: "CodeIgniter",          title: "PHP Developer" },
      { id: "WordPress",            title: "PHP Developer" },
      { id: "WooCommerce",          title: "PHP Developer" },
      { id: "Composer",             title: "PHP Developer" },
      { id: "Magento",              title: "PHP Developer" },

      // ─────────────────────────────────────────────
      // BACKEND — GO
      // ─────────────────────────────────────────────
      { id: "Go",                   title: "Golang Developer" },
      { id: "Golang",               title: "Golang Developer" },
      { id: "Gin",                  title: "Golang Developer" },
      { id: "Echo",                 title: "Golang Developer" },
      { id: "Fiber",                title: "Golang Developer" },

      // ─────────────────────────────────────────────
      // BACKEND — RUBY
      // ─────────────────────────────────────────────
      { id: "Ruby",                 title: "Ruby Developer" },
      { id: "Ruby on Rails",        title: "Ruby Developer" },
      { id: "Rails",                title: "Ruby Developer" },
      { id: "RoR",                  title: "Ruby Developer" },
      { id: "Sinatra",              title: "Ruby Developer" },
      { id: "RSpec",                title: "Ruby Developer" },

      // ─────────────────────────────────────────────
      // BACKEND — OTROS
      // ─────────────────────────────────────────────
      { id: "Rust",                 title: "Systems Developer" },
      { id: "C++",                  title: "Systems Developer" },
      { id: "C",                    title: "Systems Developer" },
      { id: "Elixir",               title: "Backend Developer" },
      { id: "Phoenix",              title: "Backend Developer" },
      { id: "Scala",                title: "Backend Developer" },
      { id: "Akka",                 title: "Backend Developer" },
      { id: "Haskell",              title: "Backend Developer" },
      { id: "Clojure",              title: "Backend Developer" },
      { id: "F#",                   title: ".NET Developer" },
      { id: "Lua",                  title: "Backend Developer" },
      { id: "Perl",                 title: "Backend Developer" },
      { id: "Groovy",               title: "Backend Developer" },
      { id: "Kotlin Backend",       title: "Backend Developer" },

      // ─────────────────────────────────────────────
      // API & INTEGRACIONES
      // ─────────────────────────────────────────────
      { id: "REST",                 title: "Backend Developer" },
      { id: "RESTful",              title: "Backend Developer" },
      { id: "API REST",             title: "Backend Developer" },
      { id: "GraphQL",              title: "Backend Developer" },
      { id: "gRPC",                 title: "Backend Developer" },
      { id: "WebSockets",           title: "Backend Developer" },
      { id: "SOAP",                 title: "Backend Developer" },
      { id: "Webhooks",             title: "Backend Developer" },
      { id: "OpenAPI",              title: "Backend Developer" },
      { id: "Swagger",              title: "Backend Developer" },
      { id: "OAuth",                title: "Backend Developer" },
      { id: "OAuth2",               title: "Backend Developer" },
      { id: "JWT",                  title: "Backend Developer" },
      { id: "Stripe",               title: "Backend Developer" },
      { id: "Twilio",               title: "Backend Developer" },
      { id: "SendGrid",             title: "Backend Developer" },

      // ─────────────────────────────────────────────
      // BASES DE DATOS — SQL
      // ─────────────────────────────────────────────
      { id: "SQL",                  title: "Database Administrator" },
      { id: "PostgreSQL",           title: "Database Engineer" },
      { id: "Postgres",             title: "Database Engineer" },
      { id: "MySQL",                title: "Database Engineer" },
      { id: "MariaDB",              title: "Database Engineer" },
      { id: "SQLite",               title: "Database Engineer" },
      { id: "Oracle",               title: "Database Administrator" },
      { id: "Oracle DB",            title: "Database Administrator" },
      { id: "SQL Server",           title: "Database Administrator" },
      { id: "MSSQL",                title: "Database Administrator" },
      { id: "TSQL",                 title: "Database Administrator" },
      { id: "T-SQL",                title: "Database Administrator" },
      { id: "PL/SQL",               title: "Database Administrator" },
      { id: "CockroachDB",          title: "Database Engineer" },
      { id: "Supabase",             title: "Database Engineer" },
      { id: "PlanetScale",          title: "Database Engineer" },

      // ─────────────────────────────────────────────
      // BASES DE DATOS — NoSQL
      // ─────────────────────────────────────────────
      { id: "MongoDB",              title: "Database Engineer" },
      { id: "Mongo",                title: "Database Engineer" },
      { id: "Redis",                title: "Backend Developer" },
      { id: "Memcached",            title: "Backend Developer" },
      { id: "Cassandra",            title: "Database Engineer" },
      { id: "DynamoDB",             title: "Cloud Engineer" },
      { id: "Firebase",             title: "Backend Developer" },
      { id: "Firestore",            title: "Backend Developer" },
      { id: "Elasticsearch",        title: "Backend Developer" },
      { id: "ElasticSearch",        title: "Backend Developer" },
      { id: "CouchDB",              title: "Database Engineer" },
      { id: "Neo4j",                title: "Database Engineer" },
      { id: "InfluxDB",             title: "Data Engineer" },
      { id: "Fauna",                title: "Database Engineer" },

      // ─────────────────────────────────────────────
      // CLOUD — AWS
      // ─────────────────────────────────────────────
      { id: "AWS",                  title: "Cloud Engineer" },
      { id: "Amazon Web Services",  title: "Cloud Engineer" },
      { id: "Lambda",               title: "Cloud Engineer" },
      { id: "EC2",                  title: "Cloud Engineer" },
      { id: "S3",                   title: "Cloud Engineer" },
      { id: "RDS",                  title: "Cloud Engineer" },
      { id: "ECS",                  title: "Cloud Engineer" },
      { id: "EKS",                  title: "Cloud Engineer" },
      { id: "CloudFormation",       title: "Cloud Engineer" },
      { id: "CDK",                  title: "Cloud Engineer" },
      { id: "SQS",                  title: "Cloud Engineer" },
      { id: "SNS",                  title: "Cloud Engineer" },
      { id: "API Gateway",          title: "Cloud Engineer" },
      { id: "Cognito",              title: "Cloud Engineer" },
      { id: "CloudWatch",           title: "Cloud Engineer" },
      { id: "Route 53",             title: "Cloud Engineer" },

      // ─────────────────────────────────────────────
      // CLOUD — GCP
      // ─────────────────────────────────────────────
      { id: "Google Cloud",         title: "Cloud Engineer" },
      { id: "GCP",                  title: "Cloud Engineer" },
      { id: "Cloud Run",            title: "Cloud Engineer" },
      { id: "Cloud Functions",      title: "Cloud Engineer" },
      { id: "BigQuery",             title: "Data Engineer" },
      { id: "Pub/Sub",              title: "Cloud Engineer" },
      { id: "GKE",                  title: "Cloud Engineer" },
      { id: "Vertex AI",            title: "ML Engineer" },

      // ─────────────────────────────────────────────
      // CLOUD — AZURE
      // ─────────────────────────────────────────────
      { id: "Azure",                title: "Cloud Engineer" },
      { id: "Microsoft Azure",      title: "Cloud Engineer" },
      { id: "Azure DevOps",         title: "DevOps Engineer" },
      { id: "Azure Functions",      title: "Cloud Engineer" },
      { id: "AKS",                  title: "Cloud Engineer" },
      { id: "Azure Blob",           title: "Cloud Engineer" },
      { id: "Cosmos DB",            title: "Cloud Engineer" },
      { id: "CosmosDB",             title: "Cloud Engineer" },

      // ─────────────────────────────────────────────
      // CLOUD — OTROS PROVEEDORES
      // ─────────────────────────────────────────────
      { id: "Vercel",               title: "Frontend Engineer" },
      { id: "Netlify",              title: "Frontend Engineer" },
      { id: "Heroku",               title: "Backend Developer" },
      { id: "DigitalOcean",         title: "Cloud Engineer" },
      { id: "Linode",               title: "Cloud Engineer" },
      { id: "Cloudflare",           title: "Cloud Engineer" },
      { id: "Serverless",           title: "Cloud Engineer" },
      { id: "Serverless Framework", title: "Cloud Engineer" },

      // ─────────────────────────────────────────────
      // DEVOPS & INFRAESTRUCTURA
      // ─────────────────────────────────────────────
      { id: "Docker",               title: "DevOps Engineer" },
      { id: "Kubernetes",           title: "DevOps Engineer" },
      { id: "K8s",                  title: "DevOps Engineer" },
      { id: "Helm",                 title: "DevOps Engineer" },
      { id: "CI/CD",                title: "DevOps Engineer" },
      { id: "GitHub Actions",       title: "DevOps Engineer" },
      { id: "GitLab CI",            title: "DevOps Engineer" },
      { id: "Jenkins",              title: "DevOps Engineer" },
      { id: "CircleCI",             title: "DevOps Engineer" },
      { id: "Travis CI",            title: "DevOps Engineer" },
      { id: "ArgoCD",               title: "DevOps Engineer" },
      { id: "Argo CD",              title: "DevOps Engineer" },
      { id: "Terraform",            title: "DevOps Engineer" },
      { id: "Pulumi",               title: "DevOps Engineer" },
      { id: "Ansible",              title: "DevOps Engineer" },
      { id: "Chef",                 title: "DevOps Engineer" },
      { id: "Puppet",               title: "DevOps Engineer" },
      { id: "Prometheus",           title: "DevOps Engineer" },
      { id: "Grafana",              title: "DevOps Engineer" },
      { id: "Datadog",              title: "DevOps Engineer" },
      { id: "New Relic",            title: "DevOps Engineer" },
      { id: "Splunk",               title: "DevOps Engineer" },
      { id: "ELK",                  title: "DevOps Engineer" },
      { id: "ELK Stack",            title: "DevOps Engineer" },
      { id: "Istio",                title: "DevOps Engineer" },
      { id: "Nginx",                title: "DevOps Engineer" },
      { id: "Apache",               title: "DevOps Engineer" },
      { id: "Linux",                title: "DevOps Engineer" },
      { id: "Bash",                 title: "DevOps Engineer" },
      { id: "Shell",                title: "DevOps Engineer" },
      { id: "Shell scripting",      title: "DevOps Engineer" },
      { id: "SRE",                  title: "Site Reliability Engineer" },
      { id: "Site Reliability",     title: "Site Reliability Engineer" },
      { id: "IaC",                  title: "DevOps Engineer" },
      { id: "Infrastructure as Code", title: "DevOps Engineer" },
      { id: "Infraestructura como código", title: "DevOps Engineer" },

      // ─────────────────────────────────────────────
      // DATA & BI
      // ─────────────────────────────────────────────
      { id: "Power BI",             title: "BI Developer" },
      { id: "PowerBI",              title: "BI Developer" },
      { id: "Tableau",              title: "BI Developer" },
      { id: "Looker",               title: "BI Developer" },
      { id: "Metabase",             title: "BI Developer" },
      { id: "dbt",                  title: "Data Engineer" },
      { id: "Airflow",              title: "Data Engineer" },
      { id: "Apache Airflow",       title: "Data Engineer" },
      { id: "Spark",                title: "Data Engineer" },
      { id: "Apache Spark",         title: "Data Engineer" },
      { id: "Kafka",                title: "Data Engineer" },
      { id: "Apache Kafka",         title: "Data Engineer" },
      { id: "Flink",                title: "Data Engineer" },
      { id: "Apache Flink",         title: "Data Engineer" },
      { id: "Hadoop",               title: "Data Engineer" },
      { id: "Hive",                 title: "Data Engineer" },
      { id: "Databricks",           title: "Data Engineer" },
      { id: "Snowflake",            title: "Data Engineer" },
      { id: "dbt Core",             title: "Data Engineer" },
      { id: "ETL",                  title: "Data Engineer" },
      { id: "ELT",                  title: "Data Engineer" },
      { id: "Data Warehouse",       title: "Data Engineer" },
      { id: "Data Lake",            title: "Data Engineer" },
      { id: "Data Pipeline",        title: "Data Engineer" },
      { id: "Pipeline de datos",    title: "Data Engineer" },

      // ─────────────────────────────────────────────
      // IA / ML / DATA SCIENCE
      // ─────────────────────────────────────────────
      { id: "Machine Learning",     title: "ML Engineer" },
      { id: "Deep Learning",        title: "ML Engineer" },
      { id: "TensorFlow",           title: "ML Engineer" },
      { id: "PyTorch",              title: "ML Engineer" },
      { id: "Scikit-learn",         title: "ML Engineer" },
      { id: "Sklearn",              title: "ML Engineer" },
      { id: "Keras",                title: "ML Engineer" },
      { id: "HuggingFace",          title: "ML Engineer" },
      { id: "Hugging Face",         title: "ML Engineer" },
      { id: "LangChain",            title: "AI Engineer" },
      { id: "LlamaIndex",           title: "AI Engineer" },
      { id: "OpenAI",               title: "AI Engineer" },
      { id: "GPT",                  title: "AI Engineer" },
      { id: "LLM",                  title: "AI Engineer" },
      { id: "RAG",                  title: "AI Engineer" },
      { id: "Computer Vision",      title: "ML Engineer" },
      { id: "NLP",                  title: "ML Engineer" },
      { id: "Natural Language Processing", title: "ML Engineer" },
      { id: "Procesamiento de lenguaje", title: "ML Engineer" },
      { id: "MLOps",                title: "ML Engineer" },
      { id: "Data Science",         title: "Data Scientist" },
      { id: "Ciencia de datos",     title: "Data Scientist" },
      { id: "Data Scientist",       title: "Data Scientist" },
      { id: "Jupyter",              title: "Data Scientist" },
      { id: "Matplotlib",           title: "Data Scientist" },
      { id: "Seaborn",              title: "Data Scientist" },
      { id: "Plotly",               title: "Data Scientist" },
      { id: "R",                    title: "Data Scientist" },
      { id: "RStudio",              title: "Data Scientist" },
      { id: "Estadística",          title: "Data Scientist" },
      { id: "Statistics",           title: "Data Scientist" },
      { id: "Prompt Engineering",   title: "AI Engineer" },
      { id: "Vector DB",            title: "AI Engineer" },
      { id: "Pinecone",             title: "AI Engineer" },
      { id: "Weaviate",             title: "AI Engineer" },
      { id: "Chroma",               title: "AI Engineer" },
      { id: "Embeddings",           title: "AI Engineer" },

      // ─────────────────────────────────────────────
      // ARQUITECTURA & DISEÑO DE SOFTWARE
      // ─────────────────────────────────────────────
      { id: "Clean Architecture",   title: "Software Architect" },
      { id: "Arquitectura limpia",  title: "Software Architect" },
      { id: "Hexagonal Architecture", title: "Software Architect" },
      { id: "DDD",                  title: "Software Architect" },
      { id: "Domain-Driven Design", title: "Software Architect" },
      { id: "SOLID",                title: "Senior Software Engineer" },
      { id: "Design Patterns",      title: "Senior Software Engineer" },
      { id: "Patrones de diseño",   title: "Senior Software Engineer" },
      { id: "Microservices",        title: "Backend Architect" },
      { id: "Microservicios",       title: "Backend Architect" },
      { id: "Event-Driven",         title: "Backend Architect" },
      { id: "Event Driven",         title: "Backend Architect" },
      { id: "CQRS",                 title: "Backend Architect" },
      { id: "Event Sourcing",       title: "Backend Architect" },
      { id: "Serverless Architecture", title: "Backend Architect" },
      { id: "Monolithic",           title: "Backend Developer" },
      { id: "Monolítico",           title: "Backend Developer" },
      { id: "SOA",                  title: "Backend Architect" },
      { id: "Service-Oriented",     title: "Backend Architect" },
      { id: "TDD",                  title: "Senior Software Engineer" },
      { id: "BDD",                  title: "Senior Software Engineer" },
      { id: "Test-Driven",          title: "Senior Software Engineer" },
      { id: "Unit Testing",         title: "Senior Software Engineer" },
      { id: "Integration Testing",  title: "Senior Software Engineer" },
      { id: "Pruebas unitarias",    title: "Senior Software Engineer" },
      { id: "API Design",           title: "Software Architect" },
      { id: "System Design",        title: "Software Architect" },
      { id: "Diseño de sistemas",   title: "Software Architect" },

      // ─────────────────────────────────────────────
      // QA / TESTING
      // ─────────────────────────────────────────────
      { id: "QA",                   title: "QA Engineer" },
      { id: "Quality Assurance",    title: "QA Engineer" },
      { id: "Aseguramiento de calidad", title: "QA Engineer" },
      { id: "Selenium",             title: "QA Automation Engineer" },
      { id: "Appium",               title: "QA Automation Engineer" },
      { id: "Cypress",              title: "QA Automation Engineer" },
      { id: "Playwright",           title: "QA Automation Engineer" },
      { id: "Postman",              title: "QA Engineer" },
      { id: "SoapUI",               title: "QA Engineer" },
      { id: "JMeter",               title: "QA Engineer" },
      { id: "k6",                   title: "QA Engineer" },
      { id: "Gatling",              title: "QA Engineer" },
      { id: "LoadRunner",           title: "QA Engineer" },
      { id: "TestRail",             title: "QA Engineer" },
      { id: "Manual Testing",       title: "QA Engineer" },
      { id: "Pruebas manuales",     title: "QA Engineer" },
      { id: "Automation Testing",   title: "QA Automation Engineer" },
      { id: "Pruebas automatizadas",title: "QA Automation Engineer" },
      { id: "Performance Testing",  title: "QA Engineer" },
      { id: "Load Testing",         title: "QA Engineer" },
      { id: "Security Testing",     title: "QA Engineer" },
      { id: "E2E",                  title: "QA Automation Engineer" },
      { id: "End-to-End",           title: "QA Automation Engineer" },

      // ─────────────────────────────────────────────
      // SEGURIDAD (CYBERSECURITY)
      // ─────────────────────────────────────────────
      { id: "Cybersecurity",        title: "Security Engineer" },
      { id: "Ciberseguridad",       title: "Security Engineer" },
      { id: "Seguridad informática",title: "Security Engineer" },
      { id: "Pentesting",           title: "Security Engineer" },
      { id: "Penetration Testing",  title: "Security Engineer" },
      { id: "OWASP",                title: "Security Engineer" },
      { id: "Ethical Hacking",      title: "Security Engineer" },
      { id: "Hacking ético",        title: "Security Engineer" },
      { id: "SOC",                  title: "Security Engineer" },
      { id: "SIEM",                 title: "Security Engineer" },
      { id: "Vulnerability",        title: "Security Engineer" },
      { id: "Vulnerabilidades",     title: "Security Engineer" },
      { id: "Burp Suite",           title: "Security Engineer" },
      { id: "Metasploit",           title: "Security Engineer" },
      { id: "Wireshark",            title: "Security Engineer" },
      { id: "Nmap",                 title: "Security Engineer" },
      { id: "Zero Trust",           title: "Security Engineer" },
      { id: "PKI",                  title: "Security Engineer" },
      { id: "CISSP",                title: "Security Engineer" },
      { id: "CEH",                  title: "Security Engineer" },

      // ─────────────────────────────────────────────
      // GESTIÓN & LIDERAZGO TÉCNICO
      // ─────────────────────────────────────────────
      { id: "Tech Lead",            title: "Technical Leader" },
      { id: "Technical Leader",     title: "Technical Leader" },
      { id: "Líder técnico",        title: "Technical Leader" },
      { id: "Engineering Manager",  title: "Engineering Manager" },
      { id: "CTO",                  title: "Chief Technology Officer" },
      { id: "VP Engineering",       title: "Engineering Manager" },
      { id: "Team Lead",            title: "Technical Leader" },
      { id: "Software Architect",   title: "Software Architect" },
      { id: "Arquitecto de software", title: "Software Architect" },
      { id: "Solutions Architect",  title: "Software Architect" },
      { id: "Arquitecto de soluciones", title: "Software Architect" },
      { id: "Principal Engineer",   title: "Software Architect" },
      { id: "Staff Engineer",       title: "Software Architect" },
      { id: "Code Review",          title: "Senior Software Engineer" },
      { id: "Revisión de código",   title: "Senior Software Engineer" },
      { id: "Mentoring",            title: "Technical Leader" },
      { id: "Mentoría",             title: "Technical Leader" },
      { id: "Pair programming",     title: "Senior Software Engineer" },

      // ─────────────────────────────────────────────
      // METODOLOGÍAS & GESTIÓN DE PROYECTOS
      // ─────────────────────────────────────────────
      { id: "Scrum",                title: "Scrum Master" },
      { id: "Scrum Master",         title: "Scrum Master" },
      { id: "Agile",                title: "Project Manager" },
      { id: "Metodologías ágiles",  title: "Project Manager" },
      { id: "Kanban",               title: "Project Manager" },
      { id: "SAFe",                 title: "Project Manager" },
      { id: "XP",                   title: "Project Manager" },
      { id: "Extreme Programming",  title: "Project Manager" },
      { id: "JIRA",                 title: "Project Manager" },
      { id: "Confluence",           title: "Project Manager" },
      { id: "Notion",               title: "Project Manager" },
      { id: "Trello",               title: "Project Manager" },
      { id: "Linear",               title: "Project Manager" },
      { id: "Asana",                title: "Project Manager" },
      { id: "PMP",                  title: "Project Manager" },
      { id: "PMI",                  title: "Project Manager" },
      { id: "Product Owner",        title: "Product Owner" },
      { id: "PO",                   title: "Product Owner" },

      // ─────────────────────────────────────────────
      // CONTROL DE VERSIONES
      // ─────────────────────────────────────────────
      { id: "Git",                  title: "Software Engineer" },
      { id: "GitHub",               title: "Software Engineer" },
      { id: "GitLab",               title: "Software Engineer" },
      { id: "Bitbucket",            title: "Software Engineer" },
      { id: "SVN",                  title: "Software Engineer" },
      { id: "Subversion",           title: "Software Engineer" },
      { id: "Gitflow",              title: "Software Engineer" },
      { id: "Trunk-based",          title: "Software Engineer" },

      // ─────────────────────────────────────────────
      // IDIOMAS — NIVEL SENIORITY
      // ─────────────────────────────────────────────
      { id: "English",              title: "Bilingual Software Engineer" },
      { id: "Inglés",               title: "Bilingual Software Engineer" },
      { id: "Inglés avanzado",      title: "Bilingual Software Engineer" },
      { id: "Advanced English",     title: "Bilingual Software Engineer" },
      { id: "English B2",           title: "Bilingual Software Engineer" },
      { id: "English C1",           title: "Bilingual Software Engineer" },
      { id: "English C2",           title: "Bilingual Software Engineer" },
      { id: "Fluent English",       title: "Bilingual Software Engineer" },
      { id: "Inglés fluido",        title: "Bilingual Software Engineer" },
      { id: "IELTS",                title: "Bilingual Software Engineer" },
      { id: "TOEFL",                title: "Bilingual Software Engineer" },
      { id: "Bilingual",            title: "Bilingual Software Engineer" },
      { id: "Bilingüe",             title: "Bilingual Software Engineer" },
      { id: "Portugués",            title: "Multilingual Software Engineer" },
      { id: "Portuguese",           title: "Multilingual Software Engineer" },
      { id: "Francés",              title: "Multilingual Software Engineer" },
      { id: "French",               title: "Multilingual Software Engineer" },

      // ─────────────────────────────────────────────
      // NIVELES SENIORITY (DETECCIÓN DIRECTA)
      // ─────────────────────────────────────────────
      { id: "Junior Developer",     title: "Junior Software Engineer" },
      { id: "Junior Engineer",      title: "Junior Software Engineer" },
      { id: "Junior",               title: "Junior Software Engineer" },
      { id: "Jr Developer",         title: "Junior Software Engineer" },
      { id: "Jr. Developer",        title: "Junior Software Engineer" },
      { id: "Jr Engineer",          title: "Junior Software Engineer" },
      { id: "Jr.",                  title: "Junior Software Engineer" },
      { id: "Mid Developer",        title: "Mid-Level Software Engineer" },
      { id: "Mid-Level",            title: "Mid-Level Software Engineer" },
      { id: "Mid Level",            title: "Mid-Level Software Engineer" },
      { id: "Ssr",                  title: "Mid-Level Software Engineer" },
      { id: "Semi Senior",          title: "Mid-Level Software Engineer" },
      { id: "Semi-Senior",          title: "Mid-Level Software Engineer" },
      { id: "SSr.",                 title: "Mid-Level Software Engineer" },
      { id: "Senior Developer",     title: "Senior Software Engineer" },
      { id: "Senior Engineer",      title: "Senior Software Engineer" },
      { id: "Senior Software",      title: "Senior Software Engineer" },
      { id: "Senior",               title: "Senior Software Engineer" },
      { id: "Sr Developer",         title: "Senior Software Engineer" },
      { id: "Sr. Developer",        title: "Senior Software Engineer" },
      { id: "Sr Engineer",          title: "Senior Software Engineer" },
      { id: "Sr.",                  title: "Senior Software Engineer" },
      { id: "Lead Developer",       title: "Lead Software Engineer" },
      { id: "Lead Engineer",        title: "Lead Software Engineer" },
      { id: "Lead Software",        title: "Lead Software Engineer" },
      { id: "Principal Developer",  title: "Lead Software Engineer" },
      { id: "8+ years",             title: "Senior Software Engineer" },
      { id: "10+ years",            title: "Senior Software Engineer" },
      { id: "5+ years",             title: "Mid-Level Software Engineer" },
      { id: "3+ years",             title: "Mid-Level Software Engineer" },

      // ─────────────────────────────────────────────
      // BLOCKCHAIN / WEB3
      // ─────────────────────────────────────────────
      { id: "Blockchain",           title: "Blockchain Developer" },
      { id: "Web3",                 title: "Blockchain Developer" },
      { id: "Solidity",             title: "Blockchain Developer" },
      { id: "Ethereum",             title: "Blockchain Developer" },
      { id: "Smart Contracts",      title: "Blockchain Developer" },
      { id: "Contratos inteligentes", title: "Blockchain Developer" },
      { id: "NFT",                  title: "Blockchain Developer" },
      { id: "DeFi",                 title: "Blockchain Developer" },
      { id: "Hardhat",              title: "Blockchain Developer" },
      { id: "Truffle",              title: "Blockchain Developer" },
      { id: "IPFS",                 title: "Blockchain Developer" },

      // ─────────────────────────────────────────────
      // EMBEBIDOS / IoT
      // ─────────────────────────────────────────────
      { id: "Arduino",              title: "Embedded Systems Engineer" },
      { id: "Raspberry Pi",         title: "Embedded Systems Engineer" },
      { id: "Embedded",             title: "Embedded Systems Engineer" },
      { id: "Embebido",             title: "Embedded Systems Engineer" },
      { id: "IoT",                  title: "Embedded Systems Engineer" },
      { id: "RTOS",                 title: "Embedded Systems Engineer" },
      { id: "Firmware",             title: "Embedded Systems Engineer" },
      { id: "FPGA",                 title: "Embedded Systems Engineer" },
      { id: "Microcontroller",      title: "Embedded Systems Engineer" },
      { id: "Microcontrolador",     title: "Embedded Systems Engineer" },

      // ─────────────────────────────────────────────
      // JUEGOS / GAME DEV
      // ─────────────────────────────────────────────
      { id: "Unity",                title: "Game Developer" },
      { id: "Unreal Engine",        title: "Game Developer" },
      { id: "Unreal",               title: "Game Developer" },
      { id: "Godot",                title: "Game Developer" },
      { id: "Game Development",     title: "Game Developer" },
      { id: "Desarrollo de videojuegos", title: "Game Developer" },
      { id: "C++ Game",             title: "Game Developer" },
      { id: "Shader",               title: "Game Developer" },
      { id: "HLSL",                 title: "Game Developer" },
      { id: "GLSL",                 title: "Game Developer" },

      // ─────────────────────────────────────────────
      // CERTIFICACIONES RELEVANTES
      // ─────────────────────────────────────────────
      { id: "AWS Certified",        title: "Cloud Engineer" },
      { id: "Google Certified",     title: "Cloud Engineer" },
      { id: "CKA",                  title: "DevOps Engineer" },
      { id: "CKS",                  title: "DevOps Engineer" },
      { id: "CKAD",                 title: "DevOps Engineer" },
      { id: "Terraform Associate",  title: "DevOps Engineer" },
      { id: "AZ-900",               title: "Cloud Engineer" },
      { id: "AZ-204",               title: "Cloud Engineer" },
      { id: "AZ-400",               title: "DevOps Engineer" },
      { id: "PCEP",                 title: "Python Developer" },
      { id: "PCAP",                 title: "Python Developer" },
      { id: "Oracle Certified",     title: "Java Backend Engineer" },
      { id: "OCA",                  title: "Java Backend Engineer" },
      { id: "OCP",                  title: "Java Backend Engineer" },
    ];

    if (typeof pdfjsLib !== 'undefined') {
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
    }
  }

  async parse(file) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      let originalText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        originalText += textContent.items.map(item => item.str).join(" ") + " ";
      }

      const normalizedText = this._normalize(originalText);

      // Mapa para agrupar por puesto (evita repeticiones)
      const matchedJobs = new Map();

      // Ordenar de mayor a menor longitud para que "React Native"
      // se evalúe antes que "React", "Spring Boot" antes que "Spring", etc.
      const sortedCatalog = [...this.skillCatalog].sort(
        (a, b) => b.id.length - a.id.length
      );

      for (const item of sortedCatalog) {
        const normalizedSkill = this._normalize(item.id);
        const escaped = normalizedSkill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(?<![\\w.#@])${escaped}(?![\\w.#@])`, 'gi');

        const match = regex.exec(normalizedText);
        if (match !== null) {
          if (!matchedJobs.has(item.title)) {
            const index = match.index;
            const start = Math.max(0, index - 50);
            const end   = Math.min(originalText.length, index + item.id.length + 70);
            const previewSnippet = originalText.substring(start, end).trim();

            matchedJobs.set(item.title, {
              title:   item.title,
              skills:  [item.id],
              preview: `...${previewSnippet}...`
            });
          } else {
            const existingJob = matchedJobs.get(item.title);
            if (!existingJob.skills.includes(item.id)) {
              existingJob.skills.push(item.id);
            }
          }
        }
      }

      const finalDetected = Array.from(matchedJobs.values()).map(job => ({
        name:    job.skills.join(', '),
        title:   job.title,
        preview: job.preview
      }));

      return {
        name: file.name.replace(".pdf", "").replace(/(_|-)/g, " "),
        skills: finalDetected.length > 0
          ? finalDetected
          : [{ name: "General", title: "Software Engineer", preview: "Se detectó un perfil tecnológico genérico." }]
      };

    } catch (error) {
      throw new Error(`Error leyendo PDF: ${error.message}`);
    }
  }

  _normalize(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, ' ')
      .trim();
  }
}