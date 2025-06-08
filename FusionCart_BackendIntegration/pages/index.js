import Head from 'next/head'
import Recommendations from '../components/Recommendations'
import { trackUserBehavior } from '../utils/api'
import { useEffect } from 'react'

export default function Home() {
  const userId = 'user123'; // Replace with actual logged-in user ID logic

  // Example: track viewing a category 'electronics' on page load (you can adjust or call on actual user action)
  useEffect(() => {
    trackUserBehavior(userId, 'view_category', 'electronics');
  }, []);

  return (
    <div>
      <Head>
        <title>FusionCart</title>
        <meta name="description" content="FusionCart E-Commerce" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Your existing homepage content */}

      {/* Show personalized recommendations */}
      <Recommendations userId={userId} />
    </div>
  )
}
