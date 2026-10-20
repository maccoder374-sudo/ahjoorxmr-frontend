"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MessageCircle, ChevronDown } from "lucide-react";
import { SearchInput } from "@/components/ui/SearchInput";
import SupportTicketCenter from "@/components/support/SupportTicketCenter";
import {
  HELP_FAQS,
  HELP_FAQ_CATEGORIES,
  type HelpFaqCategory,
  type HelpFaqItem,
} from "@/data/helpFaqs";

export default function HelpClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<HelpFaqCategory | "all">("all");

  // Filter by category and search query
  const filteredFAQs = useMemo(() => {
    let filtered = HELP_FAQS;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  // Group by category
  const groupedFAQs = useMemo(() => {
    const grouped: Record<HelpFaqCategory, HelpFaqItem[]> = {
      "getting-started": [],
      contributions: [],
      payouts: [],
      wallet: [],
      troubleshooting: [],
    };

    filteredFAQs.forEach((item) => {
      grouped[item.category].push(item);
    });

    return grouped;
  }, [filteredFAQs]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Header */}
      <div className="bg-gradient-to-b from-[var(--bg)] to-[var(--modal)] px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-sora mb-4">Help Center</h1>
          <p className="text-lg text-[var(--muted)] mb-8">
            Find answers to common questions about Ahjoor, savings circles, and getting started.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search help articles..."
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="max-w-4xl mx-auto flex gap-2 flex-wrap justify-center overflow-x-auto pb-4">
          <button
            onClick={() => {
              setSelectedCategory("all");
              setExpandedId(null);
            }}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B6B76] ${
              selectedCategory === "all"
                ? "bg-white text-black"
                : "bg-[var(--ov-0a)] text-[var(--muted)] hover:text-[var(--text)]"
            }`}
          >
            All Topics
          </button>
          {(Object.keys(HELP_FAQ_CATEGORIES) as HelpFaqCategory[]).map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setExpandedId(null);
              }}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B6B76] ${
                selectedCategory === category
                  ? "bg-white text-black"
                  : "bg-[var(--ov-0a)] text-[var(--muted)] hover:text-[var(--text)]"
              }`}
            >
              {HELP_FAQ_CATEGORIES[category]}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <Search size={48} className="text-[var(--muted)] mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-[var(--text)] mb-2">No results found</h2>
            <p className="text-[var(--muted)]">
              Try adjusting your search terms or browse all topics.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {(Object.keys(HELP_FAQ_CATEGORIES) as HelpFaqCategory[]).map((category) => {
              const categoryItems = groupedFAQs[category];
              if (categoryItems.length === 0) return null;

              return (
                <section key={category}>
                  <h2 className="text-2xl font-bold font-sora text-[var(--text)] mb-6 pb-3 border-b border-[var(--ov-0f)]">
                    {HELP_FAQ_CATEGORIES[category]}
                  </h2>

                  <div className="space-y-3">
                    {categoryItems.map((item) => {
                      const isOpen = expandedId === item.id;
                      return (
                        <div
                          key={item.id}
                          className="bg-[var(--content)] rounded-xl border border-[var(--ov-0f)] overflow-hidden transition-all duration-200"
                        >
                          <button
                            onClick={() => toggleExpand(item.id)}
                            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[var(--modal)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B6B76]"
                            aria-expanded={isOpen}
                          >
                            <h3 className="font-semibold text-[var(--text)] leading-tight flex-1">
                              {item.question}
                            </h3>
                            <ChevronDown
                              size={20}
                              className={`text-[var(--muted)] shrink-0 transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                              aria-hidden="true"
                            />
                          </button>

                          {isOpen && (
                            <div className="px-5 pb-4 border-t border-[var(--ov-0f)]">
                              <p className="text-[var(--muted)] leading-relaxed">{item.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        <SupportTicketCenter />

        {/* Still Need Help Section */}
        <div className="mt-16 pt-12 border-t border-[var(--ov-0f)]">
          <div className="bg-gradient-to-r from-[#6c5ce7] to-[#8b7cf8] rounded-2xl p-8 md:p-12 text-center text-white">
            <MessageCircle size={40} className="mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold font-sora mb-3">Still need help?</h2>
            <p className="text-white/90 mb-6 max-w-md mx-auto">
              Join our Telegram community to chat with other Ahjoor users and get support from our team.
            </p>
            <a
              href="https://t.me/ahjoor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#6c5ce7] rounded-lg font-semibold hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <MessageCircle size={18} />
              Join Telegram Community
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--ov-0a)] text-[var(--text)] rounded-lg font-medium hover:bg-[var(--ov-1a)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B6B76]"
          >
            Back to Home
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B6B76]"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
