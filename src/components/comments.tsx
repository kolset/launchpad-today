"use client";

import { useState, useEffect, useCallback } from "react";
import { Comment } from "@/lib/types";

const COMMENTS_STORAGE_KEY = "launchpad-comments";
const HANDLE_STORAGE_KEY = "launchpad-user-handle";

function getStoredComments(): Record<string, Comment[]> {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(COMMENTS_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore parse errors
  }
  return {};
}

function saveComments(comments: Record<string, Comment[]>) {
  try {
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
  } catch {
    // ignore storage errors
  }
}

function getStoredHandle(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(HANDLE_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

function saveHandle(handle: string) {
  try {
    localStorage.setItem(HANDLE_STORAGE_KEY, handle);
  } catch {
    // ignore storage errors
  }
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
}

export function CommentsSection({
  productId,
  submittedBy,
  initialComments,
}: {
  productId: string;
  submittedBy: string;
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [handle, setHandle] = useState("");
  const [text, setText] = useState("");
  const [hasStoredHandle, setHasStoredHandle] = useState(false);

  // Load stored comments and handle on mount
  useEffect(() => {
    const stored = getStoredComments();
    if (stored[productId] && stored[productId].length > 0) {
      // Merge initial + stored, dedupe by id
      const merged = [...initialComments];
      const existingIds = new Set(merged.map((c) => c.id));
      for (const c of stored[productId]) {
        if (!existingIds.has(c.id)) {
          merged.push(c);
        }
      }
      merged.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      setComments(merged);
    }

    const storedHandle = getStoredHandle();
    if (storedHandle) {
      setHandle(storedHandle);
      setHasStoredHandle(true);
    }
  }, [productId, initialComments]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedText = text.trim();
      const trimmedHandle = handle.trim().replace(/^@/, "");
      if (!trimmedText || !trimmedHandle) return;

      const newComment: Comment = {
        id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        productId,
        author: trimmedHandle,
        text: trimmedText,
        createdAt: new Date().toISOString(),
        isMaker:
          trimmedHandle.toLowerCase() === submittedBy.toLowerCase(),
      };

      const updatedComments = [...comments, newComment];
      setComments(updatedComments);

      // Persist to localStorage
      const stored = getStoredComments();
      const existingStored = stored[productId] || [];
      stored[productId] = [...existingStored, newComment];
      saveComments(stored);

      // Save handle for next time
      saveHandle(trimmedHandle);
      setHasStoredHandle(true);

      setText("");
    },
    [text, handle, productId, submittedBy, comments]
  );

  const commentCount = comments.length;

  return (
    <div className="mt-10">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="retro-divider flex-1" />
        <h2
          className="text-xs sm:text-sm uppercase tracking-[3px] font-bold shrink-0 flex items-center gap-2"
          style={{
            fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
            color: "var(--neon-cyan)",
          }}
        >
          Discussion
          {commentCount > 0 && (
            <span
              className="inline-flex items-center justify-center rounded-full text-[10px] font-bold"
              style={{
                background: "rgba(0, 240, 255, 0.15)",
                border: "1px solid rgba(0, 240, 255, 0.3)",
                color: "var(--neon-cyan)",
                fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                minWidth: "24px",
                height: "24px",
                padding: "0 6px",
              }}
            >
              {commentCount}
            </span>
          )}
        </h2>
        <div className="retro-divider flex-1" />
      </div>

      {/* Comments list */}
      <div className="space-y-3 mb-6">
        {comments.length === 0 && (
          <div
            className="text-center py-10 rounded-xl"
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <div className="text-2xl mb-3">💬</div>
            <p
              className="text-xs uppercase tracking-[2px] text-white/40"
              style={{ fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif" }}
            >
              No comments yet
            </p>
            <p className="text-xs text-white/15 mt-1">
              Be the first to start the discussion
            </p>
          </div>
        )}

        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-xl p-4 sm:p-5 transition-all duration-200"
            style={{
              background: comment.isMaker
                ? "rgba(255, 45, 120, 0.06)"
                : "rgba(255, 255, 255, 0.03)",
              border: comment.isMaker
                ? "1px solid rgba(255, 45, 120, 0.15)"
                : "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            {/* Author row */}
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-bold"
                style={{
                  color: comment.isMaker
                    ? "var(--neon-pink)"
                    : "rgba(255, 255, 255, 0.7)",
                }}
              >
                @{comment.author}
              </span>
              {comment.isMaker && (
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold"
                  style={{
                    background: "rgba(255, 45, 120, 0.15)",
                    border: "1px solid rgba(255, 45, 120, 0.3)",
                    color: "var(--neon-pink)",
                    fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
                  }}
                >
                  Maker
                </span>
              )}
              <span className="text-[10px] text-white/20 ml-auto">
                {timeAgo(comment.createdAt)}
              </span>
            </div>

            {/* Comment text */}
            <p className="text-sm text-white/60 leading-relaxed">
              {comment.text}
            </p>
          </div>
        ))}
      </div>

      {/* Comment form */}
      <form onSubmit={handleSubmit}>
        <div
          className="rounded-xl p-4 sm:p-5"
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <h3
            className="text-[10px] uppercase tracking-[2px] mb-4 font-bold"
            style={{
              fontFamily: "var(--font-orbitron), 'Orbitron', sans-serif",
              color: "rgba(255, 255, 255, 0.3)",
            }}
          >
            Add a Comment
          </h3>

          {/* Handle input - shown only if not stored yet */}
          {!hasStoredHandle && (
            <div className="mb-3">
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="your_handle"
                className="retro-input w-full px-4 py-3 rounded-lg text-sm"
                style={{ minHeight: "44px" }}
                maxLength={30}
              />
            </div>
          )}

          {hasStoredHandle && (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-white/40">
                Commenting as
              </span>
              <span
                className="text-xs font-bold"
                style={{ color: "var(--neon-cyan)" }}
              >
                @{handle}
              </span>
              <button
                type="button"
                onClick={() => {
                  setHasStoredHandle(false);
                  setHandle("");
                  saveHandle("");
                }}
                className="text-[10px] text-white/20 hover:text-white/40 transition-colors ml-1 cursor-pointer"
              >
                change
              </button>
            </div>
          )}

          {/* Comment textarea */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your thoughts..."
            className="retro-textarea w-full px-4 py-3 rounded-lg text-sm mb-3"
            rows={3}
            maxLength={1000}
            style={{ minHeight: "80px" }}
          />

          {/* Submit */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/15">
              {text.length}/1000
            </span>
            <button
              type="submit"
              disabled={!text.trim() || !handle.trim()}
              className="submit-btn px-5 py-2.5 rounded-lg text-[10px] sm:text-xs text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              style={{ minHeight: "44px" }}
            >
              Post Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
