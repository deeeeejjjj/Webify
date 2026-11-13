# WEBIFY - A Web-Based Digital Marketing and Collaboration Platform

Jessica S. Niduaza, Krisha R. Menorca, Lester M. Ramos, Daniel A. Luto, Jhon Gabriel B. Hilario, Ace S. Arroyo

BSI/T - 3C SD | Marinduque State University

## ABSTRACT

Micro, Small, and Medium Enterprises (MSMEs) constitute the foundation of economic activity in local communities, yet many remain constrained by limited access to affordable digital tools, professional services, and reliable online channels. Webify is a web-based digital marketing and collaboration platform designed to address these challenges by connecting micro-enterprise owners with creators, service providers, and business support resources. The platform integrates a Digital Products Marketplace for affordable and pre-built digital assets, a Business Consultation Portal for expert guidance, a Creator Match and Messaging system for collaboration, and a User Dashboard and Project Management portal for tracking milestones and deadlines. Webify is designed around a modular architecture and supports user accounts, creator profiles, consultation booking, project management, and real-time communication workflows. The platform aims to make digital adoption more accessible, strengthen collaboration, and improve the operational organization of micro-enterprises.

**Keywords:** Webify; MSMEs; digital marketplace; business consultation; creator matching; project management

## I. INTRODUCTION

### 1.1 Background and Problem Context

Micro, Small, and Medium Enterprises (MSMEs) account for a substantial share of registered businesses in the Philippines and generate employment across communities. Despite their economic contribution, many micro-enterprises continue to experience structural barriers in operational scalability and digital market integration. The rapid shift toward internet-based commercial activity has heightened the vulnerability of businesses that depend on physical visibility or informal networks without a consistent digital presence.

Digital tools can help small businesses improve visibility, communicate with customers, and coordinate services. However, accessing these tools may involve fragmented platforms, unfamiliar technical processes, and costs that are difficult for small operators to sustain. Webify was conceptualized as a centralized and accessible platform where business owners can discover digital resources, consult professionals, connect with creators, and manage project activities in one environment.

### 1.2 Problem Statement and Research Gap

Micro-enterprises face a set of dynamic barriers to digital adoption:

1. **Financial Constraints:** Developing an independent online presence or acquiring professional digital services can require substantial investment, placing custom software and design work beyond the reach of some micro-enterprises.
2. **Usability and Skill Barriers:** Generic commercial websites may offer steep learning curves, recurring subscription costs, or workflows that are not aligned with local operational dynamics.
3. **Talent Discovery Disconnect:** Local businesses may lack trusted, structured channels to connect with affordable digital creators, such as freelancers, web developers, and graphic designers.

These concerns indicate a need for a unified platform that simplifies access to digital assets, professional consultation, and collaboration opportunities.

### 1.3 Objectives

The primary objective of this project is to design, develop, and evaluate Webify, an accessible web-based digital marketing and collaboration platform tailored for micro-enterprises.

The specific objectives are to:

1. Provide a centralized, searchable marketplace of pre-built web templates and digital marketing assets designed for local businesses.
2. Develop an integrated Business Consultation Portal linking entrepreneurs to trusted business frameworks and relevant creator-advisory topics.
3. Establish a direct Creator Match communication network connecting micro-entrepreneurs with vetted local developers, designers, and university talent.
4. Implement a solution using modern client-side web technologies that operates efficiently across low-bandwidth environments and low-specification devices.

### 1.4 Proposed Solution, Scope and Limitations

Webify acts as a unified digital ecosystem rather than a collection of disconnected services. It provides modular asset selection, accredited advisory guidance, and direct creator matching in a single responsive web platform. Its principal contributions are:

- A Digital Products Marketplace for browsing and acquiring templates and digital assets.
- A Business Consultation Portal for accessing consultation-related information and booking workflows.
- A Creator Match and Messaging system for direct client–creator collaboration.
- A User Dashboard and Project Management portal for monitoring project milestones, tasks, and deadlines.
- A centralized experience intended to reduce the complexity of digital adoption for small businesses.

**Scope and Limitations**

