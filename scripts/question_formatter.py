import json
import uuid

# Example Scraper Script to generate compatible JSON for Intellect
# Usage: python scraper.py

def generate_questions():
    questions = []
    
    # ---------------------------------------------------------
    # REPLACE THIS SECTION WITH YOUR SCRAPING LOGIC
    # ---------------------------------------------------------
    
    # Example: Scraped data from a fictional source
    raw_data = [
        {
            "q": "What is the powerhouse of the cell?",
            "a": "Mitochondria",
            "b": "Nucleus",
            "c": "Ribosome",
            "d": "Golgi Body",
            "correct": "a",
            "subject": "biology",
            "topic": "cell-biology"
        },
        {
            "q": "Which law states F = ma?",
            "a": "Newton's First Law",
            "b": "Newton's Second Law",
            "c": "Newton's Third Law",
            "d": "Einstein's Relativtity",
            "correct": "b",
            "subject": "physics",
            "topic": "mechanics",
            "year": 2023
        }
    ]
    
    # ---------------------------------------------------------
    
    for item in raw_data:
        question = {
            "question_text": item["q"],
            "subject": item["subject"], # Must match a slug in your 'subjects' table
            "topic": item["topic"],     # Must match a slug in your 'topics' table (optional)
            "difficulty": "medium",     # easy, medium, hard
            "correct_option": item["correct"],
            "options": [
                { "id": "a", "text": item["a"] },
                { "id": "b", "text": item["b"] },
                { "id": "c", "text": item["c"] },
                { "id": "d", "text": item["d"] }
            ],
            "explanation": f"The correct answer is {item['correct'].upper()}.",
            "is_pyq": "year" in item,
            "pyq_year": item.get("year", None)
        }
        questions.append(question)

    return questions

if __name__ == "__main__":
    data = generate_questions()
    
    # Save to file
    with open("questions_upload.json", "w") as f:
        json.dump(data, f, indent=2)
        
    print(f"Successfully generated {len(data)} questions in 'questions_upload.json'.")
    print("Upload this file at /admin/upload")
