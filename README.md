# 🇧🇩 SafeBangla (সেফবাংলা)
### Next-Generation AI Disaster, Emergency Response & Zero-Network Resilience Ecosystem

[![Web App](https://img.shields.io/badge/Web-HTML5%20%2F%20Glassmorphism%20PWA-E34F26?logo=html5&logoColor=white)](web/)
[![Kotlin](https://img.shields.io/badge/Kotlin-2.0.0-7F52FF?logo=kotlin&logoColor=white)](https://kotlinlang.org/)
[![Jetpack Compose](https://img.shields.io/badge/UI-Jetpack%20Compose%20M3-4285F4?logo=android&logoColor=white)](https://developer.android.com/jetpack/compose)
[![Flutter](https://img.shields.io/badge/Cross--Platform-Flutter%203.x-02569B?logo=flutter&logoColor=white)](https://flutter.dev/)
[![Django](https://img.shields.io/badge/Backend-Django%20REST%20Framework-092E20?logo=django&logoColor=white)](https://www.django-rest-framework.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20%2F%20PostGIS-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-Apache%202.0-green.svg)](LICENSE)

---

## 📌 Executive Summary

**SafeBangla** is a mission-critical disaster management and civilian safety ecosystem purpose-built for the extreme climate realities of Bangladesh — including Bay of Bengal super-cyclones, Sylhet & Haor flash floods, Nor'westers (*Kalbaishakhi*), and dense urban seismic hazards.

When traditional cellular towers drown and grid power fails, standard emergency apps become useless. **SafeBangla solves the zero-connectivity barrier** through an autonomous multi-tier architecture: offline BLE mesh networking, compressed SMS geobeacons, pocket gesture triggers, real-time family panic radar, acoustic ambient distress detection, and shelter load-balancing algorithms.

---

## 🚀 Key Architectural Innovations

### 1. 📳 Silent Pocket Gesture & Secret SOS Trigger
- **Hardware Trigger:** Background sensor listener monitoring device accelerometer (`>22 m/s²` threshold) and triple physical Volume Down events.
- **Zero-Display Operation:** Dispatches an emergency broadcast without illuminating the screen or generating audio feedback, safeguarding individuals in hostage or flash-surge situations.
- **Payload:** Automatically packages precise GPS coordinates, battery level, timestamp, and initiates a 10-second silent compressed audio recording.

### 2. ⭕ Family Safety Circle & 15km Live Panic Radar
- **Instant Status Broadcasting:** 1-tap **"I Am Safe"** (সবাই নিরাপদ) cryptographic broadcast to private family circles.
- **Interactive Panic Radar:** Custom Canvas-rendered radar sweeping within a 15km radius, highlighting family members in `SAFE`, `IN_DANGER`, or `OFFLINE` status with direct coordinate lock-on.

### 3. 🏢 Digital Shelter Virtual Queue & 90% Load Balancer
- **Smart Capacity Redistribution:** Once a cyclone/flood shelter hits **90% capacity**, the system algorithmically closes new token reservations and dynamically reroutes citizens to the nearest facility with verified capacity.
- **Tamper-Proof Digital Entry Tokens:** Generates high-contrast QR passes with HMAC authentication for rapid, orderly gate verification.

### 4. 🎙️ AI Ambient Panic Audio & Cry Fingerprint Listener
- **Acoustic Classifier:** Analyzes ambient decibel spikes and sound signatures to distinguish between general storm rain and high-frequency human distress screams or rapid flash flood surges.
- **Emergency Verification Intercept:** Auto-triggers a 5-second verification countdown pop-up before elevating to an active rescue mission if unacknowledged.

### 5. 🏆 Gamified Volunteer Engine & Verifiable PDF Credentials
- **Impact-Driven Recognition:** Rewards first responders and volunteers with XP, mission streaks, and digital badges (*"Life Saver"*, *"Flood Rescue Elite"*, *"Community Hero"*).
- **Automated Certification:** Generates cryptographically verifiable PDF certificates of service backed by digital signatures.

### 6. 🛰️ Autonomous Drone Delivery Fleet & IoT Water Telemetry
- **Air-Drop Tasking:** Geospatial assignment of autonomous delivery drones for medicine, purification tablets, and emergency rations.
- **Real-Time Hydrological Gauges:** Webhook listeners connected to river level sensors across the Surma, Padma, and Jamuna basins, generating automated flash-flood hazard notifications.

---

## 🏗️ System Architecture

```text
+-----------------------------------------------------------------------------------+
|                                  CLIENT LAYER                                     |
|  +-------------------------------------+   +------------------------------------+ |
|  | Native Android (Jetpack Compose M3) |   | Cross-Platform Flutter App         | |
|  | - Silent Pocket Accelerometer Engine|   | - Family Panic Radar Canvas        | |
|  | - Ambient Decibel & Cry Listener    |   | - Offline BLE Mesh Node            | |
|  | - Glassmorphism UI & Dynamic Theming|   | - Bangla / English i18n            | |
|  +-------------------------------------+   +------------------------------------+ |
+-----------------------------------------+-----------------------------------------+
                                          |
                   [ HTTPS / WSS / gRPC / Offline SMS Gateway ]
                                          |
+-----------------------------------------v-----------------------------------------+
|                                BACKEND SERVICES                                   |
|  +-----------------------------------------------------------------------------+  |
|  | Django REST Framework & Channels WebSockets                                 |  |
|  | - Shelter Load Balancer Service (90% Threshold Rerouting Engine)           |  |
|  | - Drone & Robot Fleet Task Dispatcher                                       |  |
|  | - Volunteer Leaderboard & Cryptographic PDF Issuer                          |  |
|  | - IoT Flood Gauge Webhook Consumer                                          |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------+-----------------------------------------+
                                          |
+-----------------------------------------v-----------------------------------------+
|                               DATA & INTELLIGENCE                                 |
|  +-----------------------------+   +-------------------------------------------+  |
|  | PostgreSQL + PostGIS        |   | Edge ML & Acoustic Classifier             |  |
|  | - Spatial Geospatial Queries|   | - Ambient Distress / Scream Detection     |  |
|  | - Offline Pre-cached Bounds |   | - Real-time Noise Floor Filtering         |  |
|  +-----------------------------+   +-------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

---

## 📂 Repository Structure

```text
SafeBangla/
├── app/                                    # Native Android (Kotlin + Jetpack Compose)
│   ├── src/main/java/com/example/
│   │   ├── MainActivity.kt                 # Main entry point with role switching
│   │   ├── data/
│   │   │   └── SafeBanglaRepository.kt     # In-memory reactive state & sensor simulation
│   │   ├── model/
│   │   │   └── SafeBanglaModels.kt         # Data classes: Shelters, Hazards, Volunteers, etc.
│   │   ├── ui/
│   │   │   ├── CitizenScreen.kt            # SOS, Shelters, Hospitals, Emergency Hotlines
│   │   │   ├── FamilySafetyScreen.kt       # Live 15km Radar & "I Am Safe" Circle
│   │   │   ├── ShelterQueueScreen.kt       # 90% Capacity Balancer & Dynamic QR Tokens
│   │   │   ├── VolunteerLeaderboardScreen.kt # XP, Badges, Mission Triage & Certification
│   │   │   ├── TechnicalSpecsSheet.kt      # Interactive Architecture Viewer
│   │   │   └── theme/                      # Material 3 Color, Type, and Theming
│   └── build.gradle.kts                    # Android Gradle configuration
├── flutter_safebangla/                     # Cross-Platform Client (Flutter 3.x)
│   ├── lib/
│   │   ├── main.dart                       # Flutter entry point & Navigation
│   │   ├── screens/
│   │   │   └── family_safety_radar_screen.dart # Radar canvas painter & status broadcast
│   │   └── services/
│   │       └── silent_shake_detector.dart  # Sensor stream listener & pocket trigger
│   └── pubspec.yaml                        # Flutter package configuration
├── gradle/                                 # Gradle Version Catalog & Wrappers
├── metadata.json                           # AI Studio application metadata
└── README.md                               # Project documentation
```

---

## 🛠️ Quick Start & Setup

### Prerequisites
- **Android Studio Ladybug (2024.2+)** or later
- **JDK 17 or 21**
- **Flutter SDK 3.24+** (if running the Flutter subproject)
- **Python 3.11+ & PostgreSQL with PostGIS** (for backend services)

### Running the Web Version (HTML5 / Glassmorphism)
1. Run with Node.js:
   ```bash
   npm start
   # or: node server.js
   ```
2. Open your browser at `http://localhost:3000/`. You can also open `web/index.html` directly in any modern browser!

---

### Running the Native Android App (Jetpack Compose)
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/SafeBangla.git
   cd SafeBangla
   ```
2. Open the project in Android Studio.
3. Build and run on an Android device or emulator:
   ```bash
   gradle assembleDebug
   ```
4. Run tests:
   ```bash
   gradle :app:testDebugUnitTest
   ```

---

### Running the Flutter Client
```bash
cd flutter_safebangla
flutter pub get
flutter run
```

---

### Backend Django REST Setup (Reference)
```bash
# Set up virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install django djangorestframework psycopg2-binary django-cors-headers reportlab

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Start development server
python manage.py runserver 0.0.0.0:8000
```

---

## 📡 Key API Endpoints Specification

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/sos/trigger/` | Dispatch emergency SOS packet with GPS & 10s audio |
| `GET`  | `/api/v1/shelters/` | List shelters with real-time capacity and safe routing |
| `POST` | `/api/v1/shelters/{id}/token/` | Generate load-balanced digital entry QR token |
| `POST` | `/api/v1/family/safe-broadcast/`| 1-tap "I Am Safe" circular broadcast |
| `GET`  | `/api/v1/volunteers/leaderboard/`| Fetch top volunteers, XP scores, and missions |
| `POST` | `/api/v1/volunteers/certificate/`| Generate cryptographically signed PDF certificate |
| `POST` | `/api/v1/webhooks/iot-water-level/`| Ingest river gauge sensor telemetry |

---

## 🇧🇩 Emergency Hotlines Integrated

- **National Emergency Service:** `999`
- **Fire Service & Civil Defence:** `16163` / `02-9555555`
- **Disaster Early Warning (BMD):** `1090`
- **Bangladesh Coast Guard:** `16612`
- **National Health Helpline:** `16263`

---

## 🔒 Security & Offline Zero-Trust

1. **Client-Side Geolocation Masking:** Location precision is encrypted end-to-end to prevent tracking by malicious actors during civil unrest or unrestrained crises.
2. **Deterministic Offline Tokens:** Shelter tokens leverage time-window HMAC signatures verified by offline scanner devices via public keys.
3. **Graceful Degradation:** The UI dynamically switches between WebSocket $\rightarrow$ Long-Polling $\rightarrow$ Native SMS Beacon depending on real-time network connectivity.

---

## 📜 License & Acknowledgments

Distributed under the **Apache License 2.0**. Developed as a dedicated contribution to disaster-resilient open-source infrastructure for Bangladesh and global vulnerable delta nations.
