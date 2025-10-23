# Migration Plan: Feature-Based Architecture

## Executive Summary

This document outlines the complete plan to restructure the Skills App from a technical layer architecture to a feature-based architecture.

**Estimated Duration:** 8 weeks  
**Team Size:** 3-5 developers  
**Risk Level:** Medium (mitigated by incremental approach)

## Current State Analysis

### Existing Structure (Technical Layers)

```
src/
├── actions/           # Redux actions (15 files)
├── reducers/          # Redux reducers (15 files)
├── components/        # All UI components (~50 components)
├── containers/        # Page-level components (~15 containers)
├── hooks/             # Custom hooks (7 files)
├── classes/           # Business models (10 files)
├── services/          # API services
└── utils/             # Utilities
```

### Problems with Current Structure

1. **Scalability Issues**
   - All components in one folder (50+ files)
   - Hard to find related code
   - Merge conflicts in same directories

2. **Unclear Boundaries**
   - No clear feature ownership
   - Components tightly coupled across domains
   - Difficult to understand what belongs where

3. **Onboarding Difficulty**
   - New developers struggle to navigate
   - Unclear where to add new features
   - Hard to understand feature scope

## Target State

### New Structure (Feature-Based with React Query + Zustand)

```
src/
├── features/
│   ├── auth/              # Authentication & user sessions
│   ├── employees/         # Employee/Gapster management
│   ├── technologies/      # Skills & technology tracking
│   ├── projects/          # Project management
│   ├── certifications/    # Certification tracking
│   ├── admin/             # User, role, permission management
│   ├── dashboard/         # Dashboard views
│   ├── notifications/     # Notifications & alerts
│   ├── links/             # External links
│   └── staffy/            # Staffing/resource allocation
│
├── shared/
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Shared hooks
│   ├── utils/             # Shared utilities
│   ├── services/          # API client configuration
│   └── constants/         # App-wide constants
│
└── app/
    ├── routes/            # Routing configuration
    └── providers/         # Context providers (React Query, etc.)
```

## Feature Breakdown

### Identified Features

| Feature | Components | Actions/Reducers | Priority | Complexity |
|---------|------------|------------------|----------|------------|
| Links | 1 container | 2 files | P1 (Start here) | Low |
| Notifications | 2-3 components | 4 files | P1 | Low |
| Staffy | 1 container | 0 files | P1 | Low |
| Projects | 1-2 components | 2 files | P2 | Medium |
| Certifications | 2-3 components | 4 files | P2 | Medium |
| Dashboard | 3-4 containers | 2 files | P2 | Medium |
| Technologies | 5-6 components | 4 files | P3 | High |
| Admin | 4-5 components | 6 files | P3 | High |
| Employees | 8-10 components | 2 files | P4 | High |
| Auth | 4-5 components | 2 files | P5 (Last) | Critical |

## Migration Phases

### Phase 1: Preparation (Week 1)

**Goal:** Set up infrastructure for migration without breaking existing code

**Tasks:**
- [ ] Create new folder structure (`features/`, `shared/`, `app/`)
- [ ] Configure path aliases in `vite.config.ts`
- [ ] Update `jsconfig.json` and `jsconfig.paths.json`
- [ ] Create empty `index.ts` barrel exports for each feature
- [ ] Set up migration tracking spreadsheet/board
- [ ] Document current import patterns
- [ ] Run baseline tests and record results
- [ ] Create feature branch: `feature/restructure-architecture`

**Deliverables:**
- Empty folder structure
- Updated configuration files
- Baseline test results
- Migration tracking document

**Exit Criteria:**
- Build still works
- All tests still pass
- Team aligned on approach

---

### Phase 2: Shared Components Migration (Week 2)

**Goal:** Move truly shared/reusable components to `shared/`

**Tasks:**
- [ ] Identify components used by 3+ features
- [ ] Move UI primitives to `shared/components/ui/`
  - Button, Card, Modal, NewModal, Badge, ProgressBar, Icons
