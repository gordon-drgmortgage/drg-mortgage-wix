/**
 * Wix location: Public > knowledgeFramework.js
 * Production status: Active
 * Migrated from: User-provided Wix code attachment
 * Initial archive date: 2026-07-10
 * Last verified from Wix: 2026-07-11
 */

import wixData from "wix-data";
import wixLocation from "wix-location";
import { currentMember, authentication } from "wix-members-frontend";

const COLLECTIONS = {
  categories: "KnowledgeCategories",
  resources: "KnowledgeResources",
  settings: "KnowledgeSettings",
  favorites: "FavoriteResources"
};

const DEFAULT_SETTINGS = {
  featuredResourceCount: 4,
  popularResourceCount: 6,
  newResourceCount: 6,
  showPinnedFirst: true,
  searchEnabled: true,
  memberFavoritesEnabled: true,
  resourceDownloadsEnabled: true,
  socialLibraryEnabled: true,
  flyerLibraryEnabled: true,
  maintenanceMode: false,
  favoritesRequireLogin: true
};

export function initializeKnowledgeCategory($w, htmlId = "#knowledgeCategoryHtml") {
  let member = null;

  $w.onReady(async () => {
    member = await getMemberSafe();

    $w(htmlId).onMessage(async (event) => {
      const data = event.data || {};

      if (data.type === "KC_NAVIGATE" && data.url) {
        navigateTo(data.url);
        return;
      }

      if (data.type === "KC_CATEGORY_READY") {
        await loadCategoryPage($w, htmlId, member);
        return;
      }

      if (data.type === "KC_SIGN_IN") {
        member = await handleSignIn();
        await loadCategoryPage($w, htmlId, member);
        return;
      }

      if (data.type === "KC_TOGGLE_FAVORITE") {
        member = await handleFavoriteToggle(data.resourceId, member);
        await loadCategoryPage($w, htmlId, member);
        return;
      }

      if (data.type === "KC_OPEN_RESOURCE") {
        openResource(data.resource);
      }
    });

    await loadCategoryPage($w, htmlId, member);
  });
}

export function initializeKnowledgeCenter($w, htmlId = "#knowledgeCenterHtml") {
  let member = null;

  $w.onReady(async () => {
    member = await getMemberSafe();

    $w(htmlId).onMessage(async (event) => {
      const data = event.data || {};

      if (data.type === "KC_NAVIGATE" && data.url) {
        navigateTo(data.url);
        return;
      }

      if (data.type === "KC_READY") {
        await loadKnowledgeCenter($w, htmlId, member);
        return;
      }

      if (data.type === "KC_SIGN_IN") {
        member = await handleSignIn();
        await loadKnowledgeCenter($w, htmlId, member);
        return;
      }

      if (data.type === "KC_TOGGLE_FAVORITE") {
        member = await handleFavoriteToggle(data.resourceId, member);
        await loadKnowledgeCenter($w, htmlId, member);
        return;
      }

      if (data.type === "KC_OPEN_RESOURCE") {
        openResource(data.resource);
      }
    });

    await loadKnowledgeCenter($w, htmlId, member);
  });
}

async function loadCategoryPage($w, htmlId, member) {
  try {
    const slug = getLastUrlSegment();

    const [settings, categories, allResources, favorites] = await Promise.all([
      getSettings(),
      getCategories(),
      getResources(),
      member ? getFavorites() : Promise.resolve([])
    ]);

    const category = categories.find((item) => item.slug === slug);

    if (!category) {
      postToHtml($w, htmlId, {
        type: "KC_CATEGORY_ERROR",
        message: "This Knowledge Center topic could not be found."
      });
      return;
    }

    const resources = filterResourcesForCategory(allResources, category);
    const previousNext = getPreviousNextCategories(categories, category);

    postToHtml($w, htmlId, {
      type: "KC_CATEGORY_DATA",
      pageMode: "category",
      isLoggedIn: Boolean(member),
      memberName: getMemberName(member),
      settings,
      category,
      categories,
      resources,
      favorites,
      featuredResources: getFeaturedResources(resources, settings),
      popularResources: getPopularResources(resources, settings),
      newestResources: getNewestResources(resources, settings),
      downloadableResources: getDownloadableResources(resources),
      relatedCategories: getRelatedCategories(categories, category),
      previousCategory: previousNext.previous,
      nextCategory: previousNext.next,
      glossaryTerms: getGlossaryTerms(),
      complianceCallouts: getComplianceCallouts(),
      supportLinks: getSupportLinks()
    });
  } catch (error) {
    console.error("Knowledge category error:", error);
    postToHtml($w, htmlId, {
      type: "KC_CATEGORY_ERROR",
      message: "Resources could not be loaded right now."
    });
  }
}

