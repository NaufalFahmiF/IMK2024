export default function HyperLink({ user }) {
    return (
        <div className='bg-secondary mt-4 rounded-lg shadow h-[420px] flex items-center justify-center'>
            <div id="main" className="grid grid-rows-3 grid-flow-col gap-2 items-center text-center justify-center font-bold text-sm"> 
                <a href="https://baak.gunadarma.ac.id/" target="_blank" rel="noopener noreferrer" className="bg-[radial-gradient(circle_at_center,_rgba(242,138,200,0.9)_35%,_rgba(216,76,160,1)_100%)] hover:bg-[radial-gradient(circle_at_center,_rgba(215,119,188,0.9)_35%,_rgba(193,103,199,_1)_100%)] hover:text-white transition-colors rounded-lg m-3 h-24 w-24 flex items-center justify-center">
                    BAAK 
                </a>
                <a href="https://studentsite.gunadarma.ac.id/index.php/site/login" target="_blank" rel="noopener noreferrer" className="bg-[radial-gradient(circle_at_center,_rgba(236,134,236,0.9)_35%,_rgba(203,70,203,1)_100%)] hover:bg-[radial-gradient(circle_at_center,_rgba(215,119,188,0.9)_35%,_rgba(193,103,199,_1)_100%)] hover:text-white transition-colors rounded-lg m-3 h-24 w-24 flex items-center justify-center flex-col">
                    <span>STUDENT</span>
                    <span>SITE</span>
                </a>
                <a href="https://library.gunadarma.ac.id/" target="_blank" rel="noopener noreferrer" className="bg-[radial-gradient(circle_at_center,_rgba(250,151,118,0.9)_35%,_rgba(228,91,46,1)_100%)] hover:bg-[radial-gradient(circle_at_center,_rgba(215,119,188,0.9)_35%,_rgba(193,103,199,_1)_100%)] hover:text-white transition-colors rounded-lg m-3 h-24 w-24 flex items-center justify-center">
                    E-LIBRARY
                </a>
                <a href="https://v-class.gunadarma.ac.id/login/index.php" target="_blank" rel="noopener noreferrer" className="bg-[radial-gradient(circle_at_center,_rgba(252,208,137,0.9)_35%,_rgba(246,170,47,1)_100%)] hover:bg-[radial-gradient(circle_at_center,_rgba(215,119,188,0.9)_35%,_rgba(193,103,199,_1)_100%)] hover:text-white transition-colors rounded-lg m-3 h-24 w-24 flex items-center justify-center">
                    V-CLASS
                </a>
                <a href="https://praktikum.gunadarma.ac.id/login/index.php" target="_blank" rel="noopener noreferrer" className="bg-[radial-gradient(circle_at_center,_rgba(161,145,253,0.9)_35%,_rgba(103,80,232,1)_100%)] hover:bg-[radial-gradient(circle_at_center,_rgba(215,119,188,0.9)_35%,_rgba(193,103,199,_1)_100%)] hover:text-white transition-colors rounded-lg m-3 h-24 w-24 flex items-center justify-center">
                    ILAB 
                </a>
                <a href="https://hypercomputation-hub.gunadarma.ac.id/fikti" target="_blank" rel="noopener noreferrer" className="bg-[radial-gradient(circle_at_center,_rgba(242,117,153,0.9)_35%,_rgba(212,46,94,1)_100%)] hover:bg-[radial-gradient(circle_at_center,_rgba(215,119,188,0.9)_35%,_rgba(193,103,199,_1)_100%)] hover:text-white transition-colors rounded-lg m-3 h-24 w-24 flex items-center justify-center">
                    DGX HPC 
                </a>
            </div> 
        </div>
    );
};