import { LinksItemType } from './LinksItemType';

export type CategoryItemType = {
    inputValue?: string;
    title: string;
    links?: Array<LinksItemType> | null;
}