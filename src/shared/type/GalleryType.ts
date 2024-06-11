export type FileType = {
  fileName: string;
  fileUrl: string;
};

export type UploadType = {
  title: string;
  imgs: FileType[];
};

export type GalleryCardType = {
  galleryId?: number;
  title?: string;
  fileName?: string;
  imgUrl?: string;
  createAt?: string;
};

export type GalleryCardListType = {
  galleries: GalleryCardType[];
};

export type GalleryDetailProps = {
  title: string;
  files: FileType[];
};
