# Requirements – Doggy – Dog Breed Identifier

## 1. Purpose and Scope

Doggy is a web application that allows users to upload a photo of a dog and receive an AI-powered breed identification together with simple care and lifestyle hints.

Scope of this document:
- define the main goals of the system,
- describe functional requirements (what the system must do),
- describe non-functional requirements (quality attributes),
- clarify what is out of scope.

Target users:
- dog owners and dog lovers,
- people considering adopting a dog,
- non-expert users (no technical knowledge required).

---

## 2. High-level Goals

- G1. Allow a user to upload a single dog picture from a desktop or mobile browser.
- G2. Provide an automatic breed identification based on the uploaded image.
- G3. Show basic information and care tips for the predicted breed.
- G4. Offer a simple navigation with additional information pages (How it works, Services, About).
- G5. Keep the interaction fast and simple, suitable also for non-technical users.

---

## 3. Functional Requirements

### 3.1 Image upload and preview

- **FR1 – Upload image**  
  The system shall allow the user to upload one image file of a dog from the local device.

- **FR2 – Supported formats**  
  The system shall accept at least `.jpg`, `.jpeg`, and `.png` files.

- **FR3 – Basic validation**  
  The system shall reject files that are too large (e.g. > 10 MB) or in an unsupported format and show an error message.

- **FR4 – Preview**  
  After a valid file is selected, the system shall display a preview of the uploaded image.

### 3.2 Breed identification (future / target behaviour)

- **FR5 – Start analysis**  
  When the user confirms the upload, the system shall send the image to a backend service responsible for breed identification.  
  > Current implementation: mocked behaviour (no real AI analysis yet).

- **FR6 – Receive prediction**  
  The system shall receive from the backend:
  - predicted breed name,
  - confidence score (0–1 or percentage),
  - optional short textual description.

- **FR7 – Show results**  
  The system shall show the predicted breed and confidence to the user in a clear results area.

- **FR8 – Error handling**  
  If the backend cannot process the image, the system shall show a user-friendly error message and allow the user to try again.

### 3.3 Additional pages and navigation

- **FR9 – Navigation menu**  
  The system shall provide a navigation bar with links to:
  - Breed Identifier (home),
  - Services,
  - How It Works,
  - About.

- **FR10 – How It Works page**  
  The system shall provide a “How It Works” page explaining the main steps (upload, analysis, results).

- **FR11 – Services page**  
  The system shall provide a “Services” page describing what the application offers (instant results, AI analysis, care tips, etc.).

- **FR12 – About page**  
  The system shall provide an “About” page with a short description of the project and its purpose.

### 3.4 System behaviour

- **FR13 – Single session**  
  The system shall not require user registration or login; all interactions happen in a single browser session.

- **FR14 – Reset / new image**  
  The system shall allow the user to reset the current result and upload another image.

---

## 4. Non-Functional Requirements (NFR)

- **NFR1 – Performance**  
  - The time between confirming the upload and seeing the result should be *ideally* under 3–5 seconds for normal image sizes.
  - While the analysis is running, the UI shall show a clear loading state.

- **NFR2 – Usability**  
  - The UI shall be simple, with minimal steps (upload → analyze → result).
  - All texts shall be in clear English and understandable for non-technical users.

- **NFR3 – Compatibility**  
  - The application shall work on modern desktop and mobile browsers (Chrome, Firefox, Safari, Edge).

- **NFR4 – Privacy**  
  - Uploaded images shall be processed only for the purpose of breed identification.
  - Images shall not be publicly exposed to other users.
  - For the course project, no persistent user accounts or tracking are required.

- **NFR5 – Maintainability**  
  - The codebase shall be structured following the course template (separation of pages, components, hooks, and integrations).
  - The application shall be documented in `/docs` to support future maintenance.

---

## 5. Out of Scope

- User registration, authentication, and personal profiles.
- Storing a history of past analyses per user.
- Detailed veterinary diagnostics or medical advice.
- Multi-image batch processing.
- Mobile native applications (only web).

---

## 6. Assumptions

- Users have a stable internet connection.
- Users can provide reasonably clear photos of a single dog.
- For the current version of the project, the AI/LLM backend may be mocked, but the architecture is prepared to integrate a real model in future iterations.
