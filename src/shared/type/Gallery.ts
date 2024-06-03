export type file = {
  fileName: string;
  fileUrl: string;
};

export type uploadType = {
  title: string;
  imgs: file[];
};

export type GalleryCardType = {
  galleryId?: number;
  title?: string;
  fileName?: string;
  imgUrl?: string;
};

export type GalleryCardListType = {
  galleries: GalleryCardType[];
};
