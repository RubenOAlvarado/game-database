export interface GameDetails {
    id: number;
    slug: string;
    name: string;
    name_original: string;
    description: string;
    metacritic: null;
    metacritic_platforms: MetacriticPlatform[];
    released: Date;
    tba: boolean;
    updated: Date;
    background_image: string;
    background_image_additional: string;
    website: string;
    rating: number;
    rating_top: number;
    ratings: Rating[];
    reactions: Reactions;
    added: number;
    added_by_status: AddedByStatus;
    playtime: number;
    screenshots_count: number;
    movies_count: number;
    creators_count: number;
    achievements_count: number;
    parent_achievements_count: number;
    reddit_url: string;
    reddit_name: string;
    reddit_description: string;
    reddit_logo: string;
    reddit_count: number;
    twitch_count: number;
    youtube_count: number;
    reviews_text_count: number;
    ratings_count: number;
    suggestions_count: number;
    alternative_names: string[];
    metacritic_url: string;
    parents_count: number;
    additions_count: number;
    game_series_count: number;
    user_game: null;
    reviews_count: number;
    saturated_color: string;
    dominant_color: string;
    parent_platforms: ParentPlatform[];
    platforms: PlatformElement[];
    stores: Store[];
    developers: Developer[];
    genres: Developer[];
    tags: Developer[];
    publishers: Developer[];
    esrb_rating: EsrbRating;
    clip: null;
    description_raw: string;
}

export interface MetacriticPlatform {
    metascore: number;
    url: string;
    platform: {
        platform: number;
        name: string;
        slug: string;
    };
}

export interface AddedByStatus {
    yet: number;
    owned: number;
    beaten: number;
    toplay: number;
    dropped: number;
    playing: number;
}

export interface Developer {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
    domain?: string;
    language?: string;
}

export interface EsrbRating {
    id: number;
    name: string;
    slug: string;
}

export interface ParentPlatform {
    platform: EsrbRating;
}

export interface PlatformElement {
    platform: PlatformPlatform;
    released_at: Date;
    requirements: Requirements | null;
}

export interface PlatformPlatform {
    id: number;
    name: string;
    slug: string;
    image: null;
    year_end: null;
    year_start: null;
    games_count: number;
    image_background: string;
}

export interface Rating {
    id: number;
    title: string;
    count: number;
    percent: number;
}

export interface Reactions {
    [key: string]: number;
}

export interface Store {
    id: number;
    url: string;
    store: Developer;
}

export interface Requirements {
    minimum?: string;
    recommended?: string;
}