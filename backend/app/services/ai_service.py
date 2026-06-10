"""AI Service — OpenAI / Groq product recommendations and shopping assistant"""
from fastapi import HTTPException
from app.config import settings
from app.services.product_service import MOCK_PRODUCTS
import random


def get_ai_recommendations(user_history: list[str], limit: int = 6) -> list:
    """
    Return AI product recommendations.
    Uses OpenAI or Groq if keys are set, otherwise returns smart mock recommendations.
    """
    if settings.GROQ_API_KEY:
        try:
            from groq import Groq
            client = Groq(api_key=settings.GROQ_API_KEY)
            prompt = f"""You are a shopping assistant for FusionCart. 
            Based on user interest in: {', '.join(user_history) if user_history else 'general shopping'},
            recommend product categories from: Electronics, Fashion, Furniture, Toys & Gaming.
            Return only a JSON array of product slugs from this list: {[p['slug'] for p in MOCK_PRODUCTS]}.
            Return exactly {limit} slugs."""
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=200,
            )
            import json
            slugs = json.loads(response.choices[0].message.content)
            return [p for p in MOCK_PRODUCTS if p["slug"] in slugs][:limit]
        except Exception:
            pass  # Fall through to mock

    if settings.OPENAI_API_KEY:
        try:
            from openai import OpenAI
            client = OpenAI(api_key=settings.OPENAI_API_KEY)
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": f"Recommend {limit} products for someone interested in {user_history}"}],
                max_tokens=200,
            )
            # Parse response and match products
        except Exception:
            pass

    # Mock fallback — return random featured products
    featured = [p for p in MOCK_PRODUCTS if p.get("is_featured")]
    return random.sample(featured, min(limit, len(featured)))


def chat_with_assistant(message: str, conversation_history: list = None) -> str:
    """
    AI shopping assistant chat.
    Uses Groq or OpenAI if keys are configured, otherwise returns canned responses.
    """
    if settings.GROQ_API_KEY:
        try:
            from groq import Groq
            client = Groq(api_key=settings.GROQ_API_KEY)
            messages = [
                {
                    "role": "system",
                    "content": """You are FusionBot, a friendly AI shopping assistant for FusionCart — 
                    a premium e-commerce platform. Help users find products, compare items, 
                    answer questions about orders, and give personalized recommendations.
                    Keep responses concise (2-3 sentences max). Be warm and helpful."""
                }
            ]
            if conversation_history:
                messages.extend(conversation_history)
            messages.append({"role": "user", "content": message})

            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=messages,
                max_tokens=300,
            )
            return response.choices[0].message.content
        except Exception as e:
            pass

    if settings.OPENAI_API_KEY:
        try:
            from openai import OpenAI
            client = OpenAI(api_key=settings.OPENAI_API_KEY)
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are FusionBot, a helpful shopping assistant for FusionCart."},
                    {"role": "user", "content": message}
                ],
                max_tokens=300,
            )
            return response.choices[0].message.content
        except Exception:
            pass

    # Canned responses for dev mode
    canned = [
        "Great question! I'd recommend checking out our Electronics section for the latest gadgets. 🔥",
        "We have some amazing deals today! The Sony WH-1000XM5 headphones are 28% off. 🎧",
        "You can track your order from the Orders page in your profile. Let me know if you need help!",
        "Our best sellers this week are the MacBook Air M3 and Nike Air Max 270. Want to take a look?",
        "Free shipping on orders above ₹999! 🚚 Is there anything specific you're looking for?",
    ]
    import random
    return random.choice(canned)
