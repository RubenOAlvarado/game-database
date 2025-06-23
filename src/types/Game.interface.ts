export interface Game {
    slug: string;
    name: string;
    playtime: number;
    platforms: Platform[];
    stores: Store[] | null;
    released: Date;
    tba: boolean;
    background_image: null | string;
    rating: number;
    rating_top: number;
    ratings: Rating[];
    ratings_count: number;
    reviews_text_count: number;
    added: number;
    added_by_status: AddedByStatus | null;
    metacritic: number | null;
    suggestions_count: number;
    updated: Date;
    id: number;
    score: string;
    clip: null;
    tags: Tag[];
    esrb_rating: EsrbRating | null;
    user_game: null;
    reviews_count: number;
    community_rating?: number;
    saturated_color: Color;
    dominant_color: Color;
    short_screenshots: ShortScreenshot[];
    parent_platforms: Platform[];
    genres: Genre[];
}

export interface AddedByStatus {
    owned?: number;
    beaten?: number;
    dropped?: number;
    yet?: number;
    toplay?: number;
    playing?: number;
}

export type Color = "0f0f0f";

export interface EsrbRating {
    id: number;
    name: Name;
    slug: Slug;
    name_en: Name;
    name_ru: NameRu;
}

export type Name = "Everyone" | "Everyone 10+" | "Teen";

export type NameRu = "Для всех" | "С 10 лет" | "С 13 лет";

export type Slug = "everyone" | "everyone-10-plus" | "teen";

export interface Genre {
    id: number;
    name: string;
    slug: string;
}

export interface Platform {
    platform: Genre;
}

export interface Rating {
    id: number;
    title: Title;
    count: number;
    percent: number;
}

export interface ShortScreenshot {
    id: number;
    image: string;
}

export interface Store {
    store: Genre;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
    language: Language;
    games_count: number;
    image_background: string;
}

export type Title = "exceptional" | "meh" | "recommended" | "skip";

export type Language = "eng";