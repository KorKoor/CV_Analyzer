import { CVRepository } from '../core/repositories/CVRepository.js';

export class WebPdfRepository extends CVRepository {
  constructor() {
    super();

    // ===================================================================
    // CATÁLOGO MAESTRO KORWORK — EDICIÓN COMPLETA
    // Cubre: inglés · español · abreviaciones · Jr / Mid / Senior / Lead
    // ===================================================================
    this.skillCatalog = [

      // ═══════════════════════════════════════════════════════════
      // TECNOLOGÍA — SOFTWARE
      // ═══════════════════════════════════════════════════════════

      // ANDROID
      { id: "Kotlin",                     title: "Android Developer" },
      { id: "Android SDK",                title: "Android Developer" },
      { id: "Android Studio",             title: "Android Developer" },
      { id: "Android",                    title: "Android Developer" },
      { id: "Jetpack Compose",            title: "Mobile UI Engineer" },
      { id: "Jetpack",                    title: "Android Developer" },
      { id: "Room",                       title: "Android Developer" },
      { id: "WorkManager",                title: "Android Developer" },
      { id: "Hilt",                       title: "Android Developer" },
      { id: "Dagger",                     title: "Android Developer" },
      { id: "Retrofit",                   title: "Android Developer" },
      { id: "OkHttp",                     title: "Android Developer" },
      { id: "Coroutines",                 title: "Android Developer" },
      { id: "LiveData",                   title: "Android Developer" },
      { id: "ViewModel",                  title: "Android Developer" },
      { id: "MVVM",                       title: "Android Developer" },
      { id: "MVI",                        title: "Android Developer" },
      { id: "KMP",                        title: "Kotlin Multiplatform Engineer" },
      { id: "Kotlin Multiplatform",       title: "Kotlin Multiplatform Engineer" },
      { id: "KMM",                        title: "Kotlin Multiplatform Engineer" },

      // iOS
      { id: "Swift",                      title: "iOS Developer" },
      { id: "SwiftUI",                    title: "iOS Developer" },
      { id: "Objective-C",                title: "iOS Developer" },
      { id: "Objective C",                title: "iOS Developer" },
      { id: "ObjC",                       title: "iOS Developer" },
      { id: "iOS",                        title: "iOS Developer" },
      { id: "Xcode",                      title: "iOS Developer" },
      { id: "UIKit",                      title: "iOS Developer" },
      { id: "CoreData",                   title: "iOS Developer" },
      { id: "Core Data",                  title: "iOS Developer" },
      { id: "Combine",                    title: "iOS Developer" },
      { id: "VIPER",                      title: "iOS Developer" },
      { id: "TestFlight",                 title: "iOS Developer" },
      { id: "CocoaPods",                  title: "iOS Developer" },
      { id: "SPM",                        title: "iOS Developer" },
      { id: "Swift Package Manager",      title: "iOS Developer" },
      { id: "watchOS",                    title: "iOS Developer" },
      { id: "tvOS",                       title: "iOS Developer" },
      { id: "macOS",                      title: "macOS Developer" },

      // MOBILE CROSS-PLATFORM
      { id: "React Native",               title: "Mobile App Developer" },
      { id: "Flutter",                    title: "Mobile App Developer" },
      { id: "Dart",                       title: "Mobile App Developer" },
      { id: "Ionic",                      title: "Mobile App Developer" },
      { id: "Capacitor",                  title: "Mobile App Developer" },
      { id: "Expo",                       title: "Mobile App Developer" },
      { id: "Xamarin",                    title: "Mobile App Developer" },
      { id: "MAUI",                       title: "Mobile App Developer" },
      { id: ".NET MAUI",                  title: "Mobile App Developer" },
      { id: "Cross-platform",             title: "Mobile App Developer" },
      { id: "Cross platform",             title: "Mobile App Developer" },
      { id: "Multiplataforma",            title: "Mobile App Developer" },

      // FRONTEND
      { id: "React",                      title: "Frontend Developer" },
      { id: "React.js",                   title: "Frontend Developer" },
      { id: "ReactJS",                    title: "Frontend Developer" },
      { id: "Next.js",                    title: "Frontend Developer" },
      { id: "NextJS",                     title: "Frontend Developer" },
      { id: "Remix",                      title: "Frontend Developer" },
      { id: "Gatsby",                     title: "Frontend Developer" },
      { id: "Vue",                        title: "Frontend Developer" },
      { id: "Vue.js",                     title: "Frontend Developer" },
      { id: "VueJS",                      title: "Frontend Developer" },
      { id: "Nuxt",                       title: "Frontend Developer" },
      { id: "Nuxt.js",                    title: "Frontend Developer" },
      { id: "Angular",                    title: "Frontend Developer" },
      { id: "AngularJS",                  title: "Frontend Developer" },
      { id: "Svelte",                     title: "Frontend Developer" },
      { id: "SvelteKit",                  title: "Frontend Developer" },
      { id: "Astro",                      title: "Frontend Developer" },
      { id: "Qwik",                       title: "Frontend Developer" },
      { id: "Solid.js",                   title: "Frontend Developer" },
      { id: "SolidJS",                    title: "Frontend Developer" },
      { id: "Lit",                        title: "Frontend Developer" },
      { id: "Web Components",             title: "Frontend Developer" },
      { id: "Stencil",                    title: "Frontend Developer" },
      { id: "Preact",                     title: "Frontend Developer" },
      { id: "Alpine.js",                  title: "Frontend Developer" },
      { id: "JavaScript",                 title: "Web Developer" },
      { id: "TypeScript",                 title: "Frontend Engineer" },
      { id: "HTML",                       title: "Web Developer" },
      { id: "HTML5",                      title: "Web Developer" },
      { id: "CSS",                        title: "Web UI Developer" },
      { id: "CSS3",                       title: "Web UI Developer" },
      { id: "SASS",                       title: "Web UI Developer" },
      { id: "SCSS",                       title: "Web UI Developer" },
      { id: "Tailwind CSS",               title: "UI/UX Developer" },
      { id: "Bootstrap",                  title: "Web UI Developer" },
      { id: "Material UI",                title: "UI/UX Developer" },
      { id: "Redux",                      title: "Frontend Engineer" },
      { id: "Zustand",                    title: "Frontend Engineer" },
      { id: "Webpack",                    title: "Frontend Engineer" },
      { id: "Vite",                       title: "Frontend Engineer" },
      { id: "PWA",                        title: "Frontend Engineer" },

      // BACKEND
      { id: "Node.js",                    title: "Backend Developer" },
      { id: "Express",                    title: "Backend Developer" },
      { id: "NestJS",                     title: "Backend Developer" },
      { id: "Fastify",                    title: "Backend Developer" },
      { id: "Python",                     title: "Python Developer" },
      { id: "Django",                     title: "Python Developer" },
      { id: "Flask",                      title: "Python Developer" },
      { id: "FastAPI",                    title: "Python Developer" },
      { id: "Java",                       title: "Java Backend Engineer" },
      { id: "Spring Boot",                title: "Java Backend Engineer" },
      { id: "C#",                         title: ".NET Developer" },
      { id: ".NET",                       title: ".NET Developer" },
      { id: "ASP.NET Core",               title: ".NET Developer" },
      { id: "PHP",                        title: "PHP Developer" },
      { id: "Laravel",                    title: "PHP Developer" },
      { id: "WordPress",                  title: "PHP Developer" },
      { id: "Go",                         title: "Golang Developer" },
      { id: "Golang",                     title: "Golang Developer" },
      { id: "Ruby",                       title: "Ruby Developer" },
      { id: "Ruby on Rails",              title: "Ruby Developer" },
      { id: "Rust",                       title: "Systems Developer" },
      { id: "C++",                        title: "Systems Developer" },
      { id: "Elixir",                     title: "Backend Developer" },
      { id: "Scala",                      title: "Backend Developer" },
      { id: "REST",                       title: "Backend Developer" },
      { id: "GraphQL",                    title: "Backend Developer" },
      { id: "gRPC",                       title: "Backend Developer" },
      { id: "JWT",                        title: "Backend Developer" },
      { id: "OAuth2",                     title: "Backend Developer" },

      // BASES DE DATOS
      { id: "SQL",                        title: "Database Administrator" },
      { id: "PostgreSQL",                 title: "Database Engineer" },
      { id: "MySQL",                      title: "Database Engineer" },
      { id: "Oracle",                     title: "Database Administrator" },
      { id: "SQL Server",                 title: "Database Administrator" },
      { id: "MongoDB",                    title: "Database Engineer" },
      { id: "Redis",                      title: "Backend Developer" },
      { id: "Cassandra",                  title: "Database Engineer" },
      { id: "DynamoDB",                   title: "Cloud Engineer" },
      { id: "Firebase",                   title: "Backend Developer" },
      { id: "Elasticsearch",              title: "Backend Developer" },
      { id: "Supabase",                   title: "Database Engineer" },

      // CLOUD & DEVOPS
      { id: "AWS",                        title: "Cloud Engineer" },
      { id: "Google Cloud",               title: "Cloud Engineer" },
      { id: "GCP",                        title: "Cloud Engineer" },
      { id: "Azure",                      title: "Cloud Engineer" },
      { id: "Docker",                     title: "DevOps Engineer" },
      { id: "Kubernetes",                 title: "DevOps Engineer" },
      { id: "Terraform",                  title: "DevOps Engineer" },
      { id: "CI/CD",                      title: "DevOps Engineer" },
      { id: "GitHub Actions",             title: "DevOps Engineer" },
      { id: "Jenkins",                    title: "DevOps Engineer" },
      { id: "Linux",                      title: "DevOps Engineer" },
      { id: "Bash",                       title: "DevOps Engineer" },
      { id: "SRE",                        title: "Site Reliability Engineer" },

      // DATA & BI
      { id: "Power BI",                   title: "BI Developer" },
      { id: "Tableau",                    title: "BI Developer" },
      { id: "Looker",                     title: "BI Developer" },
      { id: "Pandas",                     title: "Data Engineer" },
      { id: "NumPy",                      title: "Data Engineer" },
      { id: "Spark",                      title: "Data Engineer" },
      { id: "Kafka",                      title: "Data Engineer" },
      { id: "Databricks",                 title: "Data Engineer" },
      { id: "Snowflake",                  title: "Data Engineer" },
      { id: "ETL",                        title: "Data Engineer" },
      { id: "BigQuery",                   title: "Data Engineer" },

      // IA / ML
      { id: "Machine Learning",           title: "ML Engineer" },
      { id: "Deep Learning",              title: "ML Engineer" },
      { id: "TensorFlow",                 title: "ML Engineer" },
      { id: "PyTorch",                    title: "ML Engineer" },
      { id: "LangChain",                  title: "AI Engineer" },
      { id: "LLM",                        title: "AI Engineer" },
      { id: "Data Science",               title: "Data Scientist" },
      { id: "Ciencia de datos",           title: "Data Scientist" },

      // QA
      { id: "QA",                         title: "QA Engineer" },
      { id: "Quality Assurance",          title: "QA Engineer" },
      { id: "Selenium",                   title: "QA Automation Engineer" },
      { id: "Cypress",                    title: "QA Automation Engineer" },
      { id: "Playwright",                 title: "QA Automation Engineer" },
      { id: "TDD",                        title: "Senior Software Engineer" },

      // ARQUITECTURA & LIDERAZGO TEC
      { id: "Clean Architecture",         title: "Software Architect" },
      { id: "SOLID",                      title: "Senior Software Engineer" },
      { id: "Microservices",              title: "Backend Architect" },
      { id: "System Design",              title: "Software Architect" },
      { id: "Tech Lead",                  title: "Technical Leader" },
      { id: "Líder técnico",              title: "Technical Leader" },
      { id: "CTO",                        title: "Chief Technology Officer" },
      { id: "Software Architect",         title: "Software Architect" },
      { id: "Scrum",                      title: "Scrum Master" },
      { id: "Agile",                      title: "Project Manager" },
      { id: "Product Owner",              title: "Product Owner" },
      { id: "Junior",                     title: "Junior Software Engineer" },
      { id: "Senior",                     title: "Senior Software Engineer" },
      { id: "Semi Senior",                title: "Mid-Level Software Engineer" },
      { id: "Ssr",                        title: "Mid-Level Software Engineer" },

      // BLOCKCHAIN & GAME DEV
      { id: "Blockchain",                 title: "Blockchain Developer" },
      { id: "Web3",                       title: "Blockchain Developer" },
      { id: "Solidity",                   title: "Blockchain Developer" },
      { id: "Unity",                      title: "Game Developer" },
      { id: "Unreal Engine",              title: "Game Developer" },
      { id: "Game Development",           title: "Game Developer" },
      { id: "Arduino",                    title: "Embedded Systems Engineer" },
      { id: "IoT",                        title: "IoT Engineer" },
      { id: "Firmware",                   title: "Embedded Systems Engineer" },

      // ═══════════════════════════════════════════════════════════
      // DISEÑO & CREATIVIDAD
      // ═══════════════════════════════════════════════════════════

      { id: "UI Design",                  title: "UI Designer" },
      { id: "UX Design",                  title: "UX Designer" },
      { id: "Diseño UI",                  title: "UI Designer" },
      { id: "Diseño UX",                  title: "UX Designer" },
      { id: "User Experience",            title: "UX Designer" },
      { id: "Experiencia de usuario",     title: "UX Designer" },
      { id: "Wireframing",                title: "UX Designer" },
      { id: "Prototyping",                title: "UX Designer" },
      { id: "Prototipado",                title: "UX Designer" },
      { id: "User Research",              title: "UX Researcher" },
      { id: "Investigación de usuario",   title: "UX Researcher" },
      { id: "Usability Testing",          title: "UX Researcher" },
      { id: "Design System",              title: "UI Designer" },
      { id: "Figma",                      title: "UI/UX Designer" },
      { id: "Sketch",                     title: "UI/UX Designer" },
      { id: "Adobe XD",                   title: "UI/UX Designer" },
      { id: "InVision",                   title: "UI/UX Designer" },
      { id: "Zeplin",                     title: "UI/UX Designer" },
      { id: "Diseño gráfico",             title: "Graphic Designer" },
      { id: "Graphic Design",             title: "Graphic Designer" },
      { id: "Adobe Photoshop",            title: "Graphic Designer" },
      { id: "Photoshop",                  title: "Graphic Designer" },
      { id: "Adobe Illustrator",          title: "Graphic Designer" },
      { id: "Illustrator",                title: "Graphic Designer" },
      { id: "Adobe InDesign",             title: "Graphic Designer" },
      { id: "InDesign",                   title: "Graphic Designer" },
      { id: "Adobe After Effects",        title: "Motion Designer" },
      { id: "After Effects",              title: "Motion Designer" },
      { id: "Adobe Premiere",             title: "Video Editor" },
      { id: "Premiere Pro",               title: "Video Editor" },
      { id: "Adobe Creative Suite",       title: "Graphic Designer" },
      { id: "Canva",                      title: "Graphic Designer" },
      { id: "CorelDRAW",                  title: "Graphic Designer" },
      { id: "Branding",                   title: "Brand Designer" },
      { id: "Identidad visual",           title: "Brand Designer" },
      { id: "Visual Identity",            title: "Brand Designer" },
      { id: "Tipografía",                 title: "Graphic Designer" },
      { id: "Typography",                 title: "Graphic Designer" },
      { id: "Motion Graphics",            title: "Motion Designer" },
      { id: "Animación",                  title: "Motion Designer" },
      { id: "Animation",                  title: "Motion Designer" },
      { id: "2D Animation",               title: "Motion Designer" },
      { id: "3D Animation",               title: "3D Artist" },
      { id: "Cinema 4D",                  title: "Motion Designer" },
      { id: "Blender",                    title: "3D Artist" },
      { id: "Maya",                       title: "3D Artist" },
      { id: "3ds Max",                    title: "3D Artist" },
      { id: "Edición de video",           title: "Video Editor" },
      { id: "Video Editing",              title: "Video Editor" },
      { id: "Final Cut Pro",              title: "Video Editor" },
      { id: "DaVinci Resolve",            title: "Video Editor" },
      { id: "Color Grading",              title: "Video Editor" },
      { id: "Corrección de color",        title: "Video Editor" },
      { id: "Producción audiovisual",     title: "Audiovisual Producer" },
      { id: "Fotografía",                 title: "Photographer" },
      { id: "Photography",                title: "Photographer" },
      { id: "Fotógrafo",                  title: "Photographer" },
      { id: "Retrato",                    title: "Photographer" },
      { id: "Fotografía comercial",       title: "Commercial Photographer" },
      { id: "Fotografía de producto",     title: "Product Photographer" },
      { id: "Fotografía de moda",         title: "Fashion Photographer" },
      { id: "Edición de fotos",           title: "Photo Editor" },
      { id: "Lightroom",                  title: "Photographer" },
      { id: "Diseño de modas",            title: "Fashion Designer" },
      { id: "Fashion Design",             title: "Fashion Designer" },
      { id: "Diseñador de modas",         title: "Fashion Designer" },
      { id: "Patronaje",                  title: "Pattern Maker" },
      { id: "Pattern Making",             title: "Pattern Maker" },
      { id: "Costura",                    title: "Seamstress" },
      { id: "Sewing",                     title: "Seamstress" },
      { id: "Textil",                     title: "Textile Specialist" },
      { id: "Textile",                    title: "Textile Specialist" },
      { id: "Industria textil",           title: "Textile Industry Specialist" },
      { id: "Moda",                       title: "Fashion Specialist" },
      { id: "Fashion",                    title: "Fashion Specialist" },
      { id: "Estilismo",                  title: "Stylist" },
      { id: "Styling",                    title: "Stylist" },
      { id: "Estilista",                  title: "Stylist" },
      { id: "Maquillaje",                 title: "Makeup Artist" },
      { id: "Makeup",                     title: "Makeup Artist" },
      { id: "Maquillista",                title: "Makeup Artist" },
      { id: "Makeup Artist",              title: "Makeup Artist" },
      { id: "Peluquería",                 title: "Hairstylist" },
      { id: "Hairstyling",                title: "Hairstylist" },
      { id: "Estética",                   title: "Esthetician" },
      { id: "Esteticista",                title: "Esthetician" },
      { id: "Esthetics",                  title: "Esthetician" },
      { id: "Spa",                        title: "Spa Therapist" },
      { id: "Diseño de interiores",       title: "Interior Designer" },
      { id: "Interior Design",            title: "Interior Designer" },
      { id: "Interiorismo",               title: "Interior Designer" },
      { id: "Decoración",                 title: "Interior Decorator" },
      { id: "Decoration",                 title: "Interior Decorator" },
      { id: "Diseño industrial",          title: "Industrial Designer" },
      { id: "Industrial Design",          title: "Industrial Designer" },
      { id: "Diseño de producto",         title: "Product Designer" },
      { id: "Product Design",             title: "Product Designer" },
      { id: "Joyería",                    title: "Jeweler" },
      { id: "Jewelry",                    title: "Jeweler" },
      { id: "Joyero",                     title: "Jeweler" },
      { id: "Artesanía",                  title: "Artisan" },
      { id: "Crafts",                     title: "Artisan" },
      { id: "Artesano",                   title: "Artisan" },
      { id: "Cerámica",                   title: "Ceramic Artist" },
      { id: "Ceramics",                   title: "Ceramic Artist" },
      { id: "Escultura",                  title: "Sculptor" },
      { id: "Sculpture",                  title: "Sculptor" },
      { id: "Escultor",                   title: "Sculptor" },
      { id: "Pintura",                    title: "Painter" },
      { id: "Painting",                   title: "Painter" },
      { id: "Pintor",                     title: "Painter" },
      { id: "Ilustración",                title: "Illustrator" },
      { id: "Illustration",               title: "Illustrator" },
      { id: "Ilustrador",                 title: "Illustrator" },
      { id: "Arte digital",               title: "Digital Artist" },
      { id: "Digital Art",                title: "Digital Artist" },
      { id: "Concept Art",                title: "Concept Artist" },
      { id: "Arte conceptual",            title: "Concept Artist" },

      // ═══════════════════════════════════════════════════════════
      // MARKETING & COMUNICACIÓN
      // ═══════════════════════════════════════════════════════════

      { id: "Marketing Digital",          title: "Digital Marketing Specialist" },
      { id: "Digital Marketing",          title: "Digital Marketing Specialist" },
      { id: "Marketing",                  title: "Marketing Specialist" },
      { id: "SEO",                        title: "SEO Specialist" },
      { id: "SEM",                        title: "SEM Specialist" },
      { id: "Google Ads",                 title: "SEM Specialist" },
      { id: "Facebook Ads",               title: "Social Media Specialist" },
      { id: "Meta Ads",                   title: "Social Media Specialist" },
      { id: "TikTok Ads",                 title: "Social Media Specialist" },
      { id: "Email Marketing",            title: "Email Marketing Specialist" },
      { id: "HubSpot",                    title: "Digital Marketing Specialist" },
      { id: "Mailchimp",                  title: "Email Marketing Specialist" },
      { id: "Google Analytics",           title: "Digital Marketing Analyst" },
      { id: "Google Tag Manager",         title: "Digital Marketing Analyst" },
      { id: "CRO",                        title: "CRO Specialist" },
      { id: "Funnel",                     title: "Digital Marketing Specialist" },
      { id: "Inbound Marketing",          title: "Digital Marketing Specialist" },
      { id: "Content Marketing",          title: "Content Marketing Specialist" },
      { id: "Marketing de contenidos",    title: "Content Marketing Specialist" },
      { id: "Growth Hacking",             title: "Growth Hacker" },
      { id: "A/B Testing",                title: "Digital Marketing Analyst" },
      { id: "Community Manager",          title: "Community Manager" },
      { id: "Social Media",               title: "Social Media Specialist" },
      { id: "Redes sociales",             title: "Social Media Specialist" },
      { id: "Social Media Manager",       title: "Social Media Manager" },
      { id: "Instagram",                  title: "Social Media Specialist" },
      { id: "TikTok",                     title: "Social Media Specialist" },
      { id: "YouTube",                    title: "Content Creator" },
      { id: "Content Creator",            title: "Content Creator" },
      { id: "Creador de contenido",       title: "Content Creator" },
      { id: "Influencer Marketing",       title: "Influencer Marketing Specialist" },
      { id: "Copywriting",                title: "Copywriter" },
      { id: "Redacción publicitaria",     title: "Copywriter" },
      { id: "Storytelling",               title: "Content Creator" },
      { id: "Relaciones públicas",        title: "Public Relations Specialist" },
      { id: "Public Relations",           title: "Public Relations Specialist" },
      { id: "PR",                         title: "Public Relations Specialist" },
      { id: "Comunicación corporativa",   title: "Corporate Communications Specialist" },
      { id: "Gestión de crisis",          title: "Crisis Communication Specialist" },
      { id: "Crisis Management",          title: "Crisis Communication Specialist" },
      { id: "Prensa",                     title: "Press Relations Specialist" },
      { id: "Media Relations",            title: "Press Relations Specialist" },
      { id: "Comunicación interna",       title: "Internal Communications Specialist" },
      { id: "Publicidad",                 title: "Advertising Specialist" },
      { id: "Advertising",                title: "Advertising Specialist" },
      { id: "Publicista",                 title: "Advertising Specialist" },
      { id: "Planificación de medios",    title: "Media Planner" },
      { id: "Media Planning",             title: "Media Planner" },
      { id: "Compra de medios",           title: "Media Buyer" },
      { id: "Media Buying",               title: "Media Buyer" },
      { id: "OOH",                        title: "Advertising Specialist" },
      { id: "Publicidad exterior",        title: "Advertising Specialist" },
      { id: "Trade Marketing",            title: "Trade Marketing Specialist" },
      { id: "BTL",                        title: "Marketing Specialist" },
      { id: "ATL",                        title: "Marketing Specialist" },
      { id: "Investigación de mercados",  title: "Market Research Analyst" },
      { id: "Market Research",            title: "Market Research Analyst" },
      { id: "Insight",                    title: "Market Research Analyst" },
      { id: "Nielsen",                    title: "Market Research Analyst" },
      { id: "Focus Group",                title: "Market Research Analyst" },
      { id: "Shopper Marketing",          title: "Shopper Marketing Specialist" },
      { id: "Pricing",                    title: "Pricing Analyst" },
      { id: "Category Management",        title: "Category Manager" },
      { id: "Gestión de categorías",      title: "Category Manager" },
      { id: "Brand Management",           title: "Brand Manager" },
      { id: "Gestión de marca",           title: "Brand Manager" },
      { id: "Brand Manager",              title: "Brand Manager" },
      { id: "Gerente de marca",           title: "Brand Manager" },
      { id: "Podcast",                    title: "Podcast Producer" },
      { id: "Radio",                      title: "Radio Producer" },
      { id: "Televisión",                 title: "Television Producer" },
      { id: "Productor",                  title: "Producer" },
      { id: "Producer",                   title: "Producer" },

      // ═══════════════════════════════════════════════════════════
      // PERIODISMO & COMUNICACIÓN
      // ═══════════════════════════════════════════════════════════

      { id: "Periodismo",                 title: "Journalist" },
      { id: "Journalism",                 title: "Journalist" },
      { id: "Periodista",                 title: "Journalist" },
      { id: "Journalist",                 title: "Journalist" },
      { id: "Redacción",                  title: "Content Writer" },
      { id: "Writing",                    title: "Content Writer" },
      { id: "Redactor",                   title: "Content Writer" },
      { id: "Comunicación",               title: "Communications Specialist" },
      { id: "Locución",                   title: "Announcer" },
      { id: "Locutor",                    title: "Announcer" },
      { id: "Presentador",                title: "TV Host" },
      { id: "Conductor",                  title: "TV Host" },
      { id: "Corresponsal",               title: "Correspondent" },
      { id: "Reportero",                  title: "Reporter" },
      { id: "Reporter",                   title: "Reporter" },
      { id: "Editor",                     title: "Editor" },
      { id: "Edición editorial",          title: "Editorial Editor" },
      { id: "Corrector de estilo",        title: "Proofreader" },
      { id: "Proofreading",               title: "Proofreader" },
      { id: "Traducción",                 title: "Translator" },
      { id: "Translation",                title: "Translator" },
      { id: "Traductor",                  title: "Translator" },
      { id: "Translator",                 title: "Translator" },
      { id: "Interpretación",             title: "Interpreter" },
      { id: "Interpretation",             title: "Interpreter" },
      { id: "Intérprete",                 title: "Interpreter" },
      { id: "Subtitulado",                title: "Subtitler" },
      { id: "Subtitling",                 title: "Subtitler" },
      { id: "Transcripción",              title: "Transcriptionist" },
      { id: "Transcription",              title: "Transcriptionist" },
      { id: "Escritura creativa",         title: "Creative Writer" },
      { id: "Creative Writing",           title: "Creative Writer" },
      { id: "Literatura",                 title: "Writer" },
      { id: "Literature",                 title: "Writer" },
      { id: "Escritor",                   title: "Writer" },
      { id: "Writer",                     title: "Writer" },
      { id: "Autor",                      title: "Author" },
      { id: "Author",                     title: "Author" },
      { id: "Guion",                      title: "Screenwriter" },
      { id: "Guionista",                  title: "Screenwriter" },
      { id: "Screenwriting",              title: "Screenwriter" },
      { id: "Screenplay",                 title: "Screenwriter" },
      { id: "Libretista",                 title: "Screenwriter" },

      // ═══════════════════════════════════════════════════════════
      // FINANZAS & CONTABILIDAD
      // ═══════════════════════════════════════════════════════════

      { id: "Contabilidad",               title: "Accountant" },
      { id: "Accounting",                 title: "Accountant" },
      { id: "Contador",                   title: "Accountant" },
      { id: "Contaduría",                 title: "Accountant" },
      { id: "Finanzas",                   title: "Finance Specialist" },
      { id: "Finance",                    title: "Finance Specialist" },
      { id: "Análisis financiero",        title: "Financial Analyst" },
      { id: "Financial Analysis",         title: "Financial Analyst" },
      { id: "Modelado financiero",        title: "Financial Analyst" },
      { id: "Financial Modeling",         title: "Financial Analyst" },
      { id: "Presupuesto",                title: "Finance Specialist" },
      { id: "Budgeting",                  title: "Finance Specialist" },
      { id: "Auditoría",                  title: "Auditor" },
      { id: "Auditing",                   title: "Auditor" },
      { id: "Tesorería",                  title: "Treasury Analyst" },
      { id: "Treasury",                   title: "Treasury Analyst" },
      { id: "Impuestos",                  title: "Tax Specialist" },
      { id: "Tax",                        title: "Tax Specialist" },
      { id: "SAT",                        title: "Tax Specialist" },
      { id: "IMSS",                       title: "Payroll Specialist" },
      { id: "Nómina",                     title: "Payroll Specialist" },
      { id: "Payroll",                    title: "Payroll Specialist" },
      { id: "CFDI",                       title: "Tax Specialist" },
      { id: "Facturación",                title: "Billing Specialist" },
      { id: "Cuentas por pagar",          title: "Accounts Payable Specialist" },
      { id: "Accounts Payable",           title: "Accounts Payable Specialist" },
      { id: "Cuentas por cobrar",         title: "Accounts Receivable Specialist" },
      { id: "Accounts Receivable",        title: "Accounts Receivable Specialist" },
      { id: "SAP",                        title: "SAP Consultant" },
      { id: "SAP FI",                     title: "SAP Financial Consultant" },
      { id: "QuickBooks",                 title: "Accountant" },
      { id: "ContPAQi",                   title: "Accountant" },
      { id: "CONTPAQi",                   title: "Accountant" },
      { id: "Aspel",                      title: "Accountant" },
      { id: "NIIF",                       title: "Accountant" },
      { id: "IFRS",                       title: "Accountant" },
      { id: "NIF",                        title: "Accountant" },
      { id: "CPA",                        title: "Certified Public Accountant" },
      { id: "CFA",                        title: "Financial Analyst" },
      { id: "Inversiones",                title: "Investment Analyst" },
      { id: "Bolsa de valores",           title: "Investment Analyst" },
      { id: "Stock Market",               title: "Investment Analyst" },
      { id: "Riesgo financiero",          title: "Risk Analyst" },
      { id: "Financial Risk",             title: "Risk Analyst" },
      { id: "Derivados",                  title: "Financial Analyst" },
      { id: "Derivatives",                title: "Financial Analyst" },
      { id: "Fintech",                    title: "Fintech Specialist" },
      { id: "Banca",                      title: "Banking Specialist" },
      { id: "Banking",                    title: "Banking Specialist" },
      { id: "Crédito",                    title: "Credit Analyst" },
      { id: "Credit",                     title: "Credit Analyst" },
      { id: "Microfinanzas",              title: "Microfinance Specialist" },
      { id: "Microfinance",               title: "Microfinance Specialist" },
      { id: "Seguros",                    title: "Insurance Specialist" },
      { id: "Insurance",                  title: "Insurance Specialist" },
      { id: "Actuaría",                   title: "Actuary" },
      { id: "Actuarial",                  title: "Actuary" },
      { id: "Actuario",                   title: "Actuary" },
      { id: "Actuary",                    title: "Actuary" },
      { id: "Siniestros",                 title: "Claims Adjuster" },
      { id: "Claims",                     title: "Claims Adjuster" },
      { id: "Reaseguros",                 title: "Reinsurance Specialist" },
      { id: "Reinsurance",                title: "Reinsurance Specialist" },
      { id: "Agente de seguros",          title: "Insurance Agent" },
      { id: "Insurance Agent",            title: "Insurance Agent" },
      { id: "Underwriting",               title: "Underwriter" },
      { id: "Suscripción",                title: "Underwriter" },
      { id: "Venture Capital",            title: "Venture Capital Analyst" },
      { id: "Capital de riesgo",          title: "Venture Capital Analyst" },
      { id: "Private Equity",             title: "Private Equity Analyst" },
      { id: "Fusiones y adquisiciones",   title: "M&A Analyst" },
      { id: "Mergers and Acquisitions",   title: "M&A Analyst" },
      { id: "M&A",                        title: "M&A Analyst" },
      { id: "Banca de inversión",         title: "Investment Banker" },
      { id: "Investment Banking",         title: "Investment Banker" },
      { id: "Valuación",                  title: "Valuation Analyst" },
      { id: "Valuation",                  title: "Valuation Analyst" },
      { id: "Controlling",                title: "Financial Controller" },
      { id: "Controller",                 title: "Financial Controller" },
      { id: "CFO",                        title: "Chief Financial Officer" },
      { id: "Director financiero",        title: "Chief Financial Officer" },
      { id: "Excel avanzado",             title: "Financial Analyst" },
      { id: "Power Query",                title: "Financial Analyst" },

      // ═══════════════════════════════════════════════════════════
      // RECURSOS HUMANOS
      // ═══════════════════════════════════════════════════════════

      { id: "Recursos Humanos",           title: "HR Specialist" },
      { id: "Human Resources",            title: "HR Specialist" },
      { id: "RRHH",                       title: "HR Specialist" },
      { id: "Reclutamiento",              title: "Recruiter" },
      { id: "Recruitment",                title: "Recruiter" },
      { id: "Reclutador",                 title: "Recruiter" },
      { id: "Recruiter",                  title: "Recruiter" },
      { id: "Headhunter",                 title: "Headhunter" },
      { id: "Talent Acquisition",         title: "Talent Acquisition Specialist" },
      { id: "Adquisición de talento",     title: "Talent Acquisition Specialist" },
      { id: "Selección de personal",      title: "Recruiter" },
      { id: "Onboarding",                 title: "HR Specialist" },
      { id: "Capacitación",               title: "Training Specialist" },
      { id: "Training",                   title: "Training Specialist" },
      { id: "Desarrollo organizacional",  title: "Organizational Development Specialist" },
      { id: "Organizational Development", title: "Organizational Development Specialist" },
      { id: "Clima laboral",              title: "HR Specialist" },
      { id: "Relaciones laborales",       title: "Labor Relations Specialist" },
      { id: "Labor Relations",            title: "Labor Relations Specialist" },
      { id: "Compensaciones",             title: "Compensation and Benefits Specialist" },
      { id: "Compensation",               title: "Compensation and Benefits Specialist" },
      { id: "Performance Management",     title: "HR Specialist" },
      { id: "Evaluación de desempeño",    title: "HR Specialist" },
      { id: "HRIS",                       title: "HR Systems Specialist" },
      { id: "Workday",                    title: "HR Systems Specialist" },
      { id: "SuccessFactors",             title: "HR Systems Specialist" },
      { id: "SAP HCM",                    title: "HR Systems Specialist" },
      { id: "Ley Federal del Trabajo",    title: "Labor Relations Specialist" },
      { id: "Bienestar laboral",          title: "Employee Wellness Specialist" },
      { id: "Employee Wellness",          title: "Employee Wellness Specialist" },
      { id: "Employer Branding",          title: "Employer Branding Specialist" },
      { id: "Diversidad e inclusión",     title: "DEI Specialist" },
      { id: "Diversity and Inclusion",    title: "DEI Specialist" },
      { id: "DEI",                        title: "DEI Specialist" },
      { id: "CHRO",                       title: "Chief Human Resources Officer" },
      { id: "Director de RRHH",          title: "Chief Human Resources Officer" },

      // ═══════════════════════════════════════════════════════════
      // VENTAS & COMERCIAL
      // ═══════════════════════════════════════════════════════════

      { id: "Ventas",                     title: "Sales Executive" },
      { id: "Sales",                      title: "Sales Executive" },
      { id: "Ejecutivo de ventas",        title: "Sales Executive" },
      { id: "Account Executive",          title: "Account Executive" },
      { id: "Account Manager",            title: "Account Manager" },
      { id: "Business Development",       title: "Business Development Manager" },
      { id: "Desarrollo de negocios",     title: "Business Development Manager" },
      { id: "B2B",                        title: "B2B Sales Specialist" },
      { id: "B2C",                        title: "B2C Sales Specialist" },
      { id: "Inside Sales",               title: "Inside Sales Representative" },
      { id: "Field Sales",                title: "Field Sales Representative" },
      { id: "Ventas en campo",            title: "Field Sales Representative" },
      { id: "CRM",                        title: "Sales Specialist" },
      { id: "Salesforce",                 title: "Salesforce Specialist" },
      { id: "Pipedrive",                  title: "Sales Specialist" },
      { id: "Negociación",                title: "Sales Executive" },
      { id: "Negotiation",                title: "Sales Executive" },
      { id: "Cierre de ventas",           title: "Sales Executive" },
      { id: "Prospección",                title: "Sales Executive" },
      { id: "Prospecting",                title: "Sales Executive" },
      { id: "E-commerce",                 title: "E-commerce Specialist" },
      { id: "Comercio electrónico",       title: "E-commerce Specialist" },
      { id: "Shopify",                    title: "E-commerce Specialist" },
      { id: "Amazon Seller",              title: "E-commerce Specialist" },
      { id: "Marketplace",                title: "E-commerce Specialist" },
      { id: "Director de ventas",         title: "Sales Director" },
      { id: "Sales Director",             title: "Sales Director" },
      { id: "Gerente de ventas",          title: "Sales Manager" },
      { id: "Sales Manager",              title: "Sales Manager" },
      { id: "Promotor",                   title: "Brand Promoter" },
      { id: "Promotor de ventas",         title: "Brand Promoter" },
      { id: "Asesor comercial",           title: "Commercial Advisor" },
      { id: "Representante de ventas",    title: "Sales Representative" },
      { id: "Sales Representative",       title: "Sales Representative" },
      { id: "Visitador médico",           title: "Medical Sales Representative" },
      { id: "Medical Sales",              title: "Medical Sales Representative" },
      { id: "Pharmaceutical Sales",       title: "Pharmaceutical Sales Representative" },

      // ═══════════════════════════════════════════════════════════
      // ADMINISTRACIÓN & OPERACIONES
      // ═══════════════════════════════════════════════════════════

      { id: "Administración",             title: "Administrative Manager" },
      { id: "Administration",             title: "Administrative Manager" },
      { id: "Gestión de proyectos",       title: "Project Manager" },
      { id: "Project Management",         title: "Project Manager" },
      { id: "PMP",                        title: "Project Manager" },
      { id: "PRINCE2",                    title: "Project Manager" },
      { id: "PMO",                        title: "Project Manager" },
      { id: "Operaciones",                title: "Operations Manager" },
      { id: "Operations",                 title: "Operations Manager" },
      { id: "Mejora de procesos",         title: "Process Improvement Specialist" },
      { id: "Process Improvement",        title: "Process Improvement Specialist" },
      { id: "Lean",                       title: "Lean Specialist" },
      { id: "Six Sigma",                  title: "Six Sigma Specialist" },
      { id: "Lean Six Sigma",             title: "Lean Six Sigma Specialist" },
      { id: "Kaizen",                     title: "Lean Specialist" },
      { id: "5S",                         title: "Lean Specialist" },
      { id: "Logística",                  title: "Logistics Coordinator" },
      { id: "Logistics",                  title: "Logistics Coordinator" },
      { id: "Cadena de suministro",       title: "Supply Chain Manager" },
      { id: "Supply Chain",               title: "Supply Chain Manager" },
      { id: "Inventarios",                title: "Inventory Specialist" },
      { id: "Inventory",                  title: "Inventory Specialist" },
      { id: "Compras",                    title: "Purchasing Specialist" },
      { id: "Procurement",                title: "Procurement Specialist" },
      { id: "ERP",                        title: "ERP Consultant" },
      { id: "SAP MM",                     title: "SAP Materials Consultant" },
      { id: "SAP SD",                     title: "SAP Sales Consultant" },
      { id: "ISO 9001",                   title: "Quality Manager" },
      { id: "Calidad",                    title: "Quality Manager" },
      { id: "Quality Management",         title: "Quality Manager" },
      { id: "CEO",                        title: "Chief Executive Officer" },
      { id: "Director general",           title: "Chief Executive Officer" },
      { id: "COO",                        title: "Chief Operating Officer" },
      { id: "Director de operaciones",    title: "Chief Operating Officer" },
      { id: "Gerente general",            title: "General Manager" },
      { id: "General Manager",            title: "General Manager" },
      { id: "Asistente ejecutivo",        title: "Executive Assistant" },
      { id: "Executive Assistant",        title: "Executive Assistant" },
      { id: "Asistente administrativo",   title: "Administrative Assistant" },
      { id: "Administrative Assistant",   title: "Administrative Assistant" },
      { id: "Secretaria",                 title: "Secretary" },
      { id: "Secretary",                  title: "Secretary" },
      { id: "Recepcionista",              title: "Receptionist" },
      { id: "Receptionist",               title: "Receptionist" },
      { id: "Auxiliar administrativo",    title: "Administrative Assistant" },
      { id: "Capturista",                 title: "Data Entry Specialist" },
      { id: "Data Entry",                 title: "Data Entry Specialist" },

      // ═══════════════════════════════════════════════════════════
      // LOGÍSTICA & COMERCIO EXTERIOR
      // ═══════════════════════════════════════════════════════════

      { id: "Comercio exterior",          title: "Foreign Trade Specialist" },
      { id: "Foreign Trade",              title: "Foreign Trade Specialist" },
      { id: "Importación",                title: "Import Specialist" },
      { id: "Exportación",                title: "Export Specialist" },
      { id: "Aduanas",                    title: "Customs Agent" },
      { id: "Customs",                    title: "Customs Agent" },
      { id: "Agente aduanal",             title: "Customs Agent" },
      { id: "Incoterms",                  title: "Foreign Trade Specialist" },
      { id: "Transporte",                 title: "Transportation Coordinator" },
      { id: "Transportation",             title: "Transportation Coordinator" },
      { id: "Almacén",                    title: "Warehouse Manager" },
      { id: "Warehouse",                  title: "Warehouse Manager" },
      { id: "WMS",                        title: "Warehouse Manager" },
      { id: "Distribución",               title: "Distribution Manager" },
      { id: "Distribution",               title: "Distribution Manager" },
      { id: "Flota",                      title: "Fleet Manager" },
      { id: "Fleet Management",           title: "Fleet Manager" },
      { id: "Chofer",                     title: "Driver" },
      { id: "Conductor",                  title: "Driver" },
      { id: "Driver",                     title: "Driver" },
      { id: "Operador de montacargas",    title: "Forklift Operator" },
      { id: "Montacargas",                title: "Forklift Operator" },
      { id: "Forklift",                   title: "Forklift Operator" },
      { id: "Carga y descarga",           title: "Warehouse Associate" },
      { id: "Almacenista",                title: "Warehouse Associate" },

      // ═══════════════════════════════════════════════════════════
      // SALUD & CIENCIAS MÉDICAS
      // ═══════════════════════════════════════════════════════════

      { id: "Medicina",                   title: "Physician" },
      { id: "Médico",                     title: "Physician" },
      { id: "Doctor",                     title: "Physician" },
      { id: "Physician",                  title: "Physician" },
      { id: "Enfermería",                 title: "Nurse" },
      { id: "Nursing",                    title: "Nurse" },
      { id: "Enfermero",                  title: "Nurse" },
      { id: "Enfermera",                  title: "Nurse" },
      { id: "Nurse",                      title: "Nurse" },
      { id: "Cirugía",                    title: "Surgeon" },
      { id: "Surgery",                    title: "Surgeon" },
      { id: "Cirujano",                   title: "Surgeon" },
      { id: "Pediatría",                  title: "Pediatrician" },
      { id: "Pediatrics",                 title: "Pediatrician" },
      { id: "Ginecología",                title: "Gynecologist" },
      { id: "Gynecology",                 title: "Gynecologist" },
      { id: "Obstetricia",                title: "Obstetrician" },
      { id: "Cardiología",                title: "Cardiologist" },
      { id: "Cardiology",                 title: "Cardiologist" },
      { id: "Neurología",                 title: "Neurologist" },
      { id: "Neurology",                  title: "Neurologist" },
      { id: "Oncología",                  title: "Oncologist" },
      { id: "Oncology",                   title: "Oncologist" },
      { id: "Traumatología",              title: "Traumatologist" },
      { id: "Ortopedia",                  title: "Orthopedic Surgeon" },
      { id: "Orthopedics",                title: "Orthopedic Surgeon" },
      { id: "Dermatología",               title: "Dermatologist" },
      { id: "Dermatology",                title: "Dermatologist" },
      { id: "Oftalmología",               title: "Ophthalmologist" },
      { id: "Ophthalmology",              title: "Ophthalmologist" },
      { id: "Psiquiatría",                title: "Psychiatrist" },
      { id: "Psychiatry",                 title: "Psychiatrist" },
      { id: "Psicología",                 title: "Psychologist" },
      { id: "Psychology",                 title: "Psychologist" },
      { id: "Psicólogo",                  title: "Psychologist" },
      { id: "Terapia",                    title: "Therapist" },
      { id: "Therapy",                    title: "Therapist" },
      { id: "Psicoterapia",               title: "Psychotherapist" },
      { id: "Psicoanálisis",              title: "Psychoanalyst" },
      { id: "Terapia cognitivo-conductual", title: "CBT Therapist" },
      { id: "CBT",                        title: "CBT Therapist" },
      { id: "Nutrición",                  title: "Nutritionist" },
      { id: "Nutrition",                  title: "Nutritionist" },
      { id: "Nutricionista",              title: "Nutritionist" },
      { id: "Dietista",                   title: "Dietitian" },
      { id: "Dietitian",                  title: "Dietitian" },
      { id: "Farmacia",                   title: "Pharmacist" },
      { id: "Pharmacy",                   title: "Pharmacist" },
      { id: "Farmacéutico",               title: "Pharmacist" },
      { id: "Odontología",                title: "Dentist" },
      { id: "Dentistry",                  title: "Dentist" },
      { id: "Dentista",                   title: "Dentist" },
      { id: "Ortodoncia",                 title: "Orthodontist" },
      { id: "Orthodontics",               title: "Orthodontist" },
      { id: "Endodoncia",                 title: "Endodontist" },
      { id: "Fisioterapia",               title: "Physiotherapist" },
      { id: "Physiotherapy",              title: "Physiotherapist" },
      { id: "Fisioterapeuta",             title: "Physiotherapist" },
      { id: "Rehabilitación",             title: "Rehabilitation Specialist" },
      { id: "Rehabilitation",             title: "Rehabilitation Specialist" },
      { id: "Terapia ocupacional",        title: "Occupational Therapist" },
      { id: "Occupational Therapy",       title: "Occupational Therapist" },
      { id: "Fonoaudiología",             title: "Speech Therapist" },
      { id: "Logopedia",                  title: "Speech Therapist" },
      { id: "Speech Therapy",             title: "Speech Therapist" },
      { id: "Optometría",                 title: "Optometrist" },
      { id: "Optometry",                  title: "Optometrist" },
      { id: "Optometrista",               title: "Optometrist" },
      { id: "Gerontología",               title: "Gerontologist" },
      { id: "Gerontology",                title: "Gerontologist" },
      { id: "Geriatría",                  title: "Geriatrician" },
      { id: "Geriatrics",                 title: "Geriatrician" },
      { id: "Salud pública",              title: "Public Health Specialist" },
      { id: "Public Health",              title: "Public Health Specialist" },
      { id: "Epidemiología",              title: "Epidemiologist" },
      { id: "Epidemiology",               title: "Epidemiologist" },
      { id: "Biomedicina",                title: "Biomedical Scientist" },
      { id: "Biotecnología",              title: "Biotechnologist" },
      { id: "Biotechnology",              title: "Biotechnologist" },
      { id: "Laboratorio clínico",        title: "Clinical Laboratory Scientist" },
      { id: "Radiología",                 title: "Radiologist" },
      { id: "Radiology",                  title: "Radiologist" },
      { id: "Imagenología",               title: "Radiologist" },
      { id: "Anestesiología",             title: "Anesthesiologist" },
      { id: "Anesthesiology",             title: "Anesthesiologist" },
      { id: "Medicina interna",           title: "Internist" },
      { id: "Internal Medicine",          title: "Internist" },
      { id: "Médico general",             title: "General Practitioner" },
      { id: "General Practitioner",       title: "General Practitioner" },
      { id: "Médico familiar",            title: "Family Doctor" },
      { id: "Family Medicine",            title: "Family Doctor" },
      { id: "Urgencias",                  title: "Emergency Medicine Physician" },
      { id: "Emergency Medicine",         title: "Emergency Medicine Physician" },
      { id: "Medicina de urgencias",      title: "Emergency Medicine Physician" },
      { id: "Paramédico",                 title: "Paramedic" },
      { id: "Paramedic",                  title: "Paramedic" },
      { id: "Cruz Roja",                  title: "Paramedic" },
      { id: "COFEPRIS",                   title: "Regulatory Affairs Specialist" },
      { id: "Regulatorio",                title: "Regulatory Affairs Specialist" },
      { id: "Regulatory Affairs",         title: "Regulatory Affairs Specialist" },
      { id: "Asuntos regulatorios",       title: "Regulatory Affairs Specialist" },
      { id: "Farmacovigilancia",          title: "Pharmacovigilance Specialist" },
      { id: "Pharmacovigilance",          title: "Pharmacovigilance Specialist" },
      { id: "Ensayos clínicos",           title: "Clinical Research Coordinator" },
      { id: "Clinical Trials",            title: "Clinical Research Coordinator" },
      { id: "Investigación clínica",      title: "Clinical Research Coordinator" },
      { id: "Medicina veterinaria",       title: "Veterinarian" },
      { id: "Veterinary Medicine",        title: "Veterinarian" },
      { id: "Veterinario",                title: "Veterinarian" },
      { id: "Veterinarian",               title: "Veterinarian" },
      { id: "Clínica veterinaria",        title: "Veterinarian" },
      { id: "Zootecnia",                  title: "Animal Scientist" },
      { id: "Animal Science",             title: "Animal Scientist" },
      { id: "Medicina de animales",       title: "Veterinarian" },

      // ═══════════════════════════════════════════════════════════
      // CIENCIAS NATURALES
      // ═══════════════════════════════════════════════════════════

      { id: "Biología",                   title: "Biologist" },
      { id: "Biology",                    title: "Biologist" },
      { id: "Química",                    title: "Chemist" },
      { id: "Chemistry",                  title: "Chemist" },
      { id: "Química industrial",         title: "Industrial Chemist" },
      { id: "Física",                     title: "Physicist" },
      { id: "Physics",                    title: "Physicist" },
      { id: "Matemáticas",                title: "Mathematician" },
      { id: "Mathematics",                title: "Mathematician" },
      { id: "Investigación",              title: "Research Scientist" },
      { id: "Research",                   title: "Research Scientist" },
      { id: "Laboratorio",                title: "Laboratory Technician" },
      { id: "Genética",                   title: "Geneticist" },
      { id: "Genetics",                   title: "Geneticist" },
      { id: "Bioinformática",             title: "Bioinformatician" },
      { id: "Bioinformatics",             title: "Bioinformatician" },
      { id: "Microbiología",              title: "Microbiologist" },
      { id: "Microbiology",               title: "Microbiologist" },
      { id: "Bioquímica",                 title: "Biochemist" },
      { id: "Biochemistry",               title: "Biochemist" },
      { id: "Ecología",                   title: "Ecologist" },
      { id: "Ecology",                    title: "Ecologist" },
      { id: "Botánica",                   title: "Botanist" },
      { id: "Botany",                     title: "Botanist" },
      { id: "Zoología",                   title: "Zoologist" },
      { id: "Zoology",                    title: "Zoologist" },
      { id: "Geología",                   title: "Geologist" },
      { id: "Geology",                    title: "Geologist" },
      { id: "Geofísica",                  title: "Geophysicist" },
      { id: "Geophysics",                 title: "Geophysicist" },
      { id: "Oceanografía",               title: "Oceanographer" },
      { id: "Oceanography",               title: "Oceanographer" },
      { id: "Meteorología",               title: "Meteorologist" },
      { id: "Meteorology",                title: "Meteorologist" },
      { id: "Climatología",               title: "Climatologist" },
      { id: "Climatology",                title: "Climatologist" },
      { id: "Sismología",                 title: "Seismologist" },
      { id: "Seismology",                 title: "Seismologist" },
      { id: "Astrofísica",                title: "Astrophysicist" },
      { id: "Astrophysics",               title: "Astrophysicist" },
      { id: "Astronomía",                 title: "Astronomer" },
      { id: "Astronomy",                  title: "Astronomer" },
      { id: "Paleontología",              title: "Paleontologist" },
      { id: "Paleontology",               title: "Paleontologist" },
      { id: "Arqueología",                title: "Archaeologist" },
      { id: "Archaeology",                title: "Archaeologist" },
      { id: "Arqueólogo",                 title: "Archaeologist" },
      { id: "Minería",                    title: "Mining Engineer" },
      { id: "Mining",                     title: "Mining Engineer" },
      { id: "Ingeniería minera",          title: "Mining Engineer" },
      { id: "Petróleos",                  title: "Petroleum Engineer" },
      { id: "Oil and Gas",                title: "Petroleum Engineer" },
      { id: "PEMEX",                      title: "Petroleum Engineer" },
      { id: "Perforación",                title: "Drilling Engineer" },

      // ═══════════════════════════════════════════════════════════
      // INGENIERÍA INDUSTRIAL & MANUFACTURA
      // ═══════════════════════════════════════════════════════════

      { id: "Ingeniería industrial",      title: "Industrial Engineer" },
      { id: "Industrial Engineering",     title: "Industrial Engineer" },
      { id: "Ingeniero industrial",       title: "Industrial Engineer" },
      { id: "Manufactura",                title: "Manufacturing Engineer" },
      { id: "Manufacturing",              title: "Manufacturing Engineer" },
      { id: "Producción",                 title: "Production Manager" },
      { id: "Production",                 title: "Production Manager" },
      { id: "Planeación de producción",   title: "Production Planner" },
      { id: "Production Planning",        title: "Production Planner" },
      { id: "Mantenimiento",              title: "Maintenance Engineer" },
      { id: "Maintenance",                title: "Maintenance Engineer" },
      { id: "TPM",                        title: "Maintenance Engineer" },
      { id: "Maquiladora",                title: "Manufacturing Engineer" },
      { id: "CNC",                        title: "CNC Programmer" },
      { id: "AutoCAD",                    title: "CAD Designer" },
      { id: "SolidWorks",                 title: "Mechanical Engineer" },
      { id: "CATIA",                      title: "Mechanical Engineer" },
      { id: "CAD",                        title: "CAD Designer" },
      { id: "Supervisor de producción",   title: "Production Supervisor" },
      { id: "Operador",                   title: "Machine Operator" },
      { id: "Operator",                   title: "Machine Operator" },
      { id: "Técnico",                    title: "Technician" },
      { id: "Technician",                 title: "Technician" },
      { id: "Planta",                     title: "Plant Manager" },
      { id: "Plant Manager",              title: "Plant Manager" },
      { id: "Gerente de planta",          title: "Plant Manager" },
      { id: "AMEF",                       title: "Quality Engineer" },
      { id: "FMEA",                       title: "Quality Engineer" },
      { id: "APQP",                       title: "Quality Engineer" },
      { id: "PPAP",                       title: "Quality Engineer" },
      { id: "8D",                         title: "Quality Engineer" },
      { id: "IATF",                       title: "Quality Engineer" },
      { id: "TS 16949",                   title: "Quality Engineer" },
      { id: "Automotive",                 title: "Automotive Engineer" },
      { id: "Automotriz",                 title: "Automotive Engineer" },
      { id: "Industria 4.0",              title: "Industry 4.0 Specialist" },
      { id: "Industry 4.0",               title: "Industry 4.0 Specialist" },
      { id: "Ingeniería de procesos",     title: "Process Engineer" },
      { id: "Process Engineering",        title: "Process Engineer" },

      // ═══════════════════════════════════════════════════════════
      // INGENIERÍA MECÁNICA, ELÉCTRICA & ELECTRÓNICA
      // ═══════════════════════════════════════════════════════════

      { id: "Ingeniería mecánica",        title: "Mechanical Engineer" },
      { id: "Mechanical Engineering",     title: "Mechanical Engineer" },
      { id: "Ingeniero mecánico",         title: "Mechanical Engineer" },
      { id: "Ingeniería eléctrica",       title: "Electrical Engineer" },
      { id: "Electrical Engineering",     title: "Electrical Engineer" },
      { id: "Ingeniero eléctrico",        title: "Electrical Engineer" },
      { id: "Ingeniería electrónica",     title: "Electronics Engineer" },
      { id: "Electronics Engineering",    title: "Electronics Engineer" },
      { id: "PLC",                        title: "Automation Engineer" },
      { id: "SCADA",                      title: "Automation Engineer" },
      { id: "Automatización",             title: "Automation Engineer" },
      { id: "Automation",                 title: "Automation Engineer" },
      { id: "Robótica",                   title: "Robotics Engineer" },
      { id: "Robotics",                   title: "Robotics Engineer" },
      { id: "Instrumentación",            title: "Instrumentation Engineer" },
      { id: "Energías renovables",        title: "Renewable Energy Engineer" },
      { id: "Renewable Energy",           title: "Renewable Energy Engineer" },
      { id: "Energía solar",              title: "Solar Energy Engineer" },
      { id: "Solar Energy",               title: "Solar Energy Engineer" },
      { id: "Energía eólica",             title: "Wind Energy Engineer" },
      { id: "Wind Energy",                title: "Wind Energy Engineer" },
      { id: "Instalaciones eléctricas",   title: "Electrician" },
      { id: "Electricista",               title: "Electrician" },
      { id: "Electrician",                title: "Electrician" },
      { id: "Plomería",                   title: "Plumber" },
      { id: "Plumbing",                   title: "Plumber" },
      { id: "Plomero",                    title: "Plumber" },
      { id: "Aire acondicionado",         title: "HVAC Technician" },
      { id: "HVAC",                       title: "HVAC Technician" },
      { id: "Refrigeración",              title: "HVAC Technician" },
      { id: "Técnico en electrónica",     title: "Electronics Technician" },
      { id: "Reparación de equipos",      title: "Equipment Repair Technician" },
      { id: "Soldadura",                  title: "Welder" },
      { id: "Welding",                    title: "Welder" },
      { id: "Soldador",                   title: "Welder" },
      { id: "Welder",                     title: "Welder" },
      { id: "Mecánico",                   title: "Mechanic" },
      { id: "Mechanic",                   title: "Mechanic" },
      { id: "Mecánico automotriz",        title: "Automotive Mechanic" },

      // ═══════════════════════════════════════════════════════════
      // INGENIERÍA CIVIL & CONSTRUCCIÓN
      // ═══════════════════════════════════════════════════════════

      { id: "Ingeniería civil",           title: "Civil Engineer" },
      { id: "Civil Engineering",          title: "Civil Engineer" },
      { id: "Ingeniero civil",            title: "Civil Engineer" },
      { id: "Construcción",               title: "Construction Manager" },
      { id: "Construction",               title: "Construction Manager" },
      { id: "Arquitectura",               title: "Architect" },
      { id: "Architecture",               title: "Architect" },
      { id: "Arquitecto",                 title: "Architect" },
      { id: "Architect",                  title: "Architect" },
      { id: "Estructuras",                title: "Structural Engineer" },
      { id: "Structural Engineering",     title: "Structural Engineer" },
      { id: "Topografía",                 title: "Surveyor" },
      { id: "Surveying",                  title: "Surveyor" },
      { id: "BIM",                        title: "BIM Specialist" },
      { id: "Revit",                      title: "BIM Specialist" },
      { id: "Presupuesto de obra",        title: "Cost Estimator" },
      { id: "Obra civil",                 title: "Civil Construction Manager" },
      { id: "Residente de obra",          title: "Site Manager" },
      { id: "Supervisor de obra",         title: "Construction Supervisor" },
      { id: "Albañil",                    title: "Mason" },
      { id: "Mason",                      title: "Mason" },
      { id: "Carpintería",                title: "Carpenter" },
      { id: "Carpintero",                 title: "Carpenter" },
      { id: "Carpenter",                  title: "Carpenter" },
      { id: "Pintura de interiores",      title: "Painter" },
      { id: "Pintor",                     title: "Painter" },
      { id: "Instalador",                 title: "Installer" },
      { id: "Herrería",                   title: "Blacksmith" },
      { id: "Herrero",                    title: "Blacksmith" },
      { id: "Urbanismo",                  title: "Urban Planner" },
      { id: "Urban Planning",             title: "Urban Planner" },
      { id: "Planeación urbana",          title: "Urban Planner" },
      { id: "Valuación inmobiliaria",     title: "Real Estate Appraiser" },
      { id: "Agente inmobiliario",        title: "Real Estate Agent" },
      { id: "Real Estate Agent",          title: "Real Estate Agent" },
      { id: "Bienes raíces",              title: "Real Estate Specialist" },
      { id: "Real Estate",                title: "Real Estate Specialist" },
      { id: "Perito",                     title: "Expert Witness" },
      { id: "Perito valuador",            title: "Real Estate Appraiser" },

      // ═══════════════════════════════════════════════════════════
      // INGENIERÍA QUÍMICA, AMBIENTAL & ALIMENTOS
      // ═══════════════════════════════════════════════════════════

      { id: "Ingeniería química",         title: "Chemical Engineer" },
      { id: "Chemical Engineering",       title: "Chemical Engineer" },
      { id: "Ingeniería ambiental",       title: "Environmental Engineer" },
      { id: "Environmental Engineering",  title: "Environmental Engineer" },
      { id: "Medio ambiente",             title: "Environmental Specialist" },
      { id: "Sustentabilidad",            title: "Sustainability Specialist" },
      { id: "Sustainability",             title: "Sustainability Specialist" },
      { id: "Procesos químicos",          title: "Chemical Process Engineer" },
      { id: "Refinería",                  title: "Refinery Engineer" },
      { id: "Residuos",                   title: "Environmental Specialist" },
      { id: "Waste Management",           title: "Environmental Specialist" },
      { id: "ISO 14001",                  title: "Environmental Manager" },
      { id: "Ingeniería de alimentos",    title: "Food Engineer" },
      { id: "Food Engineering",           title: "Food Engineer" },
      { id: "Tecnología de alimentos",    title: "Food Technologist" },
      { id: "Food Technology",            title: "Food Technologist" },
      { id: "HACCP",                      title: "Food Safety Specialist" },
      { id: "Inocuidad alimentaria",      title: "Food Safety Specialist" },
      { id: "Food Safety",                title: "Food Safety Specialist" },
      { id: "BPM",                        title: "Food Safety Specialist" },
      { id: "Bromatología",               title: "Food Scientist" },
      { id: "Calidad alimentaria",        title: "Food Quality Specialist" },

      // ═══════════════════════════════════════════════════════════
      // INGENIERÍA AERONÁUTICA & NAVAL
      // ═══════════════════════════════════════════════════════════

      { id: "Ingeniería aeronáutica",     title: "Aeronautical Engineer" },
      { id: "Aeronautical Engineering",   title: "Aeronautical Engineer" },
      { id: "Ingeniería aeroespacial",    title: "Aerospace Engineer" },
      { id: "Aerospace Engineering",      title: "Aerospace Engineer" },
      { id: "Piloto",                     title: "Pilot" },
      { id: "Pilot",                      title: "Pilot" },
      { id: "Aviación",                   title: "Aviation Specialist" },
      { id: "Aviation",                   title: "Aviation Specialist" },
      { id: "Piloto aviador",             title: "Commercial Pilot" },
      { id: "Commercial Pilot",           title: "Commercial Pilot" },
      { id: "Controlador aéreo",          title: "Air Traffic Controller" },
      { id: "Air Traffic Control",        title: "Air Traffic Controller" },
      { id: "Aeropuerto",                 title: "Airport Operations Specialist" },
      { id: "Sobrecargo",                 title: "Flight Attendant" },
      { id: "Flight Attendant",           title: "Flight Attendant" },
      { id: "Azafata",                    title: "Flight Attendant" },
      { id: "Ingeniería naval",           title: "Naval Engineer" },
      { id: "Naval Engineering",          title: "Naval Engineer" },
      { id: "Marina mercante",            title: "Merchant Marine Officer" },
      { id: "Marino mercante",            title: "Merchant Marine Officer" },
      { id: "Capitán de barco",           title: "Ship Captain" },
      { id: "Ship Captain",               title: "Ship Captain" },
      { id: "Náutica",                    title: "Nautical Specialist" },

      // ═══════════════════════════════════════════════════════════
      // EDUCACIÓN & ENSEÑANZA
      // ═══════════════════════════════════════════════════════════

      { id: "Docencia",                   title: "Teacher" },
      { id: "Teaching",                   title: "Teacher" },
      { id: "Maestro",                    title: "Teacher" },
      { id: "Profesor",                   title: "Teacher" },
      { id: "Teacher",                    title: "Teacher" },
      { id: "Educación",                  title: "Education Specialist" },
      { id: "Education",                  title: "Education Specialist" },
      { id: "Pedagogía",                  title: "Pedagogy Specialist" },
      { id: "Pedagogy",                   title: "Pedagogy Specialist" },
      { id: "E-learning",                 title: "E-learning Specialist" },
      { id: "Instructional Design",       title: "Instructional Designer" },
      { id: "Diseño instruccional",       title: "Instructional Designer" },
      { id: "LMS",                        title: "E-learning Specialist" },
      { id: "Moodle",                     title: "E-learning Specialist" },
      { id: "Educación superior",         title: "University Professor" },
      { id: "Universidad",                title: "University Professor" },
      { id: "Curriculum Development",     title: "Curriculum Developer" },
      { id: "Tutoría",                    title: "Tutor" },
      { id: "Tutoring",                   title: "Tutor" },
      { id: "SEP",                        title: "Education Specialist" },
      { id: "Educación básica",           title: "Elementary School Teacher" },
      { id: "Educación preescolar",       title: "Preschool Teacher" },
      { id: "Parvularia",                 title: "Preschool Teacher" },
      { id: "Preschool Teacher",          title: "Preschool Teacher" },
      { id: "Educación especial",         title: "Special Education Teacher" },
      { id: "Special Education",          title: "Special Education Teacher" },
      { id: "Psicopedagogía",             title: "Psychopedagogist" },
      { id: "Psicopedagogo",              title: "Psychopedagogist" },
      { id: "Educación física",           title: "Physical Education Teacher" },
      { id: "Physical Education",         title: "Physical Education Teacher" },
      { id: "Matemáticas tutor",          title: "Math Tutor" },
      { id: "Idiomas",                    title: "Language Teacher" },
      { id: "Language Teaching",          title: "Language Teacher" },
      { id: "Maestro de inglés",          title: "English Teacher" },
      { id: "English Teacher",            title: "English Teacher" },
      { id: "TESOL",                      title: "English Teacher" },
      { id: "TEFL",                       title: "English Teacher" },
      { id: "IELTS instructor",           title: "English Teacher" },
      { id: "Orientación vocacional",     title: "Career Counselor" },
      { id: "Career Counselor",           title: "Career Counselor" },
      { id: "Consejero educativo",        title: "Educational Counselor" },
      { id: "Director escolar",           title: "School Principal" },
      { id: "School Principal",           title: "School Principal" },
      { id: "Coordinador académico",      title: "Academic Coordinator" },

      // ═══════════════════════════════════════════════════════════
      // DERECHO & LEGAL
      // ═══════════════════════════════════════════════════════════

      { id: "Derecho",                    title: "Lawyer" },
      { id: "Law",                        title: "Lawyer" },
      { id: "Abogado",                    title: "Lawyer" },
      { id: "Lawyer",                     title: "Lawyer" },
      { id: "Attorney",                   title: "Lawyer" },
      { id: "Licenciado en derecho",      title: "Lawyer" },
      { id: "Derecho corporativo",        title: "Corporate Lawyer" },
      { id: "Corporate Law",              title: "Corporate Lawyer" },
      { id: "Derecho laboral",            title: "Labor Lawyer" },
      { id: "Labor Law",                  title: "Labor Lawyer" },
      { id: "Derecho fiscal",             title: "Tax Lawyer" },
      { id: "Tax Law",                    title: "Tax Lawyer" },
      { id: "Derecho penal",              title: "Criminal Lawyer" },
      { id: "Criminal Law",               title: "Criminal Lawyer" },
      { id: "Derecho civil",              title: "Civil Lawyer" },
      { id: "Civil Law",                  title: "Civil Lawyer" },
      { id: "Derecho mercantil",          title: "Commercial Lawyer" },
      { id: "Derecho administrativo",     title: "Administrative Lawyer" },
      { id: "Derecho constitucional",     title: "Constitutional Lawyer" },
      { id: "Compliance",                 title: "Compliance Officer" },
      { id: "Cumplimiento normativo",     title: "Compliance Officer" },
      { id: "Contratos",                  title: "Contract Specialist" },
      { id: "Contracts",                  title: "Contract Specialist" },
      { id: "Litigio",                    title: "Litigation Lawyer" },
      { id: "Litigation",                 title: "Litigation Lawyer" },
      { id: "Notaría",                    title: "Notary" },
      { id: "Notario",                    title: "Notary" },
      { id: "Propiedad intelectual",      title: "Intellectual Property Lawyer" },
      { id: "Intellectual Property",      title: "Intellectual Property Lawyer" },
      { id: "Patentes",                   title: "Patent Attorney" },
      { id: "Patents",                    title: "Patent Attorney" },
      { id: "GDPR",                       title: "Data Privacy Lawyer" },
      { id: "Protección de datos",        title: "Data Privacy Specialist" },
      { id: "Amparo",                     title: "Constitutional Lawyer" },
      { id: "Derecho internacional",      title: "International Lawyer" },
      { id: "International Law",          title: "International Lawyer" },
      { id: "Mediación",                  title: "Mediator" },
      { id: "Mediation",                  title: "Mediator" },
      { id: "Arbitraje",                  title: "Arbitrator" },
      { id: "Arbitration",                title: "Arbitrator" },
      { id: "Asesor jurídico",            title: "Legal Advisor" },
      { id: "Legal Advisor",              title: "Legal Advisor" },
      { id: "Consultor legal",            title: "Legal Consultant" },
      { id: "Abogado corporativo",        title: "Corporate Lawyer" },
      { id: "Defensa penal",              title: "Criminal Defense Lawyer" },
      { id: "Ministerio Público",         title: "Public Prosecutor" },
      { id: "Juez",                       title: "Judge" },
      { id: "Judge",                      title: "Judge" },
      { id: "Magistrado",                 title: "Magistrate" },
      { id: "Criminología",               title: "Criminologist" },
      { id: "Criminology",                title: "Criminologist" },
      { id: "Criminólogo",                title: "Criminologist" },
      { id: "Forense",                    title: "Forensic Specialist" },
      { id: "Forensic",                   title: "Forensic Specialist" },
      { id: "Medicina forense",           title: "Forensic Pathologist" },

      // ═══════════════════════════════════════════════════════════
      // CIENCIAS SOCIALES & HUMANIDADES
      // ═══════════════════════════════════════════════════════════

      { id: "Sociología",                 title: "Sociologist" },
      { id: "Sociology",                  title: "Sociologist" },
      { id: "Antropología",               title: "Anthropologist" },
      { id: "Anthropology",               title: "Anthropologist" },
      { id: "Trabajo social",             title: "Social Worker" },
      { id: "Social Work",                title: "Social Worker" },
      { id: "Trabajador social",          title: "Social Worker" },
      { id: "Social Worker",              title: "Social Worker" },
      { id: "Economía",                   title: "Economist" },
      { id: "Economics",                  title: "Economist" },
      { id: "Economista",                 title: "Economist" },
      { id: "Política",                   title: "Political Analyst" },
      { id: "Political Science",          title: "Political Analyst" },
      { id: "Ciencias políticas",         title: "Political Analyst" },
      { id: "Relaciones internacionales", title: "International Relations Specialist" },
      { id: "International Relations",    title: "International Relations Specialist" },
      { id: "Diplomacia",                 title: "Diplomat" },
      { id: "Diplomacy",                  title: "Diplomat" },
      { id: "Diplomático",                title: "Diplomat" },
      { id: "Servicio exterior",          title: "Foreign Service Officer" },
      { id: "Geografía",                  title: "Geographer" },
      { id: "Geography",                  title: "Geographer" },
      { id: "Historia",                   title: "Historian" },
      { id: "History",                    title: "Historian" },
      { id: "Historiador",                title: "Historian" },
      { id: "Filosofía",                  title: "Philosopher" },
      { id: "Philosophy",                 title: "Philosopher" },
      { id: "Filósofo",                   title: "Philosopher" },
      { id: "Ética",                      title: "Ethics Specialist" },
      { id: "Ethics",                     title: "Ethics Specialist" },
      { id: "Teología",                   title: "Theologian" },
      { id: "Theology",                   title: "Theologian" },
      { id: "Teólogo",                    title: "Theologian" },
      { id: "Psicología social",          title: "Social Psychologist" },
      { id: "Letras",                     title: "Linguist" },
      { id: "Lingüística",                title: "Linguist" },
      { id: "Linguistics",                title: "Linguist" },
      { id: "Lingüista",                  title: "Linguist" },
      { id: "Planificación social",       title: "Social Planner" },
      { id: "Desarrollo comunitario",     title: "Community Development Specialist" },
      { id: "Community Development",      title: "Community Development Specialist" },
      { id: "ONG",                        title: "NGO Specialist" },
      { id: "NGO",                        title: "NGO Specialist" },
      { id: "Sector público",             title: "Public Sector Specialist" },
      { id: "Administración pública",     title: "Public Administrator" },
      { id: "Public Administration",      title: "Public Administrator" },
      { id: "Gobierno",                   title: "Government Specialist" },
      { id: "Política pública",           title: "Public Policy Analyst" },
      { id: "Public Policy",              title: "Public Policy Analyst" },

      // ═══════════════════════════════════════════════════════════
      // GASTRONOMÍA & HOSPITALIDAD
      // ═══════════════════════════════════════════════════════════

      { id: "Gastronomía",                title: "Chef" },
      { id: "Gastronomy",                 title: "Chef" },
      { id: "Chef",                       title: "Chef" },
      { id: "Cocina",                     title: "Chef" },
      { id: "Cocinero",                   title: "Cook" },
      { id: "Cook",                       title: "Cook" },
      { id: "Chef ejecutivo",             title: "Executive Chef" },
      { id: "Executive Chef",             title: "Executive Chef" },
      { id: "Sous chef",                  title: "Sous Chef" },
      { id: "Pastelería",                 title: "Pastry Chef" },
      { id: "Pastry",                     title: "Pastry Chef" },
      { id: "Repostería",                 title: "Pastry Chef" },
      { id: "Panadería",                  title: "Baker" },
      { id: "Panadero",                   title: "Baker" },
      { id: "Baker",                      title: "Baker" },
      { id: "Bartender",                  title: "Bartender" },
      { id: "Barman",                     title: "Bartender" },
      { id: "Barista",                    title: "Barista" },
      { id: "Sommelier",                  title: "Sommelier" },
      { id: "Enología",                   title: "Oenologist" },
      { id: "Mesero",                     title: "Waiter" },
      { id: "Waiter",                     title: "Waiter" },
      { id: "Mesera",                     title: "Waitress" },
      { id: "Hostess",                    title: "Hostess" },
      { id: "Servicio al cliente",        title: "Customer Service Representative" },
      { id: "Customer Service",           title: "Customer Service Representative" },
      { id: "Atención al cliente",        title: "Customer Service Representative" },
      { id: "Hotelería",                  title: "Hospitality Specialist" },
      { id: "Hospitality",                title: "Hospitality Specialist" },
      { id: "Hotel",                      title: "Hotel Manager" },
      { id: "Gerente de hotel",           title: "Hotel Manager" },
      { id: "Hotel Manager",              title: "Hotel Manager" },
      { id: "Recepción de hotel",         title: "Hotel Receptionist" },
      { id: "Turismo",                    title: "Tourism Specialist" },
      { id: "Tourism",                    title: "Tourism Specialist" },
      { id: "Agencia de viajes",          title: "Travel Agent" },
      { id: "Agente de viajes",           title: "Travel Agent" },
      { id: "Travel Agent",               title: "Travel Agent" },
      { id: "Guía turístico",             title: "Tour Guide" },
      { id: "Tour Guide",                 title: "Tour Guide" },
      { id: "Guía de turistas",           title: "Tour Guide" },
      { id: "Reservaciones",              title: "Reservations Specialist" },
      { id: "Concierge",                  title: "Concierge" },
      { id: "Eventos",                    title: "Event Planner" },
      { id: "Event Planning",             title: "Event Planner" },
      { id: "Organización de eventos",    title: "Event Planner" },
      { id: "Event Planner",              title: "Event Planner" },
      { id: "Banquetes",                  title: "Banquet Manager" },
      { id: "Catering",                   title: "Catering Manager" },
      { id: "Coctelería",                 title: "Mixologist" },
      { id: "Mixology",                   title: "Mixologist" },
      { id: "Nutrición deportiva",        title: "Sports Nutritionist" },
      { id: "Sports Nutrition",           title: "Sports Nutritionist" },

      // ═══════════════════════════════════════════════════════════
      // DEPORTES & ACTIVIDAD FÍSICA
      // ═══════════════════════════════════════════════════════════

      { id: "Entrenador personal",        title: "Personal Trainer" },
      { id: "Personal Trainer",           title: "Personal Trainer" },
      { id: "Personal Training",          title: "Personal Trainer" },
      { id: "Entrenador deportivo",       title: "Sports Coach" },
      { id: "Sports Coach",               title: "Sports Coach" },
      { id: "Coach deportivo",            title: "Sports Coach" },
      { id: "Preparador físico",          title: "Fitness Trainer" },
      { id: "Fitness",                    title: "Fitness Trainer" },
      { id: "Fitness Trainer",            title: "Fitness Trainer" },
      { id: "Yoga",                       title: "Yoga Instructor" },
      { id: "Yoga Instructor",            title: "Yoga Instructor" },
      { id: "Pilates",                    title: "Pilates Instructor" },
      { id: "Pilates Instructor",         title: "Pilates Instructor" },
      { id: "CrossFit",                   title: "CrossFit Coach" },
      { id: "Natación",                   title: "Swim Coach" },
      { id: "Swimming",                   title: "Swim Coach" },
      { id: "Fútbol",                     title: "Football Coach" },
      { id: "Soccer",                     title: "Football Coach" },
      { id: "Fútbol americano",           title: "American Football Coach" },
      { id: "Basquetbol",                 title: "Basketball Coach" },
      { id: "Basketball",                 title: "Basketball Coach" },
      { id: "Béisbol",                    title: "Baseball Coach" },
      { id: "Baseball",                   title: "Baseball Coach" },
      { id: "Tenis",                      title: "Tennis Coach" },
      { id: "Tennis",                     title: "Tennis Coach" },
      { id: "Atletismo",                  title: "Athletics Coach" },
      { id: "Gimnasia",                   title: "Gymnastics Coach" },
      { id: "Gymnastics",                 title: "Gymnastics Coach" },
      { id: "Artes marciales",            title: "Martial Arts Instructor" },
      { id: "Martial Arts",               title: "Martial Arts Instructor" },
      { id: "Karate",                     title: "Martial Arts Instructor" },
      { id: "Boxeo",                      title: "Boxing Coach" },
      { id: "Boxing",                     title: "Boxing Coach" },
      { id: "Árbitro",                    title: "Referee" },
      { id: "Referee",                    title: "Referee" },
      { id: "Fisioterapia deportiva",     title: "Sports Physiotherapist" },
      { id: "Sports Physiotherapy",       title: "Sports Physiotherapist" },
      { id: "Medicina deportiva",         title: "Sports Medicine Physician" },
      { id: "Sports Medicine",            title: "Sports Medicine Physician" },
      { id: "Coaching",                   title: "Life Coach" },
      { id: "Life Coach",                 title: "Life Coach" },
      { id: "Executive Coach",            title: "Executive Coach" },
      { id: "Scouting",                   title: "Sports Scout" },
      { id: "Scout deportivo",            title: "Sports Scout" },
      { id: "Gestión deportiva",          title: "Sports Manager" },
      { id: "Sports Management",          title: "Sports Manager" },

      // ═══════════════════════════════════════════════════════════
      // ARTES & MÚSICA
      // ═══════════════════════════════════════════════════════════

      { id: "Música",                     title: "Musician" },
      { id: "Music",                      title: "Musician" },
      { id: "Músico",                     title: "Musician" },
      { id: "Musician",                   title: "Musician" },
      { id: "Cantante",                   title: "Singer" },
      { id: "Singer",                     title: "Singer" },
      { id: "Compositor",                 title: "Music Composer" },
      { id: "Composition",                title: "Music Composer" },
      { id: "Producción musical",         title: "Music Producer" },
      { id: "Music Producer",             title: "Music Producer" },
      { id: "DJ",                         title: "DJ" },
      { id: "Mezcla de audio",            title: "Audio Mixer" },
      { id: "Audio Mixing",               title: "Audio Mixer" },
      { id: "Masterización",              title: "Audio Mastering Engineer" },
      { id: "Mastering",                  title: "Audio Mastering Engineer" },
      { id: "Ingeniería de audio",        title: "Audio Engineer" },
      { id: "Audio Engineering",          title: "Audio Engineer" },
      { id: "Sonidista",                  title: "Sound Technician" },
      { id: "Sound Technician",           title: "Sound Technician" },
      { id: "Piano",                      title: "Pianist" },
      { id: "Guitarra",                   title: "Guitarist" },
      { id: "Guitar",                     title: "Guitarist" },
      { id: "Violín",                     title: "Violinist" },
      { id: "Batería",                    title: "Drummer" },
      { id: "Drums",                      title: "Drummer" },
      { id: "Teoría musical",             title: "Music Teacher" },
      { id: "Solfeo",                     title: "Music Teacher" },
      { id: "Maestro de música",          title: "Music Teacher" },
      { id: "Music Teacher",              title: "Music Teacher" },
      { id: "Teatro",                     title: "Actor" },
      { id: "Theater",                    title: "Actor" },
      { id: "Acting",                     title: "Actor" },
      { id: "Actor",                      title: "Actor" },
      { id: "Actriz",                     title: "Actress" },
      { id: "Danza",                      title: "Dancer" },
      { id: "Dance",                      title: "Dancer" },
      { id: "Bailarín",                   title: "Dancer" },
      { id: "Dancer",                     title: "Dancer" },
      { id: "Ballet",                     title: "Ballet Dancer" },
      { id: "Coreografía",                title: "Choreographer" },
      { id: "Choreography",               title: "Choreographer" },
      { id: "Coreógrafo",                 title: "Choreographer" },
      { id: "Artes escénicas",            title: "Performing Arts Specialist" },
      { id: "Performing Arts",            title: "Performing Arts Specialist" },
      { id: "Circo",                      title: "Circus Performer" },
      { id: "Circus",                     title: "Circus Performer" },
      { id: "Magia",                      title: "Magician" },
      { id: "Magician",                   title: "Magician" },
      { id: "Stand-up comedy",            title: "Comedian" },
      { id: "Comediante",                 title: "Comedian" },
      { id: "Comedian",                   title: "Comedian" },
      { id: "Artes plásticas",            title: "Visual Artist" },
      { id: "Bellas artes",               title: "Fine Arts Specialist" },
      { id: "Fine Arts",                  title: "Fine Arts Specialist" },
      { id: "Curador",                    title: "Art Curator" },
      { id: "Curator",                    title: "Art Curator" },
      { id: "Galería de arte",            title: "Art Gallery Manager" },
      { id: "Museo",                      title: "Museum Curator" },
      { id: "Museum",                     title: "Museum Curator" },

      // ═══════════════════════════════════════════════════════════
      // AGRONOMÍA & CAMPO
      // ═══════════════════════════════════════════════════════════

      { id: "Agronomía",                  title: "Agronomist" },
      { id: "Agronomy",                   title: "Agronomist" },
      { id: "Agrónomo",                   title: "Agronomist" },
      { id: "Agronomist",                 title: "Agronomist" },
      { id: "Agricultura",                title: "Agricultural Specialist" },
      { id: "Agriculture",                title: "Agricultural Specialist" },
      { id: "Ingeniería agrícola",        title: "Agricultural Engineer" },
      { id: "Agricultural Engineering",   title: "Agricultural Engineer" },
      { id: "Cultivos",                   title: "Crop Specialist" },
      { id: "Crops",                      title: "Crop Specialist" },
      { id: "Suelos",                     title: "Soil Scientist" },
      { id: "Soil Science",               title: "Soil Scientist" },
      { id: "Ganadería",                  title: "Livestock Specialist" },
      { id: "Livestock",                  title: "Livestock Specialist" },
      { id: "Fitosanidad",                title: "Plant Health Specialist" },
      { id: "Fitosanitario",              title: "Plant Health Specialist" },
      { id: "Silvicultura",               title: "Forester" },
      { id: "Forestry",                   title: "Forester" },
      { id: "Forestal",                   title: "Forester" },
      { id: "Acuicultura",                title: "Aquaculture Specialist" },
      { id: "Aquaculture",                title: "Aquaculture Specialist" },
      { id: "Pesca",                      title: "Fisheries Specialist" },
      { id: "Fisheries",                  title: "Fisheries Specialist" },
      { id: "Horticultura",               title: "Horticulturalist" },
      { id: "Horticulture",               title: "Horticulturalist" },
      { id: "Paisajismo",                 title: "Landscape Designer" },
      { id: "Landscape Design",           title: "Landscape Designer" },
      { id: "Riego",                      title: "Irrigation Specialist" },
      { id: "Irrigation",                 title: "Irrigation Specialist" },
      { id: "Agricultura orgánica",       title: "Organic Agriculture Specialist" },
      { id: "Organic Farming",            title: "Organic Agriculture Specialist" },
      { id: "Agroindustria",              title: "Agroindustry Specialist" },
      { id: "Agroalimentario",            title: "Agrifood Specialist" },
      { id: "SAGARPA",                    title: "Agricultural Specialist" },
      { id: "SADER",                      title: "Agricultural Specialist" },

      // ═══════════════════════════════════════════════════════════
      // SEGURIDAD & ORDEN PÚBLICO
      // ═══════════════════════════════════════════════════════════

      { id: "Seguridad privada",          title: "Security Guard" },
      { id: "Private Security",           title: "Security Guard" },
      { id: "Guardia de seguridad",       title: "Security Guard" },
      { id: "Security Guard",             title: "Security Guard" },
      { id: "Vigilancia",                 title: "Security Guard" },
      { id: "Policía",                    title: "Police Officer" },
      { id: "Police",                     title: "Police Officer" },
      { id: "Police Officer",             title: "Police Officer" },
      { id: "Seguridad pública",          title: "Public Safety Officer" },
      { id: "Public Safety",              title: "Public Safety Officer" },
      { id: "Investigación privada",      title: "Private Investigator" },
      { id: "Private Investigator",       title: "Private Investigator" },
      { id: "Detective",                  title: "Detective" },
      { id: "Inteligencia",               title: "Intelligence Analyst" },
      { id: "Intelligence",               title: "Intelligence Analyst" },
      { id: "Seguridad industrial",       title: "Industrial Safety Specialist" },
      { id: "Industrial Safety",          title: "Industrial Safety Specialist" },
      { id: "HSE",                        title: "HSE Specialist" },
      { id: "Seguridad e higiene",        title: "HSE Specialist" },
      { id: "STPS",                       title: "HSE Specialist" },
      { id: "Protección civil",           title: "Civil Protection Specialist" },
      { id: "Civil Protection",           title: "Civil Protection Specialist" },
      { id: "Bombero",                    title: "Firefighter" },
      { id: "Firefighter",                title: "Firefighter" },
      { id: "Rescate",                    title: "Rescue Specialist" },
      { id: "Rescue",                     title: "Rescue Specialist" },
      { id: "Defensa civil",              title: "Civil Defense Specialist" },
      { id: "Ejército",                   title: "Military Officer" },
      { id: "Military",                   title: "Military Officer" },
      { id: "Marina",                     title: "Naval Officer" },
      { id: "Fuerza aérea",               title: "Air Force Officer" },
      { id: "Ciberseguridad",             title: "Cybersecurity Specialist" },
      { id: "Cybersecurity",              title: "Cybersecurity Specialist" },
      { id: "Pentesting",                 title: "Penetration Tester" },
      { id: "OWASP",                      title: "Security Engineer" },
      { id: "Ethical Hacking",            title: "Ethical Hacker" },
      { id: "SOC",                        title: "Security Analyst" },
      { id: "CISSP",                      title: "Security Engineer" },

      // ═══════════════════════════════════════════════════════════
      // SECTOR INMOBILIARIO & SEGUROS
      // ═══════════════════════════════════════════════════════════

      { id: "Agente inmobiliario",        title: "Real Estate Agent" },
      { id: "Real Estate Agent",          title: "Real Estate Agent" },
      { id: "Bienes raíces",              title: "Real Estate Specialist" },
      { id: "Real Estate",                title: "Real Estate Specialist" },
      { id: "Corredor inmobiliario",      title: "Real Estate Broker" },
      { id: "Real Estate Broker",         title: "Real Estate Broker" },
      { id: "Valuador",                   title: "Property Appraiser" },
      { id: "Property Appraiser",         title: "Property Appraiser" },
      { id: "Administración de propiedades", title: "Property Manager" },
      { id: "Property Management",        title: "Property Manager" },
      { id: "Property Manager",           title: "Property Manager" },
      { id: "Desarrollador inmobiliario", title: "Real Estate Developer" },
      { id: "Real Estate Developer",      title: "Real Estate Developer" },
      { id: "Seguros",                    title: "Insurance Specialist" },
      { id: "Insurance",                  title: "Insurance Specialist" },
      { id: "Agente de seguros",          title: "Insurance Agent" },
      { id: "Insurance Agent",            title: "Insurance Agent" },
      { id: "Actuaría",                   title: "Actuary" },
      { id: "Actuario",                   title: "Actuary" },
      { id: "Siniestros",                 title: "Claims Adjuster" },
      { id: "Claims",                     title: "Claims Adjuster" },
      { id: "Reaseguros",                 title: "Reinsurance Specialist" },
      { id: "Underwriting",               title: "Underwriter" },

      // ═══════════════════════════════════════════════════════════
      // PRODUCTO & ESTRATEGIA
      // ═══════════════════════════════════════════════════════════

      { id: "Product Manager",            title: "Product Manager" },
      { id: "Product Management",         title: "Product Manager" },
      { id: "Gestión de producto",        title: "Product Manager" },
      { id: "Product Owner",              title: "Product Owner" },
      { id: "Roadmap",                    title: "Product Manager" },
      { id: "OKR",                        title: "Product Manager" },
      { id: "Product Strategy",           title: "Product Strategist" },
      { id: "Go-to-market",               title: "Product Manager" },
      { id: "Business Strategy",          title: "Business Strategist" },
      { id: "Consultoría",                title: "Business Consultant" },
      { id: "Consulting",                 title: "Business Consultant" },
      { id: "Consultor",                  title: "Business Consultant" },
      { id: "Business Analysis",          title: "Business Analyst" },
      { id: "Business Analyst",           title: "Business Analyst" },
      { id: "Analista de negocio",        title: "Business Analyst" },
      { id: "Startups",                   title: "Startup Specialist" },
      { id: "Emprendimiento",             title: "Entrepreneur" },
      { id: "Entrepreneurship",           title: "Entrepreneur" },
      { id: "Venture Capital",            title: "Venture Capital Analyst" },
      { id: "Private Equity",             title: "Private Equity Analyst" },
      { id: "Innovación",                 title: "Innovation Specialist" },
      { id: "Innovation",                 title: "Innovation Specialist" },
      { id: "Transformación digital",     title: "Digital Transformation Specialist" },
      { id: "Digital Transformation",     title: "Digital Transformation Specialist" },

      // ═══════════════════════════════════════════════════════════
      // IDIOMAS & SENIORITY
      // ═══════════════════════════════════════════════════════════

      { id: "Inglés",                     title: "Bilingual Professional" },
      { id: "English",                    title: "Bilingual Professional" },
      { id: "Inglés avanzado",            title: "Bilingual Professional" },
      { id: "Advanced English",           title: "Bilingual Professional" },
      { id: "Bilingüe",                   title: "Bilingual Professional" },
      { id: "Bilingual",                  title: "Bilingual Professional" },
      { id: "Francés",                    title: "Multilingual Professional" },
      { id: "French",                     title: "Multilingual Professional" },
      { id: "Portugués",                  title: "Multilingual Professional" },
      { id: "Portuguese",                 title: "Multilingual Professional" },
      { id: "Alemán",                     title: "Multilingual Professional" },
      { id: "German",                     title: "Multilingual Professional" },
      { id: "Mandarín",                   title: "Multilingual Professional" },
      { id: "Mandarin",                   title: "Multilingual Professional" },
      { id: "Japonés",                    title: "Multilingual Professional" },
      { id: "Japanese",                   title: "Multilingual Professional" },
      { id: "Italiano",                   title: "Multilingual Professional" },
      { id: "Italian",                    title: "Multilingual Professional" },
      { id: "Coreano",                    title: "Multilingual Professional" },
      { id: "Korean",                     title: "Multilingual Professional" },
      { id: "Árabe",                      title: "Multilingual Professional" },
      { id: "Arabic",                     title: "Multilingual Professional" },
      { id: "Junior",                     title: "Junior Professional" },
      { id: "Jr.",                        title: "Junior Professional" },
      { id: "Semi Senior",                title: "Mid-Level Professional" },
      { id: "Ssr",                        title: "Mid-Level Professional" },
      { id: "Senior",                     title: "Senior Professional" },
      { id: "Sr.",                        title: "Senior Professional" },
      { id: "Director",                   title: "Director" },
      { id: "Gerente",                    title: "Manager" },
      { id: "Manager",                    title: "Manager" },
      { id: "Coordinador",                title: "Coordinator" },
      { id: "Coordinator",                title: "Coordinator" },
      { id: "Supervisor",                 title: "Supervisor" },
      { id: "Jefe",                       title: "Department Head" },
      { id: "Liderazgo",                  title: "Team Leader" },
      { id: "Leadership",                 title: "Team Leader" },
      { id: "Trabajo en equipo",          title: "Team Player" },
      { id: "Teamwork",                   title: "Team Player" },
      { id: "Comunicación efectiva",      title: "Communications Specialist" },
      { id: "Resolución de problemas",    title: "Problem Solver" },
      { id: "Problem Solving",            title: "Problem Solver" },
      { id: "Pensamiento crítico",        title: "Analyst" },
      { id: "Critical Thinking",          title: "Analyst" },
      { id: "Adaptabilidad",              title: "Adaptable Professional" },
      { id: "Adaptability",               title: "Adaptable Professional" },
      { id: "Gestión del tiempo",         title: "Project Manager" },
      { id: "Time Management",            title: "Project Manager" },
    ];

    if (typeof pdfjsLib !== 'undefined') {
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
    }
  }

