# Chess Academy - Project Memory & Requirements

## 📝 COMPREHENSIVE REQUIREMENTS ANALYSIS

**Last Updated:** September 6, 2025  
**Status:** Expert analysis completed, ready for Phase 0 implementation

### 🎯 PROJECT VISION
Transform chess learning into an addictive, game-like experience using "learn-by-playing" methodology with AI-powered Socratic coaching. Target: Take users from 400 ELO (beginner) to 1500 ELO (intermediate) through gamified, personalized learning.

### 🏗 CURRENT TECHNICAL STATE
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS (Port 5173) ✅
- **Backend**: Node.js + Express + Prisma + PostgreSQL (Port 3001) ✅  
- **Chess Engine**: react-chessboard + chess.js ✅
- **Authentication**: JWT + Google OAuth ✅
- **Database**: Connected and healthy ✅

### 🚀 4-PHASE IMPLEMENTATION ROADMAP

#### **PHASE 0 - FOUNDATION (Weeks 1-4)**
**Goal**: Ship addictive core loop with polished A→Z learning track

**Critical Features Needed:**
1. **Stockfish WASM Integration** - 10-level bot system with post-game analysis
2. **Calibration System** - 12-position strength test → tactics_rating & weak motifs  
3. **Daily Plan Engine** - "Solve 3 • Learn 1 • Play 1" progress tracking
4. **Puzzle Engine v1** - Rating buckets, tagging (fork/pin/skewer), attempts API
5. **Socratic Coach v1** - Tier-1 concepts + Tier-2 candidate arrows
6. **Analytics Foundation** - Track dailyplan_view/complete, puzzle_start/success/fail
7. **Performance Optimization** - Board render <16ms, first puzzle <800ms 4G

**Success Criteria:**
- ≥60% new users complete Daily Plan day-1
- D1≥40%, Crash-free ≥99.5%
- Users solve ≥5 puzzles in first session on average

#### **PHASE 1 - MVP (Weeks 5-12)**
**Goal**: Personalization + compelling rewards + fair paywall

**Key Features:**
1. **Adaptive Selection** - 60% puzzles at rating±150, 20% weakest motifs, 20% SRS
2. **Enhanced Socratic Coach** - Tier-3 lines + "why wrong" explanations
3. **Reward System** - Daily chest, variable rewards, pity counter
4. **Payment Integration** - Razorpay + UPI (₹199/mo, ₹999/yr, ₹1499/family)
5. **Parent Dashboard** - Weekly reports, strengths/weaknesses, recommended drills

**Success Criteria:**
- D7 +5pp vs Phase-0
- Free→Pro monthly CVR ≥3%
- -15% repeat-error on weakest motif over 14 days

#### **PHASE 2 - PMF (Weeks 13-20)**
**Goal**: Depth, habit formation, India-first polish

**Key Features:**
1. **Seasons & Leaderboards** - Monthly tiers (Pawn→Queen), quest system
2. **Social Features** - Achievement badges, share PNG cards, streak history  
3. **Localization** - Hindi + English, RTL readiness, regional preferences
4. **Advanced Analytics** - Profile with rating charts, motif preferences
5. **Notifications** - Push/WhatsApp/email with smart timing

**Success Criteria:**
- D30 ≥15%
- 40% of MAU earn ≥1 season badge
- Monthly ARPPU ≥₹250

#### **PHASE 3 - MOAT (Weeks 21-28)**
**Goal**: B2B defensibility through Coach/School OS

**Key Features:**
1. **Coach OS** - Classrooms, homework sets, auto-grading, attendance
2. **Authoring Studio** - Import PGN/FEN, tag motifs, revenue sharing
3. **School Integration** - 12-week curriculum, printable worksheets
4. **Creator Economy** - IM/GM co-branded courses with rev-share
5. **Advanced Dashboards** - Cohort progress, motif heatmaps, CSV exports

