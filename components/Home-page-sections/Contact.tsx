"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";

import IconCheckAll from "@/assets/icons/IconCheckAll";
import animationData from "@/data/confetti.json";
import { copyToClipboard } from "@/lib/utils";
import IconContentCopy from "../../assets/icons/IconCopy";
import { personalInfo, socialMedia } from "../../data/index";
import { CTAButton } from "../ui/CTAButton";
import { SectionTitle } from "../ui/SectionTitle";
import { BlurFadeEffectWrapper } from "../ui/BlurFadeEffectWarpper";

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);

  const defaultLottieOptions = {
    loop: false,
    autoplay: playAnimation, // animation start
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopy = () => {
    copyToClipboard(personalInfo.email);
    setCopied(true);
    setPlayAnimation(true);
  };

  // useEffect to reset the copied state and animation after 3 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
        setPlayAnimation(false); // Stop animation after reset
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <footer
      className="w-full pt-20 pb-10 relative overflow-hidden"
      id="contact"
    >
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-10 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="contact-bg"
          className="w-full h-full opacity-55 "
        />
      </div>

      <div className="flex flex-col items-center">
        <Lottie
          options={defaultLottieOptions}
          height={200}
          width={400}
          isStopped={!playAnimation} // Control animation based on state
          style={{
            position: "absolute",
            top: "0px",
          }}
        />
        <BlurFadeEffectWrapper delay={0.1} inView>
          <SectionTitle className="text-center lg:max-w-[55vw]">
            Ready to Take Your{" "}
            <span className="text-purple">Digital Presence</span> to the Next
            Level?
          </SectionTitle>
        </BlurFadeEffectWrapper>
        <BlurFadeEffectWrapper delay={0.2} inView>
          <p className="text-white-200 mb-5 text-center">
            Reach out to me today and let&apos;s discuss how I can help you
            achieve your goals.
          </p>
        </BlurFadeEffectWrapper>
        <BlurFadeEffectWrapper delay={0.3} inView>
          <a href="mailto:meashik1000@gmail.com">
            <CTAButton
              icon={
                copied ? (
                  <IconCheckAll className="text-xl" />
                ) : (
                  <IconContentCopy />
                )
              }
              position="right"
              onClick={handleCopy}
            >
              {copied ? "Email Copied" : <span>Let&apos;s get in touch</span>}
            </CTAButton>
          </a>
        </BlurFadeEffectWrapper>
      </div>
      <div className="flex mt-12 md:flex-row flex-col gap-6 md:gap-10 justify-between items-center">
        <p className="text-center md:text-left md:text-base text-sm md:font-normal font-light">
          Made with huge ❤️ © Ashikur Rahman {new Date().getFullYear()}
        </p>
        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <Link
              href={info.url}
              key={info.id}
              target="_blank"
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <img src={info.img} alt="social-icon" width={20} height={20} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Contact;