- [ ] Move form components to `shared/components/forms/`
  - Inputs, SearchBar, Filter, FilterOption, SelectedFilters
- [ ] Move navigation to `shared/components/navigation/`
  - Header, ModernSidebar, TopNavigation, Breadcrumb, Menu, Tabs, Pagination
- [ ] Move layout components to `shared/components/layout/`
  - layouts/, PageHeader, SectionContainer, CollapsibleSection
- [ ] Move data display to `shared/components/data-display/`
  - Grid, TableStyle
- [ ] Move feedback components to `shared/components/feedback/`
  - SpinningBubbles, RequestFailed, NotFound
- [ ] Move misc components to `shared/components/misc/`
  - Accordion, CustomPopover, ImageFallback, ImageUpload, etc.
- [ ] Update all imports in consuming files
- [ ] Run tests after each subsection move

**Migration Pattern:**
```bash
# 1. Move component
mv src/components/Button src/shared/components/ui/Button

# 2. Create barrel export
echo "export { Button } from './Button';" >> src/shared/components/ui/index.ts

# 3. Find all usages
grep -r "from.*components/Button" src/

# 4. Update imports (use script or manual)
# 5. Test
npm test
```

**Deliverables:**
- All shared components moved
- Updated barrel exports
- All imports updated
- Tests passing

**Exit Criteria:**
- No files remain in `/components` that are truly shared
- All imports use new paths
- Build successful
- All tests passing

---

### Phase 3: Feature Migration (Weeks 3-6)

**Goal:** Migrate features one at a time, starting with simplest

#### Phase 3.1: Links Feature (Week 3, Day 1-2)

**Complexity:** Low (1 container, minimal dependencies)

**Tasks:**
- [ ] Create `features/links/` structure
- [ ] Move `LinkDashboard` container
- [ ] Move `linksActions.js` and `linksReducer.js` to `store/`
- [ ] Create `features/links/index.ts` barrel export
- [ ] Update imports throughout codebase
- [ ] Update routing to use new import
- [ ] Test thoroughly

**Files to Move:**
- `containers/LinkDashboard/` → `features/links/containers/LinkDashboard/`
- `actions/linksActions.js` → DELETE (migrate to React Query)
- `reducers/linksReducer.js` → DELETE (migrate to React Query)

**New Files to Create:**
- `features/links/hooks/useLinks.ts` → React Query hook for API calls
- `features/links/stores/linksUIStore.ts` → Zustand store for UI state (if needed)

**Migration Pattern:**
```typescript
// OLD: Redux action
// actions/linksActions.js
export const fetchLinks = () => async (dispatch) => {
  dispatch({ type: FETCH_LINKS_REQUEST });
  const response = await api.get('/links');
  dispatch({ type: FETCH_LINKS_SUCCESS, payload: response.data });
};

// NEW: React Query hook
// features/links/hooks/useLinks.ts
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@shared/services';

export const useLinks = () => {
  return useQuery({
    queryKey: ['links'],
    queryFn: () => apiClient.get('/links'),
  });
};

export const useCreateLink = () => {
  return useMutation({
    mutationFn: (linkData) => apiClient.post('/links', linkData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
  });
};

// UI state (if needed)
// features/links/stores/linksUIStore.ts
import { create } from 'zustand';

export const useLinksUIStore = create((set) => ({
  selectedLinkId: null,
  setSelectedLinkId: (id) => set({ selectedLinkId: id }),
}));
```

#### Phase 3.2: Notifications Feature (Week 3, Day 3-4)

**Complexity:** Low-Medium

**Tasks:**
- [ ] Create `features/notifications/` structure
- [ ] Move `SystemAlert` component
- [ ] Move `Notifications` container
- [ ] Move notification actions/reducers (2 pairs)
- [ ] Move `useToast` hook
- [ ] Create barrel export
- [ ] Update imports
- [ ] Test