  // ─────────────────────────────────────────────────────────────
  // SKILLS PROHIBIDAS — palabras genéricas que aparecen en
  // cualquier CV sin importar la profesión. NUNCA se usan
  // como skill primaria para mapear un título.
  // ─────────────────────────────────────────────────────────────
  get _blockedGenericSkills() {
    return new Set([
      // Niveles de seniority — no son skills, son descriptores
      "junior", "jr", "jr.", "senior", "sr", "sr.", "lead",
      "semi senior", "semi-senior", "ssr", "ssр.",
      "mid level", "mid-level",
      // Años de experiencia — aparecen en TODO CV
      "3+ years", "5+ years", "8+ years", "10+ years",
      "3 años", "5 años", "8 años", "10 años",
      // Idiomas solos — casi todo CV los menciona
      "english", "inglés", "inglés avanzado", "advanced english",
      "bilingual", "bilingüe", "b2", "c1", "c2",
      "inglés fluido", "fluent english",
      "english b2", "english c1", "english c2",
      "ielts", "toefl",
      // Soft skills ultra-genéricas
      "liderazgo", "leadership", "teamwork", "trabajo en equipo",
      "comunicación", "communication", "comunicación efectiva",
      "resolución de problemas", "problem solving",
      "pensamiento crítico", "critical thinking",
      "adaptabilidad", "adaptability",
      "gestión del tiempo", "time management",
      "toma de decisiones", "decision making",
      // Herramientas genéricas que aparecen en cualquier perfil
      "excel", "microsoft office", "word", "powerpoint",
      "outlook", "teams", "slack", "zoom",
      "google drive", "notion", "trello",
      // Palabras que son comunes en documentos NO técnicos
      "investigación", "research", "laboratorio", "laboratory",
      "producción", "production", "operaciones", "operations",
      "supervisor", "coordinador", "coordinator",
      "gerente", "manager", "director", "jefe",
      "mentor", "mentoring", "mentoría",
      "r", "c", "go", "node", "shell", "bun",
      "flask", "fiber", "celery", "flow", "spark",
      "hive", "flink", "phoenix", "echo", "gin",
      "lua", "groovy", "pilot", "sage", "iris", "lit",
    ]);
  }

