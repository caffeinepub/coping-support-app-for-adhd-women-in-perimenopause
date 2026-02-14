# Specification

## Summary
**Goal:** Build a calm, supportive app for ADHD women in perimenopause with core navigation, coping resources, daily tracking, journaling, saving/favorites, and Internet Identity–scoped data.

**Planned changes:**
- Create the core information architecture and working navigation: Home, Coping Toolkit, Topics/Library, Daily Check-in, Journal, and Saved/Favorites.
- Implement a coherent visual theme/design system with a calm, supportive style and primary colors that avoid blue/purple.
- Build Coping Toolkit: browse coping mechanism cards, filter by category, and view detail pages; load content from the backend.
- Build Topics/Library: list topics and provide readable detail pages with a visible “not medical advice” disclaimer.
- Implement Daily Check-in: quick inputs (sliders/buttons) + optional notes, save to backend, and show history with detail views.
- Implement Journal: optional prompt selection, create/view/delete entries, persisted per signed-in user.
- Implement Saved/Favorites: save/unsave coping mechanisms and topics; show combined saved list; persisted per signed-in user across devices.
- Add Internet Identity sign-in/sign-out; allow anonymous browsing of Toolkit/Library; gate user-specific actions behind sign-in.
- Backend (single Motoko actor): list coping mechanisms/topics; CRUD user check-ins/journal entries; save/unsave and list favorites; stable persistence across upgrades.
- Add generated static illustrations under `frontend/public/assets/generated` and use them on Home and at least one empty state.

**User-visible outcome:** Users can browse coping tools and educational topics without signing in, and when signed in can log daily check-ins, write journal entries, and save favorites that persist across sessions/devices; the app presents a calm, consistent UI with supportive copy and illustrative visuals.
