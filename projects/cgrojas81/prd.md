# Product Requirements Document (PRD)

**Participant:** cgrojas81  

---

## Project Overview

**Project Name:** Family Planner (Family Scheduler)

**One-line Description:** A web app for households to share a calendar, organizations (school/sports), pick/drop trips, and driver duties—with invite-based family membership.

**Type:** Web App (Next.js, single household per account family)

---

## What I’m building

- **Calendar** — Month view of family events; add/edit events with optional org, location, travel flag.
- **Organizations** — Schools, sports, community groups to tag events and trips.
- **Pick / Drop (Trips)** — Schedule pickups/dropoffs, assign drivers, suggest driver (travel-aware).
- **My duties** — Drivers see assigned trips, status updates, optional location share.
- **Settings** — Profile, driver flag, **invite link/code** so new members join the same family.

Tech stack (separate repo / local app): Next.js 16, Prisma + SQLite, Auth.js credentials.

---

## Base MVP (workshop `base_mvp/`)

_For the greenfield exercise, a minimal React SPA could mirror one slice—e.g. read-only week list of events. Main implementation lives in the Family Planner app._

**Stretch aligned with PRD:** Hardcoded week of events in React, single screen.

---

## Success Criteria

- [ ] MVP runs locally (Family Planner: `npm run dev` in app folder)
- [ ] PR merged to workshop upstream with this participant folder
- [ ] Features documented above tracked in main app
