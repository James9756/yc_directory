import Form from "next/form"
import ResetSearchBtn from "./ResetSearchBtn"
import { Search } from "lucide-react"

export default function SearchForm({query}:{query?:string}) {
    
  return (
    <Form action="/" scroll={false} className=" flex  justify-between border-3 bg-white rounded-full px-3 py-2 w-70 sm:w-90 font-medium text-black search-form">
        <input
        type="text"
        name="query"
        defaultValue={query}
        placeholder="Search startup"
        className="outline-none"
        />
        <div className="flex gap-1">
            {query &&<ResetSearchBtn/>}
            <button type="submit">
              <Search className="size-5 cursor-pointer"/>
            </button>

        </div>
    
    </Form>
  )
}