- **Intended Users:** Local micro-enterprise owners, freelance graphic designers, web developers, and creators.
- **Supported Functionality:** Interactive asset browsing, consultation booking workflows, creator profile filtering, messaging/collaboration, and project-related data management.
- **Development Boundaries:** The current implementation represents a functional client-side Minimum Viable Product (MVP). Certain integrations such as live payment processing, external calendar synchronization, and enterprise-grade cloud storage may depend on configuration, service availability, or further development.
- **Limitations:** Platform performance and adoption depend on internet connectivity, accurate user-provided information, and the availability of participating creators and consultants.

## II. METHODOLOGY

### 2.1 Development Approach

The project follows an iterative development approach. Requirements were identified from the intended users' needs and the barriers described in the problem statement. The team organized the platform into modules, developed and integrated the features incrementally, and reviewed the resulting workflows to identify usability and functional issues. This approach supports refinement of the interface and features as the project progresses.

### 2.2 Requirements and Core Features

**Table 1. Requirements and core features**

| Problem/need | Core feature | Acceptance criterion |
|---|---|---|
| Limited access to affordable digital assets | Digital Products Marketplace | Users can browse, filter, preview, and access affordable website templates or digital products. |
| Difficulty finding suitable local digital talent | Creator Match & Messaging Network | Business owners can view creator profiles and initiate direct communication or collaboration. |
| Limited access to business guidance | Business Consultation Portal | Users can select an advisor/consultation slot and complete the consultation booking workflow. |
| Difficulty tracking ongoing work | User Dashboard & Project Tracker | Clients and creators can view project milestones, tasks, deliverables, and deadlines. |
| Uncertainty about digital readiness | Digital Readiness Self-Assessment Tool | Users can complete the assessment and receive an automated readiness result or recommendations. |

### 2.3 Interface Architecture and Data Handling

Webify follows a modular, user-friendly interface architecture that organizes its main features into different sections accessible through the website's navigation system. The platform is designed to provide micro-enterprise owners and creators with convenient access to digital products, business consultation, creative services, and other business-related resources.

**Interface Architecture**

The website is organized into several major components:

1. **Homepage** – Serves as the main entry point of the platform, introducing Webify, its purpose, and the services available to users.
2. **Digital Products Marketplace** – Allows users to browse available digital products and templates, view their details, and add selected items to their cart.
3. **Business Consultation** – Provides access to consultation-related information and options for users seeking professional business guidance.
4. **Creator Matching and Messaging** – Allows users to explore available creators, view their profiles, and communicate through the messaging interface.
5. **Template Library and Preview** – Displays available website templates, including their categories, descriptions, and previews. Users can search and filter templates based on their preferences.
6. **Creator Dashboard** – Provides creators with access to their profiles, uploaded templates, and other creator-related activities.
7. **My Templates** – Allows signed-in creators to manage their uploaded templates, view their submission status, and remove their own submissions.
8. **Business Readiness Assessment** – Provides a set of questions that helps users assess their business readiness and view their corresponding results.
9. **Help Center and Support Panel** – Provides users with guides, frequently asked questions, and assistance in navigating the platform.

**Inputs, Events, and Application State**

Webify accepts different types of user inputs depending on the selected feature. These include text entries, search keywords, category selections, form submissions, uploaded images, and other user interactions.

The platform responds to these inputs through JavaScript event handling. For example, selecting a category updates the displayed products or templates, submitting a form triggers the corresponding validation, and clicking navigation buttons opens the selected section or interface.

The application also maintains interface states such as selected categories, active tabs, open panels, cart contents, and form responses. These states allow the website to update its displayed information based on user actions without requiring users to manually refresh every interaction.

**Data Handling and Storage**

Webify uses JSON-formatted data to organize and manage information needed by different parts of the application. These data files contain structured information such as business details, template information, categories, sample images, and other application content.

JavaScript processes the available data and displays the appropriate information through the website's interface. For example, the marketplace and template library use structured data to display available items, while search and filtering functions help users find specific content.

For user interactions and activities, the platform uses browser-side storage where implemented to retain selected information. This includes saved orders, business assessment results, and messages that remain available after reloading the website. This approach allows certain user activities to persist within the browser without requiring a centralized database.

Uploaded creator templates are handled through the implemented submission process, which includes collecting template details, validating required information, and displaying submission status in the creator dashboard.

Overall, Webify follows a frontend-oriented architecture that combines organized interface components, JavaScript-based interactions, JSON data, and browser-side storage to support its main features. The architecture provides a foundation for future improvements, including the possible integration of a centralized database, backend services, and more advanced user account management.

