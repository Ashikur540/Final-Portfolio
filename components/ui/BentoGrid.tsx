/* eslint-disable @next/next/no-img-element */
import IconContentCopy from "@/assets/icons/IconCopy";
import { cn } from "@/lib/utils";
import { AnimatedGradientBG } from "./AnimatedGradientBG";
import { CTAButton } from "./CTAButton";
import { InfiniteMovingCards } from "./infiniteScrollCards";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto container",
        className
      )}
    >
      {children}
    </div>
  );
};

type BentGridItemProps = {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
};
export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: BentGridItemProps) => {
  return (
    <div
      className={cn(
        // remove p-4 rounded-3xl dark:bg-black dark:border-white/[0.2] bg-white  border border-transparent, add border border-white/[0.1] overflow-hidden relative
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        //   add these two
        //   you can generate the color from here https://cssgradient.io/
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      <div className={`${id === 6 && "flex justify-center"}`}>
        {/* <div className="">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center ")}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 && "w-full opacity-80"
          } `}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              //   width={220}
              className="object-cover object-center w-full h-full"
            />
          )}
        </div> */}
        {/* {id === 6 && (
          // add background animation , remove the p tag
          <AnimatedGradientBG>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
          </AnimatedGradientBG>
        )} */}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative  flex flex-col px-5 p-5 lg:p-10"
          )}
        >
          {/* change the order of the title and des, font-extralight, remove text-xs text-neutral-600 dark:text-neutral-300 , change the text-color */}
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10">
            {description}
          </div>
          {/* add text-3xl max-w-96 , remove text-neutral-600 dark:text-neutral-300*/}
          {/* remove mb-2 mt-2 */}
          <div
            className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10`}
          >
            {title}
          </div>

          {/* for the github 3d globe */}
          {id === 2 && <div className="absolute -top-10 -right-10"> test</div>}

          {/* Tech stack list div */}
          {id === 1 && (
            <div className="flex flex-col gap-1 lg:gap-5 w-fit ">
              {/* tech stack lists */}
              {/* <div className="flex flex-col gap-3 md:gap-3 lg:gap-8"> */}
              <InfiniteMovingCards
                items={[
                  { icon: <IconContentCopy />, name: "copy" },
                  { icon: <IconContentCopy />, name: "copy" },
                  { icon: <IconContentCopy />, name: "copy" },
                  { icon: <IconContentCopy />, name: "copy" },
                  { icon: <IconContentCopy />, name: "copy" },
                  { icon: <IconContentCopy />, name: "copy" },
                ]}
                direction="left"
              />
              {/* </div> */}
              {/* <div className="flex flex-col gap-3 md:gap-3 lg:gap-8"> */}
              <InfiniteMovingCards
                items={[
                  { icon: <IconContentCopy />, name: "copy" },
                  { icon: <IconContentCopy />, name: "copy" },
                  { icon: <IconContentCopy />, name: "copy" },
                  { icon: <IconContentCopy />, name: "copy" },
                  { icon: <IconContentCopy />, name: "copy" },
                  { icon: <IconContentCopy />, name: "copy" },
                ]}
                direction="right"
              />
              {/* </div> */}
            </div>
          )}
          {id === 6 && (
            <div className="mt-5 relative">
              {/* button border magic from tailwind css buttons  */}
              {/* add rounded-md h-8 md:h-8, remove rounded-full */}
              {/* remove focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 */}
              {/* add handleCopy() for the copy the text */}
              {/* <img src="/confetti.gif" alt="confetti" /> */}

              {/* <div
                className={`absolute -bottom-5 right-0 ${
                  copied ? "block" : "block"
                }`}
              >
                <Lottie options={defaultOptions} height={200} width={400} />
              </div> */}

              <AnimatedGradientBG>
                <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
                  <CTAButton
                    // title={copied ? "Email is Copied!" : "Copy my email address"}
                    icon={<IconContentCopy />}
                    position="left"
                    // handleClick={handleCopy}
                    otherClasses="!bg-[#161A31]"
                  >
                    Copy my email
                  </CTAButton>
                </div>
              </AnimatedGradientBG>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
