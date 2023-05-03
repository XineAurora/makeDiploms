import { create } from "zustand";

const useStore = create((set, get) => ({
    nameImage: '',
    parseValuesArray:[],
    diploms:[],
    index: 0,
    fontSize: 0,
    format: false,
    setNameImage: (a) => set((state) => ({ nameImage: a })),
    setParseValuesArray: (a) => set((state) => ({parseValuesArray: a})),
    setDiploms: (a) => set((state) => ({diploms: a})),
    setIndex: (a) => set((state) => ({ index: a })),
    setFormat: (a) => set((state) => ({ format: a })),
    setFontSize: (a) => set((state) => ({ fontSize: a })),
   }))

   export default useStore