**Success Criteria:**
- ≥20 active classrooms
- Homework completion ≥70%
- School churn <5%/term

#### **PHASE 4 - SCALE (Weeks 29-36)**
**Goal**: Handle 10k+ DAU with tournaments and global features

**Key Features:**
1. **Tournament System** - Swiss/Arena with real-time updates, prizes
2. **Offline Mobile** - Cache 50 puzzles + 1 lesson + 1 bot match
3. **Anti-abuse** - Sandbag detection, fair-play checks, fast reporting
4. **Multi-region Scale** - +3 regional languages, global CDN
5. **Advanced Features** - Focus mode, spectate, event-linked content

**Success Criteria:**
- 25% season participation
- ≥10k DAU mobile  
- Report-to-action <24h

### 🎮 LEARN-BY-PLAYING CURRICULUM (A→Z TRACK)

#### **Foundations (Beginner 1-6)**
1. Rules & Check/Checkmate → 1-move mate puzzles
2. Piece Safety & Trades → blunder-avoidance drills  
3. Opening Principles → mini-games vs bot from move 6
4. Basic Tactics I (forks, pins) → guided concept→candidates→line
5. Basic Tactics II (skewers, double attack, discovered attack)
6. Basic Endgames I (K+P vs K, opposition, rule of square)

#### **Skill-Building (Intermediate 1-6)**  
7. Back-rank & Luft → create luft challenge
8. Deflection & Clearance → "try wrong plans" sandboxes
9. Discovered & Double Checks → timed tactics with goal-gradient
10. Attacking the King → weak squares, piece storms
11. Transition to Endgames → simplify when ahead/behind
12. Practical Endgames II → rook endings basics

#### **Mastery (Advanced 1-6)**
13. Interference, Overloading, Zwischenzug → layered puzzles
14. Prophylaxis & Plans → vs bot with plan prompts  
15. Zugzwang & Opposition → composed studies with hints
16. Practical Mastery → converting advantages, defending worse positions, time management

**Flow per Lesson:** Play → Ask Coach (concept) → Try → See candidates → Retry

### 🤖 AI/ML ARCHITECTURE

#### **Socratic Coaching System**
- **Tier-1**: Basic concept identification (pins, forks, skewers, discovered attacks)
- **Tier-2**: Show candidate arrow overlays on chess board  
- **Tier-3**: Explain "why this move is wrong" with templated responses per motif
- **Progressive Hints**: Observation → Focus → Method → Guidance

#### **Personalization Engine**
- **User Modeling**: Tactical strength, cognitive patterns, behavioral preferences, metacognitive skills
- **Adaptive Selection**: 60% current level ±150, 20% weak motifs, 20% SRS due
- **Learning Style Adaptation**: Visual vs analytical vs pattern-based learners
- **Spaced Repetition**: Chess-specific SRS with 1/3/7/14 day intervals

#### **Performance Requirements**
- **AI Response Times**: <300ms on 4G mobile networks
- **Local Processing**: 80% client-side for privacy, 20% cloud for advanced features
- **Privacy Compliance**: COPPA-compliant, no personal data to external AI APIs
- **Offline Capability**: 50 cached personalized puzzles + coaching hints

### 🎨 UX/UI DESIGN STRATEGY

#### **Multi-Generational Design**
- **Kids (8-16)**: Kid mode toggle, larger type, simplified copy, gamified progress
- **Parents**: Weekly reports, child monitoring, session limits, content filtering
- **Coaches**: Classroom management, homework assignment, progress analytics
- **Adults**: Self-directed learning, advanced analytics, focus mode

#### **Mobile-First Interactions**
- **Puzzle Reels**: TikTok-inspired vertical swipe with coaching hints
- **Touch Targets**: 44px minimum for accessibility
- **Haptic Feedback**: Subtle vibrations for moves, celebrations
- **Performance**: 16ms board rendering, smooth 60fps animations

