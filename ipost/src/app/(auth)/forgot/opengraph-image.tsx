import { ImageResponse } from 'next/og';

// Runtime configuration for edge
export const runtime = 'edge';

// Metadata for the Open Graph image
export const alt = 'About IPOST - The Post Sharing Platform';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom, #00c6fb 0%, #005bea 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: 'white',
                    textAlign: 'center',
                    padding: '40px',
                    borderRadius: '16px', // Adds subtle rounded corners
                }}
            >
                {/* Logo */}
                <svg style={{
                    width: '80px',
                    height: '80px',
                    marginBottom: '20px',
                }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                    <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                </svg>
                {/* Title */}
                <h1
                    style={{
                        fontSize: '56px', // Slightly reduced for balance
                        fontWeight: '700', // Medium-bold for a modern look
                        marginBottom: '16px', // Unified spacing for visual rhythm
                        lineHeight: '1.2',
                        textAlign: 'center', // Centers text for better alignment in layouts
                    }}
                >
                   Forgot
                </h1>

                {/* Subtitle */}
                <p
                    style={{
                        fontSize: '28px',
                        fontWeight: '500',
                        maxWidth: '900px',
                        margin: '0 auto 16px',
                        lineHeight: '1.6',
                        textAlign: 'center',
                    }}
                >
                    IPOST is the ultimate platform to share your ideas, stories, and updates with the world.
                </p>

                <p
                    style={{
                        fontSize: '20px',
                        fontWeight: '400',
                        maxWidth: '900px',
                        margin: '0 auto',
                        lineHeight: '1.6',
                        textAlign: 'center',
                    }}
                >
                    Your Moments, Your Platform.
                </p>

            </div>
        ),
        {
            ...size,
        }
    );
}
