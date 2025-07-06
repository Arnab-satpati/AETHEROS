# AetherOS – The Terminal-Driven Hacker Desktop

> *“Reboot your browser into the matrix.”*

AetherOS is a **futuristic, hacker-style web-based operating system simulation** that replicates the experience of a minimalist desktop environment within your browser. Designed for developers, cyberpunk enthusiasts, and terminal lovers.

---

##  Core Features

###  Terminal-Centric Desktop

![Terminal Screenshot](./public/screenshots/Screenshot%20from%202025-07-06%2021-52-53.png)

* Authentic terminal UI with animated cursor  
* Smart suggestion engine (y/n correction with Levenshtein distance)  
* Launch apps via commands (`fileexplorer`, `camera`, `browser`, etc.)  
* Glowing syntax, real-time prompt, and history navigation  

###  EdexUI-Inspired System Panel

![Terminal Screenshot](./public/screenshots/Screenshot%20from%202025-07-06%2022-55-45.png)

* Fullscreen futuristic system monitor  
* Live CPU and RAM graphs  
* Fake task list and network module  
* Completely responsive, sci-fi interface  

###  File Explorer (Secrets Included)

![File Explorer Screenshot](./public/screenshots/Screenshot%20from%202025-07-06%2021-53-23.png)

* Drag-and-drop desktop icons  
* Create, rename, and delete files/folders  
* Resizable & draggable file explorer window  
* *Hidden Easter egg inside the Files app!*

#### 📁 File Icons & Tree Structure

* Intelligent SVG icon rendering for folders & files  
* Uses real folder-specific icons like:
  - `folder-src.svg`, `folder-src-open.svg`
  - `folder-app.svg`, `folder-app-open.svg`
  - `folder-components.svg`, etc.
* Code files like `.jsx`, `.ts`, etc. use the `react.svg` icon  
* Media files like `.png`, `.jpg`, `.svg` use the `image.svg` icon  
* All icons are stored in the `/public` directory for native image referencing  
* Context menu & extra controls (like 3-dots) have been removed for a cleaner UX  

###  Camera App

![Camera Screenshot](./public/screenshots/Screenshot%20from%202025-07-06%2022-00-46.png)

* Access live webcam feed inside draggable window  
* Capture photos using canvas  
* Apply filters (grayscale, sepia, invert, contrast, hue-rotate)  
* Images are saved in localStorage for persistence  

###  Built-in Browser

![Browser Screenshot](./public/screenshots/Screenshot%20from%202025-07-06%2021-56-54.png)

* Open web links in a minimal iframe-based viewer  
* Extensible to full tabbed interface  

###  Calendar App

![Calender Screenshot](./public/screenshots/Screenshot%20from%202025-07-06%2021-54-01.png)

* Smoothly integrated minimal calendar  
* Opens from file menu  
* Useful for planning and productivity inside the fake OS  

---

##  Tech Stack

* **React** (via Vite)  
* **TailwindCSS** – Utility-first styling  
* **Zustand** – Global state for windows & apps  
* **React-RND** – Resizable, draggable windows  
* **UUID** – Unique IDs for windows and files  

---

##  Run AetherOS Locally

```bash
git clone https://github.com/your-username/aetheros.git
cd aetheros
npm install
npm run dev
