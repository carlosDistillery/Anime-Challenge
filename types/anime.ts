export interface Anime {
  id: number;
  type: string;
  links: { self: string };
  attributes: {
    createdAt: Date;
    updatedAt: Date;
    slug: string;
    synopsis: string;
    description: string;
    coverImageTopOffset: number;
    canonicalTitle: string;
    abbreviatedTitles: string[];
    averageRating: number;
    ratingFrequencies: any;
    userCount: number;
    favoritesCount: number;
    startDate: Date;
    endDate: Date;
    nextRelease: any;
    popularityRank: number;
    ratingRank: number;
    ageRating: string;
    ageRatingGuide: string;
    subtype: string;
    status: string;
    tba: any;
    posterImage: any;
    coverImage: any;
    episodeCount: number;
    episodeLength: number;
    totalLength: number;
    youtubeVideoId: string;
    showType: string;
    nsfw: boolean;
  };
  relationships: {
    genres: {
      links: {
        self: string;
        related: string;
      };
    };
    categories: {
      links: {
        self: string;
        related: string;
      };
    };
    castings: {
      links: {
        self: string;
        related: string;
      };
    };
    installments: {
      links: {
        self: string;
        related: string;
      };
    };
    mappings: {
      links: {
        self: string;
        related: string;
      };
    };
    reviews: {
      links: {
        self: string;
        related: string;
      };
    };
    mediaRelationships: {
      links: {
        self: string;
        related: string;
      };
    };
    characters: {
      links: {
        self: string;
        related: string;
      };
    };
    staff: {
      links: {
        self: string;
        related: string;
      };
    };
    productions: {
      links: {
        self: string;
        related: string;
      };
    };
    quotes: {
      links: {
        self: string;
        related: string;
      };
    };
    episodes: {
      links: {
        self: string;
        related: string;
      };
    };
    streamingLinks: {
      links: {
        self: string;
        related: string;
      };
    };
    animeProductions: {
      links: {
        self: string;
        related: string;
      };
    };
    animeCharacters: {
      links: {
        self: string;
        related: string;
      };
    };
    animeStaff: {
      links: {
        self: string;
        related: string;
      };
    };
  };
}
