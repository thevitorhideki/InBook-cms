export interface Author {
  id: string;
  name: string;
}

export interface Book {
  title: string;
  authorId: string;
}

export interface UpdateBook {
  title?: string;
  authorId?: string;
}

export interface BookDetails {
  id: string;
  title: string;
  slug: string;
  author: {
    authorId: string;
    name: string;
    books: BookCollection[];
  };
}

export interface BookCollection {
  id: string;
  title: string;
  slug: string;
  author: {
    name: string;
  };
}
