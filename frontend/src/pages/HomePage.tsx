import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useAppSelector } from "@/app/hooks";
import NavBar from "@/components/NavBar/NavBar";
import ItemsIndex from "@/components/Items/ItemsIndex";
import CarouselImage1 from "@/assets/images/CarouselImage1.jpg";
import CarouselImage2 from "@/assets/images/CarouselImage2.jpg";
import CarouselImage3 from "@/assets/images/CarouselImage3.jpg";
import CarouselLeft from "@/assets/images/CarouselLeft.png";
import CarouselRight from "@/assets/images/CarouselRight.png";
import KitchenPot from "@/assets/images/KitchenPot.jpg";
import Paint from "@/assets/images/Paint.jpg";
import Decor from "@/assets/images/Decor.jpg";
import Bedding from "@/assets/images/Bedding.jpg";
import Fashion from "@/assets/images/Fashion.jpg";
import Womens from "@/assets/images/Womens.jpg";
import Mens from "@/assets/images/Mens.jpg";
import Kids from "@/assets/images/Kids.jpg";
import School from "@/assets/images/School.jpg";
import Makeup from "@/assets/images/Makeup.jpg";
import Soda from "@/assets/images/Soda.jpg";
import Merch from "@/assets/images/Merch.jpg";
import Snacks from "@/assets/images/Snacks.jpg";

const carouselImages = [CarouselImage1, CarouselImage2, CarouselImage3];

