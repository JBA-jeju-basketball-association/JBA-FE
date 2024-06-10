import {create} from "zustand";


const useGalleryModalStore =  create(set => ({
        forceModalOpen: false,
        galleryIdFromMain: 0,
        setForceModalOpen: (isOpen:boolean) => set({forceModalOpen : isOpen}),
        setGalleryIdFromMain: (id:number) => set({galleryIdFromMain : id}),
        }));

export default useGalleryModalStore;