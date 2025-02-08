import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Spinner = () => {
  gsap.registerPlugin(useGSAP);
  const spinner = useRef();
  const path = useRef();
  const wrapper = useRef();

  useGSAP(
    () => {
      gsap.set(".path", { strokeDasharray: "30 150" });
      const slowModifier = 0.9;
      const duration = 0.5 * slowModifier;
      const delays = [0, 0.06, 0.12, 0.18, 0.22, 0.26, 0.3];
      document.querySelectorAll(".spinner").forEach((spinner, idx) => {
        spinner.style.zIndex = 10 - idx;

        const animation = gsap.timeline({
          repeat: -1,
          delay: delays[idx] * slowModifier,
        });

        animation.to(spinner, {
          rotation: 360,
          ease: "linear",
          duration,
          repeat: 1,
        });

        animation.to(spinner, { duration, rotation: 490 });
        animation.to(
          spinner.firstElementChild,
          { duration, strokeDasharray: "0 150" },
          ""
        );

        animation.to(spinner, { duration, rotation: 360 });
        animation.to(spinner.firstElementChild, {
          duration,
          strokeDasharray: "30 150",
        });

        animation.fromTo(
          spinner,
          { rotate: 0 },
          { rotate: 360, duration, ease: "linear" },
          "-=.45"
        );
      });
    },
    {
      scope: wrapper,
    }
  );

  return (
    <div class="wrapper" ref={wrapper}>
      <svg class="spinner" viewBox="0 0 50 50" ref={spinner}>
        <circle
          stroke="#F65B51"
          class="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          ref={path}
        ></circle>
      </svg>
      <svg class="spinner" viewBox="0 0 50 50" ref={spinner}>
        <circle
          stroke="#F07432"
          class="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          ref={path}
        ></circle>
      </svg>
      <svg class="spinner" viewBox="0 0 50 50" ref={spinner}>
        <circle
          stroke="#EAAA08"
          class="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          ref={path}
        ></circle>
      </svg>
      <svg class="spinner" viewBox="0 0 50 50" ref={spinner}>
        <circle
          stroke="#349854"
          class="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          ref={path}
        ></circle>
      </svg>
      <svg class="spinner" viewBox="0 0 50 50" ref={spinner}>
        <circle
          stroke="#49A0FD"
          class="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          ref={path}
        ></circle>
      </svg>
      <svg class="spinner" viewBox="0 0 50 50" ref={spinner}>
        <circle
          stroke="#946DF8"
          class="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          ref={path}
        ></circle>
      </svg>
      <svg class="spinner" viewBox="0 0 50 50" ref={spinner}>
        <circle
          stroke="#EE46BC"
          class="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          ref={path}
        ></circle>
      </svg>
    </div>
  );
};

export default Spinner;
