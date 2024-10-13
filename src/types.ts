export interface Author {
  id: string;
  name: string;
}

export interface Book {
  title: string;
  authorIds: string[];
}

export interface UpdateBook {
  title?: string;
  authorIds?: string;
}

export interface BookDetails {
  id: string;
  title: string;
  slug: string;
  authors: {
    authorId: string;
    name: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}