#### **Ethical Gamification**
- **Intrinsic Motivation**: Focus on mastery and progress over competition
- **Micro-wins**: Confetti <600ms, +Δ rating toasts, achievement unlocks  
- **Streak System**: Soft freeze (1/week), not punitive for missed days
- **Social Features**: Collaborative learning, peer encouragement

### 🔧 TECHNICAL ARCHITECTURE

#### **Database Schema Evolution**
```sql
-- Phase 0 Critical Tables
CREATE TABLE user_calibrations (12-position assessment);
CREATE TABLE daily_plans (Solve 3 • Learn 1 • Play 1 tracking);
CREATE TABLE bot_games (10 levels, PGN capture, analysis);
CREATE TABLE analytics_events (all user interaction tracking);

-- Phase 1 Extensions  
CREATE TABLE puzzle_srs (spaced repetition system);
CREATE TABLE reward_pools (variable rewards, pity counters);
CREATE TABLE payment_transactions (Razorpay integration);
CREATE TABLE parent_reports (weekly progress emails);

-- Phase 2+ Extensions
CREATE TABLE seasons, leaderboard_entries, notifications;
CREATE TABLE classrooms, homework_assignments (Phase 3);
CREATE TABLE tournaments, abuse_reports (Phase 4);
```

#### **API Architecture**
- **Performance Targets**: <200ms API responses, <100ms database queries
- **Caching Strategy**: Redis for metadata, CDN for static assets
- **Rate Limiting**: Adaptive based on user behavior and subscription tier
- **Monitoring**: Real-time performance dashboards, error tracking

#### **Stockfish Integration**
- **WASM Workers**: Parallel processing for move analysis and bot games
- **Depth Strategy**: Level 1 (depth 3) → Level 10 (depth 15)
- **Analysis Features**: "3 key moments" post-game review
- **Performance**: <500ms bot move generation, cached opening book

### 💰 MONETIZATION STRATEGY

#### **Freemium Model**
**Free Tier:**
- Daily Plan limited (3 puzzles, 1 lesson, 1 bot game L1-5)
- Basic review (blunders/best moves only)
- 1 streak freeze per week
- Join seasons, basic leaderboards

**Pro Tier (₹199/mo, ₹999/yr):**
- Unlimited puzzles & adaptive drills
- Full Socratic Coach with Tier-3 explanations
- Advanced bots (levels 6-25)
- Complete game review + SRS system
- Parent weekly reports
- Download PGNs, priority support

**Family Tier (₹1499/yr):**
- Up to 4 accounts
- Parental controls and monitoring
- Family leaderboards
- Bulk discount benefits

#### **B2B Revenue (Phase 3+)**
- **School Licensing**: ₹2000/classroom/term for 25 students
- **Coach Tools**: ₹500/month for unlimited students
- **Creator Revenue Share**: 50-70% for user-generated content

#### **Payment Integration**
- **Primary**: Razorpay for cards + UPI for direct payments
- **Regional**: Paytm, PhonePe integration for broader coverage
- **International**: Stripe for global expansion (Phase 4)

### 📊 SUCCESS METRICS & KPIs

#### **Engagement Metrics**
- **Daily Active Users (DAU)**: Target growth from 100 → 10,000+
- **Session Length**: 15+ minutes average with 3+ puzzles solved
- **Retention**: D1 40%, D7 20%, D30 15% (improving +5pp each phase)
- **Completion Rate**: 60%+ users finish Daily Plan on day-1

#### **Learning Effectiveness**  
- **Skill Progression**: 400 ELO → 1500 ELO journey tracking
- **Puzzle Accuracy**: 20% improvement over 14 days
- **Error Reduction**: 15% fewer repeat mistakes on weak motifs
- **Hint Usage**: 60%+ users request coaching hints (indicates engagement)

