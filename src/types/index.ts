export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export enum HttpStatus {
    Unauthorized = 401,
    NotFound = 404,
}

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface Article {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export type ResponseStatus = 'ok' | 'error';

export interface SourcesResponse {
    status: ResponseStatus;
    sources: Source[];
}

export interface ArticlesResponse {
    status: ResponseStatus;
    totalResults: number;
    articles: Article[];
}

export interface QueryParams {
    apiKey: string;
    sources: string;
}

export interface RequestParams {
    endpoint: Endpoint;
    options?: Partial<QueryParams>;
}

export type ApiKeyParams = Pick<QueryParams, 'apiKey'>;
export type SourceItem = Pick<Source, 'id' | 'name'>;

export type Callback<T> = (data: T) => void;

export type HttpMethod = 'GET' | 'POST';