export default function HomePage() {
  const user = useAppSelector((state) => state.session.user);
  const [isContentGrayedOut, setIsContentGrayedOut] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  const card = "flex flex-col bg-white rounded p-4 shadow-sm";
  const cardHeading = "text-lg font-bold text-amz-ink";
  const cardLink =
    "mt-auto pt-3 text-sm text-amz-link hover:text-amz-link-hover hover:underline hover:cursor-pointer";
  const miniTile =
    "flex flex-col gap-1 text-left cursor-pointer text-xs text-amz-ink";
  const miniImg = "w-full aspect-square object-cover rounded-sm";

  return (
    <>
      <NavBar setIsContentGrayedOut={setIsContentGrayedOut} />

      <div className="relative min-h-screen w-full bg-amz-bg">
        <div className="relative w-full overflow-hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {carouselImages.map((image, idx) => (
                <div
                  key={idx}
                  className="relative flex-[0_0_100%] min-w-0 overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`Carousel slide ${idx + 1}`}
                    className="w-full aspect-16/6 sm:aspect-16/5 object-cover"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-b from-transparent via-amz-bg/30 to-amz-bg" />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center cursor-pointer"
          >
            <img
              src={CarouselLeft}
              className="w-12 h-auto object-contain"
              alt=""
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center cursor-pointer"
          >
            <img
              src={CarouselRight}
              className="w-12 h-auto object-contain"
              alt=""
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-375 px-3 sm:px-4 pb-8 -mt-2 lg:-mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={card}>
              {user === null ? (
                <>
                  <h2 className={cardHeading}>New home arrivals under $50</h2>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className={miniTile}>
                      <img
                        className={miniImg}
                        src={KitchenPot}
                        alt="Kitchen & dining"
                      />
                      Kitchen & dining
                    </div>
                    <div className={miniTile}>
                      <img
                        className={miniImg}
                        src={Paint}
                        alt="Home improvement"
                      />
                      Home improvement
                    </div>
                    <div className={miniTile}>
                      <img className={miniImg} src={Decor} alt="Décor" />
                      Décor
                    </div>
                    <div className={miniTile}>
                      <img
                        className={miniImg}
                        src={Bedding}
                        alt="Bedding & bath"
                      />
                      Bedding & bath
                    </div>
                  </div>
                  <div className={cardLink}>Shop the latest from home</div>
                </>
              ) : (
                <h2 className={cardHeading}>Pick up where you left off</h2>
              )}
            </div>

            <div className={card}>
              {user === null ? (
                <>
                  <h2 className={cardHeading}>Summer fashion for all</h2>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className={miniTile}>
                      <img
                        className={miniImg}
                        src={Fashion}
                        alt="All Fashion"
                      />
                      All fashion
                    </div>
                    <div className={miniTile}>
                      <img className={miniImg} src={Womens} alt="Women&apos;s" />
                      Women&apos;s
                    </div>
                    <div className={miniTile}>
                      <img className={miniImg} src={Mens} alt="Men&apos;s" />
                      Men&apos;s
                    </div>
                    <div className={miniTile}>
                      <img className={miniImg} src={Kids} alt="Kid&apos;s" />
                      Kid&apos;s
                    </div>
                  </div>
                  <div className={cardLink}>Shop now</div>
                </>
              ) : (
                <h2 className={cardHeading}>Women&apos;s fashion under $30</h2>
              )}
            </div>

            <div className={card}>
              {user === null ? (
                <>
                  <h2 className={cardHeading}>Save on school essentials</h2>
                  <div className="mt-3">
                    <img
                      className="w-full aspect-square object-cover rounded-sm"
                      src={School}
                      alt="School essentials"
                    />
                  </div>
                  <div className={cardLink}>Shop All</div>
                </>
              ) : (
                <h2 className={cardHeading}>Catch up on talked-about titles</h2>
              )}
            </div>

            <div className={card}>
              {user === null ? (
                <>
                  <h2 className={cardHeading}>Sign in for the best experience</h2>
                  <div className="mt-auto pt-4 w-full py-2 px-4 rounded-full text-center text-sm flex items-center justify-center font-medium cursor-pointer bg-amz-cart hover:bg-amz-cart-hover text-amz-ink">
                    Sign in securely
                  </div>
                </>
              ) : (
                <>
                  <h2 className={cardHeading}>Easy returns</h2>
                  <div className="mt-2 text-sm leading-relaxed text-amz-muted">
                    Amazeon does not have flexible return shipping on orders &
                    gifts
                  </div>
                </>
              )}
            </div>

            <div className={card}>
              <h2 className={cardHeading}>New on Amazeon: Too Faced</h2>
              <div className="mt-3">
                <img
                  className="w-full aspect-square object-cover rounded-sm"
                  src={Makeup}
                  alt="Too Faced makeup"
                />
              </div>
              <div className={cardLink}>Shop now</div>
            </div>

            <div className={card}>
              <h2 className={cardHeading}>Discover a new kind of soda</h2>
              <div className="mt-3">
                <img
                  className="w-full aspect-square object-cover rounded-sm"
                  src={Soda}
                  alt="Soda"
                />
              </div>
              <div className={cardLink}>Start sipping now</div>
            </div>

            <div className={card}>
              <h2 className={cardHeading}>Modify by Merch on Demand</h2>
              <div className="mt-3">
                <img
                  className="w-full aspect-square object-cover rounded-sm"
                  src={Merch}
                  alt="Merch on Demand"
                />
              </div>
              <div className={cardLink}>Shop now</div>
            </div>

            <div className={card}>
              <h2 className={cardHeading}>Bite-sized waffle cone snacks</h2>
              <div className="mt-3">
                <img
                  className="w-full aspect-square object-cover rounded-sm"
                  src={Snacks}
                  alt="Waffle cone snacks"
                />
              </div>
              <div className={cardLink}>Start snacking now</div>
            </div>
          </div>

          <div className="mt-6 bg-white rounded p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg md:text-xl font-bold text-amz-ink">
              {user === null
                ? "Products related to your setup"
                : "Keep shopping for your setup"}
            </h2>
            <div className="mt-4">
              <ItemsIndex />
            </div>
          </div>
        </div>

        {isContentGrayedOut && (
          <div className="absolute inset-0 w-full h-full bg-black/60 z-30 pointer-events-none" />
        )}
      </div>
    </>
  );
}