#### **Revenue Metrics**
- **Conversion Rate**: 3%+ free-to-Pro monthly conversion
- **ARPPU**: ₹250+ monthly average revenue per paying user
- **LTV/CAC Ratio**: 3:1 minimum for sustainable growth
- **Churn Rate**: <5% monthly for Pro subscribers

### 🛡 RISK MITIGATION

#### **Technical Risks**
- **Performance Bottlenecks**: Aggressive caching, CDN, database optimization
- **Mobile Experience**: PWA-first, offline capability, touch optimization  
- **Stockfish Integration**: WASM worker pools, performance monitoring
- **Scale Challenges**: Database sharding, multi-region deployment ready

#### **Product/Market Risks**
- **User Acquisition**: Viral mechanics, referral system, content marketing
- **Competitive Threat**: AI coaching differentiation, India-specific features
- **Retention Challenge**: Daily habit formation, streak mechanics, social features
- **Monetization Risk**: Value-based pricing, natural upgrade triggers

#### **Regulatory/Compliance**
- **Child Privacy**: COPPA compliance, parental controls, no external data sharing
- **Payment Regulations**: RBI compliance, secure webhook handling
- **Data Localization**: India data residency requirements
- **Content Safety**: Moderation tools, reporting system, community guidelines

### 🎯 IMMEDIATE ACTION PLAN (Week 1)

#### **Priority 1: Core Engine Setup**
1. **Stockfish WASM Integration** - Download, test, worker pool setup
2. **Database Migration** - Add calibration, daily_plans, bot_games tables
3. **Calibration API** - 12-position strength assessment endpoint
4. **Basic Bot API** - Challenge bot, make move, get analysis endpoints

#### **Priority 2: Performance Foundation**  
1. **Redis Caching** - Set up caching layer for puzzle metadata
2. **Database Indexing** - Optimize queries for <100ms response
3. **Monitoring Setup** - Basic performance tracking dashboard
4. **Load Testing** - Establish baseline performance metrics

#### **Priority 3: User Experience**
1. **Daily Plan UI** - Dashboard with "Solve 3 • Learn 1 • Play 1" tracking
2. **Puzzle Interface** - Rating display, attempt tracking, hint system
3. **Bot Game UI** - Difficulty selection, avatar system, progress meter
4. **Mobile Optimization** - Touch targets, responsive design, PWA setup

### 🔄 CONTINUOUS IMPROVEMENT PROCESS

#### **Weekly Sprints**
- **Monday**: Sprint planning with feature prioritization
- **Wednesday**: Mid-sprint checkpoint, performance review
- **Friday**: Sprint demo, user feedback integration, next week planning

#### **Monthly Milestones**
- **Week 4**: Phase 0 launch → user testing → iterate
- **Week 8**: Phase 1 features → payment integration → monetization testing
- **Week 12**: Phase 2 launch → PMF validation → scale preparation
- **Week 16**: Phase 3 B2B features → school pilot programs
- **Week 20**: Phase 4 tournament system → global readiness

#### **Quality Gates**
- **Performance**: All features must meet <800ms puzzle load target
- **Security**: Code review + penetration testing before each phase
- **User Testing**: 100+ beta users validate each major feature
- **Business Metrics**: Gate progression on conversion and retention targets

---

## 📞 NEXT STEPS & COORDINATION

**Ready for Implementation:** All expert analysis complete, technical architecture designed, user experience mapped, business strategy validated.

**Current Status:** Phase 0 development can begin immediately with clear technical specifications, performance targets, and success criteria.

**Coordination Approach:** Use specialized AI agents (mvp-product-manager, system-architect, ai-ml-engineer, etc.) for ongoing guidance throughout implementation phases.

**Project Memory:** This document serves as the single source of truth for all requirements, decisions, and technical specifications. Update after each phase completion and major milestone.

---

*Last Updated: September 6, 2025*  
*Expert Analysis Status: ✅ Complete - Ready for Development*