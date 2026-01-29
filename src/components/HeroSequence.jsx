import React, { useEffect, useRef, useState, useCallback } from 'react';

const HeroSequence = ({ frameCount = 240 }) => {
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const currentFrameRef = useRef(0);

    // Generate frame path
    const getFramePath = (index) => {
        const frameNumber = (index + 1).toString().padStart(3, '0');
        return `/Frames/ezgif-frame-${frameNumber}.jpg`;
    };

    // Preload all images
    useEffect(() => {
        let loadedCount = 0;
        const images = [];

        const loadImage = (index) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    loadedCount++;
                    setLoadProgress(Math.floor((loadedCount / frameCount) * 100));
                    resolve(img);
                };
                img.onerror = () => {
                    console.error(`Error loading: ${getFramePath(index)}`);
                    loadedCount++;
                    resolve(null);
                };
                img.src = getFramePath(index);
            });
        };

        // Load all images
        Promise.all(
            Array.from({ length: frameCount }, (_, i) => loadImage(i))
        ).then((loadedImages) => {
            imagesRef.current = loadedImages;
            setIsLoaded(true);
            // Draw initial frame
            drawFrame(0);
        });
    }, [frameCount]);

    // Draw frame function
    const drawFrame = useCallback((frameIndex) => {
        const canvas = canvasRef.current;
        const img = imagesRef.current[frameIndex];

        if (!canvas || !img) return;

        const ctx = canvas.getContext('2d');

        // Set canvas size to window
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate scaling to cover the canvas
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;
        const x = (canvas.width - newWidth) / 2;
        const y = (canvas.height - newHeight) / 2;

        ctx.drawImage(img, x, y, newWidth, newHeight);
    }, []);

    // Handle scroll
    useEffect(() => {
        if (!isLoaded) return;

        const handleScroll = () => {
            // Calculate scroll progress within the hero section
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // The animation completes over ~1.2 screen heights for fast, natural movement
            const animationScrollLength = windowHeight * 1.2;

            // Calculate progress (0 to 1)
            const progress = Math.min(Math.max(scrollY / animationScrollLength, 0), 1);

            // Calculate frame index
            const frameIndex = Math.min(
                Math.floor(progress * frameCount),
                frameCount - 1
            );

            // Only redraw if frame changed
            if (frameIndex !== currentFrameRef.current) {
                currentFrameRef.current = frameIndex;
                drawFrame(frameIndex);
            }
        };

        // Initial call
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoaded, frameCount, drawFrame]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (isLoaded) {
                drawFrame(currentFrameRef.current);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, drawFrame]);

    return (
        <div className="sticky top-0 h-screen w-full overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{
                    opacity: isLoaded ? 0.55 : 0,
                    transition: 'opacity 0.5s ease-in-out'
                }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/60 via-transparent to-[#020617]" />

            {/* Loading indicator */}
            {!isLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020617]">
                    <div className="text-blue-500 font-bold text-xl mb-4">
                        CARGANDO EXPERIENCIA 3D
                    </div>
                    <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${loadProgress}%` }}
                        />
                    </div>
                    <div className="text-gray-500 mt-2 text-sm">{loadProgress}%</div>
                </div>
            )}
        </div>
    );
};

export default HeroSequence;