  // ═══════════════════════════════════════════════════════════════
  // SISTEMA DE DETECCIÓN NIVEL DIOS
  // Lógica:
  //   1. Segmentar el CV en secciones (experiencia, educación, habilidades, etc.)
  //   2. Asignar PESO diferente a cada sección
  //   3. Cada skill detectada suma puntos según en qué sección aparece
  //   4. Un cluster necesita acumular un SCORE MÍNIMO (no solo contar skills)
  //   5. Skills mencionadas solo en "cursos" o "habilidades" tienen peso bajo
  //   6. Skills mencionadas en "experiencia" tienen peso alto
  // ═══════════════════════════════════════════════════════════════

  // ── PESOS POR SECCIÓN ─────────────────────────────────────────
  // Experiencia laboral = 3x más peso que una mención en habilidades
  get _sectionWeights() {
    return {
      experience:  3.0,   // "experiencia", "experience", fechas + cargo
      education:   2.0,   // "educación", "licenciatura", "carrera"
      skills:      0.5,   // "habilidades", "skills", "competencias"
      courses:     0.3,   // "cursos", "courses", "certificaciones"
      profile:     1.0,   // "perfil", "objetivo", "acerca de"
      default:     1.0,   // sección no identificada
    };
  }

  // ── SKILLS COMPLETAMENTE BLOQUEADAS ──────────────────────────
  // Nunca activan ningún cluster sin importar dónde aparezcan
  get _hardBlocked() {
    return new Set([
      // Seniority
      "junior","jr","jr.","senior","sr","sr.","lead","semi senior",
      "semi-senior","ssr","mid level","mid-level",
      // Años de experiencia
      "3+ years","5+ years","8+ years","10+ years",
      "3 anos","5 anos","8 anos","10 anos",
      // Idiomas solos (muy comunes en todo CV)
      "english","ingles","ingles avanzado","advanced english",
      "bilingual","bilingue","b2","c1","c2","ielts","toefl",
      "ingles fluido","fluent english","english b2","english c1","english c2",
      // Herramientas de oficina universales
      "microsoft office","word","powerpoint","outlook","teams",
      "slack","zoom","google drive","notion","trello",
      // Soft skills ultra-genéricas
      "liderazgo","leadership","teamwork","trabajo en equipo",
      "comunicacion","communication","puntualidad","responsabilidad",
      "creatividad","creativity","adaptabilidad","adaptability",
      "proactividad","empatia","empathy","organizacion","organization",
      "resolucion de problemas","problem solving",
      "pensamiento critico","critical thinking",
      "gestion del tiempo","time management",
      "toma de decisiones","decision making",
      "manejo de crisis","crisis management",
      // Palabras técnicas que aparecen en CVs de CUALQUIER carrera
      "r","c","go","node","shell","bun","flask","fiber","celery",
      "flow","hive","phoenix","echo","gin","lua","pilot","sage","lit",
    ]);
  }

