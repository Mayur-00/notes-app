import axios from "axios"
import { toast } from "sonner"
import {create} from "zustand"


interface SearchState {
  isOpen: boolean
  results: any[]
  isLoading: boolean
  isError:boolean
  Error:any
  openSearch: () => void
  closeSearch: () => void
  searchNote:(query:string, type:string)=>void
  clearResult:()=>void
}

export const useSearchStore = create<SearchState>((set, get) => ({
   isOpen:false,
   isLoading:false,
   results:[],
   isError:false,
   Error:null,


   searchNote: async (query, type ) =>{
    try {
        set({isLoading:true});

        const response = await axios.get("/api/note/search", {
            params:{
                q:query,
                limit:10,
                type:type
            }
        });

        if(response?.data?.success){
            set({results:response.data.notes});
            console.log(response.data.notes)
        };
    } catch (error:any) {
        set({isError:true})
        set({Error:error})
        toast.error("an error occured")
        console.log(error)
    }finally{
        set({isLoading:false})
    }

   },

    openSearch: ()=>{
        set({isOpen:true})
        let {isOpen} = get()
        console.log("open search",isOpen )

    },
    closeSearch: ()=>set({isOpen:false}),
    clearResult:()=>set({results:[]})
}))