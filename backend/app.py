from flask import Flask, request, jsonify
from flask_cors import CORS
import time # Import the time module for delays
from bs4 import BeautifulSoup # <-- UNCOMMENT / ADD THIS
import requests # <-- UNCOMMENT / ADD THIS

app = Flask(__name__)
CORS(app) # Enable CORS for all origins (good for development)

@app.route('/search/text')
def search_text():
    query = request.args.get('query')
    if not query:
        return jsonify({"error": "Query parameter is missing"}), 400

    try:
        # --- START OF REPLACED CODE FOR REAL SCRAPING ---

        # 1. Construct the Google Shopping URL
        # We'll use a specific Google search URL for shopping results
        # Adding 'tbm=shop' for shopping results
        # 'q=' for the query
        google_shopping_url = f"https://www.google.com/search?tbm=shop&q={query}"

        # 2. Define a User-Agent to mimic a real browser
        # This helps avoid immediate blocking
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
        }

        print(f"DEBUG: Attempting to scrape: {google_shopping_url}")

        # 3. Make the HTTP request
        response = requests.get(google_shopping_url, headers=headers)
        response.raise_for_status() # Raise an exception for HTTP errors (4xx or 5xx)

        # 4. Parse the HTML content
        soup = BeautifulSoup(response.text, 'html.parser')

        shopping_results = []

        # --- IMPORTANT: SELECTORS MIGHT CHANGE ---
        # Google's HTML structure can change without notice.
        # You might need to inspect Google Shopping results page in your browser
        # (right-click -> Inspect Element) to find the correct CSS selectors.

        # Common structure for Google Shopping results:
        # Each product usually sits within a div or article tag.
        # We'll look for specific classes or attributes.

        # This is a common selector, but it's prone to change.
        # It targets divs that have a data-p element (often indicating a product)
        # or specific shopping result cards.
        product_cards = soup.find_all('div', class_='sh-pr__product-result') # A common class name for product cards
        if not product_cards:
            # Fallback/alternative selectors if the main one fails
            product_cards = soup.find_all('div', class_='sh-dgr__grid-result')
            if not product_cards:
                product_cards = soup.find_all('div', class_='sh-sr__shop-result') # Another potential selector
                if not product_cards:
                    # Generic div that might contain products within a larger container
                    product_cards = soup.find_all('div', class_='sh-rp__product-results')
        
        print(f"DEBUG: Found {len(product_cards)} potential product cards.")

        for card in product_cards:
            title_tag = card.find('h3', class_='sh-np__product-title') # Or a similar title class
            price_tag = card.find('span', class_='sh-np__product-price') # Or similar price class
            link_tag = card.find('a', class_='sh-np__product-link') # Or similar link class
            source_tag = card.find('span', class_='sh-np__seller-name') # Or similar seller name class

            # Fallback selectors for title, price, link, source - Google's HTML is complex
            if not title_tag:
                 title_tag = card.find('div', class_='sh-sr__title')
            if not price_tag:
                 price_tag = card.find('span', class_='price')
            if not link_tag:
                link_tag = card.find('a', attrs={'aria-label': True}) # Try finding links with aria-label
            if not source_tag:
                source_tag = card.find('div', class_='sh-sr__merchant')


            title = title_tag.get_text(strip=True) if title_tag else "N/A"
            price = price_tag.get_text(strip=True) if price_tag else "N/A"
            link = link_tag['href'] if link_tag and 'href' in link_tag.attrs else "#"
            source = source_tag.get_text(strip=True) if source_tag else "N/A"

            # Clean up the link if it's a Google redirect link
            if "url?q=" in link:
                link = link.split("url?q=")[1].split("&sa=U")[0]

            shopping_results.append({
                "title": title,
                "price": price,
                "link": link,
                "source": source
            })

        if not shopping_results:
             print(f"DEBUG: No product cards found for query '{query}' with current selectors. Consider updating selectors.")
             # Fallback to a message if no results are found after scraping
             return jsonify({"shopping_results": []}) # Return empty list if no results
        else:
             print(f"DEBUG: Scraped {len(shopping_results)} results for query '{query}'.")

        # --- END OF REPLACED CODE FOR REAL SCRAPING ---

        # Add a small delay to simulate network latency, matching real API calls
        time.sleep(1.5) # Still good to keep a delay to be polite to the website

        return jsonify({"shopping_results": shopping_results})

    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err} - Status Code: {http_err.response.status_code}")
        return jsonify({"error": f"HTTP error during scraping: {http_err.response.status_code}"}), http_err.response.status_code
    except requests.exceptions.ConnectionError as conn_err:
        print(f"Connection error occurred: {conn_err}")
        return jsonify({"error": f"Connection error during scraping: {conn_err}"}), 503 # Service Unavailable
    except requests.exceptions.Timeout as timeout_err:
        print(f"Timeout error occurred: {timeout_err}")
        return jsonify({"error": f"Request timed out during scraping: {timeout_err}"}), 504 # Gateway Timeout
    except requests.exceptions.RequestException as req_err:
        print(f"An unknown request error occurred: {req_err}")
        return jsonify({"error": f"Request error during scraping: {req_err}"}), 500
    except Exception as e:
        # This catches any other unexpected errors during scraping or parsing
        print(f"An unexpected error occurred during scraping: {e}")
        return jsonify({"error": f"Internal server error during scraping: {e}"}), 500

if __name__ == '__main__':
    # Flask will run on port 5000 by default.
    # host='0.0.0.0' makes it accessible from your local network as well.
    app.run(debug=True, host='0.0.0.0')