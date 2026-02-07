"use client"
import { DATA_COLLECTOR_NAME } from '@/data/dataCollectionTeam'
import { MoveUp} from 'lucide-react';

const DataCollectionTeam = () => {
        const scrollToTop = () => {
            const element = document.getElementById('data-collection-header');

            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        };

        return (
            <div className='xl:p-4 xl:border xl:-ml-[1px]'>
                <div className='border border-[#2d2d2d] pb-4 xl:mb-8 border-b-0 xl:border-0 '>
                    <div className='relative w-56 flex mx-auto my-2 xl:w-full'>
                        <p id='data-collection-header' className='text-left text-3xl scroll-mt-32 xl:font-light xl:tracking-tight xl:text-4xl'>
                            Februari 2024-Februari 2025
                        </p>
                    </div>
                </div>


                <div className='grid grid-cols-1 xl:grid-cols-3 xl:gap-4'>

                    {DATA_COLLECTOR_NAME.map((name: string, index: number) => (
                        <p
                            key={index}
                            className={`
                            text-center p-2 
                            hover:text-white hover:bg-[#1d1d1d] hover:font-bold transition-colors
                            
                            border border-[#2d2d2d]
                            first:mt-0
                            first:border-t
                            border-t-0
                            xl:border-t

                            xl:mt-0
                        `}
                        >
                            {name}
                        </p>
                    ))}

                </div>

                <div onClick={scrollToTop} className='w-[45px] h-[45px] border flex items-center justify-center mx-auto mt-4 cursor-pointer hover:bg-[#2d2d2d] hover:text-white transition-colors group xl:hidden '>
                    <MoveUp strokeWidth={0.5}></MoveUp>

                </div>

            </div>
        )
    }
export default DataCollectionTeam;