import Link from 'next/link'

export default function NotFound() {
  return (

    <div className="flex  flex-col items-center justify-center h-screen text-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-blue-600">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        Sorry, the page you&apos;re looking for doesn&apos;t exist.
      </p>

      <Link href="/" className="mt-6 px-4 py-2 font-medium text-white bg-blue-600 rounded hover:bg-blue-700"> Back to Home</Link>
    </div>
  )
}