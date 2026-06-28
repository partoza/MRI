"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PlatformSection() {
	const sectionRef = useRef<HTMLElement>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth <= 900);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Image 3D Parallax (Flies in from the Left)
	const imageXDesktop = useTransform(
		scrollYProgress,
		[0, 0.35, 0.65, 1],
		["-60vw", "0vw", "0vw", "-30vw"],
	);
	const imageXMobile = useTransform(
		scrollYProgress,
		[0, 0.35, 0.65, 1],
		["-30vw", "0vw", "0vw", "-15vw"],
	);
	const imageX = isMobile ? imageXMobile : imageXDesktop;

	const imageRotateY = useTransform(
		scrollYProgress,
		[0, 0.35, 0.65, 1],
		["50deg", "0deg", "0deg", "25deg"],
	);
	const imageZ = useTransform(
		scrollYProgress,
		[0, 0.35, 0.65, 1],
		["-500px", "0px", "0px", "-300px"],
	);
	const opacity = useTransform(
		scrollYProgress,
		[0.05, 0.35, 0.65, 0.95],
		[0, 1, 1, 0],
	);

	// Text 3D Parallax (Flies in from the Right)
	const textXDesktop = useTransform(
		scrollYProgress,
		[0, 0.35, 0.65, 1],
		["60vw", "0vw", "0vw", "30vw"],
	);
	const textXMobile = useTransform(
		scrollYProgress,
		[0, 0.35, 0.65, 1],
		["30vw", "0vw", "0vw", "15vw"],
	);
	const textX = isMobile ? textXMobile : textXDesktop;

	const textRotateY = useTransform(
		scrollYProgress,
		[0, 0.35, 0.65, 1],
		["-50deg", "0deg", "0deg", "-25deg"],
	);
	const textZ = useTransform(
		scrollYProgress,
		[0, 0.35, 0.65, 1],
		["-500px", "0px", "0px", "-300px"],
	);

	// Inner image subtle parallax for extra depth
	const innerImageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

	return (
		<section
			id="about"
			ref={sectionRef}
			style={{
				position: "relative",
				paddingTop: "2rem",
				paddingBottom: "2rem",
				overflow: "hidden",
				perspective: "1500px",
				background:
					"linear-gradient(to bottom, transparent 0%, var(--bg) 15%, var(--bg) 85%, transparent 100%)",
				zIndex: 1,
			}}
		>
			<div className="container-wide">
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "55% 45%",
						gap: "clamp(2rem, 5vw, 5rem)",
						alignItems: "center",
						transformStyle: "preserve-3d",
					}}
				>
					{/* ---- Left: 3D Parallax Image ---- */}
					<motion.div
						style={{
							position: "relative",
							borderRadius: "1.2rem",
							overflow: "hidden",
							aspectRatio: "4 / 5",
							x: imageX,
							rotateY: imageRotateY,
							z: imageZ,
							opacity: opacity,
							boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
							transformOrigin: "right center",
						}}
					>
						<motion.img
							src="img/services/Distribution.jpeg"
							alt="MRI team collaborating"
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: "130%",
								objectFit: "cover",
								y: innerImageY,
							}}
							loading="lazy"
						/>
					</motion.div>

					{/* ---- Right: 3D Parallax Text ---- */}
					<motion.div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							paddingLeft: "clamp(1rem, 3vw, 3rem)",
							x: textX,
							rotateY: textRotateY,
							z: textZ,
							opacity: opacity,
							transformOrigin: "left center",
						}}
					>
						<span
							className="label-upper"
							style={{
								marginBottom: "1.5rem",
								display: "block",
								color: "var(--accent2)",
							}}
						>
							Goal of MRI
						</span>

						<h2
							className="heading-serif heading-lg"
							style={{
								marginBottom: "1.5rem",
								color: "var(--text)",
								lineHeight: 1.1,
								letterSpacing: "-0.02em",
							}}
						>
							Effortless Global Access.
						</h2>

						<p
							className="text-body"
							style={{
								marginBottom: "2.5rem",
								maxWidth: "95%",
								fontSize: "1.15rem",
							}}
						>
							Our primary objective is to make it as seamless and uncomplicated
							as possible for our partners to secure the most sought-after
							premium brands on their shelves. We handle the logistical
							complexities, so you can focus entirely on your market growth.
						</p>

						<div className="divider" style={{ marginBottom: "2rem" }} />

						<p
							className="heading-serif"
							style={{
								color: "var(--accent)",
								fontSize: "1.5rem",
								fontStyle: "italic",
								fontWeight: 500,
								letterSpacing: "0.02em",
							}}
						>
							And, we&rsquo;re just getting started.
						</p>
					</motion.div>
				</div>
			</div>

			{/* ---- Responsive override ---- */}
			<style>{`
        @media (max-width: 900px) {
          #about .container-wide > div {
            grid-template-columns: 1fr !important;
          }
          #about .container-wide {
            padding-left: 5%;
            padding-right: 5%;
          }
        }
      `}</style>
		</section>
	);
}
