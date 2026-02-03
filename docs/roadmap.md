# MarketScope – Roadmap

## Phase 1: Design and Documentation
**Goal:** Establish a clear product vision and technical foundation.

1. Define core product goals and target user persona
2. Finalize feature scope for MVP (v1)
3. Choose UI/UX direction (layout, theming, chart style)
4. Create wireframes or rough UI sketches
5. Draft initial documentation:
   - README.md
   - TECH-SPEC.md
   - ARCHITECTURE.md
6. Define data domains and supported asset classes

---

## Phase 2: Project Setup
**Goal:** Create a solid, maintainable development environment.

1. Initialize React + TypeScript project (Vite)
2. Configure project structure and folder conventions
3. Set up linting and formatting (ESLint, Prettier)
4. Configure environment variables
5. Add basic routing and layout shell
6. Set up global state management
7. Establish base UI components (layout, navigation, theme)

---

## Phase 3: API Selection and Implementation
**Goal:** Integrate reliable market data sources.

1. Research and evaluate market data providers
2. Select APIs for each asset class:
   - Equities / ETFs
   - Crypto
   - Indices
   - FX
3. Define normalized data models
4. Implement API client layer
5. Handle rate limiting and error states
6. Add data caching and request throttling
7. Implement mock data for development and testing