async function loadKnowledgeCenter($w, htmlId, member) {
  try {
    const [settings, categories, resources, favorites] = await Promise.all([
      getSettings(),
      getCategories(),
      getResources(),
      member ? getFavorites() : Promise.resolve([])
    ]);

    postToHtml($w, htmlId, {
      type: "KC_DATA",
      pageMode: "hub",
      isLoggedIn: Boolean(member),
      memberName: getMemberName(member),
      settings,
      categories,
      resources,
      favorites,
      pinnedResources: sortResources(resources.filter((item) => item.pinned)),
      featuredResources: getFeaturedResources(resources, settings),
      popularResources: getPopularResources(resources, settings),
      newestResources: getNewestResources(resources, settings),
      glossaryTerms: getGlossaryTerms(),
      complianceCallouts: getComplianceCallouts(),
      supportLinks: getSupportLinks()
    });
  } catch (error) {
    console.error("Knowledge hub error:", error);
    postToHtml($w, htmlId, {
      type: "KC_ERROR",
      message: "Knowledge Center resources could not be loaded."
    });
  }
}

async function getSettings() {
  const result = await wixData
    .query(COLLECTIONS.settings)
    .limit(1)
    .find();

  return {
    ...DEFAULT_SETTINGS,
    ...(result.items[0] || {})
  };
}

async function getCategories() {
  const result = await wixData
    .query(COLLECTIONS.categories)
    .eq("published", true)
    .ascending("sortOrder")
    .limit(100)
    .find();

  return result.items.map(formatCategory);
}

async function getResources() {
  const result = await wixData
    .query(COLLECTIONS.resources)
    .eq("published", true)
    .include("category")
    .ascending("sortOrder")
    .limit(1000)
    .find();

  return result.items.map(formatResource);
}

async function getFavorites() {
  const result = await wixData
    .query(COLLECTIONS.favorites)
    .include("resource")
    .descending("_createdDate")
    .limit(500)
    .find();

  return result.items.map((item) => ({
    favoriteId: item._id,
    resourceId: getReferenceId(item.resource)
  }));
}

async function handleFavoriteToggle(resourceId, member) {
  if (!resourceId) return member;

  if (!member) {
    member = await handleSignIn();
    if (!member) return null;
  }

  const existing = await wixData
    .query(COLLECTIONS.favorites)
    .eq("resource", resourceId)
    .limit(1)
    .find();

  if (existing.items.length) {
    await wixData.remove(COLLECTIONS.favorites, existing.items[0]._id);
  } else {
    await wixData.insert(COLLECTIONS.favorites, {
      resource: resourceId
    });
  }

  return member;
}

async function handleSignIn() {
  try {
    await authentication.promptLogin();
    return await getMemberSafe();
  } catch (error) {
    console.warn("Login cancelled or failed:", error);
    return null;
  }
}

async function getMemberSafe() {
  try {
    return await currentMember.getMember();
  } catch (error) {
    return null;
  }
}

function filterResourcesForCategory(resources, category) {
  if (category.slug === "resource-library") {
    return resources;
  }

  if (category.slug === "social-media-library") {
    return resources.filter((item) =>
      ["Social Post", "Carousel"].includes(item.resourceType)
    );
  }

  if (category.slug === "flyer-library") {
    return resources.filter((item) => item.resourceType === "Flyer");
  }

  return resources.filter((item) => item.categoryId === category.id);
}

function getFeaturedResources(resources, settings) {
  return sortResources(resources.filter((item) => item.featured))
    .slice(0, Number(settings.featuredResourceCount) || 4);
}

function getPopularResources(resources, settings) {
  return sortResources(resources.filter((item) => item.popular))
    .slice(0, Number(settings.popularResourceCount) || 6);
}

function getNewestResources(resources, settings) {
  return [...resources]
    .sort((a, b) => new Date(b.createdDate || 0) - new Date(a.createdDate || 0))
    .slice(0, Number(settings.newResourceCount) || 6);
}

function getDownloadableResources(resources) {
  return sortResources(resources.filter((item) => Boolean(item.downloadUrl)));
}

function sortResources(resources) {
  return [...resources].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return (a.sortOrder || 999) - (b.sortOrder || 999);
  });
}

function getRelatedCategories(categories, activeCategory) {
  return categories
    .filter((item) => item.id !== activeCategory.id)
    .slice(0, 4);
}