  // ── SKILLS DE ALTO RIESGO ─────────────────────────────────────
  // Solo se aceptan si el score del cluster es alto (aparecen en experiencia)
  get _riskySkills() {
    return new Set([
      "excel",          // finanzas Y todo el mundo
      "photoshop",      // diseño pero también lo mencionan todos
      "c++",            // programación pero aparece en CVs técnicos generales
      "sql",            // tech pero también en análisis de datos de cualquier área
      "python",         // tech pero también ciencia/nutrición/estadística
      "training",       // RRHH pero aparece en salud, educación, etc.
      "capacitacion",   // igual
      "analisis",       // muy genérico
      "analysis",       // igual
      "laboratorio",    // salud Y química Y industria
      "laboratory",     // igual
      "investigacion",  // académico en general
      "research",       // igual
      "estadistica",    // data science pero también salud, economía, etc.
      "statistics",     // igual
    ]);
  }

 // ─────────────────────────────────────────────────────────────
  // PESOS POR SECCIÓN
  // ─────────────────────────────────────────────────────────────
  get _sectionWeights() {
    return {
      experience: 3.0,
      education:  2.0,
      skills:     1.0,   // subido de 0.5 → más permisivo
      courses:    0.5,   // subido de 0.3
      profile:    1.5,
      default:    1.5,   // subido de 1.0 → pdf.js a veces no segmenta bien
    };
  }

