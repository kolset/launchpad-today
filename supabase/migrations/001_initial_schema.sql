-- ============================================================================
-- Launchpad.today — Initial Schema
-- ============================================================================
-- Tables: products, votes, comments, emails
-- Includes RLS policies, indexes, vote-increment trigger, and seed data.
-- ============================================================================

-- Enable pgcrypto for gen_random_uuid() if not already available
create extension if not exists "pgcrypto";

-- ============================================================================
-- PRODUCTS
-- ============================================================================
create table public.products (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  tagline       text not null,
  description   text not null default '',
  url           text not null,
  category      text not null,
  submitted_by  text not null,
  submitted_at  timestamptz not null default now(),
  logo_emoji    text not null default '🚀',
  ai_score      integer not null default 0 check (ai_score >= 0 and ai_score <= 100),
  ai_verdict    text not null default '',
  ai_breakdown  jsonb not null default '{"innovation":0,"execution":0,"potential":0,"timing":0}'::jsonb,
  community_votes integer not null default 0 check (community_votes >= 0),
  comment_count integer not null default 0 check (comment_count >= 0),
  is_winner     text check (is_winner in ('day', 'week', 'month'))
);

-- Indexes for common query patterns
create index idx_products_ai_score on public.products (ai_score desc);
create index idx_products_submitted_at on public.products (submitted_at desc);
create index idx_products_category on public.products (category);
create index idx_products_is_winner on public.products (is_winner) where is_winner is not null;

-- ============================================================================
-- VOTES
-- ============================================================================
create table public.votes (
  id                  uuid primary key default gen_random_uuid(),
  product_id          uuid not null references public.products(id) on delete cascade,
  voter_fingerprint   text not null,
  created_at          timestamptz not null default now(),

  -- One vote per fingerprint per product
  constraint votes_unique_fingerprint unique (product_id, voter_fingerprint)
);

create index idx_votes_product_id on public.votes (product_id);

-- ============================================================================
-- COMMENTS
-- ============================================================================
create table public.comments (
  id          uuid primary key default gen_random_uuid(),
  product_id  uuid not null references public.products(id) on delete cascade,
  author      text not null,
  text        text not null check (char_length(text) <= 2000),
  is_maker    boolean not null default false,
  created_at  timestamptz not null default now()
);

create index idx_comments_product_id on public.comments (product_id, created_at asc);

-- ============================================================================
-- EMAILS (newsletter subscribers)
-- ============================================================================
create table public.emails (
  id            uuid primary key default gen_random_uuid(),
  email         text not null unique,
  subscribed_at timestamptz not null default now(),
  active        boolean not null default true
);

create index idx_emails_email on public.emails (email);

-- ============================================================================
-- TRIGGER: auto-increment community_votes on vote insert
-- ============================================================================
create or replace function public.increment_community_votes()
returns trigger as $$
begin
  update public.products
  set community_votes = community_votes + 1
  where id = new.product_id;
  return new;
end;
$$ language plpgsql security definer;

create trigger trg_increment_votes
  after insert on public.votes
  for each row
  execute function public.increment_community_votes();

-- ============================================================================
-- TRIGGER: auto-increment comment_count on comment insert
-- ============================================================================
create or replace function public.increment_comment_count()
returns trigger as $$
begin
  update public.products
  set comment_count = comment_count + 1
  where id = new.product_id;
  return new;
end;
$$ language plpgsql security definer;

create trigger trg_increment_comments
  after insert on public.comments
  for each row
  execute function public.increment_comment_count();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Products: anyone can read, anyone can insert (submit a product)
alter table public.products enable row level security;

create policy "Products are publicly readable"
  on public.products for select
  using (true);

create policy "Anyone can submit a product"
  on public.products for insert
  with check (true);

-- Votes: anyone can insert (one per fingerprint enforced by unique constraint)
alter table public.votes enable row level security;

create policy "Votes are publicly readable"
  on public.votes for select
  using (true);

create policy "Anyone can vote"
  on public.votes for insert
  with check (true);

-- Comments: anyone can read, anyone can insert
alter table public.comments enable row level security;

create policy "Comments are publicly readable"
  on public.comments for select
  using (true);

create policy "Anyone can comment"
  on public.comments for insert
  with check (true);

-- Emails: anyone can insert (subscribe), no public reads
alter table public.emails enable row level security;

create policy "Anyone can subscribe"
  on public.emails for insert
  with check (true);

-- ============================================================================
-- SEED DATA — existing mock products
-- ============================================================================