**Files to Move:**
- `components/SystemAlert/` → `features/notifications/components/SystemAlert/`
- `containers/Notifications/` → `features/notifications/containers/Notifications/`
- `actions/notificationsActions.js` → `features/notifications/store/`
- `actions/systemAlertsActions.js` → `features/notifications/store/`
- `reducers/notificationsReducer.js` → `features/notifications/store/`
- `reducers/systemAlertsReducer.js` → `features/notifications/store/`
- `hooks/useToast.js` → `features/notifications/hooks/`

#### Phase 3.3: Staffy Feature (Week 3, Day 5)

**Complexity:** Low

**Tasks:**
- [ ] Create `features/staffy/` structure
- [ ] Move `Staffy` container
- [ ] Create barrel export
- [ ] Update imports
- [ ] Test

#### Phase 3.4: Projects Feature (Week 4, Day 1-2)

**Complexity:** Medium

**Tasks:**
- [ ] Create `features/projects/` structure
- [ ] Move `Projects` component
- [ ] Move project-related containers
- [ ] Move actions/reducers
- [ ] Create barrel export
- [ ] Update imports
- [ ] Test

#### Phase 3.5: Certifications Feature (Week 4, Day 3-5)

**Complexity:** Medium

**Tasks:**
- [ ] Create `features/certifications/` structure
- [ ] Move certification components
- [ ] Move actions/reducers (2 pairs: certifications + approved)
- [ ] Move `ApprovedCertification.js` model
- [ ] Create barrel export
- [ ] Update imports
- [ ] Test

#### Phase 3.6: Dashboard Feature (Week 5, Day 1-2)

**Complexity:** Medium (multiple dashboard variants)

**Tasks:**
- [ ] Create `features/dashboard/` structure
- [ ] Move `Dashboard`, `NewDashboard` containers
- [ ] Move dashboard actions/reducers
- [ ] Create barrel export
- [ ] Update imports
- [ ] Test all dashboard variants

#### Phase 3.7: Technologies Feature (Week 5, Day 3-5)

**Complexity:** High (complex, many dependencies)

**Tasks:**
- [ ] Create `features/technologies/` structure
- [ ] Move technology components (Technologies/, TechnologyDropdown/)
- [ ] Move technology containers (3-4 dashboards)
- [ ] Move actions/reducers (technologies + categories)
- [ ] Move models (Technology.js, Category.js)
- [ ] Create barrel export
- [ ] Update imports (many files will need updates)
- [ ] Test extensively

**Files to Move:**
- Components: `Technologies/`, `TechnologyDropdown/`, `CategoryDashboard/`
- Containers: `SkillsEditPage/`, `TechDashboard/`, `TechnologyDashboard/`
- Store: `technologiesActions.js`, `technologiesReducer.js`, `categoriesActions.js`, `categoriesReducer.js`
- Models: `Technology.js`, `Category.js`

#### Phase 3.8: Admin Feature (Week 6, Day 1-3)

**Complexity:** High (permissions system)

**Tasks:**
- [ ] Create `features/admin/` structure
- [ ] Move admin components (Department/, PermissionGate/)
- [ ] Move admin containers (Admin/, CognitoDashboard/)
- [ ] Move actions/reducers (permissions, roles, departments)
- [ ] Move models (Role.js, Permission.js, Department.js)
- [ ] Create barrel export
- [ ] Update imports
- [ ] Test permission system thoroughly

#### Phase 3.9: Employees Feature (Week 6, Day 4-5)

**Complexity:** Very High (most complex, many dependencies)

**Tasks:**
- [ ] Create `features/employees/` structure
- [ ] Move employee components (8-10 components)
  - EmployeeCard, EmployeeList, EmployeePhotoCountry, GapsterInformation, Profile, etc.
- [ ] Move employee containers (TalentSearch, Profile, GapsterDashboard)
- [ ] Move actions/reducers
- [ ] Move models (Gapster.js, TechnologyGapster.js)
- [ ] Move employee-specific hooks
- [ ] Create barrel export
- [ ] Update imports (many files)
- [ ] Test extensively

