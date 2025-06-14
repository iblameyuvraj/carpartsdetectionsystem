import Images from "@/components/global/images";
import Marquee from "@/components/ui/marquee";

const Companies = () => {
    return (
        <div className="flex w-full py-20">
            <div className="flex flex-col items-center justify-center text-center w-full py-2">
                <h2 className="text-xl heading">
                    Companies that trust us
                </h2>
                <div className="mt-16 w-full relative overflow-hidden" aria-hidden="true">
                    <Marquee pauseOnHover className="[--duration:30s]">
                        <div className="flex gap-8 md:gap-12">
                            <div className="w-24 h-8" aria-hidden="true">
                                <Images.company1 className="w-full h-full" />
                            </div>
                            <div className="w-24 h-8" aria-hidden="true">
                                <Images.company2 className="w-full h-full" />
                            </div>
                            <div className="w-24 h-8" aria-hidden="true">
                                <Images.company3 className="w-full h-full" />
                            </div>
                            <div className="w-24 h-8" aria-hidden="true">
                                <Images.company4 className="w-full h-full" />
                            </div>
                            <div className="w-24 h-8" aria-hidden="true">
                                <Images.company5 className="w-full h-full" />
                            </div>
                            <div className="w-24 h-8" aria-hidden="true">
                                <Images.company6 className="w-full h-full" />
                            </div>
                            <div className="w-24 h-8" aria-hidden="true">
                                <Images.company7 className="w-full h-full" />
                            </div>
                            <div className="w-24 h-8" aria-hidden="true">
                                <Images.company8 className="w-full h-full" />
                            </div>
                            <div className="w-24 h-8" aria-hidden="true">
                                <Images.company9 className="w-full h-full" />
                            </div>
                            <div className="w-24 h-8" aria-hidden="true">
                                <Images.company10 className="w-full h-full" />
                            </div>
                        </div>
                    </Marquee>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
                </div>
            </div>
        </div>
    )
};

export default Companies