  // ─────────────────────────────────────────────────────────────
  // SKILLS HARD BLOQUEADAS — nunca activan nada
  // ─────────────────────────────────────────────────────────────
  get _hardBlocked() {
    return new Set([
      "junior","jr","jr.","senior","sr","sr.","lead",
      "semi senior","semi-senior","ssr","mid level","mid-level",
      "3+ years","5+ years","8+ years","10+ years",
      "b2","c1","c2","ielts","toefl",
      "microsoft office","word","powerpoint","outlook","teams",
      "slack","zoom","google drive","notion","trello",
      "puntualidad","responsabilidad","creatividad","adaptabilidad",
      "proactividad","empatia","organizacion",
      "r","c","go","node","shell","bun","flow",
      "hive","phoenix","echo","gin","lua","pilot","sage","lit",
    ]);
  }

  // ─────────────────────────────────────────────────────────────
  // SKILLS DE RIESGO — peso reducido 50%
  // ─────────────────────────────────────────────────────────────
  get _riskySkills() {
    return new Set([
      "excel","photoshop","c++","training","capacitacion",
      "laboratorio","laboratory","investigacion","research",
      "estadistica","statistics","flask","fiber","celery","spark",
    ]);
  }

  // ─────────────────────────────────────────────────────────────
  // CLUSTERS — umbrales bajados para ser más permisivos
  // Regla general:
  //   minScore 1.5 = 1 skill en sección default/skills
  //   minScore 2.0 = 1 skill en educación O 2 en skills
  //   minScore 3.0 = 1 skill en experiencia O combinación
  // ─────────────────────────────────────────────────────────────
  get _skillClusters() {
    return {

      // ── TECH ──────────────────────────────────────────────────
      tech_android: {
        minScore: 2.0,
        skills: ["kotlin","android","jetpack compose","jetpack","android sdk",
                 "room","hilt","dagger","retrofit","okhttp","coroutines",
                 "livedata","viewmodel","mvvm","mvi","kmm","kmp",
                 "kotlin multiplatform","android studio"],
      },
      tech_ios: {
        minScore: 2.0,
        skills: ["swift","swiftui","objective-c","ios","xcode","uikit",
                 "coredata","core data","combine","viper","testflight",
                 "cocoapods","spm","swift package manager","watchos","tvos"],
      },
      tech_mobile: {
        minScore: 2.0,
        skills: ["react native","flutter","dart","ionic","capacitor",
                 "expo","xamarin","maui",".net maui"],
      },
      tech_frontend: {
        minScore: 2.0,
        skills: ["react","react.js","next.js","vue","angular","svelte",
                 "astro","javascript","typescript","html5","css3","sass",
                 "tailwind css","bootstrap","redux","zustand","webpack",
                 "vite","jest","cypress","playwright","pwa"],
      },
      tech_backend: {
        minScore: 2.0,
        skills: ["node.js","express","nestjs","fastify","django",
                 "fastapi","spring boot","asp.net","laravel",
                 "golang","rails","elixir","scala","graphql","grpc",
                 "jwt","oauth2","rest","restful","api rest","websockets"],
      },
      tech_programming: {
        minScore: 3.0,  // sigue alto para evitar falsos positivos
        skills: ["python","java","c#",".net","php","ruby","rust","c++",
                 "programacion","programming","desarrollo de software",
                 "software development","desarrollador","developer"],
      },
      tech_db: {
        minScore: 2.0,
        skills: ["sql","postgresql","mysql","oracle","sql server",
                 "mongodb","redis","cassandra","dynamodb","firebase",
                 "elasticsearch","supabase","mariadb","sqlite"],
      },
      tech_cloud: {
        minScore: 2.0,
        skills: ["aws","amazon web services","gcp","google cloud","azure",
                 "docker","kubernetes","k8s","terraform","ci/cd",
                 "github actions","jenkins","linux","bash","sre",
                 "cloudformation","lambda","ec2","s3","rds"],
      },
      tech_data: {
        minScore: 2.0,
        skills: ["pandas","numpy","databricks","snowflake",
                 "etl","elt","bigquery","airflow","power bi","tableau",
                 "looker","dbt","data warehouse","data lake","data pipeline",
                 "kafka"],
      },
      tech_ml: {
        minScore: 2.0,
        skills: ["machine learning","deep learning","tensorflow","pytorch",
                 "scikit-learn","sklearn","keras","huggingface","langchain",
                 "llm","nlp","computer vision","mlops","data science",
                 "openai","rag","embeddings"],
      },
      tech_qa: {
        minScore: 2.0,
        skills: ["selenium","appium","cypress","playwright","jest",
                 "jmeter","k6","postman","qa","quality assurance",
                 "pruebas automatizadas","automation testing","tdd","bdd",
                 "e2e","end-to-end"],
      },
      tech_security: {
        minScore: 2.0,
        skills: ["cybersecurity","ciberseguridad","pentesting","owasp",
                 "ethical hacking","soc","siem","cissp","ceh","burp suite",
                 "metasploit","wireshark","nmap","zero trust"],
      },
      tech_devops: {
        minScore: 2.0,
        skills: ["docker","kubernetes","terraform","ansible","helm",
                 "argocd","prometheus","grafana","datadog","nginx",
                 "ci/cd","github actions","jenkins","gitlab ci"],
      },
      tech_arch: {
        minScore: 2.0,
        skills: ["clean architecture","solid","microservices","microservicios",
                 "ddd","domain-driven design","cqrs","event sourcing",
                 "system design","hexagonal architecture","design patterns"],
      },

      // ── DISEÑO ────────────────────────────────────────────────
      design_ux: {
        minScore: 1.5,
        skills: ["figma","sketch","adobe xd","wireframing","prototyping",
                 "user research","usability testing","design system",
                 "ui design","ux design","user experience","invision",
                 "zeplin","maze","hotjar"],
      },
      design_graphic: {
        minScore: 2.0,
        skills: ["adobe photoshop","photoshop","adobe illustrator",
                 "illustrator","adobe indesign","indesign","coreldraw",
                 "diseño grafico","graphic design","branding",
                 "identidad visual","tipografia","typography","canva",
                 "diseñador grafico","graphic designer"],
      },
      design_motion: {
        minScore: 1.5,
        skills: ["after effects","adobe after effects","cinema 4d","blender",
                 "maya","3ds max","motion graphics","animacion","animation",
                 "2d animation","3d animation"],
      },
      design_video: {
        minScore: 1.5,
        skills: ["premiere pro","adobe premiere","final cut pro",
                 "davinci resolve","color grading","edicion de video",
                 "video editing","produccion audiovisual"],
      },
      design_fashion: {
        minScore: 1.5,
        skills: ["diseño de modas","fashion design","patronaje",
                 "pattern making","costura","sewing","textil","textile",
                 "moda","fashion","estilismo","styling"],
      },
      design_interior: {
        minScore: 1.5,
        skills: ["diseño de interiores","interior design","interiorismo",
                 "decoracion","decoration","arquitectura de interiores"],
      },

      // ── MARKETING ─────────────────────────────────────────────
      marketing_digital: {
        minScore: 1.5,
        skills: ["seo","sem","google ads","facebook ads","meta ads",
                 "tiktok ads","email marketing","hubspot","mailchimp",
                 "google analytics","google tag manager","cro",
                 "inbound marketing","content marketing","growth hacking",
                 "a/b testing","marketing digital","digital marketing"],
      },
      marketing_social: {
        minScore: 1.5,
        skills: ["community manager","social media","redes sociales",
                 "instagram","tiktok","youtube","influencer marketing",
                 "copywriting","storytelling","content creator",
                 "creador de contenido","ugc","reels"],
      },
      marketing_brand: {
        minScore: 1.5,
        skills: ["brand management","brand manager","trade marketing",
                 "shopper marketing","category management","pricing",
                 "investigacion de mercados","market research",
                 "planificacion de medios","media planning",
                 "compra de medios","media buying"],
      },
      marketing_pr: {
        minScore: 1.5,
        skills: ["relaciones publicas","public relations",
                 "comunicacion corporativa","gestion de crisis",
                 "media relations","comunicacion interna"],
      },
      marketing_general: {
        minScore: 1.5,
        skills: ["marketing","mercadotecnia","publicidad","advertising",
                 "publicista","campana publicitaria","estrategia de marketing",
                 "marketing strategy","btl","atl","ooh"],
      },

      // ── FINANZAS ──────────────────────────────────────────────
      finance_accounting: {
        minScore: 1.5,
        skills: ["contabilidad","accounting","contador","contaduria",
                 "auditoria","auditing","impuestos","tax","sat","cfdi",
                 "facturacion","nomina","payroll","cuentas por pagar",
                 "accounts payable","cuentas por cobrar","accounts receivable",
                 "contpaqi","aspel","niif","ifrs","nif","quickbooks"],
      },
      finance_corporate: {
        minScore: 1.5,
        skills: ["finanzas corporativas","corporate finance","analisis financiero",
                 "financial analysis","modelado financiero","financial modeling",
                 "presupuesto","budgeting","tesoreria","treasury","riesgo financiero",
                 "financial risk","inversiones","investments","derivados",
                 "cfa","fusiones y adquisiciones","m&a","investment banking",
                 "valuacion","valuation","private equity","venture capital",
                 "restructuracion","reestructuracion","deuda corporativa",
                 "corporate debt","covenants","refinanciacion"],
      },
      finance_insurance: {
        minScore: 1.5,
        skills: ["seguros","insurance","actuaria","actuarial","actuario",
                 "siniestros","claims","reaseguros","reinsurance",
                 "underwriting","suscripcion"],
      },
      finance_banking: {
        minScore: 1.5,
        skills: ["banca","banking","credito","credit","microfinanzas",
                 "microfinance","fintech","banca de inversion"],
      },
      finance_general: {
        minScore: 1.5,
        skills: ["finanzas","finance","financiero","financial",
                 "economia","economics","economista","economist",
                 "analista financiero","financial analyst",
                 "director financiero","cfo"],
      },

      // ── RRHH ──────────────────────────────────────────────────
      hr: {
        minScore: 1.5,
        skills: ["recursos humanos","human resources","rrhh","reclutamiento",
                 "recruitment","reclutador","headhunter","talent acquisition",
                 "adquisicion de talento","seleccion de personal","onboarding",
                 "desarrollo organizacional","relaciones laborales",
                 "labor relations","compensaciones","performance management",
                 "hris","workday","successfactors","ley federal del trabajo",
                 "employer branding","dei","capacitacion y desarrollo"],
      },

      // ── VENTAS ────────────────────────────────────────────────
      sales: {
        minScore: 1.5,
        skills: ["ventas","sales","ejecutivo de ventas","account executive",
                 "account manager","business development","desarrollo de negocios",
                 "b2b","b2c","inside sales","field sales","crm","salesforce",
                 "pipedrive","negociacion","negotiation","cierre de ventas",
                 "prospeccion","prospecting","e-commerce","shopify",
                 "asesor comercial","representante de ventas"],
      },

      // ── OPERACIONES ───────────────────────────────────────────
      operations: {
        minScore: 1.5,
        skills: ["logistica","logistics","cadena de suministro","supply chain",
                 "inventarios","inventory","compras","procurement",
                 "lean","six sigma","kaizen","5s","tpm","erp","sap",
                 "iso 9001","quality management",
                 "planeacion de produccion","production planning",
                 "mantenimiento","maintenance"],
      },

      // ── ADMINISTRACIÓN ────────────────────────────────────────
      admin: {
        minScore: 1.5,
        skills: ["administracion","administration","administrador","administrator",
                 "gestion empresarial","business management","coordinacion",
                 "coordination","asistente ejecutivo","executive assistant",
                 "asistente administrativo","administrative assistant",
                 "secretaria","secretary","auxiliar administrativo",
                 "gestion de proyectos","project management","pmo","pmp"],
      },

      // ── SALUD ─────────────────────────────────────────────────
      health_nutrition: {
        minScore: 1.5,
        skills: ["nutricion","nutrition","nutricionista","nutritionist",
                 "nutriologa","nutriologo","dietista","dietitian",
                 "nutricion deportiva","sports nutrition",
                 "plan nutricional","dieta","dietas","alimentacion",
                 "consulta nutricional","asesoramiento nutricional",
                 "evaluacion nutricional","tamizaje nutricional",
                 "antropometria","composicion corporal"],
      },
      health_medicine: {
        minScore: 1.5,
        skills: ["medicina","medico","doctor","physician","cirugia","surgery",
                 "pediatria","ginecologia","cardiologia","neurologia","oncologia",
                 "traumatologia","ortopedia","dermatologia","psiquiatria",
                 "medicina interna","urgencias","anestesiologia","radiologia",
                 "medico general","medico familiar","consulta medica"],
      },
      health_nursing: {
        minScore: 1.5,
        skills: ["enfermeria","nursing","enfermero","enfermera","nurse",
                 "paramedico","paramedic","rehabilitacion","rehabilitation",
                 "terapia ocupacional","occupational therapy",
                 "cuidados de enfermeria","atencion de enfermeria"],
      },
      health_lab: {
        minScore: 1.5,
        skills: ["laboratorio clinico","clinical lab","analisis clinicos",
                 "clinical analysis","toma de muestras","quimica clinica",
                 "hematologia","urinalisis","bacteriologia",
                 "laboratorista","lab technician"],
      },
      health_psychology: {
        minScore: 1.5,
        skills: ["psicologia","psychology","psicologo","psicoterapia",
                 "psicoanalisis","terapia cognitivo-conductual",
                 "cbt","psicologia social","intervencion psicologica",
                 "terapeuta","therapist"],
      },
      health_pharmacy: {
        minScore: 1.5,
        skills: ["farmacia","pharmacy","farmaceutico","pharmacist",
                 "farmacovigilancia","pharmacovigilance","cofepris",
                 "regulatorio","regulatory affairs","ensayos clinicos",
                 "clinical trials"],
      },
      health_dentistry: {
        minScore: 1.5,
        skills: ["odontologia","dentistry","dentista","ortodoncia","endodoncia",
                 "odontologia general","clinica dental"],
      },
      health_physio: {
        minScore: 1.5,
        skills: ["fisioterapia","physiotherapy","fisioterapeuta","fonoaudiologia",
                 "speech therapy","optometria","gerontologia","geriatria"],
      },
      health_veterinary: {
        minScore: 1.5,
        skills: ["medicina veterinaria","veterinary medicine","veterinario",
                 "veterinarian","zootecnia","animal science","clinica veterinaria"],
      },
      health_public: {
        minScore: 1.5,
        skills: ["salud publica","public health","epidemiologia","epidemiology",
                 "biomedicina","biotecnologia","biotechnology","bioinformatica",
                 "atencion primaria","primer nivel de atencion"],
      },
      health_general: {
        minScore: 1.5,
        skills: ["salud","health","clinica","clinic","hospital","centro de salud",
                 "atencion medica","medical care","area de salud","sector salud",
                 "imss","issste","secretaria de salud","ssa"],
      },

      // ── EDUCACIÓN ─────────────────────────────────────────────
      education: {
        minScore: 1.5,
        skills: ["docencia","teaching","maestro","profesor","teacher",
                 "pedagogia","pedagogy","e-learning","instructional design",
                 "lms","moodle","educacion superior","curriculum development",
                 "tutoria","tutoring","sep","educacion especial",
                 "psicopedagogia","educacion fisica","english teacher",
                 "tesol","tefl","director escolar","salon de clases",
                 "material didactico","maestra","asistente educativa",
                 "guarderia","preescolar","jardin de ninos",
                 "educacion basica","primaria","secundaria","preparatoria"],
      },

      // ── DERECHO ───────────────────────────────────────────────
      law: {
        minScore: 1.5,
        skills: ["derecho","law","abogado","lawyer","attorney",
                 "derecho corporativo","corporate law","derecho laboral",
                 "labor law","derecho fiscal","tax law","derecho penal",
                 "criminal law","compliance","contratos","contracts",
                 "litigio","litigation","notaria","propiedad intelectual",
                 "intellectual property","patentes","gdpr","amparo",
                 "mediacion","arbitraje","criminologia","forense",
                 "asesor juridico","legal advisor","consultor legal"],
      },

      // ── INGENIERÍA ────────────────────────────────────────────
      eng_industrial: {
        minScore: 1.5,
        skills: ["ingenieria industrial","industrial engineering","manufactura",
                 "manufacturing","cnc","autocad","solidworks","catia","cad",
                 "amef","fmea","apqp","ppap","iatf","automotriz","automotive",
                 "industria 4.0","ingeniero industrial","linea de produccion"],
      },
      eng_mechanical: {
        minScore: 1.5,
        skills: ["ingenieria mecanica","mechanical engineering","ingeniero mecanico",
                 "soldadura","welding","mecanico","mechanic",
                 "hvac","refrigeracion","aire acondicionado",
                 "mantenimiento de maquinaria","maquinaria","equipos industriales"],
      },
      eng_electrical: {
        minScore: 1.5,
        skills: ["ingenieria electrica","electrical engineering","ingeniero electrico",
                 "plc","scada","automatizacion","automation","robotica","robotics",
                 "instrumentacion","electricista","electrician","energias renovables",
                 "energia solar","instalaciones electricas"],
      },
      eng_civil: {
        minScore: 1.5,
        skills: ["ingenieria civil","civil engineering","ingeniero civil",
                 "construccion","construction","arquitectura","architecture",
                 "estructuras","structural engineering","topografia","bim",
                 "revit","presupuesto de obra","obra civil","residente de obra",
                 "urbanismo","urban planning","arquitecto"],
      },
      eng_chemical: {
        minScore: 1.5,
        skills: ["ingenieria quimica","chemical engineering","procesos quimicos",
                 "refineria","petroleo","oil and gas","pemex","perforacion",
                 "ingenieria ambiental","environmental engineering",
                 "sustentabilidad","sustainability","residuos","iso 14001"],
      },
      eng_aeronautical: {
        minScore: 1.5,
        skills: ["ingenieria aeronautica","aeronautical engineering",
                 "ingenieria aeroespacial","aerospace engineering",
                 "piloto","pilot","aviacion","aviation","controlador aereo",
                 "ingenieria naval","naval engineering","marina mercante"],
      },
      eng_food: {
        minScore: 1.5,
        skills: ["ingenieria de alimentos","food engineering","tecnologia de alimentos",
                 "food technology","haccp","inocuidad alimentaria","food safety",
                 "bpm","bromatologia","calidad alimentaria"],
      },

      // ── GASTRONOMÍA ───────────────────────────────────────────
      gastronomy: {
        minScore: 1.5,
        skills: ["gastronomia","gastronomy","chef","cocinero","cook",
                 "pasteleria","reposteria","panaderia","bartender","barista",
                 "sommelier","enologia","mesero","waiter","hoteleria",
                 "hospitality","turismo","tourism","agencia de viajes",
                 "eventos","event planning","catering","cocteleria","mixology",
                 "haccp","cocina","restaurante","restaurant"],
      },

      // ── DEPORTES ──────────────────────────────────────────────
      sports: {
        minScore: 1.5,
        skills: ["entrenador personal","personal trainer","personal training",
                 "entrenador deportivo","sports coach","preparador fisico",
                 "fitness","yoga","pilates","crossfit","natacion","futbol",
                 "basquetbol","basketball","tenis","atletismo","gimnasia",
                 "artes marciales","boxeo","arbitro","referee",
                 "fisioterapia deportiva","medicina deportiva",
                 "gestion deportiva","sports management","coaching deportivo"],
      },

      // ── ARTES & MÚSICA ────────────────────────────────────────
      arts: {
        minScore: 1.5,
        skills: ["musica","music","musico","musician","cantante","singer",
                 "compositor","composition","produccion musical","music producer",
                 "dj","ingenieria de audio","audio engineering","teatro",
                 "theater","acting","actor","danza","dance","bailarin",
                 "dancer","ballet","coreografia","choreography",
                 "artes plasticas","bellas artes","curador",
                 "fotografia","photography","fotografo","photographer"],
      },

      // ── PERIODISMO & COMUNICACIÓN ─────────────────────────────
      journalism: {
        minScore: 1.5,
        skills: ["periodismo","journalism","periodista","journalist",
                 "redaccion","writing","redactor","locutor","locution",
                 "comunicacion","communications","presentador","conductor",
                 "corresponsal","reportero","reporter","editor",
                 "corrector de estilo","proofreading","traduccion","translation",
                 "traductor","translator","interpretacion","interpretation",
                 "escritura creativa","creative writing","guion","guionista",
                 "screenwriting","podcast","radio","television"],
      },

      // ── AGRONOMÍA ─────────────────────────────────────────────
      agronomy: {
        minScore: 1.5,
        skills: ["agronomia","agronomy","agronomo","agricultura","agriculture",
                 "ingenieria agricola","cultivos","crops","suelos","soil science",
                 "ganaderia","livestock","fitosanidad","silvicultura","forestry",
                 "acuicultura","aquaculture","pesca","fisheries",
                 "horticultura","horticulture","paisajismo","landscape design",
                 "agricultura organica","organic farming","sagarpa","sader"],
      },

      // ── SEGURIDAD ─────────────────────────────────────────────
      safety: {
        minScore: 1.5,
        skills: ["seguridad privada","private security","guardia de seguridad",
                 "security guard","vigilancia","policia","police",
                 "seguridad industrial","industrial safety","hse",
                 "seguridad e higiene","stps","proteccion civil",
                 "bombero","firefighter","rescate","rescue",
                 "investigacion privada","private investigator","detective"],
      },

      // ── CIENCIAS SOCIALES ─────────────────────────────────────
      social_sciences: {
        minScore: 1.5,
        skills: ["sociologia","sociology","antropologia","anthropology",
                 "trabajo social","social work","trabajador social",
                 "ciencias politicas","political science",
                 "relaciones internacionales","international relations",
                 "diplomacia","diplomacy","historia","history",
                 "filosofia","philosophy","linguistica","linguistics",
                 "administracion publica","public administration",
                 "politica publica","public policy","sector publico",
                 "gobierno","government","servicio publico"],
      },

      // ── PRODUCTO & ESTRATEGIA ─────────────────────────────────
      product: {
        minScore: 1.5,
        skills: ["product manager","product management","gestion de producto",
                 "roadmap","okr","product strategy","go-to-market",
                 "business strategy","consultoria","consulting",
                 "business analysis","business analyst","startups",
                 "emprendimiento","entrepreneurship","innovacion","innovation",
                 "transformacion digital","digital transformation"],
      },

      // ── BLOCKCHAIN ────────────────────────────────────────────
      blockchain: {
        minScore: 2.0,
        skills: ["blockchain","web3","solidity","ethereum","smart contracts",
                 "nft","defi","hardhat","truffle","ipfs"],
      },

      // ── GAME DEV ──────────────────────────────────────────────
      gamedev: {
        minScore: 2.0,
        skills: ["unity","unreal engine","godot","game development",
                 "desarrollo de videojuegos","game design",
                 "diseño de videojuegos"],
      },

      // ── IoT / EMBEBIDOS ───────────────────────────────────────
      embedded: {
        minScore: 2.0,
        skills: ["arduino","raspberry pi","iot","firmware","fpga",
                 "rtos","microcontroller","microcontrolador"],
      },

      // ── INMOBILIARIO ──────────────────────────────────────────
      real_estate: {
        minScore: 1.5,
        skills: ["agente inmobiliario","real estate agent","bienes raices",
                 "real estate","corredor inmobiliario","real estate broker",
                 "valuador","property appraiser","administracion de propiedades",
                 "property management","desarrollador inmobiliario"],
      },

      // ── CIENCIAS ──────────────────────────────────────────────
      sciences: {
        minScore: 1.5,
        skills: ["biologia","biology","quimica","chemistry","fisica","physics",
                 "matematicas","mathematics","microbiologia","microbiology",
                 "bioquimica","biochemistry","ecologia","ecology",
                 "geologia","geology","oceanografia","meteorologia",
                 "laboratorio de investigacion","investigacion cientifica",
                 "ciencias naturales","natural sciences"],
      },

      // ── MINERÍA & PETRÓLEO ────────────────────────────────────
      mining_oil: {
        minScore: 1.5,
        skills: ["mineria","mining","ingenieria minera","petroleo","oil and gas",
                 "pemex","perforacion","refineria","yacimientos",
                 "geologia minera","minerales","extraccion"],
      },

      // ── SECTOR PÚBLICO ────────────────────────────────────────
      public_sector: {
        minScore: 1.5,
        skills: ["administracion publica","public administration","gobierno",
                 "government","servicio publico","politica publica","public policy",
                 "sector publico","dependencia gubernamental","municipio",
                 "alcaldia","secretaria de estado","instituto","organismo publico"],
      },
    };
  }