**Files to Move:**
- Components: `EmployeeCard/`, `EmployeeList/`, `EmployeePhotoCountry/`, `GapsterInformation/`, `Profile/`, `GaptserModal/`
- Containers: `TalentSearch/`, `Profile/`, `GapsterDashboard/`
- Store: `employeesActions.js`, `employeesReducer.js`
- Models: `Gapster.js`, `TechnologyGapster.js`

#### Phase 3.10: Auth Feature (Week 7, Day 1-2)

**Complexity:** Critical (affects entire app)

**Tasks:**
- [ ] Create `features/auth/` structure
- [ ] Move Login container
- [ ] Move Profile container (if not in employees)
- [ ] Move PrivateRoute, SessionTimeoutWarning
- [ ] Move auth hooks (useAuth.ts, useLocalAuth.js)
- [ ] Move actions/reducers
- [ ] Create barrel export
- [ ] Update imports
- [ ] Test authentication flow end-to-end
- [ ] Test private routes
- [ ] Test session timeout

**⚠️ Important:** Do this phase last and test extremely thoroughly

---

### Phase 4: Final State Management Cleanup (Week 7, Day 3-5)

**Goal:** Remove remaining Redux/legacy code and verify all features use React Query + Zustand

**Tasks:**
- [ ] Verify all features migrated to React Query
- [ ] Remove Redux dependencies from `package.json`
- [ ] Remove old `/actions` folder (should be empty)
- [ ] Remove old `/reducers` folder (should be empty)
- [ ] Remove `store.js` and Redux configuration
- [ ] Update any remaining imports
- [ ] Remove Redux DevTools references
- [ ] Install React Query DevTools for development
- [ ] Verify React Query cache is working correctly
- [ ] Test all features work without Redux

**File Structure Check:**
```
✅ No more Redux:
- ❌ src/actions/  (deleted)
- ❌ src/reducers/ (deleted)
- ❌ src/store.js  (deleted)

✅ React Query + Zustand:
- ✅ features/[feature]/hooks/use*.ts (React Query)
- ✅ features/[feature]/stores/*UIStore.ts (Zustand, optional)
- ✅ app/providers/AppProviders.tsx (includes QueryClientProvider)
```

**Deliverables:**
- [ ] Redux completely removed
- [ ] All API calls use React Query
- [ ] UI state uses Zustand where needed
- [ ] React Query DevTools configured
- [ ] All tests passing

**Exit Criteria:**
- No Redux dependencies in package.json
- No Redux imports in codebase
- All tests passing
- All features work correctly

---

### Phase 5: Routing & Final Cleanup (Week 8)

**Goal:** Clean up routing and finalize migration

**Tasks:**
- [ ] Create feature route files (optional)
- [ ] Consolidate routes in `app/routes/AppRoutes.tsx`
- [ ] Move `App.js` logic to `app/providers/AppProviders.tsx`
- [ ] Update main entry point if needed
- [ ] Remove old `/containers` folder
- [ ] Remove old `/components` folder
- [ ] Run full test suite
- [ ] Run E2E tests
- [ ] Performance testing
- [ ] Update all documentation
- [ ] Create "New Feature Template" documentation
- [ ] Team training/walkthrough

**Deliverables:**
- Clean folder structure
- All old folders removed
- Documentation complete
- Team trained on new structure

---

## Testing Strategy

### For Each Feature Migration

1. **Before Migration:**
   - Run full test suite
   - Record baseline

2. **During Migration:**
   - Run unit tests for affected components
   - Run integration tests for feature

3. **After Migration:**
   - Run full test suite
   - Verify no regressions
   - Manual testing of feature

### Final Testing (Phase 5)

- [ ] Full unit test suite (100% pass)
- [ ] Integration tests (100% pass)
- [ ] E2E tests (all critical paths)
- [ ] Manual testing of all features
- [ ] Performance testing (load time, bundle size)
- [ ] Accessibility testing

## Risk Management

