import { Link } from "react-router-dom";

export default function HyperLink({ user }) {
    return (
        <div className='bg-secondary mt-4 rounded-lg shadow h-[420px] flex items-center justify-center'>
            <div id="main" class="grid grid-rows-3 grid-flow-col gap-2 flex items-center text-center justify-center font-bold text-sm"> 
                <div class="bg-gradient-to-tl from-pink-600 from- via-pink-400 via- to-pink-200 to- rounded-lg m-3 h-24 w-24 flex items-center justify-center">BAAK</div> 
                <div class="bg-gradient-to-tl from-fuchsia-600 from- via-fuchsia-400 via- to-fuchsia-200 to- rounded-lg m-3 h-24 w-24 flex items-center justify-center">STUDENTSITE</div> 
                <div class="bg-gradient-to-tl from-orange-600 from- via-orange-400 via- to-orange-200 to- rounded-lg m-3 h-24 w-24 flex items-center justify-center">E-LIBRARY</div> 
                <div class="bg-gradient-to-tl from-yellow-600 from- via-yellow-400 via- to-yellow-200 to- rounded-lg m-3 h-24 w-24 flex items-center justify-center">V-CLASS</div> 
                <div class="bg-gradient-to-tl from-violet-600 from- via-violet-400 via- to-violet-200 to- rounded-lg m-3 h-24 w-24 flex items-center justify-center">ILAB</div> 
                <div class="bg-gradient-to-tl from-rose-600 from- via-rose-400 via- to-rose-200 to- rounded-lg m-3 h-24 w-24 flex items-center justify-center">DGX HPC</div> 
            </div> 
        </div>
    );
};