  // ─────────────────────────────────────────────────────────────
  // MAPA INVERSO skill → [clusters]
  // ─────────────────────────────────────────────────────────────
  get _skillToCluster() {
    if (this.__skillToCluster) return this.__skillToCluster;
    const map = {};
    for (const [name, cluster] of Object.entries(this._skillClusters)) {
      for (const skill of cluster.skills) {
        if (!map[skill]) map[skill] = [];
        map[skill].push(name);
      }
    }
    this.__skillToCluster = map;
    return map;
  }

  // ─────────────────────────────────────────────────────────────
  // JOBS RELACIONADOS — dado un cluster principal, qué otros
  // clusters/roles también son relevantes para mostrar más vacantes
  // ─────────────────────────────────────────────────────────────
  get _relatedClusters() {
    return {
      health_nutrition:   ["health_general","health_medicine","health_public","education"],
      health_medicine:    ["health_general","health_nursing","health_pharmacy","health_public"],
      health_nursing:     ["health_general","health_medicine","health_physio"],
      health_lab:         ["health_general","health_medicine","sciences"],
      health_psychology:  ["health_general","education","social_sciences"],
      health_pharmacy:    ["health_general","health_medicine","sciences"],
      health_dentistry:   ["health_general","health_medicine"],
      health_physio:      ["health_general","health_medicine","sports"],
      health_veterinary:  ["sciences","agronomy"],
      health_general:     ["health_medicine","health_nursing","health_nutrition"],
      tech_android:       ["tech_mobile","tech_backend","tech_arch"],
      tech_ios:           ["tech_mobile","tech_backend","tech_arch"],
      tech_mobile:        ["tech_android","tech_ios","tech_frontend"],
      tech_frontend:      ["tech_backend","design_ux","tech_mobile"],
      tech_backend:       ["tech_db","tech_cloud","tech_arch"],
      tech_programming:   ["tech_backend","tech_frontend","tech_arch"],
      tech_db:            ["tech_backend","tech_data","operations"],
      tech_cloud:         ["tech_devops","tech_backend","tech_arch"],
      tech_data:          ["tech_ml","tech_db","finance_corporate"],
      tech_ml:            ["tech_data","sciences","product"],
      tech_devops:        ["tech_cloud","tech_arch","tech_backend"],
      tech_security:      ["tech_devops","tech_arch","safety"],
      design_ux:          ["design_graphic","tech_frontend","product"],
      design_graphic:     ["design_ux","design_motion","marketing_digital"],
      marketing_digital:  ["marketing_social","marketing_brand","sales"],
      marketing_social:   ["marketing_digital","marketing_pr","journalism"],
      finance_accounting: ["finance_corporate","finance_banking","admin"],
      finance_corporate:  ["finance_banking","finance_accounting","product"],
      finance_banking:    ["finance_corporate","finance_insurance","sales"],
      hr:                 ["admin","sales","education"],
      sales:              ["marketing_digital","marketing_brand","product"],
      operations:         ["admin","eng_industrial","finance_accounting"],
      education:          ["social_sciences","health_psychology","journalism"],
      law:                ["finance_corporate","public_sector","social_sciences"],
      eng_industrial:     ["operations","eng_mechanical","eng_electrical"],
      eng_civil:          ["real_estate","operations","eng_mechanical"],
      journalism:         ["marketing_social","marketing_pr","arts"],
      sports:             ["health_physio","health_nutrition","education"],
      gastronomy:         ["sales","admin","health_nutrition"],
      agronomy:           ["sciences","eng_chemical","eng_food"],
      social_sciences:    ["education","public_sector","law"],
      product:            ["sales","tech_frontend","marketing_digital"],
    };
  }