### Identified Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Breaking auth flow | Low | Critical | Do auth last, extensive testing |
| Import errors causing runtime bugs | Medium | High | Use TypeScript, thorough testing |
| Team confusion during migration | Medium | Medium | Clear documentation, daily standups |
| Merge conflicts | High | Medium | Small PRs, frequent merges |
| Schedule overrun | Medium | Medium | Buffer time, prioritize features |

### Mitigation Strategies

1. **Small, Atomic Commits**
   - One feature per MR
   - Easy to review and rollback

2. **Feature Flags**
   - Use if needed for parallel work
   - Enable gradual rollout

3. **Communication**
   - Daily standup updates
   - Slack channel for questions
   - Weekly retrospectives

4. **Rollback Plan**
   - Keep old structure until fully migrated
   - Git tags at each phase
   - Ability to revert quickly

## Success Metrics

### Quantitative

- [ ] 100% of features migrated
- [ ] 0 breaking changes in production
- [ ] Test coverage maintained or improved
- [ ] Build time < 30 seconds
- [ ] Bundle size not increased

### Qualitative

- [ ] Code is easier to navigate (team survey)
- [ ] New developers can onboard faster
- [ ] Clear feature ownership
- [ ] Reduced merge conflicts

## Post-Migration

### Immediate (Week 9)

- [ ] Team retrospective
- [ ] Update README
- [ ] Create "new feature" template and guide
- [ ] Archive migration documentation

### Short-term (Month 2)

- [ ] Monitor for issues
- [ ] Gather team feedback
- [ ] Refine patterns based on learnings

### Long-term (Quarter 2)

- [ ] Evaluate for code splitting opportunities
- [ ] Consider micro-frontend architecture
- [ ] Continuous improvement based on growth

## Resources

### Team Assignments

- **Migration Lead:** [Name] - Overall coordination, unblocking
- **Architecture Review:** [Name] - Review structure decisions
- **Phase 1-2 Lead:** [Name] - Setup and shared components
- **Phase 3 Coordinator:** [Name] - Feature migrations
- **Testing Lead:** [Name] - Test strategy and validation
- **Documentation:** [Name] - Keep docs updated

### Time Allocation

- 50% of developer time for 8 weeks
- Protected from other work during migration
- Daily 15-min sync meetings

### Tools

- GitLab for version control and MRs
- Jira/GitLab Issues for task tracking
- Slack for communication
- [Migration scripts](./scripts/) for automation

## Timeline

```
Week 1:  Phase 1 (Preparation)
Week 2:  Phase 2 (Shared Components)
Week 3:  Phase 3.1-3.3 (Links, Notifications, Staffy)
Week 4:  Phase 3.4-3.5 (Projects, Certifications)
Week 5:  Phase 3.6-3.7 (Dashboard, Technologies)
Week 6:  Phase 3.8-3.9 (Admin, Employees)
Week 7:  Phase 3.10, Phase 4 (Auth, Redux Cleanup)
Week 8:  Phase 5 (Routing, Final Cleanup)
```

## Appendix

### A. Feature Module Structure Template

```
features/[feature-name]/
├── components/         # Feature-specific UI components
├── containers/         # Page-level components
├── store/             # Redux actions & reducers
│   ├── [feature]Actions.js
│   └── [feature]Reducer.js
├── models/            # Business logic classes
├── hooks/             # Feature-specific hooks
├── utils/             # Feature-specific utilities (if needed)
└── index.ts           # Public API (barrel export)
```

### B. Import Convention Examples

```typescript
// ✅ Good - Import from feature public API
import { EmployeeCard, useEmployees } from '@features/employees';

// ✅ Good - Import from shared
import { Button, Modal } from '@shared/components/ui';

// ❌ Bad - Direct import from internal feature structure
import { EmployeeCard } from '@features/employees/components/EmployeeCard';
```

### C. Cross-Feature Communication

When features need to communicate:
1. Use Redux for shared state
2. Use event emitters for decoupled events
3. Create a shared service in `shared/services/`
4. Last resort: Direct import from feature public API

---

**Document Version:** 1.0  
**Last Updated:** 2025-10-23  
**Next Review:** After Phase 1 completion