insert into public.products (id, name, tagline, description, url, category, submitted_by, submitted_at, logo_emoji, ai_score, ai_verdict, ai_breakdown, community_votes, comment_count, is_winner)
values
  (
    'a0000000-0000-0000-0000-000000000001',
    'NeuralForge',
    'Train custom AI models in your browser',
    'No-code platform that lets anyone fine-tune and deploy AI models without writing a single line of code. Drag-and-drop training data, pick a base model, and deploy to production in minutes.',
    'https://neuralforge.ai',
    'AI/ML',
    'sarah_builds',
    now(),
    '🧠',
    94,
    'Exceptional execution on a real pain point. Browser-based ML training is the next frontier. Strong technical moat and clear path to enterprise adoption.',
    '{"innovation":96,"execution":93,"potential":95,"timing":92}'::jsonb,
    87,
    3,
    'day'
  ),
  (
    'a0000000-0000-0000-0000-000000000002',
    'ShipStack',
    'One-click deploy for any framework',
    'Push to deploy with zero config. Auto-detects your stack, provisions infrastructure, and gives you a production URL in 30 seconds. Works with Next.js, Rails, Django, Go, and 40+ more.',
    'https://shipstack.dev',
    'Developer Tools',
    'devops_dan',
    now(),
    '📦',
    91,
    'Strong developer experience play. The zero-config approach differentiates from competitors. Market is crowded but the execution here is crisp.',
    '{"innovation":88,"execution":95,"potential":90,"timing":91}'::jsonb,
    62,
    1,
    null
  ),
  (
    'a0000000-0000-0000-0000-000000000003',
    'CashPilot',
    'AI treasury management for startups',
    'Automatically sweeps idle cash across high-yield accounts, money markets, and T-bills. AI optimizes for yield while maintaining your runway requirements.',
    'https://cashpilot.com',
    'Fintech',
    'fintech_founder',
    now(),
    '💰',
    89,
    'Addresses a universal startup problem with elegant automation. Regulatory complexity is a moat. Revenue model is clear and scalable.',
    '{"innovation":87,"execution":90,"potential":92,"timing":87}'::jsonb,
    45,
    0,
    null
  ),
  (
    'a0000000-0000-0000-0000-000000000004',
    'Voxform',
    'Turn voice memos into structured data',
    'Record a voice note and Voxform extracts structured data, creates CRM entries, generates reports, or fills any form. Custom schemas let you define exactly what gets extracted.',
    'https://voxform.io',
    'Productivity',
    'voice_first',
    now(),
    '🎙️',
    86,
    'Clever twist on voice-to-text. The structured extraction angle is underexplored. Integration story needs work but core idea is solid.',
    '{"innovation":90,"execution":83,"potential":87,"timing":84}'::jsonb,
    38,
    0,
    null
  ),
  (
    'a0000000-0000-0000-0000-000000000005',
    'GreenStack',
    'Carbon-aware cloud infrastructure',
    'Routes your workloads to the greenest data centers in real-time. Dashboard shows carbon savings, generates compliance reports, and optimizes for both cost and emissions.',
    'https://greenstack.cloud',
    'SaaS',
    'climate_coder',
    now(),
    '🌿',
    84,
    'Timely play on ESG requirements. Enterprise demand is real but sales cycles will be long. Technical approach is sound.',
    '{"innovation":85,"execution":82,"potential":88,"timing":81}'::jsonb,
    29,
    0,
    null
  ),
  (
    'a0000000-0000-0000-0000-000000000006',
    'SyntaxBuddy',
    'AI pair programmer that explains as it codes',
    'An AI coding assistant focused on teaching. Every suggestion comes with a plain-English explanation of why it works. Built for junior devs and bootcamp grads.',
    'https://syntaxbuddy.dev',
    'Education',
    'edu_hacker',
    now(),
    '👾',
    82,
    'Education angle is a smart differentiation in a crowded AI coding space. Retention could be strong. Needs to nail the explanation quality.',
    '{"innovation":80,"execution":84,"potential":83,"timing":81}'::jsonb,
    53,
    0,
    null
  ),
  (
    'a0000000-0000-0000-0000-000000000007',
    'FitLoop',
    'AI personal trainer in your pocket',
    'Computer vision watches your form through your phone camera. Real-time corrections, progressive overload tracking, and workout generation based on your equipment and goals.',
    'https://fitloop.app',
    'Health',
    'gym_dev',
    now(),
    '💪',
    79,
    'Solid execution on computer vision fitness. The form-correction angle is compelling. Crowded market but the tech moat is real if accuracy holds.',
    '{"innovation":82,"execution":78,"potential":80,"timing":76}'::jsonb,
    18,
    0,
    null
  ),
  (
    'a0000000-0000-0000-0000-000000000008',
    'Bazaar',
    'Peer-to-peer marketplace for digital assets',
    'Buy and sell templates, prompts, datasets, and digital tools directly. No middleman fees over 3%. Built-in escrow, reviews, and instant delivery.',
    'https://bazaar.market',
    'E-Commerce',
    'market_maker',
    now(),
    '🏪',
    76,
    'Low-fee marketplace is attractive but chicken-and-egg problem is real. Digital asset focus helps with margins. Needs a strong launch strategy.',
    '{"innovation":74,"execution":78,"potential":79,"timing":73}'::jsonb,
    11,
    0,
    null
  ),
  (
    'a0000000-0000-0000-0000-000000000009',
    'ThreadSync',
    'Unified inbox for every messaging platform',
    'Slack, Discord, Teams, Telegram, WhatsApp — all in one interface. AI summarizes threads, prioritizes messages, and drafts responses in your voice.',
    'https://threadsync.app',
    'Social',
    'inbox_zero',
    now(),
    '🔗',
    73,
    'Universal messaging aggregation is a perennial idea. Execution looks clean. The AI summarization is the real value prop but integration maintenance is a grind.',
    '{"innovation":70,"execution":76,"potential":75,"timing":71}'::jsonb,
    22,
    0,
    null
  ),
  (
    'a0000000-0000-0000-0000-000000000010',
    'SpectrumOS',
    'Modular smart home OS',
    'Open-source operating system for smart homes. Visual programming for automations, local-first processing, works with any hardware. No cloud dependency.',
    'https://spectrumos.io',
    'Hardware',
    'iot_builder',
    now(),
    '🏠',
    71,
    'Privacy-first smart home has a passionate niche. Local processing is a real differentiator. Adoption will be slow but community could drive it.',
    '{"innovation":78,"execution":68,"potential":72,"timing":66}'::jsonb,
    8,
    0,
    null
  ),
  -- Past winners
  (
    'b0000000-0000-0000-0000-000000000001',
    'CodeWeave',
    'AI-powered codebase migration tool',
    'Migrate any codebase between frameworks automatically.',
    'https://codeweave.dev',
    'Developer Tools',
    'migration_king',
    '2026-03-08T10:00:00Z',
    '🕸️',
    97,
    'Best-in-class migration tooling. This changes how teams approach framework decisions.',
    '{"innovation":98,"execution":96,"potential":97,"timing":97}'::jsonb,
    114,
    0,
    'week'
  ),
  (
    'b0000000-0000-0000-0000-000000000002',
    'Promptbase',
    'Version control for AI prompts',
    'Git for prompts. Track, test, and deploy prompt changes with confidence.',
    'https://promptbase.ai',
    'AI/ML',
    'prompt_eng',
    '2026-03-01T10:00:00Z',
    '📝',
    95,
    'Essential infrastructure for the AI era. Simple idea, perfect timing.',
    '{"innovation":94,"execution":96,"potential":95,"timing":95}'::jsonb,
    97,
    0,
    'month'
  );

-- Seed comments for NeuralForge (product 1) and ShipStack (product 2)
insert into public.comments (id, product_id, author, text, is_maker, created_at)
values
  (
    'c0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'sarah_builds',
    'Maker here! Happy to answer questions about how browser-based training works under the hood.',
    true,
    now() - interval '2 hours'
  ),
  (
    'c0000000-0000-0000-0000-000000000002',
    'a0000000-0000-0000-0000-000000000001',
    'ml_curious',
    'How does this handle larger datasets? My training sets are usually 50GB+.',
    false,
    now() - interval '1 hour'
  ),
  (
    'c0000000-0000-0000-0000-000000000003',
    'a0000000-0000-0000-0000-000000000001',
    'sarah_builds',
    'Great question. Anything over 10GB streams from cloud storage. The browser handles preprocessing and the actual training offloads to our GPU cluster.',
    true,
    now() - interval '30 minutes'
  ),
  (
    'c0000000-0000-0000-0000-000000000004',
    'a0000000-0000-0000-0000-000000000002',
    'devops_dan',
    'Built this after getting frustrated with deploy configs at my last three startups. AMA!',
    true,
    now() - interval '2 hours'
  );