  // ─────────────────────────────────────────────────────────────
  // SEGMENTADOR DE SECCIONES
  // ─────────────────────────────────────────────────────────────
  _segmentSections(text) {
    const sectionPatterns = [
      { regex: /\b(experiencia|experience|trabajo|employment|historial laboral|trayectoria|experiencia profesional|experiencia laboral)\b/gi, type: 'experience' },
      { regex: /\b(educacion|education|formacion|estudios|licenciatura|carrera tecnica|universidad|instituto|escuela|academia)\b/gi, type: 'education' },
      { regex: /\b(habilidades|skills|competencias|conocimientos|aptitudes|capacidades|herramientas)\b/gi, type: 'skills' },
      { regex: /\b(cursos|courses|certificaciones|certifications|diplomados|talleres|capacitaciones|logros)\b/gi, type: 'courses' },
      { regex: /\b(perfil|objetivo|acerca de|about|resumen|summary|presentacion|sobre mi)\b/gi, type: 'profile' },
    ];

    const lines = text.split('\n');
    let currentSection = 'default';
    const segmented = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      for (const pattern of sectionPatterns) {
        pattern.regex.lastIndex = 0;
        if (pattern.regex.test(trimmed) && trimmed.length < 60) {
          currentSection = pattern.type;
          break;
        }
      }
      segmented.push({ text: trimmed, sectionType: currentSection });
    }