### 2.4 Technology Selection and Comparative Justification

The project uses a combination of client-side web technologies, browser APIs, and external resources to develop an interactive, responsive, and accessible web application. The technologies were selected based on the project's functional requirements, compatibility with modern browsers, ease of implementation, accessibility, and minimal dependency requirements.

**Table 2. Technology Selection**

| Technology | Alternative considered | Why chosen for THIS project | Evidence |
|---|---|---|---|
| HTML5, CSS3, and Vanilla JavaScript (ES8+) | React.js, Vue.js, Bootstrap | These technologies provide the essential structure, styling, responsive layouts, animations, navigation, and interactive features required by the project's five modules. Vanilla JavaScript avoids unnecessary framework dependencies and is sufficient for the project's client-side functionality. | MDN Web Docs (HTML, CSS, JavaScript) [1] |
| JSON Files with the Fetch API | MySQL database, PHP-based backend, manually embedded JavaScript objects | JSON provides a lightweight and organized way to store content such as categories, templates, characters, advisers, FAQs, and other project information. The Fetch API allows the application to retrieve and process these files without requiring a full backend database. | RFC 8259 [2]; MDN Web Docs (Fetch API) [3] |
| Web Storage API (localStorage) | Session Storage, cookies, server-side database | Local storage allows the application to save user-related information, including cart orders, messages, bookings, project progress, check results, account details, and display settings. It supports persistent storage across browser sessions without requiring a server. | MDN Web Docs (Window.localStorage) [4] |
| Native Browser APIs (Dialog, IntersectionObserver, Web Speech API) | Third-party JavaScript libraries and plugins | Native browser APIs provide built-in functionality for pop-up windows, animations, and speech-related features. They reduce external dependencies and support the project's interactive features while maintaining compatibility with supported browsers. | MDN Web Docs (Dialog, IntersectionObserver, Web Speech API) [5] |
| Local Static Server | Opening files directly through the browser (file://) or using a hosted development server | A local server allows the project to run through a localhost address during development. It supports the loading of JSON files through Fetch API and helps developers test website functionality without requiring online hosting or additional backend infrastructure. | Visual Studio Code Documentation; MDN Web Docs [6] |
| Google Fonts (Poppins) and Wikimedia Commons | System fonts, locally stored fonts, and other online image repositories | Google Fonts provides the Poppins typeface to maintain consistent typography and visual branding. Wikimedia Commons provides accessible visual resources for the project's content and templates, subject to individual image licensing and attribution requirements. | Google Fonts; Wikimedia Commons Reuse Guidelines [7] |

### E. Implementation and Evaluation Procedure

The Webify platform was developed as a browser-based digital marketing and creator-matching solution intended to provide micro-enterprises with accessible digital resources and professional services. The system was implemented using a modular web development approach, incorporating HTML5, CSS3, Tailwind CSS, and JavaScript. Its client-side architecture was designed to minimize computational overhead and support accessibility across devices with varying hardware capabilities.

The implementation process focused on developing the platform's three primary functional components: the Digital Products Marketplace, Business Consultation Portal, and Creator Match and Messaging Network. These components were integrated into a unified platform to allow users to access digital assets, obtain business consultation services, and connect with qualified freelance developers and university student talents.

The evaluation procedure focused on functional verification of the platform's major workflows. Testing activities were intended to examine the accessibility of digital products, the handling of consultation inquiries and bookings, and the communication and project coordination features between clients and creators. Additional checks included interface responsiveness across different viewport sizes, navigation consistency, input validation, and the reliability of user interactions.

The platform's browser-based implementation also incorporated client-side caching to support efficient access to interface resources. External service integrations, including payment gateway and calendar APIs, were considered within the system architecture to support transaction processing and consultation scheduling. These integrations require separate verification to establish their actual operational status.

Functional evaluation was intended to determine whether the platform could perform its primary operations according to the specified requirements. However, specific testing environments, device configurations, browser versions, and detailed test results must be documented based on the actual testing activities conducted by the development team.

## III. RESULTS AND DISCUSSION

### 3.1 Core Feature 1: Digital Products Marketplace

The Digital Products Marketplace was developed to address the financial and technical barriers that prevent micro-enterprises from establishing a professional digital presence. Traditional website development and customized digital marketing services can be costly for small business owners. This feature provides a more accessible alternative by offering pre-built digital assets that can help businesses improve their online presentation and marketing activities.

The feature allows users to explore available digital products and identify resources suitable for their business requirements. Through the marketplace interface, users can browse available digital assets, review their corresponding information, and select products that match their operational and promotional needs. This approach reduces the need for micro-enterprises to commission customized digital solutions for every basic marketing requirement.

The implementation of this feature forms part of Webify's objective of providing affordable digital resources within a centralized platform. Its functionality is intended to simplify digital asset selection and make essential marketing resources more accessible to businesses with limited technical and financial capabilities.

For functional verification, the marketplace should be evaluated by checking whether users can access the marketplace, browse available products, view product information, and complete the intended product selection workflow. Screenshots of the implemented marketplace interface and documented test results should be presented as supporting evidence.

### 3.2 Core Feature 2: Business Consultation Portal

The Business Consultation Portal was designed to provide micro-enterprises with access to business-related consultation services and guidance. This feature addresses the difficulty experienced by small business owners in obtaining structured business assistance and identifying appropriate resources for improving their operations.

The portal follows the Department of Trade and Industry (DTI) Negosyo Center framework as a reference for organizing business consultation support. It provides a centralized interface through which users can access consultation-related information, submit inquiries, and engage with the available consultation services.

The consultation workflow is intended to help business owners communicate their concerns and obtain relevant guidance without having to independently search for multiple sources of assistance. By integrating consultation services into the Webify platform, the system aims to make business support more accessible and organized.

For functional verification, the consultation portal should be evaluated by checking the accessibility of consultation information, the submission of user inquiries, and the handling of consultation requests. If appointment scheduling is implemented, the booking process and calendar integration should also be tested. Screenshots of the consultation interface and actual test results should be included to demonstrate the feature's functionality.

### 3.3 Core Feature 3: Creator Match and Messaging Network

The Creator Match and Messaging Network was developed to address the difficulty micro-enterprises experience in finding affordable and reliable digital service providers. Many small business owners lack established connections with freelance developers, graphic designers, and other individuals capable of providing digital services.

This feature provides a platform that connects business owners with freelance developers and university student talent based on their digital project requirements. Users can access creator profiles, review available services, and establish communication with potential collaborators through the platform's messaging functionality.

The feature also supports project coordination through a user dashboard that allows clients and creators to monitor project information, milestones, and deadlines. Messaging functionality facilitates direct communication between clients and service providers, helping them discuss project requirements and coordinate their work within a centralized environment.

Additionally, the platform incorporates a matching mechanism intended to improve creator recommendations based on available user and project information. User Activity Analytics and the Matching Engine process platform-related activity data to support the improvement of creator-to-client recommendations.

For functional verification, the feature should be evaluated by checking creator profile accessibility, the creator-matching process, direct messaging, and the availability of project tracking information. Where implemented, the project dashboard should also be checked for the correct display and updating of milestones and deadlines. Screenshots of the matching interface, messaging area, and project dashboard should be provided as supporting evidence.

### 3.4 Core Feature 4: Business Consultation Portal

The Business Consultation Portal was designed to provide micro-enterprises with access to business-related consultation services and guidance. This feature addresses the difficulty experienced by small business owners in obtaining structured business assistance and identifying appropriate resources for improving their operations.

The portal follows the Department of Trade and Industry (DTI) Negosyo Center framework as a reference for organizing business consultation support. It provides a centralized interface through which users can access consultation-related information, select available advisor schedules, submit booking requests, and engage with the available consultation services.

The consultation workflow allows business owners to communicate their concerns and obtain relevant guidance without having to independently search for multiple sources of assistance. Through the integration of consultation services into the Webify platform, the system aims to make business support more accessible, organized, and convenient.

For functional verification, the consultation portal should be evaluated by checking the accessibility of consultation information, the selection of available appointment schedules, the submission of booking requests, and the handling of consultation appointments. Where appointment scheduling is implemented, the booking process and calendar logging should also be tested. Screenshots of the consultation interface, appointment selection, and actual test results should be included as supporting evidence.

### 3.5 Core Feature: User Dashboard and Project Tracker

The User Dashboard and Project Tracker were developed to provide clients and digital service creators with a centralized platform for monitoring their ongoing projects and coordinating project-related activities. This feature addresses the difficulty of tracking project progress, managing deliverables, and maintaining communication between business owners and service providers.

The dashboard allows users to view active project information, monitor project milestones, check deliverable upload statuses, and keep track of completion deadlines. It organizes essential project details into a single interface, allowing both clients and creators to stay informed about the progress and requirements of their respective projects.

Additionally, the project tracker supports better coordination between clients and service providers by providing an organized way to monitor project activities and completion requirements. Through this feature, Webify aims to improve project transparency, accountability, and collaboration while helping users manage their digital service engagements more efficiently.

For functional verification, the dashboard should be evaluated by checking the accessibility and accuracy of displayed project information, the updating of project milestones, the visibility of deliverable upload statuses, and the display of project completion deadlines. Screenshots of the dashboard, project progress indicators, and deliverable tracking interface should be provided as supporting evidence.

### 3.6 Core Features: Digital Readiness Self-Assessment Tool

The Digital Readiness Self-Assessment Tool was developed to help micro, small, and medium enterprises (MSMEs) identify their current digital needs and determine appropriate digital solutions for improving their business operations. This feature addresses the challenges experienced by business owners who may have limited knowledge of digital technologies and are uncertain about which digital services are suitable for their businesses.

The assessment tool provides a structured diagnostic questionnaire that users can complete in approximately two minutes. Based on their responses, the system evaluates their business requirements and generates recommendations for suitable website layouts, digital services, and other opportunities for improving their online presence.

The tool serves as an initial guide for business owners in understanding their digital readiness and identifying areas where technological improvements may be beneficial. By integrating this assessment feature into the Webify platform, the system aims to provide more relevant and guided digital service recommendations based on the specific needs and circumstances of each business.

For functional verification, the assessment tool should be evaluated by checking the accessibility of the questionnaire, the functionality of its questions and answer selections, the processing of user responses, and the accuracy and relevance of the generated recommendations. The assessment completion process and the resulting recommendations should also be examined to ensure that the system provides appropriate outputs based on the submitted answers. Screenshots of the questionnaire, assessment process, and generated recommendations should be included as supporting evidence.

### 3.7 Functional Verification and Limitations

**Table 3. Functional Verification and Limitations**

| Core feature | Expected behavior | Observed evidence | Status |
|---|---|---|---|
| Digital Products Marketplace | Displays available digital services and products that users can browse, search, filter, and sort according to their needs. | The marketplace interface displays sample digital services and supports interactive search, filtering, and sorting. | Pass |
| Creator/Service Provider Matching | Allows users to explore available service providers and identify creators who can provide the digital services they need. | The prototype presents sample service-provider information and matching-related content. Actual matching and communication are not connected to a backend. | Partial |
| Inquiry and Consultation Portal | Allows users to submit inquiries or express interest digitally through interactive forms. | Inquiry forms are available in the prototype and demonstrate front-end form interaction. Actual submission and provider notification are not implemented. | Partial |
| User Registration and Login | Provides users with registration and login interfaces for accessing the website's services and personalized features. | The prototype demonstrates registration and login interactions using a front-end demonstration flow. Actual account authentication is not implemented. | Partial |
| Dashboard and Project Tracker | Allows users to view project information, monitor progress, and access project-related updates. | The dashboard displays a project-progress preview, but actual project records and progress updates are not stored in a database. | Partial |
| Digital Readiness Assessment | Allows users to answer assessment questions and receive recommendations based on their business's digital needs. | The assessment provides interactive questions and displays recommendations based on the user's responses. | Pass |
| Website Navigation and Responsiveness | Allows users to navigate between website sections and access the available features through an organized and responsive interface. | Navigation links, smooth scrolling, and responsive interface elements are incorporated into the prototype. | Pass |

**Interpretation of Results and Project Limitations**

The functional verification indicates that the Webify prototype demonstrates its primary front-end functionalities, particularly the digital services marketplace, website navigation, digital readiness assessment, and interactive inquiry interfaces. These features demonstrate how the proposed platform can assist micro-entrepreneurs and businesses in discovering digital services and identifying opportunities to improve their online presence.

However, several limitations remain due to the prototype's front-end-only implementation. User registration and authentication are currently demonstrated through a simulated interface and are not connected to an actual user database. Similarly, creator matching, messaging, inquiry submissions, project tracking, and transaction processing require backend integration to support real-time communication, persistent data storage, and actual service transactions.

Therefore, although the prototype demonstrates the intended interface and interactions of Webify, further development is necessary to implement its complete functionality as a fully operational digital services platform.

## IV. CONCLUSION

The development of Webify: A Web-Based Digital Marketing Studio and Creator-Matching Platform for Micro-Enterprises aims to address the digital challenges experienced by small business owners, particularly their limited access to digital resources, professional business guidance, and creative services. Through the proposed platform, the project brings together essential digital business support, including a digital products marketplace, business consultation, creator matching and messaging, a business dashboard and project tracker, and a digital-readiness self-assessment.

The project highlights the importance of making digital resources and professional assistance more accessible to micro-enterprises. Throughout the research and development process, the team recognized that establishing an online presence involves more than simply using digital technology. It also requires proper guidance, accessible resources, and opportunities to connect with individuals who can provide creative and technical support. These insights helped shape Webify's proposed features and overall direction.

Moving forward, Webify may be further improved through additional development, usability testing with actual micro-enterprise owners, and evaluation of its functionality, reliability, accessibility, and overall user experience. Future enhancements may also include expanding the available digital products and creative services, improving the creator-matching process, and incorporating user feedback to ensure that the platform continues to address the needs of its intended users.

Overall, Webify represents a proposed digital solution that seeks to bridge the gap between small businesses and the resources they need to strengthen their digital presence. Through continuous development and evaluation, the platform has the potential to become a more accessible and practical support system for micro-enterprises as they navigate the growing digital business environment.

## REFERENCES — IEEE STYLE

1. Asian Development Bank. (2022). Asia Small and Medium-Sized Enterprise Monitor 2022: Volume 1 — Country reviews. Asian Development Bank. https://www.adb.org/publications/asia-sme-monitor-2022-volume-1
2. Banjarnahor, H., & Febriyanti, R. (2023). A study on the positive impact of digital visibility on marketing for micro, small, and medium enterprises. At-Tijaroh: Jurnal Ilmu Manajemen Dan Bisnis Islam, 9(2), 253–267. https://www.researchgate.net/publication/379362467_A_Study_On_The_Positive_Impact_Of_Digital_Visibility_On_Marketing_For_Micro_Small_And_Medium_Enterprises
3. Cordova, R., & Martinez, L. (2025). Digital innovation and entrepreneurial success in the Philippine MSME sector: Challenges and opportunities. Journal of Philippine Business & Entrepreneurship, 12(1), 45–62. https://doi.org/10.5281/zenodo.10842918
4. Department of Trade and Industry. (2023). MSME Statistics 2023: Distribution of establishments by sector. DTI Bureau of Small and Medium Enterprise Development. https://www.dti.gov.ph/resources/msme-statistics/
5. García, M. (2019). Digital marketing adoption among microenterprises in the Philippines. Philippine Journal of Business, 7(2), 34–49. https://doi.org/10.3860/pjb.v7i2.1249
6. Ignacio, A., & Gerra, M. (2019). Digital readiness of Philippine MSMEs. Journal of Management Studies, 4(2), 1–11. https://risejournals.org/index.php/imjrise/article/view/1166
7. Kraus, S., Durst, S., & Ferreira, J. J. (2022). Digital transformation in business and management research: A review and overview. International Journal of Information Management, 63, 102466. https://doi.org/10.1016/j.ijinfomgt.2021.102466
8. Marcial, J., & Asuncion, R. (2020). Digital marketing awareness gaps in MSMEs. Philippine Journal of Marketing, 5(1), 123–140. https://doi.org/10.5281/zenodo.7492810
9. Masa, M. D., & Quintana, R. (2020). Digital marketing effectiveness in Philippine SMEs. Journal of Asian Business, 7(12), 983–990. https://doi.org/10.5281/zenodo.8392014
10. Organisation for Economic Co-operation and Development. (2021). The Digital Transformation of SMEs. OECD Studies on SMEs and Entrepreneurship, OECD Publishing. https://doi.org/10.1787/bdb9256a-en
11. Philippine Statistics Authority. (2022). 2021 Annual survey of Philippine business and industry (ASPBI). Republic of the Philippines. https://psa.gov.ph/statistics/survey/business-and-industry/aspbi
12. PwC Philippines. (2020). Innovation and digital transformation: How are Philippine MSMEs performing? PricewaterhouseCoopers Business Unusual Series. https://www.pwc.com/ph/en/publications/philippine-msme-survey-2020.html
13. Tan, L. (2022). Empowering MSMEs through digital financial transformation in Southeast Asia. Asian Economic Journal, 36(3), 210–229. https://doi.org/10.1111/asej.12274
14. United Nations ESCAP. (2022). Digital technology integration and rural MSME resilience in developing Asian economies. UNESCAP Report Series. https://www.unescap.org/kp/2022/digital-technology-integration-and-msmes
15. Vito, J.-R., & Jo, J. R. (2025). Knowledge and utilization of digital marketing and business performance of micro, small, and medium enterprises (MSMEs). International Multidisciplinary Journal of Research for Innovation, Sustainability, and Excellence (IMJRISE), 2(5), 726–732. https://risejournals.org/index.php/imjrise/article/view/1166

## CRediT AUTHOR CONTRIBUTIONS STATEMENT

**Project:** Webify | **Group Name:** Hexperts | **Course / Section:** BSI/T - 3C SD

*Instructions: Mark the relevant roles for all 5–6 members. Multiple people may share a role, and any contributor may have multiple roles. Each member should verify their entries. CRediT documents contributions; it does not determine who qualifies for authorship.*

| Contributor | C | M | So | Va | Fo | I | R | D | O | E | Vi | Su | P | Fu |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Author 1: Jessica Niduaza | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Author 2: Krisha Menorca | ✔ | ✔ |  | ✔ | ✔ | ✔ | ✔ |  | ✔ | ✔ |  |  |  |  |
| Author 3: Lester Ramos | ✔ | ✔ |  | ✔ | ✔ | ✔ | ✔ |  | ✔ | ✔ |  |  |  |  |
| Author 4: Daniel Luto | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| Author 5: Jhon Gabriel Hilario | ✔ | ✔ |  | ✔ | ✔ | ✔ | ✔ |  | ✔ | ✔ |  |  |  |  |
| Author 6: Ace Arroyo | ✔ | ✔ |  | ✔ | ✔ | ✔ | ✔ |  | ✔ | ✔ |  |  |  |  |

**Role Legend**

| Code | Role | Code | Role |
|---|---|---|---|
| C | Conceptualization | M | Methodology |
| So | Software | Va | Validation |
| Fo | Formal analysis | I | Investigation |
| R | Resources | D | Data curation |
| O | Writing – original draft | E | Writing – review & editing |
| Vi | Visualization | Su | Supervision |
| P | Project administration | Fu | Funding acquisition |

**Member confirmation**

| Name | Role |
|---|---|
| Jessica S. Niduaza | Project Leader |
| Daniel A. Luto | Project Developer |
| Ace A. Arroyo | Project Researcher |
| Krisha R. Menorca | Project Finance Manager |
| Lester Jarren M. Ramos | Project Researcher |
| Jhon Gabriel B. Hilario | Project Researcher |

CRediT role definitions: https://credit.niso.org/contributor-roles/. Roles marked must reflect substantive actual contributions; no role is mandatory by default.

## AI USE AND SUPPORTING EVIDENCE

AI-assisted tools were utilized throughout the development and documentation of the Webify platform. The primary AI tool used was Claude Code (Claude Opus 5.5), with additional AI assistance from Claude, GPT, and Gemini, as declared in the project's original usage records. These tools supported frontend implementation, interface design, website content development, coding assistance, troubleshooting, project organization, and manuscript preparation.

AI assistance was applied to selected website components, including the homepage, navigation, digital service marketplace, template pages, creator dashboard, help panel, animations, and other interactive features. AI tools were also used to assist in reviewing project files, organizing the repository, and preparing technical documentation.

All AI-generated outputs were reviewed and validated by the responsible project members through source code inspection, JSON data comparison, browser testing, interface verification, and comparison with the actual project requirements. Features and activities that were not fully tested or independently verified were documented as limitations and were not automatically considered successful implementations.

Detailed records of AI usage, including the specific tasks performed, manuscript and project file sections affected, exact prompts, generated outputs, validation methods, prompting techniques, and responsible members, are provided in the repository file ([AI_DISCLOSURE.md](AI_DISCLOSURE.md)).