function getPreviousNextCategories(categories, activeCategory) {
  const ordered = [...categories].sort(
    (a, b) => (a.sortOrder || 999) - (b.sortOrder || 999)
  );

  const index = ordered.findIndex((item) => item.id === activeCategory.id);

  return {
    previous: index > 0 ? ordered[index - 1] : null,
    next:
      index >= 0 && index < ordered.length - 1
        ? ordered[index + 1]
        : null
  };
}

function openResource(resource) {
  if (!resource) return;

  const url =
    resource.dynamicPageUrl ||
    resource.resourceUrl ||
    resource.downloadUrl ||
    resource.suggestedTool;

  navigateTo(url);
}

function navigateTo(url) {
  if (!url) return;

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:")
  ) {
    wixLocation.to(url);
    return;
  }

  wixLocation.to(url.startsWith("/") ? url : `/${url}`);
}

function getLastUrlSegment() {
  const path = wixLocation.path || [];
  return path[path.length - 1] || "";
}

function postToHtml($w, htmlId, payload) {
  try {
    $w(htmlId).postMessage(payload);
  } catch (error) {
    console.error("Could not post to Knowledge HTML:", error);
  }
}

function formatCategory(item) {
  return {
    id: item._id || "",
    title: item.title || "",
    slug: item.slug || "",
    description: stripHtml(item.description || ""),
    icon: item.icon || "📚",
    pageUrl:
      normalizeUrl(item.pageUrl) ||
      buildCategoryUrl(item.slug),
    accentColor:
      normalizeColor(item.accentColor) ||
      "#1f5f9f",
    sortOrder: Number(item.sortOrder || 999),
    featured: Boolean(item.featured)
  };
}

function formatResource(item) {
  const category =
    item.category && typeof item.category === "object"
      ? item.category
      : {};

  const title = item.title || "";
  const summary = stripHtml(item.summary || "");
  const articleBodyHtml = normalizeRichText(item.articleBody);
  const articleBodyText = stripHtml(articleBodyHtml);
  const tags = normalizeTags(item.tags);
  const audience = normalizeTags(item.audience);
  const resourceType = item.resourceType || "Guide";

  return {
    id: item._id || "",
    title,
    slug: item.slug || "",
    summary,
    categoryId: category._id || getReferenceId(item.category),
    categoryTitle: category.title || "",
    categorySlug: category.slug || item.categorySlug || "",
    categoryIcon: category.icon || "📚",
    categoryColor:
      normalizeColor(category.accentColor) ||
      "#1f5f9f",
    resourceType,
    resourceTypeIcon: getResourceTypeIcon(resourceType),
    difficulty: item.difficulty || "Beginner",
    difficultyColor: getDifficultyColor(item.difficulty),
    thumbnail: getImageUrl(item.thumbnail),
    downloadUrl: getDocumentUrl(item.downloadFile),
    resourceUrl: normalizeUrl(item.resourceUrl),
    dynamicPageUrl: item.slug
      ? `/knowledge-resources/${encodeURIComponent(item.slug)}`
      : "/knowledge-center/resource-library",
    estimatedReadTime:
      Number(item.estimatedReadTime) ||
      estimateReadTime(articleBodyText || summary),
    tags,
    audience,
    suggestedTool: normalizeUrl(item.suggestedTool),
    pinned: Boolean(item.pinned),
    featured: Boolean(item.featured),
    popular: Boolean(item.popular),
    ctaLabel: item.ctaLabel || getDefaultCta(resourceType),
    sortOrder: Number(item.sortOrder || 999),
    createdDate: item._createdDate,
    updatedDate: item._updatedDate,

    // Existing CMS content is included so the hub/category HTML can perform
    // full-text search without requiring any new KnowledgeResources fields.
    articleBody: articleBodyHtml,
    articleBodyText,
    searchText: buildSearchText({
      title,
      summary,
      articleBodyText,
      tags,
      audience,
      categoryTitle: category.title || "",
      resourceType
    })
  };
}

function buildCategoryUrl(slug) {
  if (!slug) return "/knowledge-center/resource-library";
  return `/knowledge-center/${encodeURIComponent(slug)}`;
}

