import { Particles } from "@/components/ui/particles";
import { SectionBadge } from "@/components/ui/section-bade";
import Images from "@/components/global/images";
import Container from "@/components/global/container";

const Connect = () => {
    return (
        <div className="flex flex-col items-center justify-center py-8 md:py-12 w-full">
            <Container>
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                    <SectionBadge title="Connect Tools" />
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6">
                        Mechanic-Friendly Content Templates
                    </h2>
                    <p className="text-base md:text-lg text-center text-accent-foreground/80 mt-6">
                        Access ready-made templates for repair tips and easily share helpful YouTube videos.
                    </p>
                </div>
            </Container>
            <Container>
                <div className="w-full relative mt-12" aria-hidden="true">
                    <Images.connect className="w-full h-auto" />
                    <Particles
                        className="absolute inset-0"
                        quantity={150}
                        ease={80}
                        color="#e4e4e7"
                        refresh
                    />
                </div>
            </Container>
        </div>
    )
};

export default Connect
