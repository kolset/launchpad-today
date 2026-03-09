"use client";

import { useState } from "react";
import { CATEGORIES, Category } from "@/lib/types";
import { RocketIcon } from "./rocket-icon";

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    tagline: string;
    description: string;
    url: string;
    category: Category;
    submittedBy: string;
  }) => void;
}

export function SubmitModal({ isOpen, onClose, onSubmit }: SubmitModalProps) {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState<Category>("AI/ML");
  const [submittedBy, setSubmittedBy] = useState("");
  const [launching, setLaunching] = useState(false);
  const [launched, setLaunched] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLaunching(true);

    setTimeout(() => {
      setLaunched(true);
      onSubmit({ name, tagline, description, url, category, submittedBy });

      setTimeout(() => {
        setLaunching(false);
        setLaunched(false);
        setName("");
        setTagline("");
        setDescription("");
        setUrl("");
        setCategory("AI/ML");
        setSubmittedBy("");
        onClose();
      }, 2000);
    }, 1500);
  };

  const isValid = name && tagline && description && url && submittedBy;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay" onClick={onClose}>
      <div
        className="retro-card rounded-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto neon-border-cyan"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <RocketIcon size={32} flame={true} />
            <h2
              className="text-lg sm:text-xl font-bold tracking-wider uppercase"
              style={{ fontFamily: "'Orbitron', sans-serif", color: "var(--neon-cyan)" }}
            >
              Submit Launch
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white/70 transition-colors text-xl"
          >
            &times;
          </button>
        </div>

        {/* Launch animation */}
        {launching && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className={launched ? "animate-launch" : "animate-rocket-float"}>
              <RocketIcon size={80} flame={true} />
            </div>
            <p
              className="mt-6 text-sm uppercase tracking-[4px] animate-pulse-glow"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                color: launched ? "var(--neon-green)" : "var(--neon-yellow)",
              }}
            >
              {launched ? "Launch Successful!" : "Igniting engines..."}
            </p>
            {launched && (
              <p className="text-xs text-white/40 mt-2">
                AI is now analyzing your submission...
              </p>
            )}
          </div>
        )}

        {/* Form */}
        {!launching && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1.5">
                Product Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="NeuralForge"
                className="retro-input w-full px-4 py-2.5 rounded-lg text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1.5">
                Tagline *
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="One line that explains what you built"
                className="retro-input w-full px-4 py-2.5 rounded-lg text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1.5">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does it do? Who is it for? Why now?"
                className="retro-textarea w-full px-4 py-2.5 rounded-lg text-sm min-h-[100px]"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1.5">
                URL *
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourproduct.com"
                className="retro-input w-full px-4 py-2.5 rounded-lg text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="retro-input w-full px-4 py-2.5 rounded-lg text-sm"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} style={{ background: "#0A0A0F" }}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1.5">
                Your Handle *
              </label>
              <input
                type="text"
                value={submittedBy}
                onChange={(e) => setSubmittedBy(e.target.value)}
                placeholder="@yourname"
                className="retro-input w-full px-4 py-2.5 rounded-lg text-sm"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid}
              className="submit-btn w-full py-3 rounded-lg text-sm text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Initiate Launch Sequence
            </button>

            <p className="text-[10px] text-white/20 text-center">
              AI will analyze and score your product within minutes
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
