export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Cursor: unknown;
  Time: Date;
};

export type PageInfo = {
  readonly __typename?: "PageInfo";
  readonly hasNextPage: Scalars["Boolean"];
  readonly hasPreviousPage: Scalars["Boolean"];
  readonly endCursor: Scalars["Cursor"];
  readonly startCursor: Scalars["Cursor"];
};

export type NewItem = {
  readonly title: Scalars["String"];
  readonly content?: Maybe<Scalars["String"]>;
};

export type ItemEdge = {
  readonly __typename?: "ItemEdge";
  readonly node: Item;
  readonly cursor: Scalars["Cursor"];
};

export type Mutation = {
  readonly __typename?: "Mutation";
  readonly addItem?: Maybe<Item>;
  readonly removeItem: Scalars["Boolean"];
};

export type MutationAddItemArgs = {
  item: NewItem;
};

export type MutationRemoveItemArgs = {
  id: Scalars["ID"];
};

export type Query = {
  readonly __typename?: "Query";
  readonly items: ItemConnection;
};

export type QueryItemsArgs = {
  first?: Scalars["Int"];
  after?: Maybe<Scalars["Cursor"]>;
};

export type Item = Node & {
  readonly __typename?: "Item";
  readonly id: Scalars["ID"];
  readonly title: Scalars["String"];
  readonly content?: Maybe<Scalars["String"]>;
  readonly createdAt: Scalars["Time"];
};

export type ItemConnection = {
  readonly __typename?: "ItemConnection";
  readonly edges: ReadonlyArray<ItemEdge>;
  readonly pageInfo: PageInfo;
};

export type Node = {
  readonly id: Scalars["ID"];
};

export type CreateItemMutationVariables = Exact<{
  title: Scalars["String"];
  content?: Maybe<Scalars["String"]>;
}>;

export type CreateItemMutation = { readonly __typename?: "Mutation" } & {
  readonly addItem?: Maybe<{ readonly __typename?: "Item" } & Pick<Item, "id">>;
};

export type ListItemFragment = { readonly __typename?: "Item" } & Pick<
  Item,
  "title" | "content"
>;

export type ItemListQueryVariables = Exact<{
  count?: Scalars["Int"];
  cursor?: Maybe<Scalars["Cursor"]>;
}>;

export type ItemListQuery = { readonly __typename?: "Query" } & {
  readonly items: { readonly __typename?: "ItemConnection" } & {
    readonly edges: ReadonlyArray<
      { readonly __typename?: "ItemEdge" } & {
        readonly node: { readonly __typename?: "Item" } & Pick<Item, "id"> &
          ListItemFragment;
      }
    >;
    readonly pageInfo: { readonly __typename?: "PageInfo" } & Pick<
      PageInfo,
      "endCursor" | "hasNextPage"
    >;
  };
};