function buildSearchText(values) {
  return [
    values.title,
    values.summary,
    values.articleBodyText,
    values.categoryTitle,
    values.resourceType,
    ...(values.tags || []),
    ...(values.audience || [])
  ]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function estimateReadTime(text) {
  const words = String(text || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  if (!words) return null;
  return Math.max(1, Math.ceil(words / 225));
}

function getReferenceId(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value._id || "";
}

function getResourceTypeIcon(type) {
  const map = {
    Guide: "📘",
    Flyer: "📄",
    Checklist: "☑️",
    Worksheet: "📝",
    "Social Post": "📱",
    Carousel: "📱",
    Video: "🎥",
    Calculator: "🧮",
    Explainer: "💡",
    Comparison: "⚖️",
    FAQ: "❓"
  };

  return map[type] || "📚";
}

function getDifficultyColor(difficulty) {
  const map = {
    Beginner: "#188a5c",
    Intermediate: "#c96d1f",
    Advanced: "#b42318",
    Professional: "#6652cc"
  };

  return map[difficulty] || "#1f5f9f";
}

function getDefaultCta(type) {
  const map = {
    Calculator: "Open Tool",
    Flyer: "Download Flyer",
    Checklist: "View Checklist",
    Worksheet: "View Worksheet",
    Video: "Watch Video",
    "Social Post": "View Resource",
    Carousel: "View Resource",
    Comparison: "Compare Options",
    Explainer: "Learn More",
    FAQ: "Read FAQ",
    Guide: "Read Guide"
  };

  return map[type] || "Open Resource";
}

function getMemberName(member) {
  if (!member) return "";

  return (
    member.profile?.nickname ||
    member.contactDetails?.firstName ||
    member.loginEmail ||
    ""
  );
}

function normalizeUrl(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.url || value.fileUrl || "";
}

function normalizeColor(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.hex || value.value || "";
}

function getImageUrl(image) {
  if (!image) return "";
  if (typeof image === "string") return image;
  return image.src || image.url || "";
}

function getDocumentUrl(document) {
  if (!document) return "";
  if (typeof document === "string") return document;
  return document.fileUrl || document.url || "";
}

function normalizeTags(value) {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeRichText(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.html || value.text || "";
}

function stripHtml(value) {
  if (!value) return "";

  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function getSupportLinks() {
  return {
    contact: "/contact",
    about: "/about",
    borrowerTools: "/borrower-tools",
    investorTools: "/investor-tools",
    realtorTools: "/realtor-tools",
    knowledgeCenter: "/knowledge-center",
    flyerLibrary: "/knowledge-center/flyer-library",
    socialLibrary: "/knowledge-center/social-media-library",
    resourceLibrary: "/knowledge-center/resource-library"
  };
}

function getComplianceCallouts() {
  return [
    {
      title: "Educational Content",
      text: "Resources in the Knowledge Center are for general education only and are not a commitment to lend or a guarantee of eligibility."
    },
    {
      title: "Broker Guidance",
      text: "DRG Mortgage LLC operates as a mortgage broker. Loan options, pricing, and approvals depend on borrower qualifications, property details, lender guidelines, and market conditions."
    },
    {
      title: "Market Information",
      text: "Any market or rate information is for educational context only. Published benchmarks are not DRG Mortgage rate quotes and may not reflect available terms for a specific borrower."
    }
  ];
}

function getGlossaryTerms() {
  return [
    {
      term: "APR",
      definition: "Annual Percentage Rate. A broader cost measure that includes the interest rate plus certain loan-related costs."
    },
    {
      term: "Appraisal",
      definition: "An independent opinion of a property’s value, usually required by the lender."
    },
    {
      term: "Cash to Close",
      definition: "The estimated amount a borrower needs to bring to closing, including down payment and closing costs."
    },
    {
      term: "Closing Costs",
      definition: "Fees and prepaid items paid at closing, separate from the down payment."
    },
    {
      term: "DTI",
      definition: "Debt-to-income ratio. A comparison of monthly debt payments to qualifying income."
    },
    {
      term: "Escrow",
      definition: "An account used to collect and pay items like property taxes and homeowners insurance."
    },
    {
      term: "LTV",
      definition: "Loan-to-value ratio. The loan amount compared to the property value or purchase price."
    },
    {
      term: "PMI",
      definition: "Private mortgage insurance. Often required on conventional loans with less than 20% equity or down payment."
    },
    {
      term: "Pre-Approval",
      definition: "A lender or broker review of borrower information to estimate financing eligibility before making an offer."
    },
    {
      term: "Rate Lock",
      definition: "An agreement to hold a specific interest rate for a certain period, subject to terms and conditions."
    },
    {
      term: "Underwriting",
      definition: "The lender’s review of credit, income, assets, property, and other details before loan approval."
    }
  ];
}