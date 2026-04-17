"""Startup wrapper that catches and prints errors clearly."""
import os
import sys
import traceback

def main():
    port = int(os.environ.get("PORT", "10000"))
    print(f"Starting KG Visa API on port {port}")
    print(f"DATABASE_URL set: {'yes' if os.environ.get('DATABASE_URL') else 'NO'}")
    print(f"Python version: {sys.version}")

    try:
        import uvicorn
        uvicorn.run(
            "app.main:app",
            host="0.0.0.0",
            port=port,
            log_level="info",
        )
    except Exception:
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()