    // Si el CV llegó como un solo bloque (sin saltos), dividir por oraciones
    if (segmented.length < 5) {
      return text.split(/[.!?;]/).map(s => ({ text: s.trim(), sectionType: 'default' })).filter(s => s.text);
    }

    return segmented;
  }

  // ─────────────────────────────────────────────────────────────
  // PARSE — scoring por sección + trabajos relacionados
  // ─────────────────────────────────────────────────────────────
  async parse(file) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf         = await loadingTask.promise;

      let originalText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page        = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        originalText     += textContent.items.map(item => item.str).join("\n") + "\n";
      }

      const normalizedText = this._normalize(originalText);
      const segments       = this._segmentSections(normalizedText);

      // ── PASO 1: Escanear skills y acumular scores ──────────────
      const sortedCatalog = [...this.skillCatalog].sort((a, b) => b.id.length - a.id.length);
      const clusterScores = {};
      const skillMatches  = new Map();

      for (const item of sortedCatalog) {
        const ns = this._normalize(item.id);
        if (this._hardBlocked.has(ns)) continue;

        const escaped = ns.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex   = new RegExp(`(?<![\\w.#@])${escaped}(?![\\w.#@])`, 'gi');

        for (const segment of segments) {
          regex.lastIndex = 0;
          if (regex.test(segment.text)) {
            const weight      = this._sectionWeights[segment.sectionType] ?? 1.5;
            const riskFactor  = this._riskySkills.has(ns) ? 0.5 : 1.0;
            const finalWeight = weight * riskFactor;

            for (const cn of (this._skillToCluster[ns] || [])) {
              clusterScores[cn] = (clusterScores[cn] || 0) + finalWeight;
            }

            if (!skillMatches.has(ns)) {
              const idx   = normalizedText.indexOf(ns);
              const start = Math.max(0, idx - 50);
              const end   = Math.min(originalText.length, idx + item.id.length + 70);
              skillMatches.set(ns, {
                item,
                sectionType: segment.sectionType,
                preview: originalText.substring(start, end).trim(),
              });
            }
            break;
          }
        }
      }

      // ── PASO 2: Clusters válidos ───────────────────────────────
      const validClusters = new Set();
      for (const [cn, score] of Object.entries(clusterScores)) {
        if (score >= (this._skillClusters[cn]?.minScore ?? 1.5)) {
          validClusters.add(cn);
        }
      }

      // ── PASO 3: Expandir con clusters relacionados ─────────────
      // Agrega clusters relacionados con score reducido (50%)
      // para mostrar más roles relevantes sin falsas activaciones
      const expandedClusters = new Set(validClusters);
      for (const cn of validClusters) {
        const related = this._relatedClusters[cn] || [];
        for (const rCn of related) {
          if (!validClusters.has(rCn)) {
            // Solo agregar si el cluster relacionado tiene al menos algún score
            if ((clusterScores[rCn] || 0) > 0) {
              expandedClusters.add(rCn);
            }
          }
        }
      }

      // ── PASO 4: Construir resultado ────────────────────────────
      const matchedJobs = new Map();

      for (const [ns, { item, preview }] of skillMatches) {
        const clusters = this._skillToCluster[ns] || [];
        if (!clusters.some(c => expandedClusters.has(c))) continue;

        const { title } = item;
        if (!matchedJobs.has(title)) {
          matchedJobs.set(title, { title, skills: [item.id], preview: `...${preview}...` });
        } else {
          const ex = matchedJobs.get(title);
          if (!ex.skills.includes(item.id)) ex.skills.push(item.id);
        }
      }

      // ── PASO 5: Ordenar por score descendente ──────────────────
      const titleScores = {};
      for (const [ns, { item }] of skillMatches) {
        for (const c of (this._skillToCluster[ns] || [])) {
          if (!expandedClusters.has(c)) continue;
          // Clusters primarios tienen peso completo, relacionados 50%
          const multiplier = validClusters.has(c) ? 1.0 : 0.5;
          titleScores[item.title] = (titleScores[item.title] || 0) + (clusterScores[c] || 0) * multiplier;
        }
      }

      const finalDetected = Array.from(matchedJobs.values())
        .sort((a, b) => (titleScores[b.title] || 0) - (titleScores[a.title] || 0))
        .map(job => ({ name: job.skills.join(', '), title: job.title, preview: job.preview }));

      return {
        name: file.name.replace(".pdf", "").replace(/(_|-)/g, " "),
        skills: finalDetected.length > 0
          ? finalDetected
          : [{ name: "General", title: "Professional", preview: "No se detectaron habilidades con suficiente contexto." }],
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