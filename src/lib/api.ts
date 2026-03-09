import { Product, Comment, Category } from "./types";
import { isSupabaseConfigured, getSupabaseClient } from "./supabase";
import { MOCK_PRODUCTS, PAST_WINNERS, MOCK_COMMENTS } from "./mock-data";

// ============================================================================
// Helpers: map between Supabase rows (snake_case) and app types (camelCase)
// ============================================================================

function rowToProduct(row: Record<string, unknown>): Product {
  const breakdown = row.ai_breakdown as {
    innovation: number;
    execution: number;
    potential: number;
    timing: number;
  };

  return {
    id: row.id as string,
    name: row.name as string,
    tagline: row.tagline as string,
    description: row.description as string,
    url: row.url as string,
    category: row.category as string,
    submittedBy: row.submitted_by as string,
    submittedAt: row.submitted_at as string,
    logoEmoji: row.logo_emoji as string,
    aiScore: row.ai_score as number,
    aiVerdict: row.ai_verdict as string,
    aiBreakdown: breakdown,
    communityVotes: (row.community_votes as number) ?? 0,
    commentCount: (row.comment_count as number) ?? 0,
    isWinner: (row.is_winner as "day" | "week" | "month") ?? undefined,
  };
}

function rowToComment(row: Record<string, unknown>): Comment {
  return {
    id: row.id as string,
    productId: row.product_id as string,
    author: row.author as string,
    text: row.text as string,
    isMaker: row.is_maker as boolean,
    createdAt: row.created_at as string,
  };
}

// ============================================================================
// Products
// ============================================================================

/**
 * Fetch all products, ordered by ai_score descending.
 * Falls back to mock data when Supabase isn't configured.
 */
export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return [...MOCK_PRODUCTS, ...PAST_WINNERS].sort(
      (a, b) => b.aiScore - a.aiScore
    );
  }

  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("ai_score", { ascending: false });

    if (error) throw error;
    return (data ?? []).map(rowToProduct);
  } catch (err) {
    console.error("[api] getProducts failed, falling back to mock data:", err);
    return [...MOCK_PRODUCTS, ...PAST_WINNERS].sort(
      (a, b) => b.aiScore - a.aiScore
    );
  }
}

/**
 * Fetch a single product by ID.
 * Falls back to mock data when Supabase isn't configured.
 */
export async function getProduct(id: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    const all = [...MOCK_PRODUCTS, ...PAST_WINNERS];
    return all.find((p) => p.id === id) ?? null;
  }

  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data ? rowToProduct(data) : null;
  } catch (err) {
    console.error("[api] getProduct failed, falling back to mock data:", err);
    const all = [...MOCK_PRODUCTS, ...PAST_WINNERS];
    return all.find((p) => p.id === id) ?? null;
  }
}

/**
 * Submit a new product.
 * Returns the created product, or null on failure.
 */
export async function submitProduct(data: {
  name: string;
  tagline: string;
  description: string;
  url: string;
  category: Category;
  submittedBy: string;
  logoEmoji: string;
  aiScore: number;
  aiVerdict: string;
  aiBreakdown: {
    innovation: number;
    execution: number;
    potential: number;
    timing: number;
  };
}): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    // Return a mock product with a generated ID so the UI can still work
    const mockProduct: Product = {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      name: data.name,
      tagline: data.tagline,
      description: data.description,
      url: data.url,
      category: data.category,
      submittedBy: data.submittedBy,
      submittedAt: new Date().toISOString(),
      logoEmoji: data.logoEmoji,
      aiScore: data.aiScore,
      aiVerdict: data.aiVerdict,
      aiBreakdown: data.aiBreakdown,
      communityVotes: 0,
      commentCount: 0,
    };
    return mockProduct;
  }

  try {
    const supabase = getSupabaseClient();
    const { data: row, error } = await supabase
      .from("products")
      .insert({
        name: data.name,
        tagline: data.tagline,
        description: data.description,
        url: data.url,
        category: data.category,
        submitted_by: data.submittedBy,
        logo_emoji: data.logoEmoji,
        ai_score: data.aiScore,
        ai_verdict: data.aiVerdict,
        ai_breakdown: data.aiBreakdown,
      })
      .select()
      .single();

    if (error) throw error;
    return row ? rowToProduct(row) : null;
  } catch (err) {
    console.error("[api] submitProduct failed:", err);
    return null;
  }
}

// ============================================================================
// Votes
// ============================================================================

/**
 * Vote for a product. Returns true if the vote was recorded, false if the
 * user already voted (duplicate fingerprint) or on error.
 */
export async function voteForProduct(
  productId: string,
  fingerprint: string
): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    // In mock mode, always succeed
    return true;
  }

  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from("votes").insert({
      product_id: productId,
      voter_fingerprint: fingerprint,
    });

    if (error) {
      // Unique constraint violation means they already voted
      if (error.code === "23505") return false;
      throw error;
    }

    // The trigger auto-increments community_votes on the product
    return true;
  } catch (err) {
    console.error("[api] voteForProduct failed:", err);
    return false;
  }
}

// ============================================================================
// Comments
// ============================================================================

/**
 * Fetch comments for a product, ordered by created_at ascending (oldest first).
 * Falls back to mock data when Supabase isn't configured.
 */
export async function getComments(productId: string): Promise<Comment[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_COMMENTS[productId] ?? [];
  }

  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return (data ?? []).map(rowToComment);
  } catch (err) {
    console.error("[api] getComments failed, falling back to mock data:", err);
    return MOCK_COMMENTS[productId] ?? [];
  }
}

/**
 * Add a comment to a product.
 * Returns the created comment, or null on failure.
 */
export async function addComment(data: {
  productId: string;
  author: string;
  text: string;
  isMaker: boolean;
}): Promise<Comment | null> {
  if (!isSupabaseConfigured()) {
    // Return a mock comment so the UI can still work
    return {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      productId: data.productId,
      author: data.author,
      text: data.text,
      isMaker: data.isMaker,
      createdAt: new Date().toISOString(),
    };
  }

  try {
    const supabase = getSupabaseClient();
    const { data: row, error } = await supabase
      .from("comments")
      .insert({
        product_id: data.productId,
        author: data.author,
        text: data.text,
        is_maker: data.isMaker,
      })
      .select()
      .single();

    if (error) throw error;
    return row ? rowToComment(row) : null;
  } catch (err) {
    console.error("[api] addComment failed:", err);
    return null;
  }
}

// ============================================================================
// Emails (newsletter)
// ============================================================================

/**
 * Subscribe an email to the daily winner newsletter.
 * Returns true on success, false if already subscribed or on error.
 */
export async function subscribeEmail(email: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    // In mock mode, always succeed
    return true;
  }

  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from("emails").insert({ email });

    if (error) {
      // Unique constraint violation means already subscribed
      if (error.code === "23505") return false;
      throw error;
    }

    return true;
  } catch (err) {
    console.error("[api] subscribeEmail failed:", err);
    return false;
  }
}
