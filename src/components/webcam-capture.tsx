/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { X, Camera } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

type Props = {
	isModalOpen: boolean;
	setIsModalOpen: (modal: boolean) => void;
	onCapture?: (imageDataUrl: string) => void;
};

const WebcamCapture = ({ isModalOpen, setIsModalOpen, onCapture }: Props) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const captureCanvasRef = useRef<HTMLCanvasElement>(null);

	const [isWebcamActive, setIsWebcamActive] = useState(false);
	const [capturedImage, setCapturedImage] = useState<string | null>(null);
	const [countdown, setCountdown] = useState<number | null>(null);

	useEffect(() => {
		if (isModalOpen) {
			startCamera();
		} else {
			stopCamera();
			resetCaptureState();
		}
		return () => stopCamera();
	}, [isModalOpen]);

	const startCamera = async () => {
		try {
			if (!videoRef.current) return;
			const stream = await navigator.mediaDevices.getUserMedia({
				video: { width: 640, height: 480, facingMode: "user" },
				audio: false,
			});
			videoRef.current.srcObject = stream;
			await videoRef.current.play();
			setIsWebcamActive(true);
		} catch (err) {
			console.error("Error accessing camera:", err);
		}
	};

	const stopCamera = () => {
		if (videoRef.current?.srcObject) {
			const stream = videoRef.current.srcObject as MediaStream;
			stream.getTracks().forEach((t) => t.stop());
			videoRef.current.srcObject = null;
		}
		setIsWebcamActive(false);
	};

	const resetCaptureState = () => {
		setCapturedImage(null);
		setCountdown(null);
	};

	const handleClose = () => {
		setIsModalOpen(false);
		stopCamera();
		resetCaptureState();
	};

	const capturePhoto = useCallback(() => {
		if (!videoRef.current || !captureCanvasRef.current) return;
		const video = videoRef.current;
		const canvas = captureCanvasRef.current;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.width = video.videoWidth || 640;
		canvas.height = video.videoHeight || 480;

		ctx.save();
		ctx.scale(-1, 1); // mirror like selfie
		ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
		ctx.restore();

		const imageData = canvas.toDataURL("image/png");
		setCapturedImage(imageData);
		stopCamera();
	}, []);

	const startCountdown = () => {
		let seconds = 3;
		setCountdown(seconds);

		const interval = setInterval(() => {
			seconds -= 1;
			setCountdown(seconds);
			if (seconds <= 0) {
				clearInterval(interval);
				setCountdown(null);
				capturePhoto();
			}
		}, 1000);
	};

	return (
		<div>
			{isModalOpen && (
				<div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
						<div className="flex items-start justify-between p-6 border-b border-gray-200">
							<div>
								<h2 className="text-xl font-semibold text-gray-900">Take a Photo</h2>
								<p className="text-sm text-gray-600 mt-1">{capturedImage ? "Photo captured successfully!" : "Click the button below to capture your photo."}</p>
							</div>
							<button onClick={handleClose} className="p-1 hover:bg-gray-100 rounded transition-colors">
								<X className="w-6 h-6 text-gray-800" />
							</button>
						</div>

						<div className="p-6 space-y-6">
							<div className="rounded-lg overflow-hidden bg-gray-200 relative">
								{capturedImage ? (
									<Image src={capturedImage} alt="Captured" width={640} height={480} className="w-full h-auto object-cover" unoptimized />
								) : (
									<>
										<video ref={videoRef} autoPlay playsInline muted className="w-full h-auto object-cover transform scale-x-[1]" />
									</>
								)}

								{countdown !== null && !capturedImage && (
									<div className="absolute inset-0 flex items-center justify-center bg-black/60">
										<span className="text-6xl font-bold text-white">{countdown}</span>
									</div>
								)}
							</div>

							<canvas ref={captureCanvasRef} className="hidden" />

							{!capturedImage ? (
								<div className="flex justify-center">
									<button onClick={startCountdown} disabled={!isWebcamActive || countdown !== null} className="flex items-center gap-2 px-6 py-3 bg-[#01959f] text-white rounded-lg hover:bg-[#017a8a] disabled:opacity-50 transition-colors font-medium">
										<Camera className="w-5 h-5" />
										Capture Photo
									</button>
								</div>
							) : (
								<div className="flex gap-3 justify-center">
									<button
										onClick={() => {
											resetCaptureState();
											startCamera();
										}}
										className="px-6 py-2 bg-[#01959f] text-white rounded-lg hover:bg-[#017a8a] transition-colors font-medium">
										Retake
									</button>
									<button
										onClick={() => {
											if (capturedImage && onCapture) onCapture(capturedImage);
											handleClose();
										}}
										className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium">
										Done
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default WebcamCapture;
